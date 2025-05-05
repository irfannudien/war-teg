import React, { useState } from "react";
import FormComponent from "../elements/FormContainer";

const FormMenu = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    stock: "",
    price: "",
  });

  const formFields = [
    {
      name: "name",
      type: "text",
      label: "Nama Menu",
      placeholder: "Masukkan nama menu",
      required: true,
      errorMessage: "Nama menu wajib diisi",
    },
    {
      name: "stock",
      type: "number",
      label: "Jumlah Stock",
      placeholder: "Masukkan Jumlah Stock",
      required: true,
      errorMessage: "Stock Diperlukan",
    },
    {
      name: "price",
      type: "number",
      label: "Harga",
      placeholder: "Masukkan harga",
      required: true,
      errorMessage: "Harga wajib diisi",
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
    setFormValues({ name: "", price: "", stock: ""});
  };

  return (
    <FormComponent
      formFields={formFields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValues={formValues}
      buttonText="Tambahkan Menu"
    />
  );
};

export default FormMenu;
