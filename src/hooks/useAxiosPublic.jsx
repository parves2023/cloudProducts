import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://cloudproducts.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
