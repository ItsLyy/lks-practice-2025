import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}/api`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status === 401 && error.statusText === "Unauthorized") {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
