import styled from 'styled-components';

import MenuItem from "./MenuItemContainer.tsx";
import {useState} from "react";
import {FaQuestion,FaUserFriends, FaComment, FaArchway , FaFolderOpen, FaBullhorn, FaUserCircle } from "react-icons/fa";
import SubMenuContainer  from "./SubMenu.tsx";

const MenuItems = styled.div`
    padding: 10px 20px;
    color: ${({ theme }) => theme.colors.menuItemColor};
    border-radius: 4px;
    flex-direction: column;
    gap: 14px;
`;

const MenuItemsGroup = () =>{
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const handleMenuClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return(
        <MenuItems>
            <MenuItem hasSubMenu={false} icon={<FaArchway />} text="Main Page"  />
            <MenuItem hasSubMenu={false} icon={<FaBullhorn />} text="Notice"   />
            <MenuItem hasSubMenu={false} icon={<FaComment />} text="Chat"  />
            <MenuItem hasSubMenu={false} icon={<FaUserFriends />} text="Social"  />
            <MenuItem hasSubMenu={true} icon={<FaUserCircle />} text="My Page"  isClicked={openIndex === 3} onClick={() => handleMenuClick(3)} />
            {openIndex === 3 && (
                <SubMenuContainer>
                    <MenuItem hasSubMenu={false}  text="My Desktops"/>
                    <MenuItem hasSubMenu={false}  text="My Profile"/>
                    <MenuItem hasSubMenu={false}  text="Settings"/>
                </SubMenuContainer>
            )}
            <MenuItem hasSubMenu={false} icon={<FaFolderOpen />} text="Webdrive"  />
            <MenuItem hasSubMenu={false} icon={<FaQuestion />} text="1:1 Questions"  />
        </MenuItems>
    );
};
export default MenuItemsGroup;