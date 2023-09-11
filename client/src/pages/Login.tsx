import FondoForm from "../assets/fondo-form.jpg";
import { useForm } from "react-hook-form";
import { LoginData } from "../types";
import { useLoginUserMutation } from "../redux/services/usersApi";
import { useLocation, Link } from "wouter";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/authSlice";
import LogoApp from "../assets/logo-app.png";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google-logo.png";
import FacebookLogo from "../assets/facebook-logo.png";
import Spinner from "../components/Spinner";

const schema = yup.object().shape({
  email: yup.string().required("Email is a required field").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),
  password: yup.string().required("Password is a required field"),
});

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ mode: "onChange", resolver: yupResolver(schema) });
  const [loginForm, { isLoading: loading, isError, isSuccess, data }] = useLoginUserMutation({});
  const [_, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const { loginWithGoogle, loginWithFacebook, loadingLogin } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (user: LoginData) => {
    try {
      await loginForm(user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginFacebook = async () => {
    try {
      await loginWithFacebook();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Email or Password incorrect", {
        autoClose: 3000,
      });
    }
    if (isSuccess) {
      dispatch(login({ user: data }));
      setLocation("/");
    }
  }, [isError, isSuccess]);

  if (loadingLogin || loading) {
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
        <h1 className="flex justify-center text-5xl pb-4">Login</h1>
        <div className="py-4 space-y-2">
          <button
            type="button"
            className="w-full flex items-center px-2 rounded shadow-md"
            onClick={handleLoginFacebook}
          >
            <img className="w-8 m-1" src={FacebookLogo} alt="Google Logo" />
            <span className="w-full justify-center text-black">
              Sign in with Facebook
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center px-2 rounded shadow-md"
            onClick={handleLoginGoogle}
          >
            <img className="w-10" src={GoogleLogo} alt="Google Logo" />
            <span className="w-full justify-center text-black">
              Sign in with Google
            </span>
          </button>
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
        <div className="flex flex-col py-2">
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
          <span className="flex justify-end">Forgot password?</span>
        </div>
        <button className="my-3 p-2 bg-orange-500 rounded" type="submit">
          <span className="text-white">Sign In</span>
        </button>
        <div className="flex">
          <span>Don't have an account yet?</span>
          <Link href="/register">
            <span className="ml-1 cursor-pointer underline">Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
