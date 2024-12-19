import styled from 'styled-components';


const SideMenuContainer = styled.div<{ visible: boolean }>`
    position: fixed;
    left: ${({ visible }) => (visible ? '0' : '-100%')};
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    width: 12%;
    height: 100%;
    box-sizing : border-box;
    min-width: 240px;
    background-color: ${({ theme }) => theme.colors.background};
    // box-shadow: 0.5px 0px 0px ${({ theme }) => theme.colors.borderColor};
    padding: 20px 40px 40px 40px;
    z-index: 3;
    transition: left 0.3s ease-in-out;
    
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
const MenuButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3;
  padding: 10px;
    border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.backgroundfliped};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
`;
const CloseButton = styled.button`
  display: flex;
  align-self: flex-end;
    padding-bottom: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  
  color: ${({ theme }) => theme.colors.label};
`;



export {SideMenuContainer,SideMenuContainer1,  SideMenuContainer2, MenuButton, CloseButton};