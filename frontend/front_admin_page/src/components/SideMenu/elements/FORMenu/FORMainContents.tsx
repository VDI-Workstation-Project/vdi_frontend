import styled, {css} from "styled-components";
import React from "react";
const Box = styled.div<{ isClicked: boolean }>`
    height: 10px;
    display: flex;
    user-select: none;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.subtext};
    transition: background-color 0.3s ease, font-weight 0.3s ease;
    font-size: 13px;
    font-family: NotoSansKR;
    font-weight: lighter;
    ${({ isClicked }) =>
            isClicked &&
            css`
            font-weight: bolder;
        `
    }
`;
interface MainContentsProps {
    isClicked?: boolean;
    text: string;
    onClick?: () => void;
}

const MainContents: React.FC<MainContentsProps> = ({ isClicked, text, onClick }) => (
    <Box isClicked={isClicked!} onClick={onClick}>
        <div>{text}</div>
    </Box>
);

export default MainContents;

export type { MainContentsProps };