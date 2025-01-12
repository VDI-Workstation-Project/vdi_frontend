import React, {useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { lightTheme, darkTheme } from "./styles/Color/theme.tsx";
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import UserApp from '../../front_user_page/src/UserApp';

const App: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // 다크 모드가 한 번이라도 적용되면 변경되지 않도록 함
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    useEffect(() => {
        // 현재 테마 상태를 저장함
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} />
                    <Route path="/user/*" element={<UserApp />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};


export default App;