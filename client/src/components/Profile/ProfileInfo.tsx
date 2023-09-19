import { useAppSelector } from "../../redux/hooks";

const ProfileInfo: React.FC = () => {
  const userData = useAppSelector((state) => state.persistedReducer.user.userData);

  return (
    <div className="w-full p-4">
      <div className="w-full flex">
        <img className="w-24 rounded-full" src={userData?.user?.image.url} alt={userData?.user?.email} />
        <div className="pl-4">
          <h2>{userData?.user?.firstName} {userData?.user?.lastName}</h2>
          <span>{userData?.user?.email}</span>
        </div>
      </div>

      <div className="flex pt-2 space-x-14">
        <div className="">
          <h3>First Name</h3>
          <span>{userData?.user?.firstName}</span>
        </div>
        <div className="">
          <h3>Last Name</h3>
          <span>{userData?.user?.lastName}</span>
        </div>
      </div>

      <div className="flex py-2">
        <div className="">
          <h3>Email</h3>
          <span>{userData?.user?.email}</span>
        </div>
      </div>

      <button className="p-2 bg-orange-500 rounded-md" onClick={() => { }}>
        <span>Save changes</span>
      </button>
    </div>
  )
}

export default ProfileInfo