import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const AddAvailableTimesUrl = 'http://localhost:8084/addAvailableTimes'

interface TimeSlot {
  startTime: string;
  available: boolean;
}
interface MyComponentProps {
  doctorId: string | null;
  dataProp : React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAppointment: React.FC<MyComponentProps> = ({ doctorId, dataProp }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([
    { startTime: '10:00', available: false },
    { startTime: '11:00', available: false },
    { startTime: '12:00', available: false },
    { startTime: '13:00', available: false },
    { startTime: '14:00', available: false },
    { startTime: '15:00', available: false },
    { startTime: '16:00', available: false },
    { startTime: '17:00', available: false },
    { startTime: '18:00', available: false },
  ]);

  // Handle date change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    setSelectedTimes((prevTimes) =>
      prevTimes.map((timeSlot, i) =>
        i === index ? { ...timeSlot, available: !timeSlot.available } : timeSlot
      )
    );
  };

  // console.log("selectedDate :: ", selectedDate)
  const handleApply = async () => {
    try {
      const obj = {
        doctorId: doctorId,
        date: selectedDate,
        availableTimes: selectedTimes
      }
      if (obj.doctorId && obj.date) {
        await axios.post(AddAvailableTimesUrl,
          { ...obj },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        )
        dataProp(true);
        setSelectedDate('');
        setSelectedTimes([
          { startTime: '10:00', available: false },
          { startTime: '11:00', available: false },
          { startTime: '12:00', available: false },
          { startTime: '13:00', available: false },
          { startTime: '14:00', available: false },
          { startTime: '15:00', available: false },
          { startTime: '16:00', available: false },
          { startTime: '17:00', available: false },
          { startTime: '18:00', available: false },
        ])
        toast.success('New time slot is added successfully')

      } else {
        toast.error('Please select a date')
        // throw console.error();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-1 max-w-md mx-auto mt-2">
      <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Select Date
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-medium text-gray-700 mb-2">Select Time Slots</h2>
        <div className="flex flex-wrap gap-4">
          {selectedTimes.map((timeSlot, index) => (
            <label key={timeSlot.startTime} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={timeSlot.available}
                onChange={() => handleCheckboxChange(index)}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">{timeSlot.startTime}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <button
          onClick={handleApply}
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none`}
        >
          Create Slot
        </button>
      </div>

    </div>
  );
};

export default CreateAppointment;
