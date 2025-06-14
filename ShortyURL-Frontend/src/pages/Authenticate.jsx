import { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { Context } from "../context/AppContext";

const Authenticate = () => {
  const { setIsUserLogin, isUserLogin } = useContext(Context);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const login = async (e) => {
    e.preventDefault();
    if (formValues.email.length !== 0 && formValues.password.length >= 8) {
      try {
        const response = await api.post("/user/login", formValues);
        alert(response);
        if (response.status === 200) {
          setIsUserLogin(true);
          navigate("/dashboard");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Invalid Credentials");
    }
  };
  useEffect(() => {
    if (isUserLogin) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="px-[1rem] py-[0.5rem] border-[1px] border-gray-300 shadow-lg rounded-md w-fit h-fit bg-white">
        <h1 className="relative top-[-1.3rem] bg-white w-fit">Login</h1>
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
          Don't Have an Account?{" "}
          <Link to="/signup" className="text-blue-600 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authenticate;
