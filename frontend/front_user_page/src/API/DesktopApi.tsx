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
            } catch (err) {
                setError('Failed to fetch resources');
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    return { resources, loading, error };
};