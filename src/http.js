import axios from 'axios';
const axiosBaseURL = axios.create({
    baseURL:"http://127.0.0.1:8000/"
});
export default axiosBaseURL
