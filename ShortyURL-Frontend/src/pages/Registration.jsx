import { useState } from "react";
import Form from "../components/Form";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formValues, setFormValues] = useState();
  const signup = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="px-[1rem] py-[0.5rem] border-[1px] border-gray-300 shadow-lg rounded-md w-fit h-fit">
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
    </div>
  );
};

export default Registration;
