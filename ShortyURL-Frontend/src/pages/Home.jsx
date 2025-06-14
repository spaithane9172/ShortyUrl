import bgimg from "../assets/bgimg.jpg";

const Home = () => {
  return (
    <div className="px-[1rem] lg:px-[2rem] flex justify-center items-center h-[90vh]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-blue-500 font-bold text-[1.3rem] lg:text-[2rem] my-[1rem]">
          ShortyURL
        </h1>
        <h1 className="text-[1.1rem] lg:text-[1.8rem] w-[70vw] lg:w-[40vw] text-center">
          Smart Link Management Starts Here Shorten and Share with Confidence
        </h1>
        <p className="w-[80vw] lg:w-[60vw] text-[1rem] lg:text-[1.2rem] text-center">
          ShortyURL helps you convert long, messy URLs into clean and shareable
          links. Fast, secure, and hassle-free—just paste and shorten in
          seconds.
        </p>
        <div className="py-[2rem]">
          <button className="shadow-md bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[1rem] lg:text-[1.2rem] px-[1rem] py-[0.5rem] rounded-md">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
