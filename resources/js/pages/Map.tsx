import LayersControlConfig from '@/components/Map/LayersControlConfig';
import SearchLayer from '@/components/Map/SearchLayer';
import Sidebar from '@/components/Sidebar/Sidebar';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';

export type AddressData = {
    adressetekst: string;
    adressenavn: string;
    nummer: number;
    gardsnummer: number;
    bruksnummer: number;
    festenummer: number;
    representasjonspunkt: {
        epsg: string;
        lat: number;
        lon: number;
    };
};

const Map = () => {
    const [searchAddressArray, setSearchAddressArray] = useState<AddressData[] | null>(null);

    return (
        <AppLayout>
            <Head title="Kart">
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                    crossOrigin=""
                />
            </Head>
            <MapContainer
                center={[60.34, 10]}
                zoom={10}
                className={styles.mapContainer}
                zoomControl={false}
                minZoom={10}
                maxBounds={[
                    [59.9784, 8.5281],
                    [60.6885, 11.1154],
                ]}
                layers={[lyrSoner, lyrHvittRundt]}
            >
                <ScaleControl position="bottomright" imperial={false} maxWidth={400} />
                <LayersControlConfig />
                <Sidebar setSearchAddressArray={setSearchAddressArray} />
                {searchAddressArray && <SearchLayer addressArray={searchAddressArray} />}
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
