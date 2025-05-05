import InputField from "../elements/InputField";
import CardContainer from "../elements/CardContainer";
import ButtonFilled from "../elements/ButtonFilled";
import { Link } from "react-router-dom";

const FormLogin = (props) => {
  const { onSubmit, control, errors } = props;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CardContainer title="Login">
        <form onSubmit={onSubmit}>
          <InputField
            placeholder="Username"
            name="username"
            control={control}
            errors={errors}
            required
          />
          <InputField
            placeholder="Password"
            name="password"
            type="password"
            control={control}
            errors={errors}
            required
          />
          <ButtonFilled
            type="submit"
            color="blue"
            radius="lg"
            variant="solid"
            className="flex items-center justify-center gap-2"
          >
            Login
          </ButtonFilled>
        </form>
        <p className="mt-4 text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </CardContainer>
    </div>
  );
};

export default FormLogin;
