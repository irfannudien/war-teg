import React from "react";
import { Form, Input, Button } from "@heroui/react";

const FormComponent = (props) => {
  const { formFields, onSubmit, onChange, formValues, buttonText } = props;
  return (
    <Form onSubmit={onSubmit} className="space-y-4">
      {formFields.map((field, index) => (
        <div key={index} className="w-full">
          <Input
            name={field.name}
            value={formValues[field.name] || ""}
            onChange={onChange}
            placeholder={field.placeholder}
            type={field.type}
            label={field.label}
            isRequired={field.required}
            errorMessage={field.errorMessage}
          />
        </div>
      ))}
      <Button type="submit" color="primary" className="w-full">
        {buttonText || "Submit"}
      </Button>
    </Form>
  );
};

export default FormComponent;
