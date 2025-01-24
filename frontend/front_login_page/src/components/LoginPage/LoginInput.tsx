
import styled from "styled-components";
import {SignInButton} from "../../assets/button/button.tsx";
import { useState} from "react";
import { useNavigate} from 'react-router-dom';
import axiosInstance from "../auth/axiosInstance.tsx";
import PasswordChangeForm from "./PasswordChangeForm.tsx";
import StoreFrontPasswordChangeForm from "./StoreFrontPasswordChangeForm.tsx";

export const Label = styled.label`
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-size: 14px;
    font-weight: 400;
    height: 16px;
    line-height: normal;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    @media (max-width: 768px) {
        font-size: 12px; /* 작은 화면에서는 글꼴 크기 줄이기 */
    }
    @media (max-width: 480px) {
        font-size: 10px; /* 더 작은 화면에서는 글꼴 크기 더 줄이기 */
    }
`
const MainLabel = styled.label`
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-size: 26px;
    font-weight: 400;
    height: 30px;
    position: relative;
    margin-bottom: 20px;
    display: flex;
    @media (max-width: 768px) {
        font-size: 24px; /* 작은 화면에서는 글꼴 크기 줄이기 */
    }
    @media (max-width: 480px) {
        font-size: 18px; /* 더 작은 화면에서는 글꼴 크기 더 줄이기 */
    }
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    user-select: none;
    gap: 10px; /* 두 컨테이너 간의 간격 조절 */
    @media (max-width: 768px) {
        gap: 8px; /* 작은 화면에서는 간격 줄이기 */
    }

    @media (max-width: 480px) {
        gap: 8px; /* 더 작은 화면에서는 간격 더 줄이기 */
    }
`

export const InputContainer =  styled.div`
    align-items: center;
    background-color: #ffffff;
    border: 0.7px solid;
    border-color: #bcbec0;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    height: 10px;
    overflow:hidden;
    padding: 16px;
    position: relative;
    width: 250px;
    transition: all 0.4s ease-in-out;
    user-select: none;
    @media (max-width: 768px) {
        padding: 12px; /* 작은 화면에서는 패딩 줄이기 */
        width: 200px; /* 작은 화면에서는 너비 줄이기 */
        
    }

    @media (max-width: 480px) {
        padding: 8px; /* 더 작은 화면에서는 패딩 더 줄이기 */
        width: 150px; /* 더 작은 화면에서는 너비 더 줄이기 */
        border-radius: 10px; /* 작은 화면에서는 둥근 모서리 감소 */
    }
`
export const StyledInput = styled.input`
    border: none; /* input의 기본 border 제거 */
    outline: none; /* input의 기본 outline 제거 */
    flex: 1;
`
export const ErrorMessage = styled.p`
    color: red;
    font-size: 12px; /* 폰트 크기를 줄이려면 이 값을 조정하세요 */
`;

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px; /* 요소들 간의 간격을 설정합니다 */
`;
const SignupButton = styled.button`
    background-color: #00ff0000;
    font-family: "Noto Sans KR";
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    height: 16px;
    line-height: normal;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: start;
    // 링크의 기본 밑줄 제거
    cursor: pointer;       // 마우스를 올렸을 때의 아이콘을 손가락 모양으로 변경
    border: 0px;
    /* 반응형 디자인 동일하게 적용 */
    @media (max-width: 768px) {
        font-size: 12px; 
    }

    @media (max-width: 480px) {
        font-size: 10px;
    }
