import axiosInstance from '../components/auth/axiosInstance';
import {useNavigate} from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const response = await axiosInstance.post('/api/storefront/logout');

            if (response.data.success) {
                // 로컬 스토리지의 토큰 제거
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                // 로그인 페이지로 리다이렉트
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
            // 에러가 발생하더라도 로컬 데이터는 정리
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            navigate('/');
        }
    };

    return {logout};
};