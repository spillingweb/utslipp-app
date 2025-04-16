import Button from '../ui/Button';
import Input from '../ui/Input';
import styles from './SearchForm.module.css';

type FormValues = {
    gardsnummer: string;
    bruksnummer: string;
    festenummer: string;
    adressenavn: string;
    nummer: string;
};

type SearchFormProps = {
    onSubmit: (event: React.FormEvent) => void;
    formValues: FormValues;
    setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
    loading: boolean;
};

const SearchForm = ({ onSubmit, formValues, setFormValues, loading }: SearchFormProps) => {
    // Update state while typing in input fields
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Reset state form values to empty strings
    function handleResetForm() {
        setFormValues({
            gardsnummer: '',
            bruksnummer: '',
            festenummer: '',
            adressenavn: '',
            nummer: '',
        });
    }

    return (
        <form onSubmit={onSubmit} className={styles.searchGrid}>
            <Input autoFocus name="gardsnummer" placeholder="Gnr." onChange={(e) => handleInputChange(e)} value={formValues.gardsnummer} />
            <Input name="bruksnummer" placeholder="Bnr." onChange={(e) => handleInputChange(e)} value={formValues.bruksnummer} />
            <Input name="festenummer" placeholder="Fnr." onChange={(e) => handleInputChange(e)} value={formValues.festenummer} />
            <Input name="adressenavn" placeholder="Gatenavn" onChange={(e) => handleInputChange(e)} value={formValues.adressenavn} />
            <Input name="nummer" placeholder="Nr." onChange={(e) => handleInputChange(e)} value={formValues.nummer} />
            <Button type="submit" disabled={loading}>
                Søk i Matrikkelen
            </Button>
            <Button type="reset" onClick={handleResetForm}>
                Tøm
            </Button>
        </form>
    );
};

export default SearchForm;
