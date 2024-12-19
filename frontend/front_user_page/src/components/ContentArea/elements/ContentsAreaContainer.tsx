import styled from 'styled-components';

const ContentsAreaContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    height: 100%;
    min-width: 40%;
    background-color: ${({ theme }) => theme.colors.contentBackground};
    gap: 20px;
    z-index: 1;
    user-select: none;
    font-size: 20px;
    font-weight: 550;
    color: ${({ theme }) => theme.colors.label};
    padding: 20px 20px 0 30px;
    box-sizing : border-box;
    
    @media (max-width: 1400px) {
        flex-direction: column;
        height: fit-content;
        padding-bottom: 20px;
    }
`;
const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    background-color: ${({ theme }) => theme.colors.contentBackground};
    user-select: none;
    font-size: 20px;
    font-weight: 550;
    color: ${({ theme }) => theme.colors.label};
    box-sizing : border-box;
`;

const ContentsContainer1 = styled.div`
    flex-direction: column;

    gap: 20px;
    height: 100%;
    display: flex;
    
`
const ContentsContainer2 = styled.div`
    flex-direction: column;
    width: 8%;
    min-width: 200px;
    height: 10%;
    display: flex;
`

export {ContentsAreaContainer,ContentsContainer1,  ContentsContainer2, RowContainer};