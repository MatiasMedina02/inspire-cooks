import { useForm } from "react-hook-form";
import FondoForm from "../assets/fondo-form.jpg";
import { RegisterData } from "../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../redux/services/usersApi";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import LogoApp from "../assets/logo-app.png";
import Spinner from "../components/Spinner";

const schema = yup.object().shape({
  firstName: yup.string().required("FirstName is a required field"),
  lastName: yup.string().required("LastName is a required field"),
  email: yup.string().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ mode: "onChange", resolver: yupResolver(schema) });
  const [registerForm, { isLoading, isError, isSuccess }] = useRegisterUserMutation({});
  const [_, setLocation] = useLocation();

  const onSubmit = async (user: RegisterData) => {
    try {
      await registerForm(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("User already exists", {
        autoClose: 3000
      });
    }
    if (isSuccess) {
      setLocation("/login");
      toast.success("User created succesfully", {
        autoClose: 3000
      });
    }
  }, [isError, isSuccess]);

  if (isLoading){
    return <Spinner />
  };

  return (
    <div className="w-full h-screen flex">
      <ToastContainer />
      <div className="w-2/5 h-full min-h-screen relative">
        <div className="w-full h-full bg-gradient-radial from-green-500/40 to-black/50 absolute flex justify-center items-center">
          <img className="w-60" src={LogoApp} alt="Logo Navbar" />
        </div>
        <img className="w-full h-full" src={FondoForm} alt="Fondo Formulario" />
      </div>
      <form
        className="w-3/5 p-40 flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="flex justify-center text-5xl">Register</h1>
        <div className="flex justify-between space-x-4 py-2">
          <div className="w-full flex flex-col">
            <input
              className={`my-1 p-2 border rounded ${
                errors.firstName ? "outline-red-600" : ""
              }`}
              type="firstName"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col">
            <input
              className={`my-1 p-2 border rounded ${
                errors.lastName ? "outline-red-600" : ""
              }`}
              type="lastName"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-red-600">{errors.lastName.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col py-2">
          <input
            className={`my-1 p-2 border rounded ${
              errors.email ? "outline-red-600" : ""
            }`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col py-2">
          <input
            className={`my-1 p-2 border rounded ${
              errors.password ? "outline-red-600" : ""
            }`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>

        <div className="flex items-center py-2">
          <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600 mr-2" />
          <span>I accept the Terms and Condition and the Privacy Policy</span>
        </div>
        
        <button className="my-3 p-2 bg-orange-500 rounded" type="submit">
          <span className="text-white">Sign Up</span>
        </button>

        <div className="flex">
          <span>Have an account?</span>
          <Link href="/login">
            <span className="ml-1 cursor-pointer underline">Sign in</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
