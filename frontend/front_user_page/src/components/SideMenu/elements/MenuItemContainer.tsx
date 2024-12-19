import styled, {css, keyframes} from 'styled-components';


interface MenuItemProps {
    hasSubMenu?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
}

export const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;


const MenuItemContainer = styled.div<MenuItemProps>`
    height: 36px;
    display: flex;
    padding-left: 21px;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.menuItemColor};
    border-radius: 10px;
    transition: background-color 0.1s ease, font-weight 0.1s ease;
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
`;


export {
    MenuItemContainer
};
export type { MenuItemProps };
