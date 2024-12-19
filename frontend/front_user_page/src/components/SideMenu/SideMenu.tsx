
import {SideMenuContainer, SideMenuContainer1, SideMenuContainer2} from './elements/SideMenuContainer.tsx';

import UserProfile from './elements/UserProfile.tsx';
import MenuItemsGroup from "./elements/MenuItems/MenuItemsGroup.tsx";
import StyledComponent from "./elements/FORMenu/FORContainer.tsx";

import React from "react";




const SideMenu: React.FC = () => {


    return (
        <SideMenuContainer>
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