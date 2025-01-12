import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/api/auth/refresh', { refreshToken });
                const { accessToken } = response.data;

                localStorage.setItem('accessToken', accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstance(originalRequest);

            } catch (refreshError) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;