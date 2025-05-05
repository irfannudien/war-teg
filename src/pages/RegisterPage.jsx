import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

import FormRegister from "../components/form/FormRegister";
import SpinnerLoading from "../components/elements/SpinnerLoading";
import axiosInstance from "../lib/axiosInstance";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username wajib diisi"),
  password: yup
    .string()
    .min(6, "Minimal 6 karakter")
    .required("Password wajib"),
  name: yup.string().required("Nama wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  phone: yup
    .string()
    .matches(/^\d+$/, "Nomor telepon harus berupa angka")
    .required("Nomor telepon wajib diisi"),
});

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/register", data);
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      console.error("Register error", err);
      if (err.response?.status === 400 || err.response?.status === 409) {
        toast.warning("Username sudah terdaftar.");
      } else {
        toast.error("Tidak dapat terhubung ke server");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SpinnerLoading />;

  return (
    <FormRegister
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
    />
  );
};

export default RegisterPage;
