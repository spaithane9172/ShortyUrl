import { useContext } from "react";
import { Context } from "../context/AppContext";

const Form = ({ formData, setFormValues }) => {
  const { mode } = useContext(Context);
  return (
    <div className="w-full flex justify-center items-center">
      <form className="lg:w-[30vw] flex flex-col justify-center ">
        {formData.formFields.map((formField) => {
          return (
            <div key={formField.placeholder}>
              {(formField.type === "text" ||
                formField.type === "number" ||
                formField.type === "email" ||
                formField.type === "password") && (
                <div>
                  <input
                    type={formField.type}
                    name={formField.name}
                    placeholder={formField.placeholder}
                    onChange={(e) => {
                      setFormValues((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    className={`rounded-sm py-[0.3rem] lg:py-[0.5rem] border-[1px] border-gray-400 outline-none my-[0.3rem] lg:my-[0.5rem] w-[70vw] lg:w-full pl-[0.5rem] placeholder:text-[0.9rem] placeholder:font-semibold shadow-md focus:border-blue-300 ${
                      mode
                        ? "text-black placeholder:text-black"
                        : "text-white placeholder:text-white"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={formData.btnFun}
          className="cursor-pointer shadow-md w-full rounded-sm bg-blue-500 py-[0.3rem] lg:py-[0.5rem] my-[0.5rem] lg:my-[1rem] text-white font-semibold"
        >
          {formData.btnTitle}
        </button>
      </form>
    </div>
  );
};

export default Form;
