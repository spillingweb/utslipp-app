import L from 'leaflet';
import { Filter as FilterIcon, HousePlus as HouseIcon, List as ListIcon, Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';

export type SidebarTab = 'search' | 'filter' | 'legend' | 'tilsyn';

type SidebarProps = {
    tabOpen: SidebarTab | null;
    setTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
    children: React.ReactNode;
};

const Sidebar = ({ tabOpen, setTabOpen, children }: SidebarProps) => {
    // Disable click propagation on the sidebar to prevent map interactions when clicking on the sidebar
    const sidebarRef = useRef(null);
    useEffect(() => {
        if (sidebarRef.current) {
            L.DomEvent.disableClickPropagation(sidebarRef.current);
            L.DomEvent.disableScrollPropagation(sidebarRef.current);
        }
    }, []);

    // If the clicked tab is already open, close it. Otherwise, open the clicked tab.
    const handleClickOnSidebarNav = (target: SidebarTab) => {
        setTabOpen((prevTab) => (prevTab === target ? null : target));
    };

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <nav aria-label="Map sidebar navigation">
                <ul className={styles.navTabs}>
                    <SidebarLink tabIndex={0} onClick={() => handleClickOnSidebarNav('search')} isActive={tabOpen === 'search'} icon={<SearchIcon size={20} />} />
                    <SidebarLink tabIndex={1} onClick={() => handleClickOnSidebarNav('tilsyn')} isActive={tabOpen === 'tilsyn'} icon={<HouseIcon size={20} />} />
                    <SidebarLink tabIndex={2} onClick={() => handleClickOnSidebarNav('filter')} isActive={tabOpen === 'filter'} icon={<FilterIcon size={20} />} />
                    <SidebarLink tabIndex={3} onClick={() => handleClickOnSidebarNav('legend')} isActive={tabOpen === 'legend'} icon={<ListIcon size={20} />} />
                </ul>
            </nav>
            <div className={styles.sidebarContent}>{children}</div>
        </div>
    );
};

export default Sidebar;
