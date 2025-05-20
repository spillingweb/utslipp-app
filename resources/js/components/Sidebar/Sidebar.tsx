import L from 'leaflet';
import { Filter as FilterIcon, List as ListIcon, Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Filter from '../Filter/Filter';
import Legend from '../Legend/Legend';
import Search from '../Search/Search';
import styles from './Sidebar.module.css';
import SidebarLink from './SidebarLink';
import SidebarSection from './SidebarSection';
import { AddressData, TilsynObject } from '@/types';

type SidebarProps = {
    setSearchAddressArray: React.Dispatch<React.SetStateAction<AddressData[] | null>>;
    tilsynFormData: TilsynObject | null;
    setTilsynFormData: React.Dispatch<React.SetStateAction<TilsynObject | null>>;
};

const Sidebar = ({ setSearchAddressArray, tilsynFormData, setTilsynFormData }: SidebarProps) => {
    // State to manage the currently open tab in the sidebar
    const [tabOpen, setTabOpen] = useState<'search' | 'filter' | 'legend' | null>('search');

    // Disable click propagation on the sidebar to prevent map interactions when clicking on the sidebar
    const sidebarRef = useRef(null);
    useEffect(() => {
        if (sidebarRef.current) {
            L.DomEvent.disableClickPropagation(sidebarRef.current);
        }
    }, []);

    // If the clicked tab is already open, close it. Otherwise, open the clicked tab.
    const handleClickOnSidebarNav = (target: 'search' | 'filter' | 'legend') => {
        setTabOpen((prevTab) => (prevTab === target ? null : target));
    };

    return (
        <div className={styles.sidebar} ref={sidebarRef}>
            <nav aria-label="Map sidebar navigation">
                <ul className={styles.navTabs}>
                    <SidebarLink onClick={() => handleClickOnSidebarNav('search')} isActive={tabOpen === 'search'} icon={<SearchIcon size={20} />} />
                    <SidebarLink onClick={() => handleClickOnSidebarNav('filter')} isActive={tabOpen === 'filter'} icon={<FilterIcon size={20} />} />
                    <SidebarLink onClick={() => handleClickOnSidebarNav('legend')} isActive={tabOpen === 'legend'} icon={<ListIcon size={20} />} />
                </ul>
            </nav>
            <div className={styles.sidebarContent}>
                <SidebarSection
                    title="Søk i eiendommer"
                    isOpen={tabOpen === 'search'}
                    children={<Search setTabOpen={setTabOpen} setSearchAddressArray={setSearchAddressArray} tilsynFormData={tilsynFormData} setTilsynFormData={setTilsynFormData}/>}
                />
                <SidebarSection title="Filtrer tilsynsobjekter" isOpen={tabOpen === 'filter'} children={<Filter />} />
                <SidebarSection title="Tegnforklaring tilsynsobjekter" isOpen={tabOpen === 'legend'} children={<Legend />} />
            </div>
        </div>
    );
};

export default Sidebar;
