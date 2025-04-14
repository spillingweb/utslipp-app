import { useFetch } from '@/hooks/useFetch';
import { LatLng } from 'leaflet';
import { useState } from 'react';
import { Marker, Popup, useMapEvent } from 'react-leaflet';
import { AddressData } from '../Search/Search';
import { fetchPositionData } from '@/lib/http';

const ContextClick = () => {
    const [position, setPosition] = useState<LatLng | null>(null);

    const { fetchedData, fetchData } = useFetch<{ adresser: AddressData[] }>();

    useMapEvent('contextmenu', (e) => {
        setPosition(e.latlng);
        fetchData(() => fetchPositionData(e.latlng.lat, e.latlng.lng));
        console.log(fetchedData?.adresser[0]);
    });

    return position === null ? null : (
        <Marker position={position}>
            {fetchedData && <Popup position={position}>
                This is a popup
            </Popup>}
        </Marker>
    );
};

export default ContextClick;
