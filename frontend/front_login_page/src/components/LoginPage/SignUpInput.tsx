import styled from "styled-components";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {SignUpButton} from "../../assets/button/SignupButton.tsx";
import {BackButton} from "../../assets/button/BackButton.tsx";

// 기존에 사용하던 styled components를 재사용합니다.

// MainLabel, Label, Container, InputContainer, StyledInput, ErrorMessage, FormContainer
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
interface SignUpInputProps {
    switchView: () => void;
}
const SignUpInput: React.FC<SignUpInputProps> = ({ switchView }) => {
    const [userId, setUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    };

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleRegister = async () => {
        setErrorMessage('');
        // 서버와 통신하여 회원가입 요청을 보냅니다.
        try {
            const response = await axios.post('http://localhost:8081/createAccount', {
                userId,
                firstName,
                lastName,
                phoneNumber,
            });
            console.log('회원가입 요청 성공:', response.data);
            navigate('/');  // 가입 후 로그인 페이지로 리다이렉트
        } catch (error) {
            console.error('회원가입 요청 실패:', error);
            setErrorMessage('회원가입 요청에 실패했습니다.');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister();
    };

    return (
        <Container>
            <FormContainer onSubmit={handleSubmit}>
                <MainLabel>Register</MainLabel>
                <Label>UserId</Label>
                <InputContainer>
                    <StyledInput
                        type="text"
                        value={userId}
                        onChange={handleUserIdChange}
                        placeholder="UserId"
                    />
                </InputContainer>
                <Label>First Name</Label>
                <InputContainer>
                    <StyledInput
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="First Name"
                    />
                </InputContainer>
                <Label>Last Name</Label>
                <InputContainer>
                    <StyledInput
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        placeholder="Last Name"
                    />
                </InputContainer>
                <Label>PhoneNumber</Label>
                <InputContainer>
                    <StyledInput
                        type="PhoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="PhoneNumber"
                    />
                </InputContainer>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <SignUpButton onClick={handleSubmit} />
                <BackButton onClick={switchView}></BackButton>
            </FormContainer>
        </Container>
    );
};

export default SignUpInput;