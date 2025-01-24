import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
`;

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    color: black;
`;

const Label = styled.label`
    color: white;
    font-size: 14px;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background: #4CAF50;
    color: white;
    cursor: pointer;
    &:hover {
        background: #45a049;
    }
`;

const ErrorText = styled.p`
    color: #ff6b6b;
    font-size: 14px;
`;

interface CitrixPasswordChangeFormProps {
    sessionInfo: {
        sessionId: string;
        csrfToken: string;
    } | null;
    xmlForm: string;
    onSuccess: () => void;
    onCancel: () => void;
}

const CitrixPasswordChangeForm: React.FC<CitrixPasswordChangeFormProps> = ({   sessionInfo,
                                                                               xmlForm,
                                                                               onSuccess,
                                                                               onCancel
                                                                           }) => {
    const [formFields, setFormFields] = useState<Array<{
        id: string;
        label: string;
        type: string;
        value: string;
        readonly: boolean;
    }>>([]);
    const [error, setError] = useState('');
    const [postBackUrl, setPostBackUrl] = useState('');

    useEffect(() => {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlForm, "text/xml");

            // PostBack URL 추출
            const postBack = xmlDoc.querySelector("PostBack")?.textContent;
            if (postBack) setPostBackUrl(postBack);

            // 필드 정보 추출
            const requirements = xmlDoc.getElementsByTagName("Requirement");
            const fields = Array.from(requirements).map(req => {
                const id = req.querySelector("Credential ID")?.textContent || '';
                const label = req.querySelector("Label Text")?.textContent || '';
                const type = req.querySelector("Credential Type")?.textContent || '';
                const initialValue = req.querySelector("Input Text InitialValue")?.textContent || '';
                const readonly = req.querySelector("Input Text ReadOnly")?.textContent === 'true';

                return {
                    id,
                    label,
                    type: type === 'password' ? 'password' : 'text',
                    value: initialValue,
                    readonly
                };
            }).filter(field => field.id && field.id !== 'changePasswordBtn');

            setFormFields(fields);
        } catch (error) {
            console.error('XML 파싱 에러:', error);
            setError('폼을 로드하는 중 오류가 발생했습니다.');
        }
    }, [xmlForm]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = formFields.reduce((acc, field) => ({
                ...acc,
                [field.id]: field.value
            }), {});

            // Citrix 서버로 직접 요청
            const response = await fetch(`http://192.168.111.151/Citrix/hmstoreWeb/${postBackUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Csrf-Token': sessionInfo?.csrfToken || '',
                    'X-Citrix-IsUsingHTTPS': 'No'
                },
                body: new URLSearchParams({
                    ...formData,
                    changePasswordBtn: 'OK'
                }).toString()
            });

            if (response.ok) {
                onSuccess();
            } else {
                setError('비밀번호 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('제출 에러:', error);
            setError('요청 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <FormContainer onSubmit={handleSubmit}>
            {formFields.map(field => (
                <div key={field.id}>
                    <Label>{field.label}</Label>
                    <Input
                        type={field.type}
                        value={field.value}
                        onChange={e => {
                            const newFields = formFields.map(f =>
                                f.id === field.id ? { ...f, value: e.target.value } : f
                            );
                            setFormFields(newFields);
                        }}
                        readOnly={field.readonly}
                    />
                </div>
            ))}
            {error && <ErrorText>{error}</ErrorText>}
            <div>
                <Button type="submit">확인</Button>
                <Button type="button" onClick={onCancel}>취소</Button>
            </div>
        </FormContainer>
    );
};

export default CitrixPasswordChangeForm;