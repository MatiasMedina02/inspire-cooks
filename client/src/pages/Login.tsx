import FondoForm from "../assets/fondo-form.jpg";
import { useForm } from "react-hook-form";
import { LoginData } from "../types";
import { useLoginUserMutation } from "../redux/services/usersApi";
import { useLocation, Link } from "wouter";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/features/authSlice";
import LogoApp from "../assets/logo-app.png";
import { useAuth } from "../context/AuthContext";
import GoogleLogo from "../assets/google-logo.png";
import FacebookLogo from "../assets/facebook-logo.png";
import Spinner from "../components/Spinner";

const schema = yup.object().shape({
  email: yup.string().required("Email is a required field"),
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
  const { loginWithGoogle, loginWithFacebook, isLoading } = useAuth();
  const userData = useAppSelector(state => state.persistedReducer.user.userData);

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
      dispatch(login(data));
      setLocation("/");
      toast.success(`Welcome ${userData?.user?.firstName} ${userData?.user?.lastName}`, {
        autoClose: 3000,
      });
    }
  }, [isError, isSuccess]);

  if (isLoading || loading){
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
      <div className="w-3/5 flex justify-center items-center">
        <form
          className="w-full h-full min-h-screen p-60 flex flex-col justify-center"
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
    </div>
  );
};

export default Login;
