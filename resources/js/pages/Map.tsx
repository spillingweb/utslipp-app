import Search from '@/components/Search/Search';
import Sidebar from '@/components/Sidebar/Sidebar';
import { useInitMap } from '@/hooks/useInitMap';
import AppLayout from '@/layouts/AppLayout';
import Filter from '../components/Filter/Filter';
import Legend from '../components/Legend/Legend';
import styles from './Map.module.css';
import { Head } from '@inertiajs/react';

const Map = () => {
    const { map, mapContainer } = useInitMap();

    return (
        <AppLayout>
            <Head title="Kart" />
            <section id="map" className={styles.mapWrapper}>
                <div ref={mapContainer} className={styles.mapContainer}></div>
                <Sidebar>
                    <Search mapRef={map} />
                    <Filter />
                    <Legend />
                </Sidebar>
            </section>
        </AppLayout>
    );
};

export default Map;
