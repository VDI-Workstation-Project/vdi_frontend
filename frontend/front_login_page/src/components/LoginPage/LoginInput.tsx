
import styled from "styled-components";
import {SignInButton} from "../../assets/button/button.tsx";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";

const Label = styled.label`
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

const InputContainer =  styled.div`
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
const StyledInput = styled.input`
    border: none; /* input의 기본 border 제거 */
    outline: none; /* input의 기본 outline 제거 */
    flex: 1;
`
const ErrorMessage = styled.p`
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
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
        console.log('Email:', e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        console.log('Password:', e.target.value);
    };
    const isValidEmail = (email: string) => {
        const emailPattern = /$/;
        return emailPattern.test(email);
    };


    const handleLogin = () => {

        if (!isValidEmail(userId)) {
            setErrorMessage('올바른 이메일 형식을 입력하세요.');
            return;
        }

        // 비밀번호가 비어있지 않은지 확인
        if (!password) {
            setErrorMessage('비밀번호를 입력하세요.');
            return;
        }

        const currentTime = new Date().toISOString();

        const requestBody = {
            userId: userId,
            password: password,
            logInAttemptTime: currentTime,
        }
        // console.log('로그인 요청', { email, password });
        //
        // // 모의 로그인 검증
        // if (email === 'dh2359' && password === 'qw12qw12qw!@') {
        //     console.log('로그인 성공');
        //     navigate('/user/dashboard'); // 로그인 성공 시 대시보드로 이동
        // } else {
        //     setErrorMessage('로그인에 실패했습니다.');
        //     console.error('Invalid login credentials');
        // }
            axios.post('http://localhost:8081/login', requestBody)
                .then(function (res) {
                    if (res.status === 200) {
                        const data = res.data;
                        localStorage.setItem('token', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        navigate('/user/mainpage/dashboard');
                    } else {
                        alert('비정상 응답')
                    }
                })
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

    };
    // const handleLogin = () => {
    //     // 로그인 로직 추가
    //     console.log('로그인 요청', { email, password });
    //     // 예: fetch API로 로그인 요청 보내기
    //     fetch('https://example.com/api/login', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email, password })
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log('로그인 성공:', data);
    //             if (data.success) {
    //                 navigate(
    //                     'dashboard',)
    //             } else {
    //                 console.error('Invalid login credentials');
    //             }
    //         })
    //
    //         .catch(error => {
    //             console.error('로그인 실패:', error);
    //             // 로그인 실패 후 로직 추가
    //         });
    // };


    return (
        <Container>
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
                        onChange={handlePasswordChange}
                        placeholder="Password"
                    />
                </InputContainer>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <Label>Forgot Password?</Label>
                <SignInButton onClick={handleLogin} />
                <SignupButton onClick={switchView}>Don't have an account yet?</SignupButton>

            </FormContainer>
        </Container>
    );
};

export default LoginInput;


