import { useFetch } from '@/hooks/useFetch';
import { fetchPositionData } from '@/lib/http';
import { AddressData, SearchFormValues } from '@/types';
import { useEffect, useState } from 'react';
import { useMapEvent } from 'react-leaflet';
import SearchLayer from '../Map/SearchLayer';
import SidebarSection from '../Sidebar/SidebarSection';
import ResultsList from './ResultsList';
import styles from './Search.module.css';
import SearchForm from './SearchForm';

type SearchProps = {
    isOpen: boolean;
    setTabOpen: React.Dispatch<React.SetStateAction<'search' | 'filter' | 'legend' | null>>;
    setTilsynFormProperties: React.Dispatch<React.SetStateAction<{ open: boolean; disabled: boolean }>>;
    onNewTilsyn: (address: AddressData) => void;
    children?: React.ReactNode;
};

const Search = ({ isOpen, setTabOpen, setTilsynFormProperties, onNewTilsyn, children }: SearchProps) => {
    // Fetch data, status and fetch function from custom fetch hook
    const { loading, setFetchedData, fetchedData, error, fetchData } = useFetch<{
        adresser: AddressData[];
    }>();

    const [searchFormValues, setSearchFormValues] = useState<SearchFormValues>({
        gardsnummer: '',
        bruksnummer: '',
        festenummer: '',
        adressenavn: '',
        nummer: '',
    });

    // Fetch address data from Kartverket when right-clicking on a point in the map
    useMapEvent('contextmenu', (e) => {
        fetchData(() => fetchPositionData(e.latlng.lat, e.latlng.lng));
    });

    // If the fetched data changes, update the form values and search layer on map
    useEffect(() => {
        if (!fetchedData) return;

        setTabOpen('search');
        setTilsynFormProperties({ open: false, disabled: true });

        if (fetchedData.adresser.length === 1) {
            const addressData = fetchedData.adresser[0];

            // Set form state values to the fetched address
            setSearchFormValues({
                gardsnummer: addressData.gardsnummer.toString(),
                bruksnummer: addressData.bruksnummer.toString(),
                festenummer: addressData.festenummer ? addressData.festenummer.toString() : '',
                adressenavn: addressData.adressenavn ? addressData.adressenavn : '',
                nummer: addressData.nummer ? addressData.nummer.toString() : '',
            });
        }
    }, [fetchedData, setFetchedData, setTabOpen]);

    return (
        <SidebarSection isOpen={isOpen} title="Søk i eiendommer">
            {fetchedData && <SearchLayer addressArray={fetchedData.adresser} onNewTilsyn={onNewTilsyn} />}
            <SearchForm searchFormValues={searchFormValues} setSearchFormValues={setSearchFormValues} fetchData={fetchData} loading={loading} />
            <div className={styles.resultsContainer}>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {fetchedData && <ResultsList addressArray={fetchedData.adresser} setFetchedData={setFetchedData} />}
            </div>
            {children}
        </SidebarSection>
    );
};

export default Search;
