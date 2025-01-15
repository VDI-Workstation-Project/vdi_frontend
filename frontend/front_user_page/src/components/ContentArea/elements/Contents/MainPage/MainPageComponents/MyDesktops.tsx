import styled from "styled-components";
import Win10Logo from "../../../../../../assets/imgsrc/window10Lightmode.png"
import {FaAngleRight, FaPlusCircle, FaRedoAlt} from "react-icons/fa";
import React from "react";
import axios from "axios";
import {StoreFrontResource, useStoreFrontLaunch, useStoreFrontPower} from '../../../../../../API/DesktopApi.tsx';
/* eslint-disable @typescript-eslint/no-explicit-any */
const MyDesktopsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    width: 100%;
    height: 250px;
    gap: 14px;
    z-index: 1;
    box-sizing : border-box;
    > div {
        flex: 0 0 100%; /* 화면이 작아지면 한 화면에 두 개의 박스를 보여줍니다. */
    }
    @media (max-width: 800px) {
        width: 98%;
        min-width: 97%;
    }
`;
const DesktopCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: 220px;
    max-width: 350px;
    background-color: ${({ theme }) => theme.colors.background};
    user-select: none;
    font-size: 12px;
    border-radius: 6px;
    @media (max-width: 800px) {
        width: 97%;
        min-width: 97%;
    }
`;
const DesktopContainer = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
    height: 100%;
    `
const DesktopOsImageContainer = styled.div`
    width: 70%;
    height:80%;
    flex-direction: column;
    cursor: pointer;
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    justify-items: center;
`;
const DesktopOsImageWrapper: React.FC = () => {
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault(); // 컨텍스트 메뉴 방지 (오른쪽 클릭 방지)
    };

    const handleDragStart = (event: React.DragEvent) => {
        event.preventDefault(); // 드래그 방지
    };

    // 사용할 이미지 경로를 설정


    return (
        <DesktopOsImage
            src={Win10Logo}
            alt="os-image"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
        />
    );
};
const DesktopOsImage = styled.img`
    padding-left: 20px;
    width: 70%;
    height: 80%;
    user-select: none;
    object-fit: contain;
`;
const Desktopname = styled.div`
    font-size: 16px;
    font-weight: 550;
    color: ${({ theme }) => theme.colors.label};
`;
const DesktopRunContainer = styled.div`
    flex: 1;
    gap: 30px;
    flex-direction: column;
    justify-items: center;
`;
const DesktopRunButton = styled.div`
    border: 2px solid ${({ theme }) => theme.colors.borderColor};
    border-radius: 50%;
    cursor: pointer;
    &:hover{
        background-color: ${({ theme }) => theme.colors.menuItemHoverBackground};
        border: 2px solid ${({ theme }) => theme.colors.background};
        svg{color: ${({ theme }) => theme.colors.background};
        }
    }
    svg{
        color: ${({ theme }) => theme.colors.mainColor};
    }
    
`
const CreateButton = styled.div`
    cursor: pointer;
    &:hover{
        
        
        svg{color: ${({ theme }) => theme.colors.mainColor};
        }
    }
    svg{
        color: ${({ theme }) => theme.colors.mainColor};
    }
    
`
const token = localStorage.getItem('token');
const CreateVMButton = () => {
    const handleClick = async () => {

        try {
            // POST 요청으로 VM 생성 스크립트 실행
            const response = await axios.post('http://localhost:8081/createvm', {},
                { headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${token}`}});

            if (response.data.success) {
                // VM 생성 성공 메시지 처리
                console.log('VM 생성 성공:', response.data);
                alert(`${response.data.message}\nVM 이름: ${response.data.data.vmName}`);
            }
        } catch (error: any) {
            // 에러 처리
            console.error('VM 생성 실패:', error);
            alert(error.response?.data?.message || 'VM 생성 중 문제가 발생했습니다!');
        }
    };

    return <CreateButton onClick={handleClick}>
        <FaPlusCircle size={70} />

    </CreateButton>;
};



const Connect = styled.div`
    padding-top: 16px;
    font-size: 14px;
    font-weight: 550;
    color: ${({ theme }) => theme.colors.mainColor};
`;
const DesktopDetail = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 650px;
    height: 240px;
    height: 240px;
    min-width: 400px;
    max-width: 700px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 6px;
    user-select: none;
    
    box-shadow: 0 0 1px 0 rgba(0,0,0,0.2);
    align-items: center;
    @media (max-width: 1000px) {
        width: 100%;
        min-width: 100%;
        height: 180px;
    }
