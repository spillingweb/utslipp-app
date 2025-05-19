import LayersControlConfig from '@/components/Map/LayersControlConfig';
import SearchLayer from '@/components/Map/SearchLayer';
import Sidebar from '@/components/Sidebar/Sidebar';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { returnTilsynMarker } from '@/lib/layerStyles';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { GeoJSON, MapContainer, ScaleControl } from 'react-leaflet';
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

const Map = ({ tilsynObjects }: { tilsynObjects: {jsonb_build_object: string}[] }) => {
    const [searchAddressArray, setSearchAddressArray] = useState<AddressData[] | null>(null);
    const [tilsynFormVisible, setTilsynFormVisible] = useState(false);

    const tilsynObjectsJSON = JSON.parse(tilsynObjects[0].jsonb_build_object);
    console.log(tilsynObjectsJSON);

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
                <GeoJSON data={tilsynObjectsJSON} pointToLayer={returnTilsynMarker} />
                <ScaleControl position="bottomright" imperial={false} maxWidth={400} />
                <LayersControlConfig position="topright" />
                <Sidebar setSearchAddressArray={setSearchAddressArray} tilsynFormVisible={tilsynFormVisible} />
                {searchAddressArray && <SearchLayer addressArray={searchAddressArray} setTilsynFormVisible={setTilsynFormVisible} />}
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