`;

interface LoginInputProps {
    switchView: () => void;
}


const LoginInput: React.FC<LoginInputProps> = ({ switchView }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [sessionInfo, setSessionInfo] = useState<{
        sessionId: string;
        csrfToken: string;
    } | null>(null);
    const [storefrontForm, setStorefrontForm] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
        console.log('Email:', e.target.value);
    };

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log('Password:', e.target.value);
    };
    const isValidEmail = (email: string) => {
        // const emailPattern = /$/;
        // return emailPattern.test(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };


    const handleLogin = async () => {

        if (!isValidEmail(userId)) {
            setErrorMessage('올바른 이메일 형식을 입력하세요.');
            return;
        }

        // 비밀번호가 비어있지 않은지 확인
        if (!password) {
            setErrorMessage('비밀번호를 입력하세요.');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/storefront/login', {
                username: userId,
                password: password,
                saveCredentials: false
            });

            console.log('서버 응답:', response.data);  // 디버깅용

            if (response.data.result === 'update-credentials') {
                alert('최초 로그인 시 비밀번호 변경이 필요한 계정이거나, 비밀번호가 만료되었습니다.\n비밀번호 변경 페이지로 이동합니다.');
                setSessionInfo({
                    sessionId: response.data.sessionId,
                    csrfToken: response.data.csrfToken,
                })
                setStorefrontForm(response.data.xmlForm);
                setShowPasswordChange(true);
                return;
            }

            if (response.data.success) {

                // 토큰 저장
                const { accessToken, refreshToken } = response.data;

                await Promise.all([
                    localStorage.setItem('accessToken', accessToken),
                    localStorage.setItem('refreshToken', refreshToken)
                ]);

                // axios 기본 헤더 설정
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                // 약간의 지연 후 페이지 이동
                await new Promise(resolve => setTimeout(resolve, 500));

                // 페이지 이동
                navigate('/user/mainpage/dashboard');

            } else {
                setErrorMessage('로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('로그인 중 오류가 발생했습니다.');
        }

    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };

    const handlePasswordChangeSubmit = async (oldPassword: string, newPassword: string, confirmPassword: string) => {

        if (!sessionInfo) {
            setErrorMessage('세션이 만료되었습니다. 다시 로그인해주세요.');
            return;
        }

        try {
            const response = await axiosInstance.post('/api/storefront/change-password', {
                username: userId,
                oldPassword,
                newPassword,
                confirmPassword,
                // sessionId: sessionInfo.sessionId,
                // csrfToken: sessionInfo.csrfToken,
            });

            if (response.data.success) {
                setShowPasswordChange(false);
                // setSessionInfo(null);
                alert('비밀번호가 성공적으로 변경되었습니다.\n새로운 비밀번호로 다시 로그인해주세요.');
                setUserId('');
                setPassword('');
                setErrorMessage('');
                navigate('/');
            } else {
                setErrorMessage('비밀번호 변경에 실패했습니다.');
            }

        } catch (error) {
            console.error('Password change failed:', error);
            setErrorMessage('비밀번호 변경 중 오류가 발생했습니다.');
        }
    }


    return (
        <Container>
            {showPasswordChange && storefrontForm ? (
                <StoreFrontPasswordChangeForm
                    sessionInfo={sessionInfo}
                    xmlForm={storefrontForm}
                    onSuccess={() => {
                        setShowPasswordChange(false);
                        setSessionInfo(null)
                        setStorefrontForm(null);
                        alert('비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 다시 로그인해주세요.');
                        setUserId('');
                        setPassword('');
                    }}
                    onCancel={() => {
                        setShowPasswordChange(false);
                        setSessionInfo(null)
                        setStorefrontForm(null);
                    }}
                    />
            ) : (
            <FormContainer onSubmit={handleSubmit}>
                <MainLabel>Login</MainLabel>
                <Label>Email</Label>
                <InputContainer>
                    <StyledInput
                        type="email"
                        value={userId}
                        onChange={handleEmailChange}
                        placeholder="username@gmail.com"
                    />
                </InputContainer>
                <Label>Password</Label>
                <InputContainer>
                    <StyledInput
                        type="password"
                        value={password}
                        onChange={handlePasswordInputChange}
                        placeholder="Password"
                    />
                </InputContainer>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Label>Forgot Password?</Label>
                <SignInButton onClick={handleLogin} />
                <SignupButton onClick={switchView}>Don't have an account yet?</SignupButton>

            </FormContainer>
            )}
        </Container>
    );
};

export default LoginInput;


