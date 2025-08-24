import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import api from "../api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isUserLogin, setIsUserLogin, mode } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      setIsUserLogin(false);
      navigate("/login");
    } else {
      setIsUserLogin(true);
    }
  }, []);
  const [url, setUrl] = useState("");
  const [showURL, setShowURL] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [search, setSearch] = useState();
  const [urlsData, setUrlsData] = useState([]);
  const copyUrl = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      toast.success("URL Copied successfully.");
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.opacity = 0;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("URL Copied successfully.");
    }
  };
  const shortUrl = async (e) => {
    e.preventDefault();
    try {
      if (url.length > 6) {
        const response = await api.post("/url", {
          originalUrl: url.includes("https://") ? url : "https://" + url,
        });
        if (response.status == 200) {
          toast.success(response.data.message);
          setIsUserLogin(true);
          setIsOpen(false);
          fetchUrls();
        } else {
          toast.error(response.data, message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const searchURL = (e) => {
    e.preventDefault();
    console.log("Search", search);
  };

  const fetchUrls = async () => {
    try {
      const response = await api.get("/url");
      if (response.status === 200) {
        setUrlsData(response.data.urls);
        setIsUserLogin(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateUrl = async (e) => {
    e.preventDefault();
    try {
      if (url.originalURL.length > 6) {
        const response = await api.put("/url", {
          _id: url._id,
          originalUrl: url.originalURL.includes("https://")
            ? url.originalURL
            : "https://" + url.originalURL,
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          fetchUrls();
          setIsOpenUpdate(false);
          setUrl("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await api.delete("/url/" + id);
      if (response.status === 200) {
        setIsUserLogin(true);
        fetchUrls();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div
      className={`pt-[3rem] px-[1rem] lg:px-[2rem] ${
        mode ? "bg-white" : "bg-gradient-to-b from-slate-800 to-slate-600"
      } h-[94vh]`}
    >
      {isUserLogin && (
        <div>
          <div className="flex justify-center my-[2rem]">
            <div className="border-[1px] bg-gradient-to-b from-blue-300 to-blue-100 border-gray-400 rounded-md shadow-md  flex flex-col justify-center items-center w-[40vw] lg:w-[25vw] h-[15vh] lg:h-[20vh] mx-[1rem] lg:mx-[2rem]">
              <p className="text-[2rem] lg:text-[2.5rem] font-bold">
                {urlsData.length}
              </p>
              <p className="text-[1rem] lg:text-[1.1rem] font-semibold">
                Total Urls
              </p>
            </div>
            <div className="border-[1px] bg-gradient-to-b from-blue-300 to-blue-100 border-gray-400 rounded-md shadow-md flex flex-col justify-center items-center w-[40vw] lg:w-[25vw] h-[15vh] lg:h-[20vh] mx-[1rem] lg:mx-[2rem]">
              <p className="text-[2rem] lg:text-[2.5rem] font-bold">
                {urlsData.reduce((acc, curr) => acc + curr.visited, 0)}
              </p>
              <p className="text-[1rem] lg:text-[1.1rem] font-semibold">
                Total Visits
              </p>
            </div>
          </div>

          <Modal
            title={"Update Original URL"}
            isOpen={isOpenUpdate}
            onClose={() => {
              setIsOpenUpdate(false);
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                name="originalURL"
                value={url.originalURL}
                onChange={(e) => {
                  setUrl((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                placeholder="https://originalUrl.com"
                className="outline-none border-[1px] border-gray-300 w-[70vw] lg:w-[30vw] mb-[1rem] py-[0.3rem] lg:py-[0.5rem] pl-[0.5rem]"
              />
              <button
                onClick={updateUrl}
                className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 font-semibold px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-md text-white cursor-pointer"
              >
                Update URL
              </button>
            </div>
          </Modal>

          <Modal
            title={"Shorten URL"}
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <input
                type="text"
                name="url"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                placeholder="https://demo.com"
                className="rounded-sm outline-none border-[1px] border-gray-300 w-[70vw] lg:w-[30vw] mb-[1rem] py-[0.3rem] lg:py-[0.5rem] pl-[0.5rem]"
              />
              <button
                onClick={shortUrl}
                className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 font-semibold px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-md text-white cursor-pointer"
              >
                Shorten URL
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={showURL}
            title="Original Url"
            onClose={() => {
              setShowURL(false);
              setUrl("");
            }}
          >
            <div className="flex flex-col justify-center items-center w-[80vw] lg:w-[50vw]">
              <h1 className="text-[0.9rem] font-semibold my-[1rem]">{url}</h1>
              <button
                onClick={copyUrl}
                className="cursor-pointer rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[0.9rem] px-[1rem] py-[0.1rem]"
              >
                Copy URL
              </button>
            </div>
          </Modal>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="text"
                name="search"
                placeholder="Search..."
                className={`${
                  mode
                    ? "text-black placeholder:text-black"
                    : "text-white placeholder:text-white"
                } pl-[0.5rem] py-[0.3rem] lg:py-[0.5rem] outline-none border-[1px] border-gray-300 rounded-sm w-[40vw] lg:w-[25vw]`}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                onClick={searchURL}
                className="mx-[0.5rem] bg-blue-500 text-white font-semibold text-[0.9rem] px-[0.8rem] lg:px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-sm cursor-pointer"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="bg-blue-500 text-white font-semibold text-[0.9rem] px-[0.6rem] lg:px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-sm cursor-pointer"
              >
                Short <i className="fa-solid fa-link"></i>
              </button>
            </div>
          </div>
          <div className="w-full rounded-lg overflow-hidden mt-[1rem] border-[1px] border-blue-300">
            <div className="w-full border rounded-md">
              <table className="w-full table-fixed">
                <thead className="w-full bg-blue-200">
                  <tr className="text-[0.8rem] lg:text-[0.9rem]">
                    <th className="text-center py-[0.5rem]">Sr. No.</th>
                    <th className="text-center py-[0.5rem]">
                      Original <i className="fa-solid fa-link"></i>
                    </th>
                    <th className="text-center py-[0.5rem]">
                      Short <i className="fa-solid fa-link"></i>
                    </th>
                    <th className="text-center py-[0.5rem]">Visited</th>
                    <th className="text-center py-[0.5rem]">Action</th>
                  </tr>
                </thead>
              </table>

              <div className="max-h-[700px] lg:max-h-[350px] overflow-y-auto">
                <table className="w-full table-fixed">
                  <tbody className={mode ? "text-black" : "text-white"}>
                    {urlsData.map((data, indx) => (
                      <tr
                        className="text-[0.8rem] lg:text-[0.9rem]"
                        key={data._id}
                      >
                        <td className="text-center py-[0.3rem]">{indx + 1}</td>
                        <td
                          className="text-center py-[0.3rem]"
                          title={data.originalURL}
                        >
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setShowURL(true);
                              setUrl(data.originalURL);
                            }}
                          >
                            <span className="text-wrap hidden md:block">
                              {data.originalURL.slice(0, 25)}
                            </span>
                            <span className="text-wrap md:hidden">
                              {data.originalURL.slice(0, 10)}
                            </span>
                          </button>
                        </td>
                        <td
                          className="text-center py-[0.3rem]"
                          title={data.shortURL}
                        >
                          <button
                            className="cursor-pointer"
                            onClick={() => {
                              setShowURL(true);
                              setUrl(data.shortURL);
                            }}
                          >
                            <span className="text-wrap hidden md:block">
                              {data.shortURL.slice(0, 25)}
                            </span>
                            <span className="text-wrap  md:hidden">
                              {data.shortURL.slice(0, 10)}
                            </span>
                          </button>
                        </td>
                        <td className="text-center py-[0.3rem]">
                          {data.visited}
                        </td>
                        <td className="text-center py-[0.3rem]">
                          <button onClick={() => deleteRecord(data._id)}>
                            <i className="fa-solid fa-trash text-red-600 mx-[0.5rem] cursor-pointer"></i>
                          </button>
                          <button
                            onClick={() => {
                              setUrl(data);
                              setIsOpenUpdate(true);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square text-blue-600 mx-[0.5rem] cursor-pointer"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
