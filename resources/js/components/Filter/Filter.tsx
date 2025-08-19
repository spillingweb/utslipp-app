import { router, useForm } from '@inertiajs/react';
import { LatLngBounds } from 'leaflet';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import SidebarSection from '../Sidebar/SidebarSection';
import ButtonLink from '../ui/ButtonLink';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import CustomFilterForm from './CustomFilterForm';
import styles from './Filter.module.css';

type FilterProps = {
    isOpen: boolean;
    tilsynObjects: GeoJSON.FeatureCollection | null;
    tilsynLayerBounds: LatLngBounds | null;
};

const Filter = ({ isOpen, tilsynObjects, tilsynLayerBounds }: FilterProps) => {
    const isInitialRender = useRef(true);
    const map = useMap();

    // initialize custom filter form
        const { data, setData, post, reset } = useForm({
        filterField1: '',
        filterRelOp1: '',
        filterValue1: '',
        logicalOp: '',
        filterField2: '',
        filterRelOp2: '',
        filterValue2: '',
    });


    const [filterValue, setFilterValue] = useState<'' | 'tilsyn' | 'alle' | 'frist'>('tilsyn');

    const filterUrl = useMemo(() => {
        const url = new URL(route('map'));
        if (filterValue) {
            url.searchParams.append('filter', filterValue);
        }
        return url.toString();
    }, [filterValue]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        // Update the URL with the new filter parameters
        router.visit(filterUrl, {
            preserveState: true,
            preserveScroll: true,
        });
    }, [filterUrl, reset]);

    const handleChangeFilter = (value: '' | 'tilsyn' | 'alle' | 'frist') => {
        setFilterValue(value);
        reset(); // Reset custom filter form data
    };

    const handleCenterObjects = () => {
        if (tilsynLayerBounds) {
            map.fitBounds(tilsynLayerBounds, { paddingTopLeft: [350, 0] });
        }
    };

    return (
        <SidebarSection title="Filtrer objekter" isOpen={isOpen}>
            <div className={styles.filterRadio}>
                <Radio
                    label="Vis bare tilsynsobjekter"
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
            <CustomFilterForm setRadioFilterValue={setFilterValue} data={data} setData={setData} post={post} />
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
