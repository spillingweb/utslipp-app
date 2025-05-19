import { AddressData } from '@/pages/Map';
import L from 'leaflet';
import { Filter as FilterIcon, List as ListIcon, Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Filter from '../Filter/Filter';
import Legend from '../Legend/Legend';
import Search from '../Search/Search';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';

type SidebarProps = {
    setSearchAddressArray: React.Dispatch<React.SetStateAction<AddressData[] | null>>;
    tilsynFormVisible: boolean;
};

const Sidebar = ({ setSearchAddressArray, tilsynFormVisible }: SidebarProps) => {
    // Disable click propagation on the sidebar to prevent map interactions when clicking on the sidebar
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (sidebarRef.current) {
            L.DomEvent.disableClickPropagation(sidebarRef.current);
        }
    });

    // State to manage the currently open tab in the sidebar
    const [tabOpen, setTabOpen] = useState<'Search' | 'Filter' | 'Legend' | null>('Search');

    // If the clicked tab is already open, close it. Otherwise, open the clicked tab.
    const handleClickOnSidebarNav = (target: 'Search' | 'Filter' | 'Legend') => {
        setTabOpen((prevTab) => (prevTab === target ? null : target));
    };

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <nav aria-label="Map sidebar navigation">
                <ul className={styles.navTabs}>
                    <SidebarLink onClick={() => handleClickOnSidebarNav('Search')} isActive={tabOpen === 'Search'} icon={<SearchIcon size={20} />} />
                    <SidebarLink onClick={() => handleClickOnSidebarNav('Filter')} isActive={tabOpen === 'Filter'} icon={<FilterIcon size={20} />} />
                    <SidebarLink onClick={() => handleClickOnSidebarNav('Legend')} isActive={tabOpen === 'Legend'} icon={<ListIcon size={20} />} />
                </ul>
            </nav>
            <div className={styles.sidebarContent}>
                <SidebarSection title="Søk i eiendommer" isOpen={tabOpen === 'Search'}>
                    <Search setTabOpen={setTabOpen} setSearchAddressArray={setSearchAddressArray} tilsynFormVisible={tilsynFormVisible} />
                </SidebarSection>
                <SidebarSection title="Filtrer tilsynsobjekter" isOpen={tabOpen === 'Filter'}>
                    <Filter />
                </SidebarSection>
                <SidebarSection title="Tegnforklaring tilsynsobjekter" isOpen={tabOpen === 'Legend'}>
                    <Legend />
                </SidebarSection>
            </div>
        </div>
    );
};

export default Sidebar;
