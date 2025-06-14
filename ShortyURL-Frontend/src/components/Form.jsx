const Form = ({ formData, setFormValues }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <form className="lg:w-[30vw] flex flex-col justify-center">
        {formData.formFields.map((formField) => {
          return (
            <>
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
                    className="rounded-sm py-[0.2rem] border-[1px] border-gray-400 outline-none my-[0.2rem] w-full pl-[0.5rem] placeholder:text-[0.8rem] placeholder:font-semibold shadow-md focus:border-blue-300"
                  />
                </div>
              )}
            </>
          );
        })}
        <button
          onClick={formData.btnFun}
          className="shadow-md w-full rounded-sm bg-blue-500 py-[0.2rem] my-[1rem] text-white font-semibold"
        >
          {formData.btnTitle}
        </button>
      </form>
    </div>
  );
};

export default Form;
