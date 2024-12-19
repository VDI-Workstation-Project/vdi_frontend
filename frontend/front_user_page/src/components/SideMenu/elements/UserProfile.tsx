import React from 'react';
import styled from 'styled-components';
import profile_image from '../../../assets/profile/image/rupy.webp'
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    &:hover {
        
    }
`;
const ProfileImage = styled.img`
    width: 24px;   // 이미지의 너비
    height: 24px;  // 이미지의 높이
    border-radius: 50%;  // 이미지를 원형으로 만듦
    border: 3px solid ${({ theme }) => theme.colors.pointColor};
    object-fit: cover;   // 이미지의 내용이 끊기지 않게 조절함
    font-family: "Noto Sans KR", Midiume;
`;
const UserName = styled.text`
    margin-left: 10px;
    color: ${({ theme }) => theme.colors.label};
    font-family: 'NotoSansKR';
    
    font-size: 14px;
`;
const UserProfile: React.FC = () => {
    return (
        <ProfileContainer>
            <ProfileImage src={profile_image} alt="User Profile" />
            <UserName>조형래 대리</UserName>

        </ProfileContainer>
    );
};
export default UserProfile;