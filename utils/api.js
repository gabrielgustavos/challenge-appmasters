import axios from "axios";

const request = axios.create({
  baseURL: "https://doar-computador-api.herokuapp.com/",
});

export default request