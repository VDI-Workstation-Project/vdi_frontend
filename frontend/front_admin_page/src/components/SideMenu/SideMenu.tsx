
import {SideMenuContainer, SideMenuContainer1, SideMenuContainer2, CloseButton} from './elements/SideMenuContainer.tsx';
import UserProfile from './elements/UserProfile.tsx';
import MenuItemsGroup from "./elements/MenuItems/MenuItemsGroup.tsx";
import StyledComponent from "./elements/FORMenu/FORContainer.tsx";
interface SideMenuProps {
    menuVisible: boolean;
    toggleMenu: () => void;
}
const SideMenu: React.FC<SideMenuProps>  =({menuVisible, toggleMenu}) =>{
    return (
        <SideMenuContainer visible={menuVisible}>
            <CloseButton onClick={toggleMenu}>×</CloseButton>
            <SideMenuContainer1>
                <UserProfile/>
                <StyledComponent/>
                <MenuItemsGroup>
                </MenuItemsGroup>
            </SideMenuContainer1>
            <SideMenuContainer2>
                    HMCloud
            </SideMenuContainer2>
        </SideMenuContainer>
    );
};
export default SideMenu;