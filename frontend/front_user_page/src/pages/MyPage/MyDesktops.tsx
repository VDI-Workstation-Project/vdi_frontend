import React from "react";
import {
    ContentsAreaContainer, ContentsContainer1,
} from "../../components/ContentArea/elements/ContentsAreaContainer.tsx";
import {CreateVm, DesktopInfoProps, MyPageDesktopInfocard
} from "../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/MyDesktops.tsx";
const sampleCardsInfo: DesktopInfoProps[]= [
    { CPU: "Intel i9", MEMORY: "32GB", DISK: "2TB", POWER: "On", RESISTERED: "Yes", USABLE: "Yes" },
    { CPU: "Intel i7", MEMORY: "16GB", DISK: "1TB", POWER: "Off", RESISTERED: "No", USABLE: "Yes" },
    { CPU: "Intel i5", MEMORY: "8GB", DISK: "500GB", POWER: "On", RESISTERED: "Yes", USABLE: "No"}
];

const MypageContainer: React.FC = () => {

    return (
        <ContentsAreaContainer style={{justifyContent: "center"}}>
            <ContentsContainer1 >
            <CreateVm/>

            <MyPageDesktopInfocard cards={sampleCardsInfo}/>

            </ContentsContainer1>
        </ContentsAreaContainer>

    );
};
export default MypageContainer;
