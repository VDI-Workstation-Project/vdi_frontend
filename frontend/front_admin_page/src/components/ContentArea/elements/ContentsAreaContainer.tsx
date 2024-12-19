import styled from 'styled-components';

const ContentsAreaContainer = styled.div`
    display: flex;
    flex-direction: column;
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
`;

const ContentsContainer1 = styled.div`
    flex-direction: column;
    width: 8%;
    min-width: 200px;
    height: 90%;
    display: flex;
    gap: 20px;
`
const ContentsContainer2 = styled.div`
    flex-direction: column;
    width: 8%;
    min-width: 200px;
    height: 10%;
    display: flex;
`

export {ContentsAreaContainer,ContentsContainer1,  ContentsContainer2};