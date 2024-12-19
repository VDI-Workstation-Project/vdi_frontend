import styled from 'styled-components';

const SideMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 12%;
    height: 100%;
    box-sizing : border-box;
    min-width: 240px;
    background-color: ${({ theme }) => theme.colors.sideMenuBackground};
    // box-shadow: 0.5px 0px 0px ${({ theme }) => theme.colors.borderColor};
    padding: 34px 40px 40px 40px;
    z-index: 2;
    @media (max-width: 800px) { /* 화면 크기가 800px 이하일 때 */
        display: none;
    }
`;

const SideMenuContainer1 = styled.div`
    flex-direction: column;
    width: 8%;
    min-width: 200px;
    height: 90%;
    display: flex;
    gap: 20px;
`
const SideMenuContainer2 = styled.div`
    flex-direction: column;
    min-width: 100%;
    flex :1;
   
    display: flex;
    color: ${({theme}) => theme.colors.label};
    width: 8%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    user-select: none;
    
    

`

export {SideMenuContainer,SideMenuContainer1,  SideMenuContainer2};