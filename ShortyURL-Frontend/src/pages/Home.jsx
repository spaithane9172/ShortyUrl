import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Home = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const shortUrl = async () => {
    try {
      if (url.length > 6) {
        const response = await api.post("/url", { originalUrl: url });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[90vh] px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="text-center max-w-2xl">
        <i className="fa-solid fa-link text-[4rem] mb-[0.2rem] text-blue-500"></i>
        <h1 className="text-blue-600 font-extrabold text-3xl lg:text-5xl mb-4 tracking-tight">
          ShortyURL
        </h1>
        <div className="flex border-[1px] border-gray-400 rounded-sm my-[3rem] ">
          <input
            type="text"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="https://sample.com"
            className="outline-none rounded-l-sm w-full px-[0.5rem]"
          />
          <button
            onClick={() => {
              if (localStorage.getItem("authenticated")) {
                shortUrl();
              } else {
                navigate("/login");
              }
            }}
            className="cursor-pointer w-[10vw] px-[1rem] py-[0.8rem] bg-blue-500 hover:bg-blue-600 rounded-r-sm text-white font-semibold"
          >
            Shorten <i className="fa-solid fa-link"></i>
          </button>
        </div>
        <h2 className="text-gray-800 text-xl lg:text-2xl font-medium mb-4">
          Smart Link Management Starts Here — Shorten and Share with Confidence
        </h2>

        <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-6">
          ShortyURL helps you convert long, messy URLs into clean and shareable
          links. Fast, secure, and hassle-free—just paste and shorten in
          seconds.
        </p>

        {localStorage.getItem("authenticated") && (
          <Link
            to="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl"
          >
            Go To Dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
