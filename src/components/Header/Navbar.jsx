import { RxHamburgerMenu } from "react-icons/rx";
function Navbar() {
  return (
    
    <nav className="mr-6 flex" href="#">
     <RxHamburgerMenu className="h-6 w-6" />
      <span className="sr-only">News App</span>
    </nav>
 
  )
}

export default Navbar