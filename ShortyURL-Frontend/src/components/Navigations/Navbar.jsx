import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-[1rem] lg:px-[2rem] py-[0.5rem] bg-gradient-to-b from-gray-300 to-gray-100 fixed w-full">
      <div>
        <img src={logo} alt="" className="w-[6rem] h-[2rem]" />
      </div>
      <div>
        <Link
          to="/login"
          className="rounded-sm bg-blue-500 text-white font-semibold text-[0.8rem] px-[1rem] py-[0.2rem]"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
