import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import bg from "../assets/bg.png";
import bgBlack from "../assets/bg_black.png";
import { toast } from "react-toastify";
import { Context } from "../context/AppContext";

const Home = () => {
  const [url, setUrl] = useState("");
  const { setIsUserLogin, isUserLogin, mode } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      setIsUserLogin(true);
    } else {
      setIsUserLogin(false);
    }
  }, []);

  const shortUrl = async () => {
    try {
      if (url.length > 6) {
        const response = await api.post("/url", { originalUrl: url });
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-[90vh] px-4  overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm -z-1"
        style={{
          backgroundImage: `url(${mode ? bg : bgBlack})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div
        className={`absolute inset-0 ${
          mode ? "bg-white/70" : "bg-black/70"
        } z-[-1]`}
      ></div>
      <div className="text-center max-w-2xl">
        <i className="fa-solid fa-link text-[4rem] mb-[0.2rem] text-blue-500"></i>
        <h1 className="text-blue-600 font-extrabold text-3xl lg:text-5xl mb-4 tracking-tight">
          ShortyURL
        </h1>
        <div
          className={`flex justify-between border-[1px] ${
            mode ? "border-gray-600" : "border-white"
          } rounded-sm my-[2rem] lg:my-[3rem]`}
        >
          <input
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="https://sample.com"
            className={`outline-none rounded-l-sm w-full px-[0.5rem] ${
              mode
                ? "text-black placeholder:text-black"
                : "text-white placeholder:text-white"
            }`}
          />
          <button
            onClick={() => {
              if (isUserLogin) {
                shortUrl();
              } else {
                navigate("/login");
              }
            }}
            className="cursor-pointer text-[0.9rem] lg:text-[1rem] w-[35vw] lg:w-[10vw] px-[0.5rem] lg:px-[1rem] py-[0.5rem] lg:py-[0.8rem] bg-blue-500 hover:bg-blue-600 rounded-r-sm text-white font-semibold"
          >
            Shorten <i className="fa-solid fa-link"></i>
          </button>
        </div>
        <h2
          className={`text-gray-800 text-xl lg:text-2xl font-medium mb-4 ${
            mode ? "text-black" : "text-white"
          }`}
        >
          Smart Link Management Starts Here — Shorten and Share with Confidence
        </h2>

        <p
          className={`text-gray-600 text-base lg:text-lg leading-relaxed mb-6 ${
            mode ? "text-black" : "text-white"
          }`}
        >
          ShortyURL helps you convert long, messy URLs into clean and shareable
          links. Fast, secure, and hassle-free—just paste and shorten in
          seconds.
        </p>

        {isUserLogin && (
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-semibold px-6 py-2 lg:py-3 rounded-lg shadow-lg hover:shadow-xl"
          >
            Go To Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
