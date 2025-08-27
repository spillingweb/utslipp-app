import { SidebarContext, SidebarTab } from '@/store/sidebar-context';
import L from 'leaflet';
import { Filter as FilterIcon, HousePlus as HouseIcon, List as ListIcon, Search as SearchIcon } from 'lucide-react';
import { use, useEffect, useRef } from 'react';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    const { sidebarTabOpen, setSidebarTabOpen } = use(SidebarContext);

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
        setSidebarTabOpen((prevTab) => (prevTab === target ? null : target));
    };

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <nav aria-label="Map sidebar navigation">
                <ul className={styles.navTabs}>
                    <SidebarLink
                        tabIndex={0}
                        onClick={() => handleClickOnSidebarNav('search')}
                        isActive={sidebarTabOpen === 'search'}
                        icon={<SearchIcon size={20} />}
                        title="Søk i eiendommer"
                    />
                    <SidebarLink
                        tabIndex={1}
                        onClick={() => handleClickOnSidebarNav('tilsyn')}
                        isActive={sidebarTabOpen === 'tilsyn'}
                        icon={<HouseIcon size={20} />}
                        title="Vis eller opprett tilsynsobjekt"
                    />
                    <SidebarLink
                        tabIndex={2}
                        onClick={() => handleClickOnSidebarNav('filter')}
                        isActive={sidebarTabOpen === 'filter'}
                        icon={<FilterIcon size={20} />}
                        title="Filtrer tilsynobjekter"
                    />
                    <SidebarLink
                        tabIndex={3}
                        onClick={() => handleClickOnSidebarNav('legend')}
                        isActive={sidebarTabOpen === 'legend'}
                        icon={<ListIcon size={20} />}
                        title="Tegnforklaring"
                    />
                </ul>
            </nav>
            <div className={styles.sidebarContent}>{children}</div>
        </div>
    );
};

export default Sidebar;
