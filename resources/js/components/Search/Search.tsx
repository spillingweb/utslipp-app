import { useFetch } from '@/hooks/useFetch';
import { fetchPositionData } from '@/lib/http';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData, SearchFormValues } from '@/types';
import { use, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import SearchLayer from '../Map/SearchLayer';
import SidebarSection from '../Sidebar/SidebarSection';
import ResultsList from './ResultsList';
import styles from './Search.module.css';
import SearchForm from './SearchForm';
import TilsynForm from './TilsynForm';

type SearchProps = {
    isOpen: boolean;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<'search' | 'filter' | 'legend' | null>>;
};

const Search = ({ isOpen, setSidebarTabOpen }: SearchProps) => {
    const [toolTipOpen, setToolTipOpen] = useState(false);
    const { tilsynFormProperties, setTilsynFormProperties } = use(TilsynFormContext);

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
    useMapEvents({
        contextmenu: (e) => {
            fetchData(() => fetchPositionData(e.latlng.lat, e.latlng.lng));
            setToolTipOpen(true);
        },
        click: () => {
            setToolTipOpen(false);
        },
    });

    // If the fetched data changes, update the form values and search layer on map
    useEffect(() => {
        if (!fetchedData) return;

        setSidebarTabOpen('search');
        setTilsynFormProperties({ open: false, disabled: true });

        if (fetchedData.adresser.length === 1) {
            const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressenavn, nummer } = fetchedData.adresser[0];

            // Set form state values to the fetched address
            setSearchFormValues({
                gardsnummer: gnr.toString(),
                bruksnummer: bnr.toString(),
                festenummer: fnr.toString(),
                adressenavn: adressenavn ? adressenavn : '',
                nummer: nummer ? nummer.toString() : '',
            });
        }
    }, [fetchedData, setSidebarTabOpen, setTilsynFormProperties]);

    return (
        <SidebarSection isOpen={isOpen} title="Søk i eiendommer">
            {fetchedData && <SearchLayer addressArray={fetchedData.adresser} toolTipOpen={toolTipOpen} setToolTipOpen={setToolTipOpen} />}
            <SearchForm searchFormValues={searchFormValues} setSearchFormValues={setSearchFormValues} fetchData={fetchData} loading={loading} />
            <div className={styles.resultsContainer}>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {fetchedData && <ResultsList addressArray={fetchedData.adresser} setFetchedData={setFetchedData} />}
            </div>
            {tilsynFormProperties.open && <TilsynForm />}
        </SidebarSection>
    );
};

export default Search;
