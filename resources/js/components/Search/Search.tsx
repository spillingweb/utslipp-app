import { useFetch } from '@/hooks/useFetch';
import { fetchPositionData } from '@/lib/http';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData, SearchFormValues } from '@/types';
import { LatLngLiteral } from 'leaflet';
import { use, useEffect, useState } from 'react';
import { useMapEvents } from 'react-leaflet';
import SearchLayer from '../Map/SearchLayer';
import { SidebarTab } from '../Sidebar/Sidebar';
import SidebarSection from '../Sidebar/SidebarSection';
import ResultsList from './ResultsList';
import styles from './Search.module.css';
import SearchForm from './SearchForm';

type SearchProps = {
    isOpen: boolean;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
    setToolTip: React.Dispatch<React.SetStateAction<AddressData | null>>;
};

const Search = ({ isOpen, setSidebarTabOpen, setSelectedPoint, setToolTip }: SearchProps) => {
    const { setTilsynFormProperties } = use(TilsynFormContext);

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
            setSelectedPoint(null); // Clear any previously selected point
            fetchData(() => fetchPositionData(e.latlng.lat, e.latlng.lng));
        },
        click: () => {
            setToolTip(null);
        },
    });

    // If the fetched data changes, update the form values and search layer on map
    useEffect(() => {
        if (!fetchedData) return;

        setSidebarTabOpen('search');
        setTilsynFormProperties({ open: false, disabled: true, mode: 'create' });

        if (fetchedData.adresser.length === 1) {
            const address = fetchedData.adresser[0];
            const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressenavn, nummer } = address;

            setToolTip(address);

            // Set form state values to the fetched address
            setSearchFormValues({
                gardsnummer: gnr.toString(),
                bruksnummer: bnr.toString(),
                festenummer: fnr.toString(),
                adressenavn: adressenavn ? adressenavn : '',
                nummer: nummer ? nummer.toString() : '',
            });

            // Set the selected point to the representasjonspunkt of the fetched address
            const { representasjonspunkt } = address;
            if (representasjonspunkt) {
                setSelectedPoint({ lat: representasjonspunkt.lat, lng: representasjonspunkt.lon });
            }
        }
    }, [fetchedData, setTilsynFormProperties, setSidebarTabOpen, setSelectedPoint, setToolTip]);

    return (
        <SidebarSection isOpen={isOpen} title="Søk i eiendommer" setSidebarTabOpen={setSidebarTabOpen}>
            {fetchedData && fetchedData.adresser.length > 1 && <SearchLayer addressArray={fetchedData.adresser} />}
            <SearchForm
                searchFormValues={searchFormValues}
                setSearchFormValues={setSearchFormValues}
                fetchData={fetchData}
                setSelectedPoint={setSelectedPoint}
                loading={loading}
            />
            <div className={styles.resultsContainer}>
                {error && <p className={styles.errorMessage}>{error}</p>}
                {fetchedData && <ResultsList addressArray={fetchedData.adresser} setFetchedData={setFetchedData} />}
            </div>
        </SidebarSection>
    );
};

export default Search;
