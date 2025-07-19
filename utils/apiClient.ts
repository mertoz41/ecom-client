import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api", // Replace with your backend URL
  withCredentials: true, // IMPORTANT: send cookies with every request
});

export default apiClient;
