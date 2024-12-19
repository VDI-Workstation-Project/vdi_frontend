import styled from 'styled-components';

const NotificationPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
 
    height: 90%;
    min-width: 10%;
    background-color: ${({ theme }) => theme.colors.sideMenuBackground};

    z-index: 2;
    @media (max-width: 2000px) { 
        display: none;
    }
    
`;


export {NotificationPanelContainer};