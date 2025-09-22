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

export const apiSinAuth = axios.create({
  baseURL: BASE,
  responseType: "json",
});
