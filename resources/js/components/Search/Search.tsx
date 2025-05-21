import { useFetch } from '@/hooks/useFetch';
import { fetchAddressData, fetchPositionData } from '@/lib/http';
import { AddressData, TilsynObject } from '@/types';
import { useEffect, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import ResultsList from './ResultsList';
import styles from './Search.module.css';
import SearchForm from './SearchForm';
import TilsynForm from './TilsynForm';

type SearchProps = {
    setTabOpen: React.Dispatch<React.SetStateAction<'search' | 'filter' | 'legend' | null>>;
    setSearchAddressArray: React.Dispatch<React.SetStateAction<AddressData[] | null>>;
    tilsynFormData: TilsynObject | null;
    setTilsynFormData: React.Dispatch<React.SetStateAction<TilsynObject | null>>;
};

const Search = ({ setTabOpen, setSearchAddressArray, tilsynFormData, setTilsynFormData }: SearchProps) => {
    // Fetch data, status and fetch function from custom fetch hook
    const { loading, setFetchedData, fetchedData, error, fetchData } = useFetch<{
        adresser: AddressData[];
    }>();

    // Store form values in state as they are typed in input fields
    const [formValues, setFormValues] = useState({
        gardsnummer: '',
        bruksnummer: '',
        festenummer: '',
        adressenavn: '',
        nummer: '',
    });

    // Fetch address data from Kartverket when right-clicking on a point in the map
    useMapEvent('contextmenu', (e) => {
        fetchData(() => fetchPositionData(e.latlng.lat, e.latlng.lng));
        setTilsynFormData(null); // Reset the TilsynForm data when right-clicking
        setTabOpen('search'); // Open the search tab when right-clicking
    });

    // Fetch address data from Kartverket when form is submitted
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent the form from reloading the page
        fetchData(() => fetchAddressData(formValues));
    };

    // If the fetched data changes, update the form values and search layer on map
    useEffect(() => {
        if (!fetchedData) return;

        const fetchedAddresses = fetchedData.adresser;

        if (fetchedAddresses.length === 1) {
            const addressData = fetchedAddresses[0];

            // Set form state values to the fetched address
            setFormValues({
                gardsnummer: addressData.gardsnummer.toString(),
                bruksnummer: addressData.bruksnummer.toString(),
                festenummer: addressData.festenummer ? addressData.festenummer.toString() : '',
                adressenavn: addressData.adressenavn ? addressData.adressenavn : '',
                nummer: addressData.nummer ? addressData.nummer.toString() : '',
            });
        }

        setSearchAddressArray(fetchedAddresses);
    }, [fetchedData, setFetchedData, setSearchAddressArray]);

    return (
        <>
            <SearchForm onSubmit={handleSubmit} formValues={formValues} setFormValues={setFormValues} loading={loading} />
            <div className={styles.resultsContainer}>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {fetchedData && <ResultsList addressArray={fetchedData.adresser} setFetchedData={setFetchedData} />}
                {tilsynFormData && <TilsynForm formData={tilsynFormData} />}
            </div>
        </>
    );
};

export default Search;
