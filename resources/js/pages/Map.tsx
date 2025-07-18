import Filter from '@/components/Filter/Filter';
import Legend from '@/components/Legend/Legend';
import LayersControlConfig from '@/components/Map/LayersControlConfig';
import SelectCircle from '@/components/Map/SelectCircle';
import TilsynLayer from '@/components/Map/TilsynLayer';
import Search from '@/components/Search/Search';
import Sidebar, { SidebarTab } from '@/components/Sidebar/Sidebar';
import TilsynForm from '@/components/TilsynObjects/TilsynForm';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import { TilsynFormProvider } from '@/store/tilsyn-form-context';
import { AddressData, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { LatLngLiteral } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';
import Flash from '@/components/ui/Flash';

type MapProps = {
    tilsynObjectsData: string;
    users: User[];
    projects: {
        name: string;
        number: number;
    }[];
};

const Map = ({ tilsynObjectsData }: MapProps) => {
    const [sidebarTabOpen, setSidebarTabOpen] = useState<SidebarTab | null>('search');
    const [tilsynObjects, setTilsynObjects] = useState<GeoJSON.FeatureCollection | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<LatLngLiteral | null>(null);
    const [toolTip, setToolTip] = useState<AddressData | null>(null);

    const { flash } = usePage<{ flash: { success: string | null; error: string | null } }>().props;

    // Parse the tilsynObjectsData and set it to state
    useEffect(() => {
        if (tilsynObjectsData && tilsynObjectsData.length > 0) {
            const parsedData = JSON.parse(tilsynObjectsData) as GeoJSON.FeatureCollection;
            setTilsynObjects(parsedData);
        }
    }, [tilsynObjectsData]);

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
            <Flash message={flash} />
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
                <LayersControlConfig position="topright" />
                <TilsynFormProvider>
                    {tilsynObjects && (
                        <TilsynLayer features={tilsynObjects} setSelectedPoint={setSelectedPoint} setSidebarTabOpen={setSidebarTabOpen} />
                    )}
                    {selectedPoint && (
                        <SelectCircle selectedPoint={selectedPoint} address={toolTip ? toolTip : undefined} setSidebarTabOpen={setSidebarTabOpen} />
                    )}
                    <Sidebar tabOpen={sidebarTabOpen} setTabOpen={setSidebarTabOpen}>
                        <Search
                            isOpen={sidebarTabOpen === 'search'}
                            setSelectedPoint={setSelectedPoint}
                            setToolTip={setToolTip}
                            setSidebarTabOpen={setSidebarTabOpen}
                        />
                        <Filter isOpen={sidebarTabOpen === 'filter'} tilsynObjects={tilsynObjects} />
                        <Legend isOpen={sidebarTabOpen === 'legend'} />
                        <TilsynForm isOpen={sidebarTabOpen === 'tilsyn'} setSelectedPoint={setSelectedPoint} selectedPoint={selectedPoint} />
                    </Sidebar>
                </TilsynFormProvider>
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
