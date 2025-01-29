import axios from "axios";
const base_url = "http://localhost:8000/api";
const apiInstance = axios.create({ baseURL: base_url });

apiInstance.interceptors.request.use(
  (config) => {
    const getToken = JSON.parse(localStorage.getItem("token"));
    if (getToken) {
      config.headers.Authorization = `Bearer ${getToken}`;
    }
    return config;
  },
  (error) => {
    new Promise.reject(error.message);
  }
);

export default apiInstance;
