import React, {useState} from 'react';
import styled from "styled-components";
import { Label, InputContainer, StyledInput, ErrorMessage } from './LoginInput';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 100%; // 최대 너비 제한
`;

// 입력 필드와 유효성 메시지를 그룹화하는 컨테이너
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

// 유효성 메시지를 위한 고정 높이 컨테이너
const ValidationContainer = styled.div`
    min-height: 20px; // 메시지를 위한 고정 공간
    margin-top: 4px;
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

const ValidationMessage = styled.p<{ isValid: boolean }>`
    color: ${props => props.isValid ? '#4CAF50' : '#f44336'};
    font-size: 12px;
    margin: 0; // 마진 제거
    transition: all 0.3s ease;
`;
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
interface PasswordChangeFormProps {
    username: string;
    onSubmit: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
    onCancel: () => void;
    errorMessage?: string;  // 추가: 부모 컴포넌트에서 에러 메시지를 받음
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({ username, onSubmit, onCancel, errorMessage }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isTyping, setIsTyping] = useState(false);

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

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setIsTyping(true);

        if (value === '') {
            setError('');
        } else if (value === newPassword) {
            setError('비밀번호가 일치합니다.');
        } else {
            setError('비밀번호가 일치하지 않습니다.');
        }
    }

    return (
        <Container>
        <FormContainer onSubmit={handleSubmit}>
            <MainLabel>비밀번호 변경</MainLabel>

            {/* 백엔드 에러 메시지 표시 */}
            {errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}

            <InputGroup>
                <Label>사용자 이름</Label>
                <InputContainer>
                    <StyledInput value={username} disabled />
                </InputContainer>
            </InputGroup>

            <InputGroup>
                <Label>현재 비밀번호</Label>
                <InputContainer>
                    <StyledInput
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </InputContainer>
            </InputGroup>

            <InputGroup>
                <Label>새 비밀번호</Label>
                <InputContainer>
                    <StyledInput
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </InputContainer>
            </InputGroup>

            <InputGroup>
                <Label>새 비밀번호 확인</Label>
                <InputContainer>
                    <StyledInput
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        onBlur={() => setIsTyping(true)}
                    />
                </InputContainer>
                <ValidationContainer>
                    {isTyping && error && (
                        <ValidationMessage isValid={error === '비밀번호가 일치합니다.'}>
                            {error}
                        </ValidationMessage>
                    )}
                </ValidationContainer>
            </InputGroup>

            <ButtonContainer>
                <SubmitButton
                    type="submit"
                    disabled={error !== '비밀번호가 일치합니다.'}
                >
                    확인
                </SubmitButton>
                <CancelButton type="button" onClick={onCancel}>
                    취소
                </CancelButton>
            </ButtonContainer>
        </FormContainer>
        </Container>
    );
};

export default PasswordChangeForm;