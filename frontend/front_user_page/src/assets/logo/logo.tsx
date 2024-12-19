import styled from "styled-components";
import React from "react";

import LightLogo from "../../assets/logo/logo_images/hmlogo_green.png";
import {useNavigate} from "react-router-dom";


const DesktopOsImageWrapper: React.FC = () => {
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault(); // 컨텍스트 메뉴 방지 (오른쪽 클릭 방지)
    };

    const handleDragStart = (event: React.DragEvent) => {
        event.preventDefault(); // 드래그 방지
    };

    // 사용할 이미지 경로를 설정


    return (
        <LogoImage
            src={LightLogo}
            alt="os-image"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
        />
    );
};
const LogoImage = styled.img`
    height: 35px;
    width: 60px;
    
    
    
`;

const LogoText = styled.div`
    color: ${({ theme }) => theme.colors.mainColor};
    font-family: "Segoe UI-Black", Helvetica;
    font-size: 20px;
    font-weight: 900;
    margin-top: 12px;
   

    }
`;
const LogoContainer = styled.div`
    box-sizing : border-box;
    display: flex;
    justify-content: flex-end;// 사용자가 원하는 위치에 배치할 수 있도록 position을 absolute로 설정
    gap: 5px;
    flex-direction: row;
    padding: 10px 10px 10px 20px;
    cursor: pointer;
    user-select: none;
    
`;
interface LogoProps {
    isDarkMode?: boolean;
    text?: string;
}
export const Logo: React.FC<LogoProps> = (text) => {
    const navigate = useNavigate();
    const onClicke = () => {
        navigate("/user/mainpage/dashboard");
    }
    return (
        <LogoContainer onClick={onClicke}>
            <DesktopOsImageWrapper/>
            <LogoText>{text.text}</LogoText>
        </LogoContainer>
    )
}