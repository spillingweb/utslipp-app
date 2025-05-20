import { AddressData, TilsynObject } from '@/types';
import { Circle, LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

type SearchLayerProps = {
    addressArray: AddressData[];
    setTilsynFormData: React.Dispatch<React.SetStateAction<TilsynObject | null>>;
};

const SearchLayer = ({ addressArray, setTilsynFormData }: SearchLayerProps) => {
    const map = useMap();

    if (addressArray.length === 1) {
        const address = addressArray[0];

        // Make yellow circle around the address and fly to location
        const { lat, lon } = addressArray[0].representasjonspunkt;

        // Only zoom to the address if it is not already in the map view and the zoom level is less than 18
        if (!map.getBounds().contains([lat, lon]) || map.getZoom() < 18) {
            map.flyTo([lat, lon], 18);
        }

        const handleClickNewTilsyn: React.MouseEventHandler<HTMLAnchorElement> = () => {
            //  Gjør noe for å bli kvitt tooltip
            setTilsynFormData({
                gnr: address.gardsnummer,
                bnr: address.bruksnummer,
                fnr: address.festenummer,
                adresse: address.adressetekst,
            } as TilsynObject);
        };

        return (
            <Circle center={[lat, lon]} radius={20} pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}>
                <Tooltip interactive permanent direction="right">
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
