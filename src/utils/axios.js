import axios from "axios";

const baseURL =`${process.env.REACT_APP_URL}`;

const axiosBase = axios.create({
    baseURL: baseURL,
  });


export default axiosBase;