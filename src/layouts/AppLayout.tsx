import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

// import {auth, db} from '../infrastructure/firebase'
// import { useAppDispatch } from "../infrastructure/store";
// import { setUser } from "../infrastructure/slice/userSlice";
// import { signOut } from "firebase/auth";
const AppLayout: React.FC = () => {
  // const dispatch = useAppDispatch();

  // useEffect(()=>{
  //   const myfun = async ()=>{
  //     await signOut(auth);
  //     dispatch(setUser(null));
  //   }
  //   myfun()
  // },[])
  
  return (
    <Container
      maxWidth="sm"
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // height: "1000px",
        borderRadius: "10px",
        position: "relative",
        paddingBottom:'30px'
      }}
    >
      <Outlet />
    </Container>
  );
};

export default AppLayout;
