import { AddressData } from '@/pages/Map';
import { Circle, LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

type SearchLayerProps = {
    addressArray: AddressData[];
    setTilsynFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchLayer = ({ addressArray, setTilsynFormVisible }: SearchLayerProps) => {
    const map = useMap();

    if (addressArray.length === 1) {
        // Make yellow circle around the address and fly to location
        const { lat, lon } = addressArray[0].representasjonspunkt;

        // Only zoom to the address if it is not already in the map view and the zoom level is less than 18
        if (!map.getBounds().contains([lat, lon]) || map.getZoom() < 18) {
            map.flyTo([lat, lon], 18);
        }

        const handleClickNewTilsyn: React.MouseEventHandler<HTMLAnchorElement> = () => {
            //  Gjør noe for å bli kvitt tooltip
            setTilsynFormVisible(true);
        };

        return (
            <Circle center={[lat, lon]} radius={15} pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}>
                <Tooltip interactive direction="right" offset={[50, 0]}>
                    <b>{addressArray[0].adressetekst}</b>
                    <br />
                    <a href="#" onClick={handleClickNewTilsyn}>
                        Legg til tilsynsobjekt
                    </a>
                </Tooltip>
            </Circle>
        );
    }

    return (
        <LayerGroup>
            {addressArray.map((address, index) => {
                const { lat, lon } = address.representasjonspunkt;
                return (
                    <Marker key={index} position={[lat, lon]}>
                        <Tooltip>{address.adressetekst}</Tooltip>
                    </Marker>
                );
            })}
        </LayerGroup>
    );
};

export default SearchLayer;
