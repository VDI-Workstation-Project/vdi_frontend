
import GlobalStyle from "../../styles/Color/GlobalStyle.tsx";
import Header from '../../components/Header/Header';
import {ThemeToggleButtonProps} from "../../components/ThemeToggleButton/ThemeToggleButton.tsx";
import styled from "styled-components";
import SideMenu from "../../components/SideMenu/SideMenu.tsx";
import {ContentArea} from "./MainPage/ContentArea.tsx";
import React from "react";
import NotificationPanel from "../../components/NotificationPanel/NotificationPanel.tsx";
import {useStoreFrontResources} from "../../API/DesktopApi.tsx";



const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    width: 100%;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: start;
    align-content: start;
    height: 100%;
`;



export const Dashboard: React.FC<ThemeToggleButtonProps> = ({ toggleTheme,isDarkMode }) => {
    const {  loading, error } = useStoreFrontResources();
    return (
        <>
            <GlobalStyle />
            <DashboardContainer>
                <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
                <ContentContainer>
                    <SideMenu/>
                    <ContentArea>
                        {loading && <div>Loading...</div>}
                        {error && <div>Error loading resources</div>}

                    </ContentArea>
                    <NotificationPanel/>
                </ContentContainer>
            </DashboardContainer>
        </>
    )
}