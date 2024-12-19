import React from 'react';
import styled from 'styled-components';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.backgroundfliped};
    border: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 30px;
    padding: 10px 20px;
    height: 40px;
    flex-direction: row;
    gap: 6px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.background};
    font-family: ${({ theme }) => theme.fonts.medium};
    user-select: none;
    &:hover {
        background-color: ${({ theme }) => theme.colors.borderColor};
        color: ${({ theme }) => theme.colors.label};
    }

    display: flex;
    align-items: center;
    justify-content: center;
`;

interface ThemeToggleButtonProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ toggleTheme, isDarkMode }) => {
    return (
        <Button onClick={toggleTheme}>
            {isDarkMode ? "DarkMode" :"LightMode"}
            {isDarkMode ? <FaToggleOff size={18} /> :<FaToggleOn size={18}/>}
        </Button>
    );
};

export default ThemeToggleButton;
export type { ThemeToggleButtonProps };