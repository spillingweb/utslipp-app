import { FilterContext } from '@/store/filter-context';
import { SidebarContext } from '@/store/sidebar-context';
import { LatLngBounds } from 'leaflet';
import { use } from 'react';
import { useMap } from 'react-leaflet';
import SidebarSection from '../Sidebar/SidebarSection';
import ButtonLink from '../ui/ButtonLink';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import CustomFilterForm from './CustomFilterForm';
import styles from './Filter.module.css';

type FilterProps = {
    tilsynObjects: GeoJSON.FeatureCollection | null;
    tilsynLayerBounds: LatLngBounds | null;
};

const Filter = ({ tilsynObjects, tilsynLayerBounds }: FilterProps) => {
    const { sidebarTabOpen } = use(SidebarContext);
    const map = useMap();

    const { filterValue, handleChangeFilter } = use(FilterContext);

    const handleCenterObjects = () => {
        if (tilsynLayerBounds) {
            map.fitBounds(tilsynLayerBounds, { paddingTopLeft: [350, 0] });
        }
    };

    return (
        <SidebarSection title="Filtrer objekter" isOpen={sidebarTabOpen === 'filter'}>
            <div className={styles.filterRadio}>
                <Radio
                    label="Vis alle tilsynsobjekter (standard)"
                    name="filterTilsyn"
                    id="filterTilsyn"
                    value="tilsyn"
                    onChange={() => handleChangeFilter('tilsyn')}
                    checked={filterValue === 'tilsyn'}
                />
                <Radio
                    label="Vis både tilsynsobjekter og bygninger knytta til kommunalt avløp"
                    name="filterTilsyn"
                    id="filterAll"
                    value="all"
                    onChange={() => handleChangeFilter('alle')}
                    checked={filterValue === 'alle'}
                />
                <Radio
                    label="Vis tilsynsobjekter der hvor fristen har gått ut"
                    name="filterTilsyn"
                    id="filterDeadline"
                    value="deadline"
                    onChange={() => handleChangeFilter('frist')}
                    checked={filterValue === 'frist'}
                />
            </div>
            <hr className={styles.horizontalLine} />
            <Heading level={3}>Egendefinerte filtre:</Heading>
            <CustomFilterForm />
            <div className={styles.flex}>
                <p className={styles.filterInfo}>
                    Antall filtrerte objekter: <span>{tilsynObjects?.features.length}</span>
                </p>
                <ButtonLink onClick={handleCenterObjects}>Sentrer</ButtonLink>
            </div>
        </SidebarSection>
    );
};

export default Filter;
