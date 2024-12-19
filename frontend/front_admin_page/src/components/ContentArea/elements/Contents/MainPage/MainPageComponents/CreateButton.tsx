import React from 'react';
import styled from 'styled-components';

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



// Props 정의


// 컴포넌트 정의
const CreateButton: React.FC = () => {
    return (
        <>
            <ChartName> CreateVM</ChartName>
            <ResourceRowContainer>


            </ResourceRowContainer>
        </>
    );
};

export default CreateButton;