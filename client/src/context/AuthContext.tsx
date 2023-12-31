import { createContext, useContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useLocation } from "wouter";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/authSlice";
import { useRegisterUserMutation } from "../redux/services/usersApi";
import { toast } from "react-toastify";

interface AuthContextType {
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => Promise<void>;
  loadingLogin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [_, setLocation] = useLocation();
  const dispatch = useAppDispatch();
  const [register, { data, isSuccess }] = useRegisterUserMutation();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const getUserData = async () => {
    setLoadingLogin(true);
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user.displayName) {
        const firstName = result.user.displayName.split(" ")[0];
        const lastName = result.user.displayName.split(" ")[1];
        const userData = {
          firstName,
          lastName,
          email: result.user.email,
          image: result.user.photoURL,
        };
        register(userData);
      }
    } catch (error) {
      toast.error("You have registered with another method", {
        autoClose: 3000
      });
    } finally {
      setLoadingLogin(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoadingLogin(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithFacebook = async () => {
    setLoadingLogin(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  const authContextValue: AuthContextType = {
    loginWithGoogle,
    loginWithFacebook,
    logout,
    loadingLogin
  };

  useEffect(() => {
    getUserData();
  }, []);
  
  useEffect(() => {
    if(isSuccess){
      dispatch(login({ user: data }));
      setLocation("/");
    }
  }, [isSuccess]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
