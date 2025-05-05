import React from "react";
import LoginPage from "./pages/LoginPage";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
