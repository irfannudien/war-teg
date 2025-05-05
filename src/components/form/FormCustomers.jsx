import React, { useState } from "react";
import FormComponent from "../elements/FormContainer";

const FormCustomers = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      label: "Nama Customer",
      placeholder: "Masukkan nama customer",
      required: true,
      errorMessage: "Nama customer wajib diisi",
    },
    {
      name: "phone",
      type: "number",
      label: "Nomor Telepon",
      placeholder: "Masukkan nomor telepon",
      required: true,
      errorMessage: "Nomor telepon wajib diisi",
    },
    {
      name: "address",
      type: "textarea",
      label: "Alamat",
      placeholder: "Masukkan alamat",
      required: true,
      errorMessage: "Alamat wajib diisi",
      rows: 2,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues({ name: "", phone: "", address: "" });
  };

  return (
    <FormComponent
      formFields={formFields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValues={formValues}
      buttonText="Tambah Customer"
    />
  );
};

export default FormCustomers;
