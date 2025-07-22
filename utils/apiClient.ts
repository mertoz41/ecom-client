import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://playablefactory-606b3ef0b268.herokuapp.com/api", // Replace with your backend URL
  withCredentials: true, // IMPORTANT: send cookies with every request
});

export default apiClient;
