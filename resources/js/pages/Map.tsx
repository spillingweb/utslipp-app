import Filter from '@/components/Filter/Filter';
import Legend from '@/components/Legend/Legend';
import LayersControlConfig from '@/components/Map/LayersControlConfig';
import Search from '@/components/Search/Search';
import TilsynForm from '@/components/Search/TilsynForm';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useTilsynForm } from '@/hooks/useTilsynForm';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { returnTilsynMarker } from '@/lib/layerStyles';
import { AddressData, TilsynObject } from '@/types';
import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';

const Map = ({ tilsynObjectsData }: { tilsynObjectsData: { jsonb_build_object: string }[] }) => {
    const [tabOpen, setTabOpen] = useState<'search' | 'filter' | 'legend' | null>('search');
    const [tilsynObjects, setTilsynObjects] = useState<GeoJSON.FeatureCollection | null>(null);

    const { tilsynData, tilsynFormProperties, setTilsynFormProperties, setTilsynData, startNewTilsyn } = useTilsynForm();

    // Parse the tilsynObjectsData and set it to state
    useEffect(() => {
        if (tilsynObjectsData && tilsynObjectsData.length > 0) {
            const parsedTilsynObjects = JSON.parse(tilsynObjectsData[0].jsonb_build_object);
            setTilsynObjects(parsedTilsynObjects);
        }
    }, [tilsynObjectsData]);

    function handleSubmitTilsynForm(e: React.FormEvent) {
        e.preventDefault();
        // router.post('/login')
    }

    const handleTilsynClick = (feature: GeoJSON.Feature) => {
        setTilsynData(feature.properties as TilsynObject);
        setTilsynFormProperties({
            open: true,
            disabled: true,
        });
    };

    const handleNewTilsyn = (address: AddressData) => {
        // Få bort tooltip?
        startNewTilsyn(address, 3); // Finn en måte å få sonen fra kartlaget
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
                <Sidebar tabOpen={tabOpen} setTabOpen={setTabOpen}>
                    <Search isOpen={tabOpen === 'search'} setTabOpen={setTabOpen} onNewTilsyn={handleNewTilsyn} setTilsynFormProperties={setTilsynFormProperties}>
                        {tilsynData && tilsynFormProperties.open === true && (
                            <TilsynForm
                                formData={tilsynData}
                                onSubmit={handleSubmitTilsynForm}
                                setValues={setTilsynData}
                                disabled={tilsynFormProperties.disabled}
                            />
                        )}
                    </Search>
                    <Filter isOpen={tabOpen === 'filter'} />
                    <Legend isOpen={tabOpen === 'legend'} />
                </Sidebar>
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
