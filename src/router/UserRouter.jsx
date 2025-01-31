import React from "react";
import Signup from "../components/Signup"; 
import { Route, Routes } from "react-router-dom";
import TaskManagement from "../components/TaskManager";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<TaskManagement />} />
    </Routes>
  );
};

export default UserRouter;