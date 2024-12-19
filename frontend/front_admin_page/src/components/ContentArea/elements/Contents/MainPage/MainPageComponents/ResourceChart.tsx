import React from 'react';
import styled from 'styled-components';
import { VMData } from './ResourceManager.tsx';

// // 스타일 정의
// const ChartContainer = styled.div`
//     padding: 10px 20px 10px 20px;
//     font-family: NotoSansKR;
//     font-weight: normal;
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     justify-content: start;
//     background: ${({ theme }) => theme.colors.background};
//     border-radius: 6px;
//     text-align: left;
//     color: ${({ theme }) => theme.colors.label};
//     box-sizing: border-box;
// `;
const ChartName = styled.div`
    font-family: NotoSansKR;
    font-weight: 700;
    padding-bottom: 10px;
    font-size: 14px;
`;
const ResourceRowContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 0;
    }
`;
const ResourceRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
`;
const VMName = styled.div`
    flex: 1;
    font-family: NotoSansKR;
    font-weight: normal;
    font-size: 14px;
`;
const ProgressBarContainer = styled.div`
    flex: 3;
    background-color: ${({ theme }) => theme.colors.contentBackground};
    border-radius: 4px;
    overflow: hidden;
`;
const ProgressBar = styled.div<{ width: number; color: string }>`
    width: ${({ width }) => width}%;
    background-color: ${({ color }) => color};
    height: 10px;
    border-radius: 4px;
`;

// Props 정의
interface ResourceChartProps {
    resourceName: string; // 리소스 이름 (CPU, RAM 등)
    data: VMData[];       // VM 데이터
    getColor: (usage: number) => string; // 프로그래스 바 색상 결정 함수
}

// 컴포넌트 정의
const ResourceChart: React.FC<ResourceChartProps> = ({ resourceName, data, getColor }) => {
    return (
        <>
            <ChartName>{resourceName} Usage</ChartName>
            <ResourceRowContainer>
                {data.map((vm) => (
                    <ResourceRow key={vm.name}>
                        <VMName>{vm.name}</VMName>
                        <ProgressBarContainer>
                            <ProgressBar width={vm[resourceName.toLowerCase() as keyof VMData]as number} color={getColor(vm[resourceName.toLowerCase() as keyof VMData]as number)} />
                        </ProgressBarContainer>
                    </ResourceRow>
                ))}
            </ResourceRowContainer>
        </>
    );
};

export default ResourceChart;