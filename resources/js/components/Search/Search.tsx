import { useFetch } from '@/hooks/useFetch';
import { fetchAddressData, fetchPositionData } from '@/lib/http';
import { AddressData } from '@/pages/Map';
import { useEffect, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import ResultsList from './ResultsList';
import styles from './Search.module.css';
import SearchForm from './SearchForm';

const Search = ({
    setTabOpen,
    setSearchAddressArray,
}: {
    setTabOpen: React.Dispatch<React.SetStateAction<'Search' | 'Filter' | 'Legend' | null>>;
    setSearchAddressArray: React.Dispatch<React.SetStateAction<AddressData[] | null>>;
}) => {
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
        setTabOpen('Search'); // Open the search tab when right-clicking on the map
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
            </div>
        </>
    );
};

export default Search;
