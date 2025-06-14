import { useState } from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";

const Authenticate = () => {
  const [formValues, setFormValues] = useState();
  const login = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="px-[1rem] py-[0.5rem] border-[1px] border-gray-300 shadow-lg rounded-md w-fit h-fit">
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
