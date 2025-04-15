import { AND_OR_NOT_BUTTONS, FILTER_RADIO_BUTTONS } from '@/lib/filterArrays';
import Button from '../ui/Button';
import Heading from '../ui/Heading';
import Radio from '../ui/Radio';
import styles from './Filter.module.css';
import FilterForm from './FilterForm';

const Filter = () => {
    return (
        <>
            <div className={styles.filterRadio}>
                {FILTER_RADIO_BUTTONS.map((filter) => (
                    <Radio key={filter.id} label={filter.label} name="fltTilsyn" id={filter.id} value={filter.value} />
                ))}
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
        </>
    );
};

export default Filter;
