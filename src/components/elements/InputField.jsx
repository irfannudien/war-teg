import { Input } from "@heroui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = (props) => {
  const {
    label,
    type = "text",
    name,
    control,
    errors,
    required,
    value,
    onChange,
    placeholder,
    disabled,
    rows = 4,
  } = props;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const isTextarea = type === "textarea";

  const inputType = isPassword
    ? show
      ? "text"
      : "password"
    : type === "number"
    ? "text"
    : type;

  const baseClass =
    "w-full rounded-md px-3 py-2 bg-white border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-1 focus:ring focus:border-gray-300 focus:ring-gray-300 disabled:bg-gray-100";

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          defaultValue=""
          render={({ field, fieldState }) => {
            return isTextarea ? (
              <textarea
                {...field}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                className={baseClass}
              />
            ) : (
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                onChange={(e) => {
                  let value = e.target.value;

                  // Filter biar cuma angka
                  if (inputType === "number" || name === "phone") {
                    value = value.replace(/\D/g, "");
                  }

                  field.onChange(value);
                }}
                // className={baseClass}
              />
            );
          }}
        />

        {isPassword && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShow(!show)}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>

      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name].message || "This field is required"}
        </p>
      )}
    </div>
  );
};

export default InputField;
