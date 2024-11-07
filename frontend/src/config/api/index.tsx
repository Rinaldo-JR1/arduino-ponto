import { apiUrl } from "@/src/utils/consts";
import axios from "axios";

const api = axios.create({
  baseURL: apiUrl,
});

export { api };
