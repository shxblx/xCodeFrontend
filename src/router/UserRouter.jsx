import React from "react";
import Signup from "../components/Signup";
import { Route, Routes } from "react-router-dom";
import TaskManagement from "../components/TaskManager";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";

const UserRouter = () => {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <TaskManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export default UserRouter;
