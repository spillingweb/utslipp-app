import { AddressData } from '@/types';
import { LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

type SearchLayerProps = {
    addressArray: AddressData[];
};

const SearchLayer = ({ addressArray }: SearchLayerProps) => {
    const map = useMap();

    const coordArray: [number, number][] = [];
    addressArray.forEach((address) => {
        const { representasjonspunkt } = address;
        if (representasjonspunkt) {
            const { lat, lon } = representasjonspunkt;
            coordArray.push([lat, lon]);
        }
    });

    // Only zoom to the address if it is not already in the map view and the zoom level is less than 18
    if (!map.getBounds().contains(coordArray) || map.getZoom() < 18) {
        map.flyToBounds(coordArray, { maxZoom: 18, paddingTopLeft: [300, 0] });
    }

    // If there are multiple addresses, render markers for each address
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
