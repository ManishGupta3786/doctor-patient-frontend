import React, { useEffect, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from "../../infrastructure/store";
import CreateAppointment from '../../components/appointments/CreateAppointment';
const updateAvailabilityFunction = "http://localhost:8085/updateAvailableTimes";
const getDoctorProfileFunction = "http://localhost:8081/getdoctorsdetails";
import { toast } from "react-toastify";
import axios from 'axios';
import { Availability } from '../../domain/user';

const DoctorDashboard: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState<Availability[]>([]);
    const { logout } = useAuth();
    const user = useAppSelector((state) => state.userSlice);
    const [again, setAgain] = useState(false);

    const fetchDoctorDetails = async (id: string | undefined) => {
        setLoading(true);
        try {
            const response = await axios.get(`${getDoctorProfileFunction}?id=${id ? id : user?.user?.id}`);
            setSlots(response.data.availability);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch doctors profile.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctorDetails(user?.user?.id)
    }, [again])    

    const handleCheckboxChange = (date: string, i: number) => {
        let arr = slots.map((ele) => {
            if (ele.date === date) {
                const newArr = ele.availableTimes.map((el, index) => {
                    if (index === i) {
                        el.available = !el.available;
                        return el
                    } else {
                        return el
                    }
                })
                return { ...ele, availableTimes: newArr }

            } else {
                return ele
            }
        })
        setSlots([...arr])
    };

    const handleApply = async (index: number) => {
        try {
            const obj = { ...slots[index], doctorId: user?.user?.id }
            // console.log("obj ", obj);
            await axios.post(updateAvailabilityFunction,
                {
                    ...obj
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            toast.success('Slot updated successfully');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ border: '1px solid black', backgroundColor: 'orange', padding: '5px', marginTop: '10px' }} onClick={logout}>Logout</button>
            </div>
            <div className="flex items-center justify-between py-[1rem] mt-3">
                <h1 className="font-bold text-[20px]">Doctor Dashboard</h1>
            </div>
            <hr />
            <h3 className="font-bold text-[18px]">Create new slot here</h3>
            <hr />
            <CreateAppointment doctorId={user?.user?.id || null} dataProp={setAgain}/>
            <h3 className="font-bold text-[18px] mt-5">Edit slot here</h3>
            <hr />
            <div className="mt-9">

                {(loading && slots.length === 0) ? (<div>Data is loading</div>) : (
                    <div>
                        {slots.map((element, index) => (
                            <div className="border border-gray-300 p-4" key={index}>
                                <div className="text-lg font-bold">
                                    {element.date}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', fontSize: '18px', paddingTop: '10px', paddingBottom: '20px' }}>
                                    {element?.availableTimes.map((e, i) => (<div key={i} ><input type="checkbox" checked={e.available} style={{ height: '20px', width: '20px' }} onChange={() => handleCheckboxChange(element.date, i)} /><label>{e.startTime}</label></div>))}
                                    <button style={{ border: '1px solid black', padding: '5px', backgroundColor: 'lightseagreen', borderRadius: '10px' }} onClick={() => handleApply(index)}>Apply</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default DoctorDashboard;