`;


const DetailOsImageWrapper: React.FC = () => {
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault(); // 컨텍스트 메뉴 방지 (오른쪽 클릭 방지)
    };

    const handleDragStart = (event: React.DragEvent) => {
        event.preventDefault(); // 드래그 방지
    };

    // 사용할 이미지 경로를 설정


    return (

            <DetailOsImage
                src={Win10Logo}
                alt="os-image"
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
            />
    );
};
const DetailOsImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    height: 75%;
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    justify-content: center;
    align-items: center;
    
    @media (max-width: 800px) {
        
        width: 37%;
    }
`;
const DetailOsImage = styled.img`
   
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 65%;
    @media (max-width: 800px) {
        height: 60%;
        width: 70%;
    }
    @media (max-width: 1000px) {
        height: 60%;
        width: 50%;
    }
`;
const Detailname = styled.div`
    font-size: 16px;
    font-weight: 550;
    color: ${({ theme }) => theme.colors.label};
    padding-top: 10px;
    padding-left: 10px;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 810px) {
        font-size: 12px;
    }
`;
const DetailInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: center;
`;
const DetailInfoContainer2= styled.div`
    display: flex;
    flex-direction: row;
    height: 47%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    align-items: center;
    width: 90%;
    
    `
const DetailInfoContainer3 = styled.div`
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 33.3%;
    height: 60%;
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    
`
const DetailInfoContainer4 = styled.div<DesktopInfoProps>`
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 40%;
    @media (max-width: 1000px) {
        font-size: 12px;
    }
    @media (max-width: 610px) {
        font-size: 10px;
    }
`
const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 8px;
    text-align: center;
`;

// const StatusMessage = styled.div`
//     color: #666;
//     font-size: 12px;
//     margin-top: 8px;
//     text-align: center;
// `;

const IndicatorContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const Indicator = styled.div<{ active: boolean }>`
    width: 8px;
    height: 8px;
    margin: 0 4px;
    border-radius: 50%;
    background-color: ${({ active, theme }) => active ? theme.colors.label : theme.colors.background};
`;
export {MyDesktopsContainer,DesktopCardContainer, IndicatorContainer, Indicator};

interface MyDesktopsProps {
    resources: StoreFrontResource[]
}


const MyDesktops: React.FC<MyDesktopsProps> = ({ resources }) => {

    const { launchResource, launchStatus, loading: launchLoading } = useStoreFrontLaunch();
    const { restartMachine, powerState, loading: powerLoading, error: powerError } = useStoreFrontPower(launchResource);

    const handleConnect = async (resourceId: string) => {
        try {
            await launchResource(resourceId);
        } catch (err) {
            console.error('Failed to connect to desktop:', err);
        }
    };

    const handleRestart = async (resourceId: string) => {
        try {
            await restartMachine(resourceId);
        } catch (err) {
            console.error('Failed to restart desktop:', err);
        }
    };

    const getPowerStateMessage = () => {
        if (powerState?.machineId) {
            switch (powerState.status) {
                case 'On':
                    return 'Running';
                case 'Off':
                    return 'Launching...';  // 수정: Off 상태면 곧 재시작될 것이므로
                case 'TurningOff':
                    return 'Shutting Down...';
                case 'Unknown':
                    return 'Status Unknown';
            }
        }
        return 'Connect';
    };

    const getStatusMessage = (resourceId: string) => {
        if (launchStatus?.resourceId === resourceId) {
            switch (launchStatus.status) {
                case 'retry':
                    return 'Preparing...';
                case 'failure':
                    return 'Failed to launch';
                case 'success':
                    return 'Launching...';
            }
        }
        return getPowerStateMessage();
    };

    return (
        <MyDesktopsContainer>
            {resources.map((resource) => (
                <DesktopCardContainer key={resource.id}>
                    <DesktopContainer>
                        <DesktopOsImageContainer>
                            <DesktopOsImageWrapper />
                            <Desktopname>{resource.desktophostname}</Desktopname>
                        </DesktopOsImageContainer>
                        <DesktopRunContainer>
                            {/* Connect 버튼 */}
                            <DesktopRunButton
                                onClick={() => handleConnect(resource.id)}
                                style={{cursor: (launchLoading || powerLoading) ? 'wait' : 'pointer'}}>
                                <FaAngleRight size={46}
                                              style={{ opacity: (launchLoading || powerLoading) ? 0.5 : 1 }}/>
                            </DesktopRunButton>
                            <Connect>
                                {getStatusMessage(resource.id)}
                            </Connect>

                            {/* Restart 버튼 */}
                            <DesktopRunButton
                                onClick={() => handleRestart(resource.id)}
                                style={{
                                    padding: 8,
                                    cursor: (launchLoading || powerLoading) ? 'wait' : 'pointer',
                                    marginTop: 14
                                }}>
                                <FaRedoAlt size={22}
                                           style={{ opacity: (launchLoading || powerLoading) ? 0.5 : 1 }}/>
                            </DesktopRunButton>
                            <Connect>
                                {powerState?.machineId && powerState.status === 'TurningOff'
                                    ? 'Restarting...'
                                    : 'Restart'}
                            </Connect>

                            {/* 에러 메시지 */}
                            {powerError && (
                                <ErrorMessage>{powerError}</ErrorMessage>
                            )}
                        </DesktopRunContainer>
                    </DesktopContainer>
                </DesktopCardContainer>
            ))}
        </MyDesktopsContainer>
    );
};

