// GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        font-family: "Gilroy-Medium-☞", Helvetica, Arial, sans-serif,NotoSansKR;
        display: flex;
        
    }
    html, body, #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        box-sizing : border-box;
    }

`;
export default GlobalStyle;