import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { IoPersonSharp } from "react-icons/io5";
import { useState } from "react";
function UserIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const handleLogout = () => {
  //   console.log("Logging out...");
  // };

  return (
    <div className="">
      <button className="flex items-center bg-slate-100 w-10 rounded-full h-10" onClick={toggleDropdown}>
        {isLoading ? (
          <IoPersonSharp className="  h-6 w-6" alt="User Avatar" />
        ) : (
          <img className="h-6 w-6 ml-2" alt="User Avatar" src={user.avatar_url} />
        )}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md">
          <div className="p-2">
            <p className="text-gray-800">User:{user.username}</p>
          </div>
          <div className="border-t border-gray-300">
            <div className="p-2">
              <p className="text-gray-800">Name:{user.name}</p>
            </div>
            <div className="border-t border-gray-300" />
            {/* <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserIcon;
