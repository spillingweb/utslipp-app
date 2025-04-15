import { AddressData } from '@/pages/Map';
import { Circle, LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

const SearchLayer = ({ addressArray }: { addressArray: AddressData[] }) => {
    const map = useMap();

    if (addressArray.length === 1) {
        // Make yellow circle around the address and fly to location
        const { lat, lon } = addressArray[0].representasjonspunkt;
        map.flyTo([lat, lon], 18);

        return <Circle center={[lat, lon]} radius={15} pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }} />;
    }

    const onMarkerClick = (address: AddressData) => {
        console.log(address);
    };

    return (
        <LayerGroup>
            {addressArray.map((address, index) => {
                const { lat, lon } = address.representasjonspunkt;
                return (
                    <Marker key={index} position={[lat, lon]} eventHandlers={{ click: () => onMarkerClick(address) }}>
                        <Tooltip >{address.adressetekst}</Tooltip>
                    </Marker>
                );
            })}
        </LayerGroup>
    );
};

export default SearchLayer;
