import styled from "styled-components";
import logo_image from "../../assets/logo/hmlogo_white.png";

const LogoImage = styled.img`
    height: 53px;
    width: 104px;
    transition: all 0.4s ease-in-out;
    @media (max-width: 768px) {
        height: 40px;  // 작은 화면에서는 로고 크기를 줄임
        width: 80px;
    }
`;

const LogoText = styled.div`
    color: #ffffff;
    font-family: "Segoe UI-Black", Helvetica;
    font-size: 34px;
    font-weight: 900;
    margin-top: 15px;
    transition: all 0.4s ease-in-out;
    @media (max-width: 768px) {
        font-size: 24px;  // 작은 화면에서는 폰트 크기를 줄임
        align-self: center;  // 중앙 정렬
    }
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: flex-end;// 사용자가 원하는 위치에 배치할 수 있도록 position을 absolute로 설정
    gap: 10px;
    flex-direction: row;
    transition: all 0.4s ease-in-out;
    user-select: none;
    @media (max-width: 768px) {
        margin-bottom: -20px;
    }
`;

export const Logo = () => {
    return (
        <LogoContainer>
            <LogoImage src={logo_image} alt="Logo" />
            <LogoText>WORKSPACE</LogoText>
        </LogoContainer>


    )
}