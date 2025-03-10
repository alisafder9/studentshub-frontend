import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://studentshub-frontend.vercel.app'
});

export default axiosInstance;
