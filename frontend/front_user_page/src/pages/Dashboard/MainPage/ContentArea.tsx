
import {ContentsAreaContainer, ContentsContainer1} from "../../../components/ContentArea/elements/ContentsAreaContainer.tsx";
import DraggableDesktopCards from "../../../components/ContentArea/elements/Contents/MainPage/DraggableDesktopCards.tsx";
import MyDesktops, {CreateVm, DesktopInfocard,} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/MyDesktops.tsx";
import {DesktopInfoProps ,} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/MyDesktops.tsx";
import { useStoreFrontResources } from '../../../API/DesktopApi.tsx'

import React, {ReactNode, useState} from "react";

import {Notice} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/Notice.tsx";
import {Route, Routes} from "react-router-dom";

import MypageContainer from "../../MyPage/MyDesktops.tsx";
import {
    Cns
} from "../../../components/ContentArea/elements/Contents/MainPage/MainPageComponents/Cns/CnsWidget.tsx";


const sampleCardsInfo: DesktopInfoProps[]= [
    { CPU: "Intel i9", MEMORY: "32GB", DISK: "2TB", POWER: "On", RESISTERED: "Yes", USABLE: "Yes" },
    { CPU: "Intel i7", MEMORY: "16GB", DISK: "1TB", POWER: "Off", RESISTERED: "No", USABLE: "Yes" },
    { CPU: "Intel i5", MEMORY: "8GB", DISK: "500GB", POWER: "On", RESISTERED: "Yes", USABLE: "No"}
];

const DashboardArea: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { resources, loading, error } = useStoreFrontResources();
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading resources</div>;
    const desktopCards = [
        <MyDesktops resources={resources} />,
        <MyDesktops resources={resources} />,
        <MyDesktops resources={resources} />
    ];
    return (
        <ContentsAreaContainer>
            <ContentsContainer1>
                    <DraggableDesktopCards cards={desktopCards}
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
interface MyProps {
    children?: ReactNode; // Optional children
}
export const ContentArea : React.FC<MyProps> = ({ children }) => {
    return (
        <>
            {children}
            <Routes>
                <Route path="dashboard" element={<DashboardArea />} />
                <Route path="mypage" element={<MypageContainer />} />
            </Routes>
        </>
    );
};

export default DashboardArea;