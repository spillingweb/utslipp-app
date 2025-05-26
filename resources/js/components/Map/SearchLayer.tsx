import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData } from '@/types';
import { use } from 'react';
import { Circle, LayerGroup, Marker, Tooltip, useMap } from 'react-leaflet';

type SearchLayerProps = {
    addressArray: AddressData[];
    toolTipOpen: boolean;
    setToolTipOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchLayer = ({ addressArray, toolTipOpen, setToolTipOpen }: SearchLayerProps) => {
    const map = useMap();

    const { startNewTilsyn } = use(TilsynFormContext);

    if (addressArray.length > 0) {
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
    }

    const handleNewTilsyn = (address: AddressData) => {
        setToolTipOpen(false);
        startNewTilsyn(address, 3); // Finn en måte å få sonen fra kartlaget

        const { lat, lon } = address.representasjonspunkt;
        map.flyToBounds([[lat, lon]], { paddingTopLeft: [300, 0], maxZoom: 18 });
    };

    if (addressArray.length === 1) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst, representasjonspunkt } = addressArray[0];
        const { lat, lon } = representasjonspunkt;

        return (
            <Circle center={[lat, lon]} radius={20} pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}>
                {toolTipOpen && (
                    <Tooltip interactive permanent direction="right">
                        <b>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</b>
                        <br />
                        <a href="#" onClick={() => handleNewTilsyn(addressArray[0])}>
                            Legg til tilsynsobjekt
                        </a>
                    </Tooltip>
                )}
            </Circle>
        );
    }

    return (
        <LayerGroup>
            {addressArray.map((address, index) => {
                const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst, representasjonspunkt } = address;
                const { lat, lon } = representasjonspunkt;

                return (
                    <Marker key={index} position={[lat, lon]} eventHandlers={{ click: () => console.log('Marker clicked!') }}>
                        <Tooltip>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</Tooltip>
                    </Marker>
                );
            })}
        </LayerGroup>
    );
};

export default SearchLayer;
