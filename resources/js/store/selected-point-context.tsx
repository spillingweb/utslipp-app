import { LatLngLiteral } from 'leaflet';
import { createContext, useState } from 'react';

type SelectedPointContextType = {
    selectedPoint: LatLngLiteral | null;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
};

const SelectedPointContext = createContext<SelectedPointContextType>({
    selectedPoint: null,
    setSelectedPoint: () => {},
});

const SelectedPointProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedPoint, setSelectedPoint] = useState<LatLngLiteral | null>(null);

    
    return <SelectedPointContext value={{ selectedPoint, setSelectedPoint }}>{children}</SelectedPointContext>;
};

export { SelectedPointProvider, SelectedPointContext };
