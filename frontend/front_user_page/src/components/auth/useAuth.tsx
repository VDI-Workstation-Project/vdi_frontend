import {useEffect} from "react";
import axiosInstance from "./axiosInstance.tsx";

export const useAuth = () => {
    useEffect(() => {
        let isSubscribed = true;

        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                window.location.href = '/';
                return;
            }
            try {
                await new Promise(resolve => setTimeout(resolve, 500));

                if (!isSubscribed) return;

                await axiosInstance.get('/api/auth/validate');

            } catch (error) {
                if (isSubscribed) {
                    console.log(error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/';
                }
            }

        };
        checkAuth();

        // cleanup function
        return () => {
            isSubscribed = false;
        };
    }, []);
}