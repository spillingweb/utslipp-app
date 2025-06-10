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
    setTilsynObjects: React.Dispatch<React.SetStateAction<GeoJSON.FeatureCollection | null>>;
};


const Filter = ({ isOpen, setTilsynObjects }: FilterProps) => {
    const handleFilterObjects = (value: string) => {
        console.log(value);
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
        </SidebarSection>
    );
};

export default Filter;
