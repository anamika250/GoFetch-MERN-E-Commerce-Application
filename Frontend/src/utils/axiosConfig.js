import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  withCredentials: true,
});

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default instance;