import { useContext, useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/AppContext";
import api from "../api";

const Dashboard = () => {
  const { isUserLogin, setIsUserLogin } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      navigate("/login");
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
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.opacity = 0;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
  };
  const shortUrl = async (e) => {
    e.preventDefault();
    try {
      if (url.length > 6) {
        const response = await api.post("/url", { originalUrl: url });
        if (response.status == 200) {
          alert(response.data.message);
          setIsUserLogin(true);
          setIsOpen(false);
          fetchUrls();
        } else {
          alert(response.data, message);
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  const searchURL = (e) => {
    e.preventDefault();
    console.log("Search", search);
  };

  const fetchUrls = async () => {
    try {
      const response = await api.get("/url");
      console.log(response.data);
      if (response.status === 200) {
        setUrlsData(response.data.urls);
        setIsUserLogin(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const updateUrl = async (e) => {
    e.preventDefault();
    try {
      if (url.originalURL.length > 6) {
        const response = await api.put("/url", {
          _id: url._id,
          originalUrl: url.originalURL,
        });
        if (response.status === 200) {
          alert(response.data.message);
          fetchUrls();
          setIsOpenUpdate(false);
          setUrl("");
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteRecord = async (id) => {
    try {
      const response = await api.delete("/url/" + id);
      if (response.status === 200) {
        setIsUserLogin(true);
        fetchUrls();
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div className="mt-[3rem] px-[1rem] lg:px-[2rem]">
      {localStorage.getItem("authenticated") && (
        <div>
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
                className="outline-none border-[1px] border-gray-300 lg:w-[30vw] mb-[1rem] py-[0.3rem] lg:py-[0.5rem] pl-[0.5rem]"
              />
              <button
                onClick={updateUrl}
                className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 font-semibold px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-md text-white"
              >
                Update URL
              </button>
            </div>
          </Modal>

          <Modal
            title={"Short URL"}
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
                className="outline-none border-[1px] border-gray-300 lg:w-[30vw] mb-[1rem] py-[0.3rem] lg:py-[0.5rem] pl-[0.5rem]"
              />
              <button
                onClick={shortUrl}
                className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 font-semibold px-[1rem] py-[0.3rem] lg:py-[0.5rem] rounded-md text-white"
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
              setUrl();
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
                className="pl-[0.5rem] py-[0.3rem] lg:py-[0.5rem] outline-none border-[1px] border-gray-300 rounded-sm w-[40vw] lg:w-[25vw]"
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
            <table className="w-full">
              <thead className="bg-blue-200 w-full">
                <tr className="text-[0.8rem] lg:text-[0.9rem] w-full">
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
              <tbody>
                {urlsData.map((data, indx) => {
                  return (
                    <tr
                      className="text-[0.8rem] lg:text-[0.9rem] w-full"
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
                          {data.originalURL.slice(0, 20)}
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
                          {data.shortURL.slice(0, 10)}
                        </button>
                      </td>
                      <td className="text-center py-[0.3rem]">
                        {data.visited}
                      </td>
                      <td className="text-center py-[0.3rem]">
                        <button
                          onClick={() => {
                            deleteRecord(data._id);
                          }}
                        >
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
