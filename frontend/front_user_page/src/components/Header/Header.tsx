import React from 'react';
import styled from 'styled-components';
import { Logo } from "../../assets/logo/logo.tsx";
import { FaAlignJustify  } from 'react-icons/fa';
import ThemeToggleButton, {ThemeToggleButtonProps} from "../ThemeToggleButton/ThemeToggleButton.tsx";
import {useLogout} from "../../API/Logout.tsx";


const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: end;
    width: 100%;
    min-height:50px;
    height: 40px;
    padding: 0 0px 2px 0px;
    background-color: ${({ theme }) => theme.colors.headerBackground};
    box-shadow: 0px 1px 0px ${({ theme }) => theme.colors.borderColor};
    z-index: 2
`;
const HeaderMenuIconContainer = styled.div`
    user-select: none;
    cursor: pointer;
    display: none; /* 숨김 처리 */
    font-size: 30px;
    align-content:start;
    padding: 8px 0 0 0;
    
    color: ${({ theme }) => theme.colors.mainColor};
    @media (max-width: 800px) {
        display: block; /* 화면 크기가 600px 이하일 때 나타나게 설정 */
    }
`
const HeaderSubContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    box-sizing : border-box;
    height: 100%;
    width: 150px;
    padding: 0px 20px 0px 0px;
    background-color: ${({ theme }) => theme.colors.headerBackground};
    gap: 10px;
    z-index: 2
`;
const LogoutButton = styled.button`
    
    padding: 10px 20px;
    height: 40px;
    flex-direction: row;
    gap: 6px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.colors};
    background-color: ${({ theme }) => theme.colors.background};
    user-select: none;
    border: 0px solid ${({ theme }) => theme.colors.borderColor};
    display: flex;
    align-items: center;
    justify-content: center;
`;



const Header: React.FC<ThemeToggleButtonProps> = ({ toggleTheme,isDarkMode })  => {

    const { logout } = useLogout();

    const handleLogout = async () => {
        // 확인 다이얼로그 표시
        const isConfirmed = window.confirm('로그아웃 하시겠습니까?');

        // 사용자가 확인을 클릭한 경우에만 로그아웃 실행
        if (isConfirmed) {
            await logout();
        }
    }

    return (
        <HeaderContainer>
            <Logo text="WORKSPACE" />
            <HeaderSubContainer>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <HeaderMenuIconContainer>
                    <FaAlignJustify size={34} />
                </HeaderMenuIconContainer>
            </HeaderSubContainer>
        </HeaderContainer>
    );
};

export default Header;