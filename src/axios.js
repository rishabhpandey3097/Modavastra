import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN}`
    }
});

// axiosInstance.interceptors.request.use(function (config) {
//     document.getElementById('progress-bar').classList.add('progress-bar')
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

// axiosInstance.interceptors.response.use(function (response) {
//     document.getElementById('progress-bar').classList.remove('progress-bar')
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });

export default axiosInstance;

