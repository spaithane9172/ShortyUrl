import { useEffect, useState } from "react";
import Form from "../components/Form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const Registration = () => {
  const navigate = useNavigate();
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
          alert(response.data.message);
          navigate("/login");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("authenticated")) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-[80vh]">
      {!localStorage.getItem("authenticated") && (
        <div className="px-[1rem] py-[0.5rem] border-[1px] border-gray-300 shadow-lg rounded-md w-fit h-fit bg-white">
          <h1 className="relative top-[-1.3rem] bg-white w-fit">SignUp</h1>
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
            Already have an account?{" "}
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
