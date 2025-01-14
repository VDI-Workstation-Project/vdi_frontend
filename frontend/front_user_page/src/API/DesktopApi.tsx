import { useState, useEffect } from 'react';
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

    return { resources, loading, error };
};

export const useStoreFrontLaunch = () => {
    const [launchStatus, setLaunchStatus] = useState<LaunchStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const launchResource = async (resourceId : string) => {
        setLoading(true);
        setError(null);
        setLaunchStatus({ status: 'retry', resourceId });

        try {
            const checkStatus = async (): Promise<boolean> => {
                const response = await axiosInstance.post(`/api/storefront/resources/${resourceId}/launch/status`);
                const status: LaunchStatus = { ...response.data, resourceId };
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
                    {headers: {'Content-Type': 'application/x-ica'},
                        responseType: 'blob'},
                );

                // ICA 파일 다운로드 처리
                const blob = new Blob([response.data], { type: 'application/x-ica' });
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
            setLaunchStatus({ status: 'failure', resourceId });
        } finally {
            setLoading(false);
        }
    };
    return { launchResource, launchStatus, loading, error };
}