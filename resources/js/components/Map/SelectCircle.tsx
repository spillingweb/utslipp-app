import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData } from '@/types';
import { LatLngLiteral } from 'leaflet';
import { ReactNode, use } from 'react';
import { Circle, Tooltip, useMap } from 'react-leaflet';

type SelectCircleProps = {
    selectedPoint: LatLngLiteral;
    address?: AddressData;
};

const SelectCircle = ({ selectedPoint, address }: SelectCircleProps) => {
    const { startNewTilsyn } = use(TilsynFormContext);
    const map = useMap();
    map.flyToBounds([[selectedPoint.lat, selectedPoint.lng]], { maxZoom: 18, paddingTopLeft: [350, 0] });

    let toolTip: ReactNode = null;

    if (address) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst } = address;
        toolTip = (
            <Tooltip interactive permanent direction="right">
                <b>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</b>
                <br />
                <a href="#" onClick={() => startNewTilsyn(address, 3)}>
                    Legg til tilsynsobjekt
                </a>
            </Tooltip>
        );
    }

    return (
        <Circle
            center={[selectedPoint.lat, selectedPoint.lng]}
            radius={20}
            pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}
        >
            {toolTip}
        </Circle>
    );
};

export default SelectCircle;
