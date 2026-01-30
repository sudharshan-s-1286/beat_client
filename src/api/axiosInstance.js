import axios from 'axios';

// Create Axios Instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Request Interceptor: Attach Token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Handle 401 Errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Logging out...");
            localStorage.removeItem('token');
            // Force redirect to login
            window.location.href = '/signin';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
