import axios from "axios";
import environment from "../config";
axios.defaults.baseURL = environment.server;
export default axios;
