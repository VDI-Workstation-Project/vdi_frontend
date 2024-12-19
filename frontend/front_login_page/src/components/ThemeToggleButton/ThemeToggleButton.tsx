import React from 'react';
import styled from 'styled-components';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa'

const Button = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.label}; // 아이콘 색상
    
    &:hover {
        color: ${({ theme }) => theme.colors.label}; // 호버 시 아이콘 색상 변경
    }
`;

interface ThemeToggleButtonProps {
    toggleTheme: () => void;
    isDarkMode: boolean;
}

const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ toggleTheme, isDarkMode }) => {
    return (
        <Button onClick={toggleTheme}>
            {isDarkMode ? <FaToggleOn size={30} /> : <FaToggleOff size={30} />}
        </Button>
    );
};

export default ThemeToggleButton;
export type { ThemeToggleButtonProps };