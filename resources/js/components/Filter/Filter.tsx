import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import styles from './Filter.module.css';
import FilterForm from './FilterForm';
import SidebarSection from '../Sidebar/SidebarSection';
import { returnTilsynMarker } from '@/lib/layerStyles';
import { GeoJSON } from 'react-leaflet';
import { use } from 'react';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';


const AND_OR_NOT_BUTTONS = [
    { label: 'OG', id: 'radioAND', value: 'AND' },
    { label: 'ELLER', id: 'radioOR', value: 'OR' },
    { label: 'OG IKKE', id: 'radioNOT', value: 'AND NOT' },
];

const Filter = ({isOpen, tilsynObjects}: {isOpen: boolean, tilsynObjects: GeoJSON.FeatureCollection | null}) => {
    const { setTilsynFormData, setTilsynFormProperties } = use(TilsynFormContext);

    const handleFilterObjects = (value: string) => {
        console.log(value);
    };

    const handleTilsynClick = (feature: GeoJSON.Feature) => {
        setTilsynFormData(feature.properties as TilsynObject);
        setTilsynFormProperties({
            open: true,
            disabled: true,
        });
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
                            layer.on('click', () => handleTilsynClick(feature));
                        }}
                    />
                )}
        </SidebarSection>
    );
};

export default Filter;
