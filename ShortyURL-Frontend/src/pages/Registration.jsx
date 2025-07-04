import { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";
import bg from "../assets/bg.png";
import bgBlack from "../assets/bg_black.png";
import { Context } from "../context/AppContext";

const Registration = () => {
  const navigate = useNavigate();
  const { setIsUserLogin, isUserLogin, mode } = useContext(Context);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signup = async (e) => {
    e.preventDefault();
    try {
      if (
        formValues.firstName.length > 3 &&
        formValues.lastName.length > 3 &&
        formValues.email.length > 10 &&
        formValues.email.includes("@") &&
        formValues.password.length >= 8 &&
        formValues.password === formValues.confirmPassword
      ) {
        const response = await api.post("/user/signup", {
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
          }`}
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
            className={`${
              mode ? "text-black" : "text-white"
            } w-fit mb-[1rem] font-semibold text-[1.3rem]`}
          >
            SignUp
          </h1>
          <Form
            setFormValues={setFormValues}
            formData={{
              btnTitle: "SignUp",
              btnFun: signup,
              formFields: [
                {
                  type: "text",
                  name: "firstName",
                  placeholder: "First Name",
                },
                {
                  type: "text",
                  name: "lastName",
                  placeholder: "Last Name",
                },
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
                {
                  type: "password",
                  name: "confirmPassword",
                  placeholder: "Confirm Password",
                },
              ],
            }}
          />
          <p className="text-center text-[0.8rem] mt-[0.5rem] mb-[1rem]">
            <span className={mode ? "text-black" : "text-white"}>
              Already have an account?
            </span>{" "}
            <Link to="/login" className="text-blue-600 underline">
              LogIn
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Registration;
