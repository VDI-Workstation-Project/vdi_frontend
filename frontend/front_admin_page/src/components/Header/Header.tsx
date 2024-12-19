import React, {useState} from 'react';
import styled from 'styled-components';
import { Logo } from "../../assets/logo/logo.tsx";
import { FaAlignJustify  } from 'react-icons/fa';
import ThemeToggleButton, {ThemeToggleButtonProps} from "../ThemeToggleButton/ThemeToggleButton.tsx";
import SideMenu from '../SideMenu/SideMenu.tsx';

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
    z-index: 2;
`;
const HeaderMenuIconContainer = styled.div`
    user-select: none;
    cursor: pointer;
    display: flex; /* 숨김 처리 */
    font-size: 30px;
    align-content:start;
    padding: 8px 0 0 0;
    z-index: 1;
    color: ${({ theme }) => theme.colors.mainColor};
`
const HeaderSubContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-sizing : border-box;
    height: 100%;
    width: 5%;
    padding: 0px 20px 0px 0px;
    background-color: ${({ theme }) => theme.colors.headerBackground};
    gap: 10px;
    z-index: 1;
    
`;


const Header: React.FC<ThemeToggleButtonProps> = ({ toggleTheme,isDarkMode })  => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(prevVisible => !prevVisible);
    };

    return (
        <HeaderContainer>

            <SideMenu toggleMenu={toggleMenu} menuVisible={menuVisible}/>
            <HeaderSubContainer>

                <HeaderMenuIconContainer
                    onClick={toggleMenu}>
                    <FaAlignJustify size={34}/>
                </HeaderMenuIconContainer>
            </HeaderSubContainer >
            <HeaderSubContainer style = {{width: '10%'}}>
                <Logo/>
            </HeaderSubContainer>
            <HeaderSubContainer style = {{width: '8%'}} >
                <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode}/>
            </HeaderSubContainer>


        </HeaderContainer>
    );
};

export default Header;