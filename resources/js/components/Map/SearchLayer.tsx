import { AddressData } from '@/types';
import { Circle, LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

type SearchLayerProps = {
    addressArray: AddressData[];
    onNewTilsyn: (address: AddressData) => void;
};

const SearchLayer = ({ addressArray, onNewTilsyn }: SearchLayerProps) => {
    const map = useMap();

    if (addressArray.length === 1) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst, representasjonspunkt } = addressArray[0];
        const { lat, lon } = representasjonspunkt;

        // Only zoom to the address if it is not already in the map view and the zoom level is less than 18
        if (!map.getBounds().contains([lat, lon]) || map.getZoom() < 18) {
            map.flyTo([lat, lon], 18);
        }

        return (
            <Circle center={[lat, lon]} radius={20} pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}>
                <Tooltip interactive permanent direction="right">
                    <b>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</b>
                    <br />
                    <a href="#" onClick={() => onNewTilsyn(addressArray[0])}>
                        Legg til tilsynsobjekt
                    </a>
                </Tooltip>
            </Circle>
        );
    }

    return (
        <LayerGroup>
            {addressArray.map((address, index) => {
                const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst, representasjonspunkt } = address;
                const { lat, lon } = representasjonspunkt;

                return (
                    <Marker key={index} position={[lat, lon]}>
                        <Tooltip>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</Tooltip>
                    </Marker>
                );
            })}
        </LayerGroup>
    );
};

export default SearchLayer;
