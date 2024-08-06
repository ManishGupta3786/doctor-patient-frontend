/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, Doctor, ProfileInfo } from "../domain/user";
import { setUser } from "../infrastructure/slice/userSlice";
import { useAppDispatch } from "../infrastructure/store";
import { auth, db } from "../infrastructure/firebase";



export const useAuth = () => {
  const [form, setForm] = useState<User | null>(null);
  const [doctorForm, setDoctorForm] = useState<Doctor | null>(null);
  const [profileForm, setProfileForm] = useState<ProfileInfo | null>(null);
  const [error, setError] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // console.log("form data ", form);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function handleChange(name: keyof User | keyof Doctor, value: string | number, required = true) {
    if (required && value === "") {
      setError((prev: any) => {
        return {
          ...prev,
          [name]: `${name} is required!!!`,
        };
      });
      setForm((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      return;
    }
    setError((prev: any) => {
      return {
        ...prev,
        [name]: null,
      };
    });
    setForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handle_D_Change(name: keyof Doctor, value: string | number, required = true) {
    if (required && value === "") {
      setError((prev: any) => {
        return {
          ...prev,
          [name]: `${name} is required!!!`,
        };
      });
      setDoctorForm((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      return;
    }
    setError((prev: any) => {
      return {
        ...prev,
        [name]: null,
      };
    });
    setDoctorForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleProfileChange(name: keyof ProfileInfo, value: string | number, required = true) {
    if (required && value === "") {
      setError((prev: any) => {
        return {
          ...prev,
          [name]: `${name} is required!!!`,
        };
      });
      setProfileForm((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      return;
    }
    setError((prev: any) => {
      return {
        ...prev,
        [name]: null,
      };
    });
    setProfileForm((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function loginUser() {
    if (!form) {
      toast("Email and password is required");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form?.email,
        form?.password
      );

      const userData = userCredential.user;
      if (!userData.emailVerified) {
        await sendEmailVerification(userData);
        setLoading(false);

        toast.error(
          "Account not verified, a verify link as been sent to your email address, Please verify your email before logging in."
        );
        return;
      }

      // const accessToken = await userData.getIdToken();
      // console.log("Access Token:", accessToken);

      let userDoc = await getDoc(doc(db, "users", userData.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        dispatch(setUser(data));
      }

      toast("Login successfull");
      // createEvent();
      if (userDoc.data()?.role === 'USER') {
        navigate("/");
      } else {
        navigate('/doctor-dashboard')
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed to login:");
      setLoading(false);
    }
  }

  const logout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
    navigate('/login')
  };

  async function userRegister() {
    if (!form) {
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form?.email,
        form?.password
      );
      const data = userCredential.user;
      await sendEmailVerification(data);
      const userData = {
        ...form,
        id: data.uid,
        email: data.email,
        role: "USER",
        photo: "http://www.example.com/12345678/photo.png",
      };
      await setDoc(doc(db, "users", data.uid), userData);

      toast(
        "Registration successful, please check your email for verification"
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account please try again");
      setLoading(false);
    }
  }

  async function doctorRegister() {
    if (!doctorForm) {
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        doctorForm?.email,
        doctorForm?.password
      );
      const data = userCredential.user;
      await sendEmailVerification(data);
      const doctorData = {
        id: data.uid,
        email: data.email,
        photo: "http://www.example.com/12345678/photo.png",
        about: doctorForm?.about,
        createdAt: new Date().toISOString(),
        password: doctorForm?.password,
        name: doctorForm?.name,
        // nextAvailableSlot: {
        //   date: '2024-10-05',
        //   startTime: "8:00",
        // },
        phoneNo: doctorForm?.phoneNo,
        profileInfo: {
          experience: profileForm?.experience + 'years',
          patientStories: profileForm?.patientStories,
          qualification: profileForm?.qualification,
          ratings: profileForm?.ratings,
          successRate: profileForm?.successRate
        },
        role: doctorForm?.role,
        specialty: doctorForm?.specialty,
        updatedAt: new Date().toISOString(),
      }
      await setDoc(doc(db, "users", data.uid), doctorData);

      toast(
        "Registration successful, please check your email for verification"
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account please try again");
      setLoading(false);
    }
  }

  return {
    form,
    doctorForm,
    handleChange,
    handle_D_Change,
    handleProfileChange,
    error,
    loginUser,
    logout,
    userRegister,
    doctorRegister,
    loading,
  };
};
