import React, {useState} from 'react';
import styled from "styled-components";
import { Label, InputContainer, StyledInput, ErrorMessage } from './LoginInput';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const MainLabel = styled.label`
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 5px;
    font-family: "Noto Sans KR";
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
        padding: 8px 16px;
        font-size: 12px;
    }
`;

const SubmitButton = styled(Button)`
    background-color: #4CAF50;
    color: white;
    border: none;
    &:hover {
        background-color: #45a049;
    }
`;

const CancelButton = styled(Button)`
    background-color: #f44336;
    color: white;
    border: none;
    &:hover {
        background-color: #da190b;
    }
`;

interface PasswordChangeFormProps {
    username: string;
    onSubmit: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
    onCancel: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ username, onSubmit, onCancel }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await onSubmit(oldPassword, newPassword, confirmPassword);
        } catch (error) {
            setError('비밀번호 변경 중 오류가 발생했습니다.');
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            <MainLabel>비밀번호 변경</MainLabel>
            <Label>사용자 이름</Label>
            <InputContainer>
                <StyledInput value={username} disabled />
            </InputContainer>
            <Label>현재 비밀번호</Label>
            <InputContainer>
                <StyledInput
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </InputContainer>
            <Label>새 비밀번호</Label>
            <InputContainer>
                <StyledInput
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </InputContainer>
            <Label>새 비밀번호 확인</Label>
            <InputContainer>
                <StyledInput
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </InputContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <ButtonContainer>
                <SubmitButton type="submit">확인</SubmitButton>
                <CancelButton type="button" onClick={onCancel}>취소</CancelButton>
            </ButtonContainer>
        </FormContainer>
    );
};

export default PasswordChangeForm;