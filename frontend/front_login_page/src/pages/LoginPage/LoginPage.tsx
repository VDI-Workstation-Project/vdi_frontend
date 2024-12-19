import React, {useState} from 'react';

import { Logo } from "../../components/Logo/logo.tsx";
import GlobalStyle from "../../styles/Color/GlobalStyle.tsx";
import styled from "styled-components";
import LoginInput from '../../components/LoginPage/LoginInput.tsx';
import SignUpInput from "../../components/LoginPage/SignUpInput.tsx";
import ThemeToggleButton from "../../components/ThemeToggleButton/ThemeToggleButton.tsx";


const Background = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    background: ${({ theme }) => theme.colors.mainColorGradient};
    border-radius: 24px;
    height: 756px;
    overflow: hidden;
    position: relative;
    width: 908px;
    flex-direction: column;
    gap:60px;
    transition: width 0.6s ease;
    @media (max-width: 908px) {
        width: 100%;
        border-radius: 0px;
}
    
`


const LoginFormFrame = styled.div`
    align-items: center;
    background-color: #7cacf433;
    border: 2.13px solid;
    border-color: transparent;
    border-radius: 28.46px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    overflow: hidden;
    padding: 40px 80px;
    transition: width 0.6s ease-in-out;
    @media (max-width: 768px) {
        width: 100%;  // 작은 화면에서는 너비를 더 크게 설정
        border-radius: 0px;
        
    }
    `
interface LoginBaseProps {
    toggleTheme: () => void;
    isDarkMode: boolean;

}


export const LoginPage: React.FC<LoginBaseProps> = ({ toggleTheme,isDarkMode }) => {
    const [view, setView] = useState('login'); // 'login' 또는 'signup'

    const switchToSignUp = () => {
        setView('signup');
    };
    const switchToLogin = () => {
        setView('login');
    };

    return (
        <>
            <GlobalStyle />
            <Background>

                <Logo />
                <LoginFormFrame>
                    {view === 'login'
                        ? <LoginInput switchView={switchToSignUp} />
                        : <SignUpInput switchView={switchToLogin} />
                    }
                </LoginFormFrame>
                <ThemeToggleButton toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

            </Background>
        </>
    )
}