import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import ResourceManager from './ResourceManager';
import ResourceChart from './ResourceChart';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Layout, Responsive, WidthProvider} from 'react-grid-layout';
import CreateButton from "./CreateButton.tsx";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridStackContainer = styled.div`
    width: 100%;

    .react-grid-layout {
        background: ${({ theme }) => theme.colors.contentBackground};
        gap: 10px;
    }
    .react-grid-item {
        padding: 10px 20px 10px 20px;
        font-family: NotoSansKR;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
        background: ${({ theme }) => theme.colors.background};
        border-radius: 6px;
        text-align: left;
        color: ${({ theme }) => theme.colors.label};
        box-sizing: border-box;

    }
`;

const defaultLayout = [
    { i: 'cpu', x: 0, y: 0, w: 4, h: 2 },
    { i: 'ram', x: 4, y: 0, w: 4, h: 2 },
    { i: 'storage', x: 8, y: 0, w: 4, h: 2 },
    { i: 'win', x: 12, y: 0, w: 4, h: 2 },
    { i: 'sa', x: 16, y: 0, w: 4, h: 2 },

];
const STORAGE_KEY = 'grid-layout';
const getProgressBarColor = (usage: number) => {
    if (usage >= 70) {
        return 'orangered';
    } else if (usage >= 30) {
        return 'cornflowerblue';
    } else {
        return 'mediumseagreen';
    }
};

const MyComponent: React.FC = () => {
    const [layout, setLayout] = useState(defaultLayout);

    // 로컬 스토리지에서 레이아웃 불러오기
    useEffect(() => {
        const savedLayout = localStorage.getItem(STORAGE_KEY);
        if (savedLayout) {
            try {
                const parsedLayout = JSON.parse(savedLayout) as Layout[]; // Layout[] 타입으로 변환
                setLayout(parsedLayout);
            } catch (err) {
                console.error("Invalid saved layout:", err);
            }
        }
    }, []);
    const handleLayoutChange = (currentLayout: Layout[]) => {
        setLayout(currentLayout);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentLayout));
    };

    return (
        <ResourceManager>
            {({ sortedByCPU, sortedByRAM, sortedByStorage }) => (
                <GridStackContainer>
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{lg: layout, md: layout, sm: layout, xs: layout, xxs: layout}}
                        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                        cols={{lg: 16, md: 12, sm: 8, xs: 4, xxs: 2}}
                        rowHeight={100}
                        margin={[10, 10]}
                        onLayoutChange={(newLayout) => handleLayoutChange(newLayout)}
                    >
                        <div key="cpu">

                            <ResourceChart
                                resourceName="CPU"
                                data={sortedByCPU}
                                getColor={getProgressBarColor}
                            />
                        </div>
                        <div key="ram">
                            <ResourceChart
                                resourceName="RAM"
                                data={sortedByRAM}
                                getColor={getProgressBarColor}
                            />
                        </div>
                        <div key="storage">
                            <ResourceChart
                                resourceName="Storage"
                                data={sortedByStorage}
                                getColor={getProgressBarColor}
                            />
                        </div>
                        <div key="win">
                            <ResourceChart
                                resourceName="Storage" // 예: 재사용 가능
                                data={sortedByStorage}
                                getColor={getProgressBarColor}
                            />
                        </div>
                        <div key="sa">
                            <CreateButton

                            />
                        </div>
                    </ResponsiveGridLayout>
                </GridStackContainer>
            )}
        </ResourceManager>
    );
};

export default MyComponent;