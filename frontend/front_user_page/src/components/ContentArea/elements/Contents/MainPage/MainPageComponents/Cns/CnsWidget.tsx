import styled from "styled-components";
import {Logo} from "../../../../../../../assets/logo/logo.tsx";

const CnsContainer = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 650px;
    height: 410px;
    min-width: 400px;
    max-width: 700px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 6px;
    user-select: none;
    margin-top: 7px;
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.2);
    align-content: start;
    @media (max-width: 1000px) {
        width: 100%;
        min-width: 100%;
        height: 180px;
    }
`;


const CnsHeader = styled.div`
    flex:1;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
    height: 45px;
    background-color: ${({ theme }) => theme.colors.background};
    user-select: none;
    align-items: center;
`
export const Cns : React.FC = () =>{
    return (
        <CnsContainer>


            <CnsHeader style={{borderRadius: "6px 6px 0 0"}}>
                <Logo text="BUBBLE"/>
            </CnsHeader>



        </CnsContainer>
    );
};
export {CnsContainer};