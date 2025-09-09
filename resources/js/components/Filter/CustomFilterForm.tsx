import { FilterContext } from '@/store/filter-context';
import { use } from 'react';
import Button from '../ui/Button';
import styles from './CustomFilterForm.module.css';
import FilterForm from './FilterForm';

const CustomFilterForm = () => {
    const { data, setData, handleCustomFilter } = use(FilterContext);

    return (
        <form className={styles.filterCustom} onSubmit={handleCustomFilter}>
            <FilterForm index={1} />
            <fieldset className={styles.logOpFieldset}>
                <label className={styles.logOp} htmlFor="and">
                    OG
                    <input
                        type="radio"
                        id="and"
                        name="logicalOp"
                        value="AND"
                        onChange={() => setData('logicalOp', 'AND')}
                        checked={data.logicalOp === 'AND'}
                    />
                </label>
                <label className={styles.logOp} htmlFor="or">
                    ELLER
                    <input
                        type="radio"
                        id="or"
                        name="logicalOp"
                        value="OR"
                        onChange={() => setData('logicalOp', 'OR')}
                        checked={data.logicalOp === 'OR'}
                    />
                </label>
                <label className={styles.logOp} htmlFor="and-not">
                    OG IKKE
                    <input
                        type="radio"
                        id="and-not"
                        name="logicalOp"
                        value="AND NOT"
                        onChange={() => setData('logicalOp', 'AND NOT')}
                        checked={data.logicalOp === 'AND NOT'}
                    />
                </label>
            </fieldset>
            <FilterForm index={2} />
            <Button type="submit">Filtrer i database</Button>
        </form>
    );
};

export default CustomFilterForm;
