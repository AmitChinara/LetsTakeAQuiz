import axios from "axios";
import { config } from "../config/config";

const api = axios.create({
    baseURL: config.baseURL, // backend base URL
    withCredentials: true // allow cookies for JWT
});

export default api;
