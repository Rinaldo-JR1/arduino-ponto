import { apiUrl } from "@/src/utils/consts";
import axios from "axios";

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,

  validateStatus: (status) => true,
});

export { api };
