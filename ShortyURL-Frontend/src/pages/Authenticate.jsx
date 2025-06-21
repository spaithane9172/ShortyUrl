import { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Context } from "../context/AppContext";
import bg from "../assets/bg.png";
import bgBlack from "../assets/bg_black.png";
import { toast } from "react-toastify";

const Authenticate = () => {
  const { setIsUserLogin, isUserLogin, mode } = useContext(Context);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const login = async (e) => {
    e.preventDefault();
    console.log("object");
    if (formValues.email.length !== 0 && formValues.password.length >= 8) {
      try {
        const response = await api.post("/user/login", formValues);
        if (response.status === 200) {
          setIsUserLogin(true);
          localStorage.setItem("authenticated", true);
          navigate("/dashboard");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Invalid Credentials");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      setIsUserLogin(true);
      navigate("/dashboard");
    } else {
      setIsUserLogin(false);
    }
  }, []);
  return (
    <div className="relative flex justify-center items-center min-h-screen">
      {!isUserLogin && (
        <div
          className={`px-[1rem] py-[0.5rem] border-[1px] border-gray-300 shadow-lg rounded-md w-fit h-fit ${
            mode ? "bg-white" : "bg-slate-900"
          } `}
        >
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-sm z-[-2]"
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
          <h1
            className={`w-fit mb-[1rem] font-semibold text-[1.3rem] h-[100vh] ${
              mode ? "text-black" : "text-white"
            }`}
          >
            Login
          </h1>
          <Form
            setFormValues={setFormValues}
            formData={{
              btnTitle: "LogIn",
              btnFun: login,
              formFields: [
                {
                  type: "email",
                  name: "email",
                  placeholder: "Email",
                },
                {
                  type: "password",
                  name: "password",
                  placeholder: "Password",
                },
              ],
            }}
          />
          <p className="text-center text-[0.8rem] mt-[0.5rem] mb-[1rem]">
            <span className={mode ? "text-black" : "text-white"}>
              Don't Have an Account?
            </span>{" "}
            <Link to="/signup" className="text-blue-600 underline">
              SignUp
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
