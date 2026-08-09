import axios from "axios";

const api = axios.create({
  baseURL: "https://mnma-backend.onrender.com/api",
});

export default api;