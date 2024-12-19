import styled from 'styled-components';
import { fadeIn, MenuItemContainer } from './MenuItemContainer.tsx';

const SubMenu = styled.div`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    padding-left: 20px;
    
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 4px;
    ${MenuItemContainer} {
        
        padding: 8px 16px;
        opacity: 0;
        animation: ${fadeIn} 0.8s ease-out forwards;
    }
`;
const SubMenuContainer = styled.div`
    
    padding-left: 32px;
    margin: 0;
    max-height: 500px;
    overflow: hidden;
    transition: max-height 0.6s ease-out;
`;

export {SubMenu, SubMenuContainer};