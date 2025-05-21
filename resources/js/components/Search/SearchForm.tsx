import { fetchAddressData } from '@/lib/http';
import { AddressData, SearchFormValues } from '@/types';
import Button from '../ui/Button';
import { Input } from '../ui/Input';
import styles from './SearchForm.module.css';

type SearchFormProps = {
    searchFormValues: SearchFormValues;
    setSearchFormValues: React.Dispatch<React.SetStateAction<SearchFormValues>>;
    fetchData: (
        fetchFn: () => Promise<{
            adresser: AddressData[];
        }>,
    ) => void;
    loading: boolean;
};

const SearchForm = ({ searchFormValues, setSearchFormValues, fetchData, loading }: SearchFormProps) => {
    // Update state while typing in input fields
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    // Reset state form values to empty strings
    function handleResetForm() {
        setSearchFormValues({
            gardsnummer: '',
            bruksnummer: '',
            festenummer: '',
            adressenavn: '',
            nummer: '',
        });
    }

    // Fetch address data from Kartverket when form is submitted
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the form from reloading the page
        fetchData(() => fetchAddressData(searchFormValues));
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchGrid}>
            <Input autoFocus name="gardsnummer" placeholder="Gnr." onChange={(e) => handleInputChange(e)} value={searchFormValues.gardsnummer} />
            <Input name="bruksnummer" placeholder="Bnr." onChange={(e) => handleInputChange(e)} value={searchFormValues.bruksnummer} />
            <Input name="festenummer" placeholder="Fnr." onChange={(e) => handleInputChange(e)} value={searchFormValues.festenummer} />
            <Input name="adressenavn" placeholder="Gatenavn" onChange={(e) => handleInputChange(e)} value={searchFormValues.adressenavn} />
            <Input name="nummer" placeholder="Nr." onChange={(e) => handleInputChange(e)} value={searchFormValues.nummer} />
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
