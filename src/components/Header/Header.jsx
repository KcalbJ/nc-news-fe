import Navbar from "./Navbar";
import Search from "./Search";
import UserIcon from "./UserIcon";

function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-violet-600">
      <div className="w-[150px]">
        <Navbar />
      </div>

      <div className="inline-block">
        <Search />
      </div>
      <div className="ml-auto w-[150px] flex justify-center">
        <UserIcon />
      </div>
    </header>
  );
}

export default Header;
