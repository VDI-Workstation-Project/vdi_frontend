
import {ContentsAreaContainer, ContentsContainer1} from "../../../components/ContentArea/elements/ContentsAreaContainer.tsx";
import DraggableDesktopCards from "../../../components/ContentArea/elements/Contents/MainPage/DraggableDesktopCards.tsx";
import {CreateVm, DeskTopCard, DesktopInfocard,} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/MyDesktops.tsx";
import {DesktopInfoProps ,} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/MyDesktops.tsx";

import React, {useState} from "react";

import {Notice} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/Notice.tsx";
import {Route, Routes} from "react-router-dom";

import Mypage from "../../MyPage/MyDesktops.tsx";
import {
    Cns
} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/Cns/CnsWidget.tsx";
const sampleCards= [
    <DeskTopCard/>,
    <DeskTopCard/>,
    <DeskTopCard/>
];
const sampleCardsInfo: DesktopInfoProps[]= [
    { CPU: "Intel i9", MEMORY: "32GB", DISK: "2TB", POWER: "On", RESISTERED: "Yes", USABLE: "Yes" },
    { CPU: "Intel i7", MEMORY: "16GB", DISK: "1TB", POWER: "Off", RESISTERED: "No", USABLE: "Yes" },
    { CPU: "Intel i5", MEMORY: "8GB", DISK: "500GB", POWER: "On", RESISTERED: "Yes", USABLE: "No"}
];

const DashboardArea: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <ContentsAreaContainer>
            <ContentsContainer1>
                    <DraggableDesktopCards cards={sampleCards}
                                           currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                    <DesktopInfocard cards={[sampleCardsInfo[currentIndex]]}>
            </DesktopInfocard>
            <CreateVm/>
            </ContentsContainer1>
            <ContentsContainer1>
                Communication Hub
                <Notice/>
                <Cns/>
            </ContentsContainer1>
        </ContentsAreaContainer>

    );
};
export const ContentArea2 : React.FC = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<DashboardArea />} />
            <Route path="mypage" element={<Mypage />} />
        </Routes>
    );
};

export default DashboardArea;