interface DesktopInfoProps {
    main?: string;
    sub?: string;
    CPU?: string;
    MEMORY?: string;
    DISK?: string;
    POWER?: string;
    RESISTERED?: string;
    USABLE?: string;
    cards?: DesktopInfoProps[];
}

const DetailInfoSpecContainer: React.FC<DesktopInfoProps> = ({main, sub}) => {
    return (
        <DetailInfoContainer3 >
            <DetailInfoContainer4 main={main}>
                {main}
            </DetailInfoContainer4>
            <DetailInfoContainer4 sub={sub}>
                {sub}
            </DetailInfoContainer4>
        </DetailInfoContainer3>

    );
}
const DetailInfoSpecContainerBorderless: React.FC<DesktopInfoProps> = ({main, sub}) => {
    return (
        <DetailInfoContainer3 style={{borderRight: "none"}}>
            <DetailInfoContainer4 main={main}>
                {main}
            </DetailInfoContainer4>
            <DetailInfoContainer4 sub={sub}>
                {sub}
            </DetailInfoContainer4>
        </DetailInfoContainer3>
    );
}
const DesktopInfo : React.FC<DesktopInfoProps> = ({CPU,MEMORY,POWER,RESISTERED,USABLE,DISK}) =>{

    return (
        <DesktopDetail>
            <DetailOsImageContainer>
                <DetailOsImageWrapper/>
                <Detailname>
                    Cloud-Workstation-01
                </Detailname>
            </DetailOsImageContainer>

            <DetailInfoContainer>

                <DetailInfoContainer2>
                    <DetailInfoSpecContainer main="CPU" sub={CPU}/>
                    <DetailInfoSpecContainer main="MEMORY" sub={MEMORY}/>
                    <DetailInfoSpecContainerBorderless main="DISK" sub={DISK}/>
                </DetailInfoContainer2>
                <DetailInfoContainer2 style={{borderBottom: "none"}}>
                    <DetailInfoSpecContainer main="Power Status" sub={POWER}/>
                    <DetailInfoSpecContainer main="Resistered" sub={RESISTERED}/>
                    <DetailInfoSpecContainerBorderless main="Usable" sub={USABLE}/>
                </DetailInfoContainer2>
            </DetailInfoContainer>
        </DesktopDetail>
    );
};

const DesktopInfocard : React.FC<DesktopInfoProps> = ({cards}) =>{
    if (!cards) {
        return null;
    }

    return (
        <DesktopDetail >
            {cards.map((card, index) => (
                <DesktopInfo
                    key={index}
                    CPU={card.CPU}
                    MEMORY={card.MEMORY}
                    POWER={card.POWER}
                    RESISTERED={card.RESISTERED}
                    USABLE={card.USABLE}
                    DISK={card.DISK}
                />
            ))}
        </DesktopDetail>

    );
};

export const MyPageDesktopInfocard : React.FC<DesktopInfoProps> = ({cards}) =>{
    if (!cards) {
        return null;
    }

    return (
        <DesktopDetail style={{flexDirection: "column", gap:"20px", height:"650px", background:"none"}}>
            {cards.map((card, index) => (
                <DesktopInfo
                    key={index}
                    CPU={card.CPU}
                    MEMORY={card.MEMORY}
                    POWER={card.POWER}
                    RESISTERED={card.RESISTERED}
                    USABLE={card.USABLE}
                    DISK={card.DISK}
                />
            ))}
        </DesktopDetail>

    );
};
const CreateVm : React.FC = () =>{

    return (
        <DesktopDetail style={{height: "150px"}}>

            <DetailInfoContainer>
                <CreateVMButton>

                </CreateVMButton>
                <Connect>Create</Connect>
            </DetailInfoContainer>
        </DesktopDetail>
    );
};
export {DesktopInfocard, DesktopInfo, CreateVm, CreateVMButton};
export type {DesktopInfoProps};
export default MyDesktops;