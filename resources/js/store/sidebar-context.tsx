import { createContext, useState } from 'react';

export type SidebarTab = 'search' | 'filter' | 'legend' | 'tilsyn';

type SidebarContextType = {
    sidebarTabOpen: SidebarTab | null;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
};

const SidebarContext = createContext<SidebarContextType>({
    sidebarTabOpen: null,
    setSidebarTabOpen: () => {},
});

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [sidebarTabOpen, setSidebarTabOpen] = useState<SidebarTab | null>('search');

    const ctxValue = { sidebarTabOpen, setSidebarTabOpen };

    return <SidebarContext.Provider value={ctxValue}>{children}</SidebarContext.Provider>;
};

export { SidebarContext, SidebarProvider };
