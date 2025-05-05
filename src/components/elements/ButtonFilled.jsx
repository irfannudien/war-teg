import { Button } from "@heroui/react";

const ButtonFilled = (props) => {
  const {
    children,
    type = "button",
    variant = "solid",
    color = "blue",
    radius = "md",
    size = "md",
    disabled = false,
    icon,
    className = "",
    endContent,
    ...rest
  } = props;

  const customColor = {
    blue: {
      solid: "bg-blue-500 hover:bg-blue-700 text-white",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
    },
    green: {
      solid: "bg-green-600 hover:bg-green-700 text-white",
      outline: "border border-green-600 text-green-600 hover:bg-green-100",
    },
    red: {
      solid: "bg-red-600 hover:bg-red-700 text-white",
      outline: "border border-red-600 text-red-600 hover:bg-red-100",
    },
    gray: {
      solid: "bg-gray-600 hover:bg-gray-700 text-white",
      outline: "border border-gray-600 text-gray-600 hover:bg-gray-100",
    },
    yellow: {
      solid: "bg-yellow-600 hover:bg-yellow-700 text-white",
      outline: "border border-yellow-600 text-yellow-600 hover:bg-yellow-100",
    },
  };

  const borderRadius = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const selectedColor = customColor[color] || customColor.gray;
  const style = selectedColor[variant] || selectedColor.solid;
  const variantButton = "unstyled";

  return (
    <Button
      type={type}
      disabled={disabled}
      variant={variantButton}
      className={`w-full flex items-center justify-center gap-2 transition duration-200 
        ${style}
        ${borderRadius[radius]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
        ${className}`}
      {...rest}
      endContent={endContent}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </Button>
  );
};

export default ButtonFilled;
