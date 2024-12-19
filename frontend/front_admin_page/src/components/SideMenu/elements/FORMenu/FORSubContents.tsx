import styled, {css} from "styled-components";
import React from "react";
const Box = styled.div<{ isClicked: boolean }>`
    padding-left: 10px;
    height: 10px;
    display: flex;
    user-select: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.label};
    transition: background-color 0.3s ease, font-weight 0.3s ease;
    font-size: 13px;
    font-family: NotoSansKR;
    font-weight: normal;    
    ${({ isClicked }) =>
            isClicked &&
            css`
            font-weight: bolder;
        `
    }
    &:hover {
       
        font-weight: bold;
        
    }
    svg{
        color:${({ theme }) => theme.colors.pointColor};
        padding-top: 2.5px;
        padding-right: 8px;
    }
`;
interface SubContentsProps {
    isClicked?: boolean;
    text: string;
    onClick?: () => void;
    icon?: React.ReactElement;
}

const SubContents: React.FC<SubContentsProps> = ({ isClicked, text, onClick, icon }) => (
    <Box isClicked={isClicked!} onClick={onClick}>
        {icon}
        <div>{text}</div>
    </Box>
);

export default SubContents;

export type { SubContentsProps };