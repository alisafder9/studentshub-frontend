import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://studentshub-backend.vercel.app'
});

export default axiosInstance;
