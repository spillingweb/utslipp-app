import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import styles from './Filter.module.css';
import FilterForm from './FilterForm';
import SidebarSection from '../Sidebar/SidebarSection';
import { returnTilsynMarker } from '@/lib/layerStyles';
import { GeoJSON, useMap } from 'react-leaflet';
import { use } from 'react';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';
import { LatLngLiteral, LeafletMouseEvent } from 'leaflet';

type FilterProps = {
    isOpen: boolean;
    tilsynObjects: GeoJSON.FeatureCollection | null;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
}

const AND_OR_NOT_BUTTONS = [
    { label: 'OG', id: 'radioAND', value: 'AND' },
    { label: 'ELLER', id: 'radioOR', value: 'OR' },
    { label: 'OG IKKE', id: 'radioNOT', value: 'AND NOT' },
];

const Filter = ({isOpen, tilsynObjects, setSelectedPoint}: FilterProps) => {
    const { setTilsynFormData, setTilsynFormProperties } = use(TilsynFormContext);
    const map = useMap();

    const handleFilterObjects = (value: string) => {
        console.log(value);
    };

    const handleTilsynClick = (e: LeafletMouseEvent, feature: GeoJSON.Feature) => {
        setTilsynFormData(feature.properties as TilsynObject);
        setTilsynFormProperties({
            open: true,
            disabled: true,
        });

        // Make yellow circle around the clicked point
        const {lat, lng} = e.target.getLatLng();
        setSelectedPoint({ lat, lng });
        map.setView([lat, lng], 18, { animate: true });
        map.fire('click'); // Trigger click event to close any open tooltips
    };

    return (
        <SidebarSection title="Filtrer objekter" isOpen={isOpen}>
            <div className={styles.filterRadio}>
                <Radio
                    label="Vis bare tilsynsobjekter"
                    name="filterTilsyn"
                    id="filterDefault"
                    value="deafult"
                    onChange={() => handleFilterObjects('default')}
                    checked
                />
                <Radio
                    label="Vis både tilsynsobjekter og bygninger knytta til kommunalt avløp"
                    name="filterTilsyn"
                    id="filterAll"
                    value="all"
                    onChange={() => handleFilterObjects('all')}
                />
                <Radio
                    label="Vis tilsynsobjekter der hvor fristen har gått ut"
                    name="filterTilsyn"
                    id="filterDeadline"
                    value="deadline"
                    onChange={() => handleFilterObjects('deadline')}
                />
            </div>
            <hr className={styles.horizontalLine} />
            <Heading level={3}>Egendefinerte filtre:</Heading>
            <form className={styles.filterCustom}>
                <FilterForm index={1} />
                <fieldset className={styles.andOrNotFieldset}>
                    {AND_OR_NOT_BUTTONS.map((button) => (
                        <label className={styles.andOrNot} key={button.id} htmlFor={button.id}>
                            {button.label}
                            <input type="radio" id={button.id} name="radioOp" value={button.value} />
                        </label>
                    ))}
                </fieldset>

                <FilterForm index={2} />
                <Button type="submit" onClick={() => console.log('Filter')}>
                    Filtrer i database
                </Button>
                <Button onClick={() => console.log('Filter')}>Sentrer filtrerte objekter</Button>
            </form>
            <p className={styles.filterInfo}>
                Antall filtrerte objekter: <span>6</span>
            </p>
            {tilsynObjects && (
                    <GeoJSON
                        data={tilsynObjects}
                        pointToLayer={returnTilsynMarker}
                        onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
                            layer.on('click', (e) => handleTilsynClick(e, feature));
                        }}
                    />
                )}
        </SidebarSection>
    );
};

export default Filter;
