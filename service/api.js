import axios from "axios";

const api = axios.create({
  baseURL: "https://doar-computador-api.herokuapp.com/",
  headers: { "content-type": "application/json" },
});

export default api;
