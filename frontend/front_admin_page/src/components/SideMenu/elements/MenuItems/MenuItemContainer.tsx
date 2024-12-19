import styled, {css} from 'styled-components';
import React, {useState} from "react";
import { FaAngleRight } from "react-icons/fa";

interface MenuItemProps {
    hasSubMenu?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
    icon?: React.ReactElement;
    text: string;
    isClicked?: boolean;
}

const MenuIconContainer = styled.div`
    margin-bottom: 2px;
    padding-right: 6px;
    width: 16px;
    height: 16px;
    object-fit: cover;
`;
const MenuItemContainer = styled.div<MenuItemProps >`
    height: 36px;
    display: flex;
    padding-left: 21px;
    user-select: none;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.label};
    border-radius: 10px;
    transition: background-color 0.3s ease, font-weight 0.3s ease;
    font-size: 13px;
   
    font-family: NotoSansKR;
    &:hover {
        background-color: ${({ theme }) => theme.colors.menuItemHoverBackground};
        font-weight: bold;
        color: ${({ theme }) => theme.colors.hoverColor};
    }
    svg {
        margin-top: 4px;
        padding-right: 8px;
    }
    ${({ hasSubMenu}) =>
            hasSubMenu &&
            css`padding-left: 0px;
                
    `}
   
    }
`;

const AngleRightIcon = styled(FaAngleRight)<{ isClicked: boolean }>`
    margin-bottom: 2px;
    padding-right: 8px;
    
    transition: transform 0.3s ease;
    transform-origin: initial; /* 아이콘 중앙을 기준으로 회전 */
    ${({ isClicked }) => isClicked && css`
     
      
        transform: rotate(90deg);
    `}
`;


const MenuItem: React.FC<MenuItemProps> = ({ hasSubMenu, onClick, icon, text }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
        if (onClick) onClick();
    };

    return (
        <MenuItemContainer icon={icon} text={text} hasSubMenu={hasSubMenu} onClick={handleClick} isClicked={isClicked}>
            {hasSubMenu && <AngleRightIcon isClicked={isClicked} />}
            {icon && <MenuIconContainer>{icon}</MenuIconContainer>}
            {text}
        </MenuItemContainer>
    );
};
export default MenuItem;
export type { MenuItemProps };
