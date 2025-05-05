import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../lib/axiosInstance";
import FormLogin from "../components/form/FormLogin";
import SpinnerLoading from "../components/elements/SpinnerLoading";
import { useAuth } from "../context/AuthContext";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("User updated in FormLogin", user);
    if (user) {
      navigate("/menus");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/login", data);
      console.log("Login response:", res);
      const token = res.data.token;

      if (token) {
        login(token);
        toast.success("Login berhasil!");
        navigate("/menus");
      } else {
        toast.error("Token tidak ditemukan.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response?.status === 401 || err.response?.status === 400) {
        toast.error("Username atau password salah.");
      } else {
        toast.error("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  if (loading) return <SpinnerLoading />;

  return (
    <FormLogin
      control={control}
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginPage;
