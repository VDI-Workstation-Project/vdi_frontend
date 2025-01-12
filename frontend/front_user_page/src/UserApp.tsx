import React, {useEffect, useState} from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route} from 'react-router-dom';
import { lightTheme, darkTheme } from "./styles/Color/theme.tsx";
import {Dashboard} from "./pages/Dashboard/Dashboard.tsx";
import {useAuth} from "./components/auth/useAuth.tsx";




const UserApp: React.FC = () => {
    useAuth();

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // localStorage에서 테마를 불러와 적용
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        setIsDarkMode(newIsDarkMode);
        localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    };
    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

                <Routes>
                    <Route path="/mainpage/*" element={<Dashboard toggleTheme={toggleTheme} isDarkMode={isDarkMode} />} >
                    </Route>

                </Routes>

        </ThemeProvider>
    );
};


export default UserApp;