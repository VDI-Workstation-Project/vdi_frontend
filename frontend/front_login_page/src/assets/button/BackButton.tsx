import styled from "styled-components";

const DefaultButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.boldColor};; /* Button 색상 */
  border-radius: 7.11px;
  display: flex;
  gap: 10px;
  height: 40px;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 280px;
    @media (max-width: 768px) {
        
        width: 220px; /* 작은 화면에서는 너비 줄이기 */

    }

    @media (max-width: 480px) {
       
        width: 170px; /* 더 작은 화면에서는 너비 더 줄이기 */
       height: 30px;
    }
    &:hover {
        cursor: pointer; /* 손 모양 커서 */
    }
`;


const TextWrapper = styled.div`
  color: #ffffff; /* 텍스트 색상 */
  font-size: 16px; /* 텍스트 크기 */
  font-weight: bold; /* 텍스트 굵기 */
`;
interface BackButtonProps {
    onClick: () => void;
}
export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
    return (
        <DefaultButton onClick={onClick}>
            <TextWrapper>Back</TextWrapper>
        </DefaultButton>
    );
};