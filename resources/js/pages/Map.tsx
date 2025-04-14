import Filter from '@/components/Filter/Filter';
import Legend from '@/components/Legend/Legend';
import ContextClick from '@/components/Map/ContextClick';
import LayersControlConfig from '@/components/Map/LayersControlConfig';
import Search from '@/components/Search/Search';
import Sidebar from '@/components/Sidebar/Sidebar';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { Head } from '@inertiajs/react';
import L from 'leaflet';
import { useState } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';

const Map = () => {
    const [map, setMap] = useState<L.Map | null>(null);

    // const [position, setPosition] = useState<L.LatLng | null>(null);

    // const onMove = useCallback(() => {
    //     if (map) {
    //         setPosition(map.getCenter());
    //     }
    // }, [map]);

    // useEffect(() => {
    //     if (!map) return;

    //     map.on('move', onMove);
    //     return () => {
    //         map.off('move', onMove);
    //     };
    // }, [map, onMove]);

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
                ref={setMap}
                className={styles.mapContainer}
                zoomControl={false}
                minZoom={10}
                maxBounds={[
                    [59.9784, 8.5281],
                    [60.6885, 11.1154],
                ]}
                layers={[lyrSoner, lyrHvittRundt]}
            >
                <LayersControlConfig />
                <ScaleControl position="bottomright" imperial={false} maxWidth={400}/>
                <ContextClick />
            </MapContainer>
            <Sidebar>
                <Search map={map} />
                <Filter />
                <Legend />
            </Sidebar>
        </AppLayout>
    );
};

export default Map;
