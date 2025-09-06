import Filter from '@/components/Filter/Filter';
import Legend from '@/components/Legend/Legend';
// import DrawToolbar from '@/components/Map/DrawToolbar';
import LayersControlConfig from '@/components/Map/LayersControlConfig';
import ProjectLayer from '@/components/Map/ProjectLayer';
import SelectCircle from '@/components/Map/SelectCircle';
import TilsynLayer from '@/components/Map/TilsynLayer';
import Search from '@/components/Search/Search';
import Sidebar from '@/components/Sidebar/Sidebar';
import FilterByProject from '@/components/TilsynObjects/FilterByProject';
import TilsynForm from '@/components/TilsynObjects/TilsynForm';
import AppLayout from '@/layouts/AppLayout';
import { lyrHvittRundt, lyrSoner } from '@/lib/layersDefinitions';
import TilsynContext from '@/store/TilsynContext';
import { AddressData } from '@/types';
import { Head } from '@inertiajs/react';
import L, { LatLngBounds } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, ScaleControl } from 'react-leaflet';
import styles from './Map.module.css';

const Map = ({ tilsynObjectsData }: { tilsynObjectsData: GeoJSON.FeatureCollection | null }) => {
    const [tilsynObjects, setTilsynObjects] = useState<GeoJSON.FeatureCollection | null>(null);
    const [toolTip, setToolTip] = useState<AddressData | null>(null);
    const [tilsynLayerBounds, setTilsynLayerBounds] = useState<LatLngBounds | null>(null);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const [selectedProject, setSelectedProject] = useState<string>(urlSearchParams.get('prosjekt') || '');

    useEffect(() => {
        if (tilsynObjectsData) {
            setTilsynObjects(tilsynObjectsData);
            setToolTip(null);
        }
    }, [tilsynObjectsData]);

    // Disable click propagation on the project select to prevent map interactions when clicking on the select
    const projectSelect = useRef<HTMLSelectElement | null>(null);
    useEffect(() => {
        if (projectSelect.current) {
            L.DomEvent.disableClickPropagation(projectSelect.current);
        }
    }, []);

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
                <LayersControlConfig position="topright" />
                {/* <DrawToolbar /> */}
                <FilterByProject
                    ref={projectSelect}
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    className={styles.filterByProject}
                />
                {tilsynObjects && <ProjectLayer features={tilsynObjects} selectedProject={selectedProject} key={selectedProject} />}
                <TilsynContext>
                    {tilsynObjects && <TilsynLayer setTilsynLayerBounds={setTilsynLayerBounds} features={tilsynObjects} />}
                    <SelectCircle address={toolTip ? toolTip : undefined} />
                    <Sidebar>
                        <Search setToolTip={setToolTip} />
                        <TilsynForm />
                        <Filter tilsynObjects={tilsynObjects} tilsynLayerBounds={tilsynLayerBounds} />
                        <Legend />
                    </Sidebar>
                </TilsynContext>
            </MapContainer>
        </AppLayout>
    );
};

export default Map;
