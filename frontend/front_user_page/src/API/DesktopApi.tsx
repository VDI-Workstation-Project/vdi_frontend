import {useState, useEffect} from 'react';
import axiosInstance from '../components/auth/axiosInstance';

export interface StoreFrontResource {
    clienttypes: string[];
    desktopassignmenttype: string;
    desktophostname: string;
    iconurl: string;
    id: string;
    isdesktop: boolean;
    launchstatusurl: string;
    launchurl: string;
    name: string;
    path: string;
    poweroffurl: string;
    shortcutvalidationurl: string;
    subscriptionurl: string;
}

export interface LaunchStatus {
    status: 'success' | 'failure' | 'retry';
    pollTimeout?: number;
    resourceId?: string;
}

export interface PowerState {
    status: 'On' | 'Off' | 'TurningOff' | 'Unknown';
    machineId: string;
}

export const useStoreFrontResources = () => {
    const [resources, setResources] = useState<StoreFrontResource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axiosInstance.post('/api/storefront/resources/list');
                setResources(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch resources');
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    return {resources, loading, error};
};

export const useStoreFrontLaunch = () => {
    const [launchStatus, setLaunchStatus] = useState<LaunchStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const launchResource = async (resourceId: string) => {
        setLoading(true);
        setError(null);
        setLaunchStatus({status: 'retry', resourceId});

        try {
            const checkStatus = async (): Promise<boolean> => {
                const response = await axiosInstance.post(`/api/storefront/resources/${resourceId}/launch/status`);
                const status: LaunchStatus = {...response.data, resourceId};
                setLaunchStatus(status);

                if (status.status === 'retry' && status.pollTimeout) {
                    await new Promise(resolve => setTimeout(resolve, status.pollTimeout * 1000));
                    return checkStatus();
                }

                return status.status === 'success';
            };

            const isReady = await checkStatus();

            if (isReady) {
                const response = await axiosInstance.get(`/api/storefront/resources/${resourceId}/launch/ica`,
                    {
                        headers: {'Content-Type': 'application/x-ica'},
                        responseType: 'blob'
                    },
                );

                // ICA 파일 다운로드 처리
                const blob = new Blob([response.data], {type: 'application/x-ica'});
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `launch_${resourceId}.ica`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);

                return response.data;
            }

        } catch (error) {
            setLaunchStatus({status: 'failure', resourceId});
        } finally {
            setLoading(false);
        }
    };
    return {launchResource, launchStatus, loading, error};
}

export const useStoreFrontPower = (launchResource: (resourceId: string) => Promise<Blob | undefined>) => {
    const [powerState, setPowerState] = useState<PowerState | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getMachineId = async (): Promise<string | null> => {
        try {
            const response = await axiosInstance.get('/api/storefront/activity/sessions');
            const sessions = response.data.sessions;

            // 첫 번째 세션의 machineId 반환
            if (sessions && sessions.length > 0) {
                return sessions[0].machineData.machineId;
            }
            return null;

        } catch (error) {
            console.error('Failed to get machine ID:', error);
            setError('Failed to get machine information');
            return null;
        }
    };

    const checkPowerState = async (machineId: string): Promise<boolean> => {
        try {
            const response = await axiosInstance.get(
                `/api/storefront/activity/machine/power-state/${machineId}`
            );

            setPowerState({
                status: response.data.powerState,
                machineId
            });

            return response.data.powerState === 'Off';
        } catch (error) {
            console.error('Error checking power state:', error);
            setError('Failed to check power state');
            return false;
        }
    };

    const restartMachine = async (resourceId: string) => {
        setLoading(true);
        setError(null);

        try {
            // 1. 먼저 machineId 얻기
            const machineId = await getMachineId();
            if (!machineId) {
                throw new Error('Could not find machine ID');
            }

            setPowerState({ status: 'On', machineId });

            // 2. 머신 종료 요청
            await axiosInstance.post(`/api/storefront/activity/machine/shutdown/${machineId}`);

            // 3. 종료 상태 확인
            const isOff = await checkPowerState(machineId);

            if (isOff) {
                // 4. 머신이 Off 상태면 재시작
                await launchResource(resourceId);
                setPowerState(null);
            } else {
                throw new Error('Machine failed to power off');
            }

        } catch (error) {
            setError('Failed to restart machine');
            console.error('Restart failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return { restartMachine, powerState, loading, error };
}