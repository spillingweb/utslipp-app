import { router } from '@inertiajs/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import SidebarSection from '../Sidebar/SidebarSection';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import styles from './Filter.module.css';
import FilterForm from './FilterForm';

const AND_OR_NOT_BUTTONS = [
    { label: 'OG', id: 'radioAND', value: 'AND' },
    { label: 'ELLER', id: 'radioOR', value: 'OR' },
    { label: 'OG IKKE', id: 'radioNOT', value: 'AND NOT' },
];

type FilterProps = {
    isOpen: boolean;
    tilsynObjects: GeoJSON.FeatureCollection | null;
};

const Filter = ({ isOpen, tilsynObjects }: FilterProps) => {
    const isInitialRender = useRef(true);

    const [filterValue, setFilterValue] = useState<string>('');

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
        router.visit(filterUrl, {
            preserveState: true,
            preserveScroll: true,
            // replace: true,
        });
    }, [filterUrl]);

    return (
        <SidebarSection title="Filtrer objekter" isOpen={isOpen}>
            <div className={styles.filterRadio}>
                <Radio
                    label="Vis bare tilsynsobjekter"
                    name="filterTilsyn"
                    id="filterTilsyn"
                    value="tilsyn"
                    onChange={() => setFilterValue('tilsyn')}
                    checked
                />
                <Radio
                    label="Vis både tilsynsobjekter og bygninger knytta til kommunalt avløp"
                    name="filterTilsyn"
                    id="filterAll"
                    value="all"
                    onChange={() => setFilterValue('alle')}
                />
                <Radio
                    label="Vis tilsynsobjekter der hvor fristen har gått ut"
                    name="filterTilsyn"
                    id="filterDeadline"
                    value="deadline"
                    onChange={() => setFilterValue('frist')}
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
                <div className={styles.buttons}>
                    <Button type="submit" onClick={() => console.log('Filter')}>
                        Filtrer i database
                    </Button>
                    <Button onClick={() => console.log('Filter')}>Sentrer</Button>
                </div>
            </form>
            <p className={styles.filterInfo}>
                Antall filtrerte objekter: <span>{tilsynObjects?.features.length}</span>
            </p>
        </SidebarSection>
    );
};

export default Filter;
