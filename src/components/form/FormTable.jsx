import React, { useState } from "react";
import FormComponent from "../elements/FormContainer";

const FormTable = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    number: "",  // Sesuaikan dengan formFields
    status: "available",
  });

  const formFields = [
    {
      name: "number",
      type: "number",
      label: "Nomor Meja",
      placeholder: "Masukkan Nomor Meja",
      required: true,
      errorMessage: "Nomor Meja Belum Dimasukkan",
    },
    {
      name: "status",
      type: "text",
      label: "Status",
      placeholder: "Masukkan Status Meja",
      required: true,
      errorMessage: "Status Meja Dibutuhkan",
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
    console.log("Data dikirim:", formValues); // Debugging sebelum submit
    onSubmit(formValues);
    setFormValues({ number: "", status: "" });
  };

  return (
    <FormComponent
      formFields={formFields}
      onSubmit={handleSubmit}
      onChange={handleChange}
      formValues={formValues}
      buttonText="Add Table"
    />
  );
};

export default FormTable;
