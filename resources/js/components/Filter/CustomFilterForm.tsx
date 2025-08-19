import Button from '../ui/Button';
import styles from './CustomFilterForm.module.css';
import FilterForm from './FilterForm';

type CustomFilterFormProps = {
    setRadioFilterValue: React.Dispatch<React.SetStateAction<'' | 'tilsyn' | 'alle' | 'frist'>>;
    data: {
        filterField1: string;
        filterRelOp1: string;
        filterValue1: string;
        logicalOp: string;
        filterField2: string;
        filterRelOp2: string;
        filterValue2: string;
    };
    setData: (field: string, value: string) => void;
    post: (url: string, options?: { preserveState?: boolean; preserveScroll?: boolean; replace?: boolean } | undefined) => void;
};

const CustomFilterForm = ({ setRadioFilterValue, data, setData, post }: CustomFilterFormProps) => {

    const handleCustomFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        setRadioFilterValue('');
        post(route('map.filter'));
    };

    return (
        <form className={styles.filterCustom} onSubmit={handleCustomFilter}>
            <FilterForm index={1} setData={setData} formData={data} />
            <fieldset className={styles.logOpFieldset}>
                <label className={styles.logOp} htmlFor="and">
                    OG
                    <input type="radio" id="and" name="logicalOp" value="AND" onChange={() => setData('logicalOp', 'AND')} />
                </label>
                <label className={styles.logOp} htmlFor="or">
                    ELLER
                    <input type="radio" id="or" name="logicalOp" value="OR" onChange={() => setData('logicalOp', 'OR')} />
                </label>
                <label className={styles.logOp} htmlFor="and-not">
                    OG IKKE
                    <input type="radio" id="and-not" name="logicalOp" value="AND NOT" onChange={() => setData('logicalOp', 'AND NOT')} />
                </label>
            </fieldset>
            <FilterForm index={2} setData={setData} formData={data} />
            <Button type="submit">Filtrer i database</Button>
        </form>
    );
};

export default CustomFilterForm;
