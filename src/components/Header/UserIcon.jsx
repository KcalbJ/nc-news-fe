import { useState } from 'react';
import { IoPersonSharp } from "react-icons/io5";

function UserIcon() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleLogout = () => {
      console.log('Logging out...');
    };
  
    return (
      <div className="">
        <button className="flex items-center" onClick={toggleDropdown}>
          <IoPersonSharp  className="h-6 w-6" alt="User Avatar" />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-md">
            <div className="p-2">
              <p className="text-gray-800">USER NAME</p>
            </div>
            <div className="border-t border-gray-300">
             
              <div className="border-t border-gray-300" />
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
        }

export default UserIcon