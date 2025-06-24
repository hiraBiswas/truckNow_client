import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://car-doctor-server-v1-sigma.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;