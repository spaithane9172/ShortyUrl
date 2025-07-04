import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/AppContext";
import api from "../../api";
import Modal from "../Modal";
import { toast } from "react-toastify";
import ThemeButton from "../ThemeButton";
const Navbar = () => {
  const { setIsUserLogin, isUserLogin, mode } = useContext(Context);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [showDropDown, setShowDropDown] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const logout = async () => {
    try {
      const response = await api.get("/user/logout");
      if (response.status === 200) {
        localStorage.removeItem("authenticated");
        setIsUserLogin(false);
        navigate("/");
        toast.success("User LogOut.");
        setIsUserLogin(false);
      } else {
        toast.error("Something Wrong.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      if (
        userDetails.firstName.length >= 3 &&
        userDetails.lastName.length >= 3
      ) {
        const response = await api.put("/user/updateUser", {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          setIsOpen(false);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await api.get("/user");
      if (response.status == 200) {
        setUserDetails(response.data.user);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (isUserLogin) {
      fetchUserDetails();
    }
  }, [isUserLogin]);

  return (
    <nav
      className={`shadow-md flex justify-between items-center px-[1rem] lg:px-[2rem] py-[1rem] ${
        mode
          ? "bg-gradient-to-b from-gray-300 to-gray-100"
          : "bg-gradient-to-b from-slate-950 to-slate-900"
      } fixed w-full z-50`}
    >
      <Modal
        title="Profile"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex flex-col px-[1rem] py-[0.5rem]">
          <input
            className="w-[70vw] lg:w-[25vw] border-[1px] border-gray-300 focus:border-blue-400 rounded-sm outline-none pl-[0.5rem] my-[0.5rem] py-[0.3rem] lg:py-[0.5rem]"
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <input
            className="w-[70vw] lg:w-[25vw] border-[1px] border-gray-300 focus:border-blue-400 rounded-sm outline-none pl-[0.5rem] my-[0.5rem] py-[0.3rem] lg:py-[0.5rem]"
            type="text"
            name="lastName"
            value={userDetails.lastName}
            onChange={(e) => {
              setUserDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
              }));
            }}
          />
          <input
            className="w-[70vw] lg:w-[25vw] border-[1px] border-gray-300 focus:border-blue-400 rounded-sm outline-none pl-[0.5rem] my-[0.5rem] py-[0.3rem] lg:py-[0.5rem]"
            type="email"
            name="email"
            value={userDetails.email}
            disabled
          />
          <button
            onClick={updateUserDetails}
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 font-semibold text-white rounded-sm my-[1rem] py-[0.3rem] lg:py-[0.5rem]"
          >
            Update
          </button>
        </div>
      </Modal>
      <Link to={"/"}>
        <img
          src={logo}
          alt=""
          className=" w-[6rem] lg:w-[10rem] h-[2rem] lg:h-[3rem]"
        />
      </Link>
      <div className="flex items-center">
        <div className="mx-[1rem]">
          <ThemeButton />
        </div>
        {isUserLogin ? (
          <div>
            <button
              onClick={() => {
                setShowDropDown(!showDropDown);
              }}
              className="flex justify-center items-center rounded-full w-[2.5rem] h-[2.5rem] border-[1px] border-gray-500 shadow-md cursor-pointer"
            >
              <i className="fa-solid fa-user text-[1.2rem] text-blue-500"></i>
            </button>
            {showDropDown && (
              <div
                className={`flex flex-col absolute right-[2rem] ${
                  mode ? "bg-white text-black" : "bg-slate-900 text-white"
                } border-[1px] border-gray-300 rounded-md shadow-lg z-50`}
              >
                <button
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="px-[1rem] py-[0.5rem] border-b-[1px] border-gray-300 cursor-pointer"
                >
                  {userDetails.firstName + " " + userDetails.lastName}
                </button>
                <button
                  onClick={logout}
                  className="px-[1rem] py-[0.5rem] cursor-pointer"
                >
                  LogOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="rounded-sm bg-blue-500 text-white font-semibold text-[0.9rem] px-[1.2rem] py-[0.5rem]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
