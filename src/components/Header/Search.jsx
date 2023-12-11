import { IoMdSearch } from "react-icons/io";
function Search() {
  return (
    <form className="flex ">
          <div className="relative ">
            <IoMdSearch  className="absolute left-2.5 top-1 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              className="w-full bg-white shadow-none appearance-none border pl-8"
              placeholder="Search Articles..."
              type="search"
            />
          </div>
        </form>
  )
}

export default Search