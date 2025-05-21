import LayersControlConfig from '@/components/Map/LayersControlConfig';
import SearchLayer from '@/components/Map/SearchLayer';
import Sidebar from '@/components/Sidebar/Sidebar';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { returnTilsynMarker } from '@/lib/layerStyles';
import { AddressData, TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';
import L from 'leaflet';

const Map = ({ tilsynData }: { tilsynData: { jsonb_build_object: string }[] }) => {
    const [searchAddressArray, setSearchAddressArray] = useState<AddressData[] | null>(null);
    const [tilsynFormData, setTilsynFormData] = useState<TilsynObject | null>(null);
    const [tilsynObjects, setTilsynObjects] = useState<GeoJSON.FeatureCollection | null>(null);

    // Parse the tilsynData and set it to state
    useEffect(() => {
        if (tilsynData && tilsynData.length > 0) {
            const parsedTilsynObjects = JSON.parse(tilsynData[0].jsonb_build_object);
            setTilsynObjects(parsedTilsynObjects);
        }
    }, [tilsynData]);

    const handleTilsynClick = (feature: GeoJSON.Feature) => {
        if (!feature.properties) return;
        setTilsynFormData(feature.properties as TilsynObject);

        setSearchAddressArray([{
            gardsnummer: feature.properties.gnr,
            bruksnummer: feature.properties.bnr,
            festenummer: feature.properties.fnr,
            adressetekst: feature.properties.adresse,
            representasjonspunkt: {
                lat: feature.geometry.coordinates[1],
                lon: feature.geometry.coordinates[0],
            },
        }] as AddressData[]);
    };

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
                {tilsynObjects && (
                    <GeoJSON
                        data={tilsynObjects}
                        pointToLayer={returnTilsynMarker}
                        onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
                            layer.on('click', () => handleTilsynClick(feature));
                        }}
                    />
                )}
                <ScaleControl position="bottomright" imperial={false} maxWidth={400} />
                <LayersControlConfig position="topright" />
                <Sidebar setSearchAddressArray={setSearchAddressArray} tilsynFormData={tilsynFormData} setTilsynFormData={setTilsynFormData} />
                {searchAddressArray && <SearchLayer addressArray={searchAddressArray} setTilsynFormData={setTilsynFormData} />}
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
