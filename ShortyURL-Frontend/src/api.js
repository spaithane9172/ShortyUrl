import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("before");
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/login") &&
      !originalRequest.url.includes("/signup") &&
      !originalRequest.url.includes("/refreshToken")
    ) {
      console.log("after");
      originalRequest._retry = true;
      try {
        const resp = await api.post("/user/refreshToken");
        if (resp.status !== 200) {
          localStorage.removeItem("authenticated");
        }
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
