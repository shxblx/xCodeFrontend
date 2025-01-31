import React from "react";
import SignUp from "../components/Signup.jsx";
import { Route, Routes } from "react-router-dom";
import TaskManagement from "../components/TaskManager.jsx";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<TaskManagement />} />
    </Routes>
  );
};

export default UserRouter;
