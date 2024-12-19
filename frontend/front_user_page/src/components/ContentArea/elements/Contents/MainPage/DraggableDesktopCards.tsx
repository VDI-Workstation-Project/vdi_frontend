import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import { useSwipeable } from "react-swipeable";

import styled from "styled-components";
import {
    MyDesktopsContainer,
    IndicatorContainer,
    Indicator,
    DesktopCardContainer,

} from "./MainPageComponents/MyDesktops.tsx";

const DraggableContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: start;
    width: 360px;
    height: 290px;
    overflow: hidden;
    box-sizing : border-box;
    @media (max-width: 800px) {
        width: 100%;
        min-width: 100%;
        height: 290px;
    }
   
`;
interface MainPageProps {
    cards: React.ReactNode[]; // cards 배열이 React 요소를 포함한다// 고 가정
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
}
const DraggableDesktopCards: React.FC<MainPageProps> = ({ cards,  currentIndex, setCurrentIndex }) => {

    const [isDraggable, setIsDraggable] = useState(true);
    const totalCards = cards.length;
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            if (isDraggable) {
                setCurrentIndex((prev) => (prev + 1) % totalCards);
            }
        },
        onSwipedRight: () => {
            if (isDraggable) {
                setCurrentIndex((prev) => {
                    if (prev === 0) return prev; // 인덱스가 0이면 아무 작업도 하지 않음
                    return (prev - 1 + totalCards) % totalCards;
                });
            }
        },
        trackMouse: true, // 마우스로도 드래그가 가능하게 설정
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 3000px)");
        const handleMediaQueryChange = (e: MediaQueryListEvent) => {
            setIsDraggable(e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaQueryChange);
        // 초기 설정
        setIsDraggable(mediaQuery.matches);
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, []);
    return (
                <DraggableContainer>
                    My Cloud Workstation
                    <MyDesktopsContainer {...(isDraggable ? swipeHandlers : {})}
                                     style={{
                                         transform: isDraggable ? `translateX(-${currentIndex * 100}%)` : 'translateX(0)',
                                         transition: 'transform 0.5s ease'
                                     }}>
                    {cards.map((card, index) => (
                        <DesktopCardContainer key={index}>{card}</DesktopCardContainer>
                    ))}
                    </MyDesktopsContainer>
                    <IndicatorContainer>
                        {Array.from({ length: totalCards }).map((_, index) => (
                            <Indicator key={index} active={index === currentIndex} />
                        ))}
                    </IndicatorContainer>
                </DraggableContainer>
    );
};

export default DraggableDesktopCards;
