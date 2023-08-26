import { useLocation } from "wouter";
import { useAppDispatch } from "../redux/hooks";
import { useAuth } from "../context/AuthContext";
import { logout as logoutUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import ProfileCreated from "../components/Profile/ProfileCreated";
import ProfileSaved from "../components/Profile/ProfileSaved";

const Profile: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>("profileInfo");
  const [_, setLocation] = useLocation();
  const { logout } = useAuth();
  const dispatch = useAppDispatch();

  const optionsProfile = [
    {name: "User Info", to: "profileInfo"},
    {name: "Created", to: "profileCreated"},
    {name: "Favorites", to: "profileSaved"},
  ]

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutUser());
      setLocation("/");
      toast.success("Session closed successfully", {
        autoClose: 3000
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full mx-auto pt-16 flex">
      <nav className="w-1/5 h-[calc(100vh-64px)] flex flex-col justify-between bg-slate-100">
        <div className="">
          <h2 className="text-center p-4">User Profile</h2>
          <ul>
            {optionsProfile.map(option => (
            <li className={`p-2 cursor-pointer ${activeComponent === option.to ? "border-r-4 border-orange-600" : ""}`} onClick={() => setActiveComponent(option.to)} key={option.name}>
              {option.name}
            </li>
            ))}
          </ul>
        </div>

        <button className="w-full justify-center mb-4 flex space-x-1" onClick={handleLogout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 stroke-red-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>

          <span className="text-red-600">Sign out</span>
        </button>
      </nav>

      <div className="w-4/5 p-4">
        {activeComponent === "profileInfo" && <ProfileInfo />}
        {activeComponent === "profileCreated" && <ProfileCreated />}
        {activeComponent === "profileSaved" && <ProfileSaved />}
      </div>
    </div>
  )
}

export default Profile