// GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
        margin: 0;
        padding: 0;
        display: flex;
        
        font-family: "Gilroy-Medium-☞", Helvetica, Arial, sans-serif, 'NotoSansKR-Medium';
        
        justify-content: center;
        align-items: center;
        height: 97vh; /* Viewport height */
        width: 100%; /* Viewport width */
        
    }
    #root {
        display: flex;
        justify-content: center;
        
        width: 100%;
        
        
    }
    
`;
export default GlobalStyle;