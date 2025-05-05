import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../pages/MainLayout";
import LoginPage from "../pages/LoginPage";
import MenuPage from "../pages/MenuPage";
import CustomersPage from "../pages/CustomerPage";
import ProtectedRoute from "./ProtectedRoute";
import TablePage from "../pages/TablePage";
import TransactionPage from "../pages/TransactionPage";
import RegisterPage from "../pages/RegisterPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/menus" element={<MenuPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        {/* <Route path="/tables" elemnt={}  */}
        <Route path="/tables" element={<TablePage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
