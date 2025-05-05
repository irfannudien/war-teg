import InputField from "../elements/InputField";
import CardContainer from "../elements/CardContainer";
import ButtonFilled from "../elements/ButtonFilled";
import { Link } from "react-router-dom";

const FormRegister = (props) => {
  const { onSubmit, control, errors } = props;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CardContainer title="Register">
        <form onSubmit={onSubmit}>
          <InputField
            placeholder="Username"
            name="username"
            control={control}
            errors={errors}
          />
          <InputField
            placeholder="Password"
            name="password"
            type="password"
            control={control}
            errors={errors}
          />
          <InputField
            placeholder="Name"
            name="name"
            control={control}
            errors={errors}
          />

          <InputField
            placeholder="Address"
            name="address"
            type="textarea"
            control={control}
            errors={errors}
            rows={2}
          />
          <InputField
            placeholder="Phone"
            name="phone"
            type="number"
            control={control}
            errors={errors}
          />
          <ButtonFilled type="submit" color="blue" radius="lg" variant="solid">
            Register
          </ButtonFilled>
        </form>
        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </CardContainer>
    </div>
  );
};

export default FormRegister;
