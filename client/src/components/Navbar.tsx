import { Link, useLocation } from "wouter";
import LogoApp from "../assets/logo-app.png";
import { useAppSelector } from "../redux/hooks";


const Navbar: React.FC = () => {
  const userData = useAppSelector((state) => state.persistedReducer.user.userData);
  const [_, setLocation] = useLocation();

  return (
    <nav className="w-full h-16 fixed z-20 bg-slate-200 flex justify-between items-center">
      <Link className="mx-2" href="/">
        <img
          className="w-16 cursor-pointer"
          src={LogoApp}
          alt="Logo Navbar"
        />
      </Link>

      <ul className="flex">
        <li>
          <Link
            className="flex items-end cursor-pointer space-x-1 mx-2"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-7 h-7 stroke-black stroke-[1.5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span className="font-bold">Home</span>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-end cursor-pointer space-x-1 mx-2"
            href={userData?.user?.email ? "/create" : "/login"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-7 h-7 stroke-black stroke-[1.5]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-bold">Create</span>
          </Link>
        </li>
      </ul>

      {userData?.user?.email ? (
        <button
          className="flex items-center"
          onClick={() => setLocation("/profile")}
        >
          <img
            className="w-8 rounded-full"
            src={userData?.user?.image.url}
            alt={userData?.user?.email}
          />
          <span className="flex items-center px-2">
            Profile
          </span>
        </button>
      ) : (
        <Link className="flex px-4 fill-orange-500" href="/login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2 text-orange-500">Sign in</span>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
