import { IoHome } from "react-icons/io5";

import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="mr-6 flex" href="#">
    <Link to="/" className="flex items-center">
        <IoHome className="h-6 w-6 text-slate-100" />
        <span className="sr-only">News App</span>
      </Link>
  </nav>
  );
}

export default Navbar;
