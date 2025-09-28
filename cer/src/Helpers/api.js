import axios from "axios";
import { BASE } from "./url";

const authHeader = () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return {
      Authorization: `Bearer ${user.token}`,
      "Access-Control-Allow-Origin": "*",
    };
  }
};

export const api = axios.create({
  baseURL: BASE,
  headers: authHeader(),
  responseType: "json",
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      config.headers["Access-Control-Allow-Origin"] = "*";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiSinAuth = axios.create({
  baseURL: BASE,
  responseType: "json",
});
