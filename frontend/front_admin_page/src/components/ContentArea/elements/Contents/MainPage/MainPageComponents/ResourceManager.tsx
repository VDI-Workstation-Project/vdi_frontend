import React from 'react';

export interface VMData {
    name: string;
    cpu: number;
    ram: number;
    storage: number;
}

interface ResourceManagerProps {
    children: (sortedData: {
        sortedByCPU: VMData[];
        sortedByRAM: VMData[];
        sortedByStorage: VMData[];
    }) => JSX.Element;
}

const ResourceManager: React.FC<ResourceManagerProps> = ({ children }) => {
    const vmData: VMData[] = [
        { name: 'VM 1', cpu: 30, ram: 45, storage: 60 },
        { name: 'VM 2', cpu: 60, ram: 35, storage: 10 },
        { name: 'VM 3', cpu: 45, ram: 60, storage: 50 },
        { name: 'VM 4', cpu: 70, ram: 25, storage: 19 },
        { name: 'VM 5', cpu: 45, ram: 85, storage: 95 },
        { name: 'VM 6', cpu: 35, ram: 20, storage: 12 },
        { name: 'VM 7', cpu: 27, ram: 35, storage: 20 },
        { name: 'VM 8', cpu: 77, ram: 30, storage: 10 },
        { name: 'VM 9', cpu: 10, ram: 10, storage: 60 },
        { name: 'VM 10', cpu: 29, ram: 25, storage: 35 },
    ];

    // CPU, RAM, Storage 정렬
    const sortedByCPU = [...vmData].sort((a, b) => b.cpu - a.cpu);
    const sortedByRAM = [...vmData].sort((a, b) => b.ram - a.ram);
    const sortedByStorage = [...vmData].sort((a, b) => b.storage - a.storage);

    // children을 호출하여 정렬된 데이터를 UI로 전달
    return children({ sortedByCPU, sortedByRAM, sortedByStorage });
};

export default ResourceManager;