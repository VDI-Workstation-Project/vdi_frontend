import styled from 'styled-components';

const NotificationPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    height: 70%;
    min-width: 10%;
    background-color: ${({ theme }) => theme.colors.sideMenuBackground};
    padding: 0 40px 40px 40px;
    z-index: 2;
    @media (max-width: 1750px) { /* 화면 크기가 600px 이하일 때 */
        display: none;
    }
    
`;


export {NotificationPanelContainer};