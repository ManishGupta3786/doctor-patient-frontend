/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorDetails } from "../domain/user";
import { useAppSelector } from "../infrastructure/store";

const getDoctorProfileFunction = "http://localhost:8081/getDoctorDetails";

export const useDoctorDetails = () => {
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(
    null
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const user = useAppSelector((state) => state.userSlice);


  const fetchDoctorDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${getDoctorProfileFunction}?id=${id?id:user?.user?.id}`);
      setDoctorDetails(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch doctors profile.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);
  return { doctorDetails, fetchDoctorDetails, isLoading };
};
