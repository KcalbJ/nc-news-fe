import Navbar from "./Navbar";

import UserIcon from "./UserIcon";

function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 flext-row overscroll-none justify-between items-center px-4 md:px-6 bg-violet-600">
      <div className="">
        <Navbar />
      </div>

      <div className="">
        <h1 className="text-center text-white md:text-5xl text-3xl font-bold
        ">NC Newsli</h1>
      </div>
      <div className=" ">
        <UserIcon />
      </div>
    </header>
  );
}

export default Header;
