import styled  from 'styled-components';

import MainContents from "./FORMainContents.tsx";
import {useState} from "react";
import SubContents from "./FORSubContents.tsx";
import { FaCircle } from "react-icons/fa";



const ContainerCol = styled.div`
    width: 200px;
    height: 80px;
    justify-content: start;
    gap: 16px;
    display: flex;
    flex-direction: column;
`;
const ContainerRowMain = styled.div`
    width: 200px;
    height: 20px;
    
    gap: 14px;
    display: flex;
`;
const ContainerColSub = styled.div`
    width: 200px;
    height: 20px;
    justify-content: space-between;
    gap: 14px;
    display: flex;
    flex-direction: column;
`;



const StyledComponent = () => {
    const [activeTab, setActiveTab] = useState<string>("favorites");



    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <ContainerCol>
            <ContainerRowMain>
                <MainContents
                    isClicked={activeTab === "favorites"}
                    text="Favorites"
                    onClick={() => handleTabClick("favorites")}
                />
                <MainContents
                    isClicked={activeTab === "recently"}
                    text="Recently"
                    onClick={() => handleTabClick("recently")}
                />
            </ContainerRowMain>

            {activeTab === "favorites" && (
                <ContainerColSub>
                    <SubContents isClicked={false} icon={<FaCircle/>} text="Main Page" onClick={() => {}} />
                    <SubContents isClicked={false} icon={<FaCircle/>} text="My Desktops" onClick={() => {}} />
                </ContainerColSub>
            )}

            {activeTab === "recently" && (
                <ContainerColSub>
                    <SubContents isClicked={false} icon={<FaCircle/>} text="My Profile" onClick={() => {}}></SubContents>
                    <SubContents isClicked={false} icon={<FaCircle/>} text="Chat" onClick={() => {}}></SubContents>
                </ContainerColSub>
            )}
        </ContainerCol>
    );
};


export default StyledComponent;