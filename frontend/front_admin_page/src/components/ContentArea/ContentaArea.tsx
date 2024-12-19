
import {ContentsAreaContainer} from "./elements/ContentsAreaContainer.tsx";

import MyComponent from "./elements/Contents/MainPage/MainPageComponents/gridstack.tsx";

const ContentsArea: React.FC = () => {

    return (
        <ContentsAreaContainer>

            <MyComponent></MyComponent>
        </ContentsAreaContainer>
    );
};
export default ContentsArea;