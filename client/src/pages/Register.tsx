import { useForm } from "react-hook-form";
import FondoForm from "../assets/fondo-form.jpg";
import { RegisterData } from "../types";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterUserMutation } from "../redux/services/usersApi";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LogoApp from "../assets/logo-app.png";
import Spinner from "../components/Spinner";

const schema = yup.object().shape({
  firstName: yup.string()
    .required("First Name is a required field")
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ']*$/, 'First Name must contain letters')
    .max(20, "First Name cannot exceed 50 characters"),
  lastName: yup.string()
    .required("Last Name is a required field")
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ']*$/, 'Last Name must contain letters')
    .max(20, "Last Name cannot exceed 50 characters"),
  email: yup.string()
    .required("Email is a required field")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters long"),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the Terms and Conditions and the Privacy Policy")
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({ mode: "onChange", resolver: yupResolver(schema) });
  const [registerForm, { isLoading, isError, isSuccess }] = useRegisterUserMutation({});
  const [_, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  if (isLoading) {
    return <Spinner />
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-2/5 h-full min-h-screen relative hidden lg:flex">
        <div className="w-full h-full bg-gradient-radial from-green-500/40 to-black/50 absolute flex justify-center items-center">
          <img className="w-60" src={LogoApp} alt="Logo Navbar" />
        </div>
        <img className="w-full h-full" src={FondoForm} alt="Fondo Formulario" />
      </div>
      <form
        className="w-full lg:w-3/5 px-6 md:px-36 flex flex-col justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="flex justify-center text-5xl">Register</h1>
        <div className="flex flex-col md:flex-row md:space-x-4 py-2">
          <div className="w-full flex flex-col py-2">
            <input
              className={`my-1 p-2 border rounded ${errors.firstName ? "outline-red-600" : ""
                }`}
              type="firstName"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-red-600">{errors.firstName.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col py-2">
            <input
              className={`my-1 p-2 border rounded ${errors.lastName ? "outline-red-600" : ""
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
            className={`my-1 p-2 border rounded ${errors.email ? "outline-red-600" : ""
              }`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div className="w-full flex flex-col py-2">
          <div className="relative">
            <input
              className={`w-full my-1 p-2 border rounded ${errors.password ? "outline-red-600" : ""
                }`}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
            />
            <button type="button" className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </div>

        <div className="flex flex-col py-2">
          <div className="flex items-center">
            <input type="checkbox" className="h-5 w-5 text-indigo-600 mr-2" {...register("termsAndConditions")} defaultChecked={true} />
            <span>I accept the Terms and Condition and the Privacy Policy</span>
          </div>
          {errors.termsAndConditions && (
            <span className="text-red-600">{errors.termsAndConditions.message}</span>
          )}
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
