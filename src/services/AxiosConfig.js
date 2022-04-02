import axios from "axios";
import { openErrorNotification } from "../alerts/commonAlert";
import { accessTokenKey } from "../constants/localStorageKeys";

const instance = axios.create({
    baseURL:"http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(
    (config) => {
         const token = localStorage.getItem(accessTokenKey);
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data.data;
}, function (error) {
  openErrorNotification(error.response);
  return Promise.reject(error);
});
export default instance;