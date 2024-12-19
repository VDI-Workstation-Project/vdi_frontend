import styled from 'styled-components';

import {MenuItemContainer, MenuItemProps} from "./MenuItemContainer.tsx";
import React, {useState} from "react";
import { FaAngleRight, FaArchway , FaFolderOpen, FaVolumeUp, FaUserCircle } from "react-icons/fa";
import { SubMenu, SubMenuContainer } from "./SubMenu.tsx";

const MenuIconContainer = styled.div`

    margin-bottom: 2px;
    padding-right: 6px;
    width: 16px;
    height: 16px;
    object-fit: cover;
    
`;

const MainPageMenuItem: React.FC<MenuItemProps> = ({ hasSubMenu,  onClick }) => (
    <MenuItemContainer hasSubMenu={hasSubMenu}  onClick={onClick}>
        <MenuIconContainer>
            <FaArchway />
        </MenuIconContainer>
        Main Page
    </MenuItemContainer>
);
const NoticeMenuItem: React.FC<MenuItemProps> = ({hasSubMenu, onClick }) => (
    <MenuItemContainer hasSubMenu={hasSubMenu}  onClick={onClick}>
        {hasSubMenu && <FaAngleRight />}
        <MenuIconContainer>
            <FaVolumeUp />
        </MenuIconContainer>
        Notice
    </MenuItemContainer>
);
const WebdriveMenuItem: React.FC<MenuItemProps> = ({hasSubMenu, onClick }) => (
    <MenuItemContainer hasSubMenu={hasSubMenu}  onClick={onClick}>
        {hasSubMenu && <FaAngleRight />}
        <MenuIconContainer>
            <FaFolderOpen/>
        </MenuIconContainer>
        Webdrive
    </MenuItemContainer>
);
const MypageMenuItem: React.FC<MenuItemProps> = ({hasSubMenu, isOpen, onClick }) => (
    <MenuItemContainer hasSubMenu={hasSubMenu} isOpen={isOpen} onClick={onClick}>
        {hasSubMenu && <FaAngleRight />}
        <MenuIconContainer>
            <FaUserCircle/>
        </MenuIconContainer>
        My Page
    </MenuItemContainer>
);




const MenuItems = styled.div`
    padding: 10px 20px;
    color: ${({ theme }) => theme.colors.menuItemColor};
    border-radius: 4px;
    flex-direction: column;
    gap: 6px;
`;

const MenuItemsGroup = () =>{
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleMenuClick = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };
    return(

        <MenuItems>
            <MainPageMenuItem hasSubMenu = {false}  onClick={() => handleMenuClick(0)} />
            <NoticeMenuItem hasSubMenu = {false}  onClick={() => handleMenuClick(1)} />
            <WebdriveMenuItem hasSubMenu = {false} onClick={() => handleMenuClick(2)} />
            <MypageMenuItem hasSubMenu = {true} isOpen={openIndex === 3} onClick={() => handleMenuClick(3)}>
            </MypageMenuItem>
            {openIndex === 3 && <SubMenuContainer>
                <SubMenu>
                    완성
                </SubMenu>
            </SubMenuContainer>}
            <WebdriveMenuItem hasSubMenu = {false} onClick={() => handleMenuClick(2)} />
        </MenuItems>
    );
};
export default MenuItemsGroup;