import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_API_URL,
  responseType: "json",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const httpRequest = async (data) => {
  try {
    const res = await axiosInstance.request(data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
