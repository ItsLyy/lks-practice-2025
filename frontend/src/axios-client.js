import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.ENV_API_BASE_URL,
});
