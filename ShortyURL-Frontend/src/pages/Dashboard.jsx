import { useState } from "react";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [url, setUrl] = useState();
  const [showURL, setShowURL] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState();
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
  const shortUrl = () => {
    console.log("shortUrl", url);
  };
  const searchURL = (e) => {
    e.preventDefault();
    console.log("Search", search);
  };
  return (
    <div className="mt-[1.5rem] px-[1rem] lg:px-[2rem]">
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
            className="outline-none border-[1px] border-gray-300 lg:w-[30vw] mb-[1rem]"
          />
          <button
            onClick={shortUrl}
            className="text-[0.9rem] bg-blue-500 hover:bg-blue-600 font-semibold px-[1rem] py-[0.2rem] rounded-md text-white"
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
            className="pl-[0.5rem] outline-none border-[1px] border-gray-300 rounded-sm w-[40vw] lg:w-[25vw]"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={searchURL}
            className="mx-[0.5rem] bg-blue-500 text-white font-semibold text-[0.8rem] px-[1rem] py-[0.2rem] rounded-sm"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="bg-blue-500 text-white font-semibold text-[0.8rem] px-[0.6rem] lg:px-[1rem] py-[0.2rem] rounded-sm"
          >
            Short <i className="fa-solid fa-link"></i>
          </button>
        </div>
      </div>
      <div className="w-full rounded-lg overflow-hidden mt-[1rem] border-[1px] border-blue-300">
        <table className="w-full">
          <thead className="bg-blue-200 w-full">
            <tr className="text-[0.8rem] w-full">
              <th className="text-center py-[0.5rem]">Sr. No.</th>
              <th className="text-center py-[0.5rem]">
                Original <i className="fa-solid fa-link"></i>
              </th>
              <th className="text-center py-[0.5rem]">
                Short <i className="fa-solid fa-link"></i>
              </th>
              <th className="text-center py-[0.5rem]">Visited</th>
            </tr>
          </thead>
          <tr className="text-[0.8rem] w-full">
            <td className="text-center py-[0.3rem]">1</td>
            <td
              className="text-center py-[0.3rem]"
              title="https://in.search.yahoo.com/search?fr=mcafee&type=E210IN885G0&p=table+html"
            >
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowURL(true);
                  setUrl(
                    "https://in.search.yahoo.com/search?fr=mcafee&type=E210IN885G0&p=table+html"
                  );
                }}
              >
                {"https://in.search.yahoo.com/search?fr=mcafee&type=E210IN885G0&p=table+html".slice(
                  0,
                  20
                )}
              </button>
            </td>
            <td className="text-center py-[0.3rem]">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setShowURL(true);
                  setUrl("http://shortyURL.com/123456");
                }}
              >
                {"http://shortyURL.com/123456".slice(0, 10)}
              </button>
            </td>
            <td className="text-center py-[0.3rem]">2</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
