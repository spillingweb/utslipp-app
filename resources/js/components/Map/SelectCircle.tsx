import { lyrSoner } from '@/lib/layersDefinitions';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData } from '@/types';
import { LatLngLiteral } from 'leaflet';
import pointInPolygon from 'point-in-polygon';
import { ReactNode, use, useEffect, useState } from 'react';
import { Circle, Tooltip, useMap } from 'react-leaflet';
import { SidebarTab } from '../Sidebar/Sidebar';

type SelectCircleProps = {
    selectedPoint: LatLngLiteral;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
    address?: AddressData;
};

const SelectCircle = ({ selectedPoint, address, setSidebarTabOpen }: SelectCircleProps) => {
    const [zooming, setZooming] = useState(true);
    const { startNewTilsyn } = use(TilsynFormContext);
    const map = useMap();

    useEffect(() => {
        map.flyToBounds([[selectedPoint.lat, selectedPoint.lng]], { maxZoom: 18, paddingTopLeft: [350, 0] });
        map.on('zoomend', () => {
            setZooming(false);
        });
    }, [map, selectedPoint]);

    let zone = 0;

    // Check which zone the selected point is in by iterating through the lyrSoner layer
    lyrSoner.eachLayer((layer) => {
        const lyrGeometry = layer.feature.geometry.coordinates[0][0];
        if (pointInPolygon([selectedPoint.lng, selectedPoint.lat], lyrGeometry)) {
            zone = layer.feature.properties.zone;
        }
    });

    let toolTip: ReactNode = null;

    if (address) {
        const { gardsnummer: gnr, bruksnummer: bnr, festenummer: fnr, adressetekst } = address;
        toolTip = (
            <Tooltip
                interactive
                permanent
                direction="right"
                eventHandlers={{
                    click: () => {
                        setSidebarTabOpen('tilsyn');
                        startNewTilsyn(address, zone);
                    },
                }}
            >
                <b>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</b>
                <br />
                <a href="#">Legg til tilsynsobjekt</a>
            </Tooltip>
        );
    }

    if (zooming) return null;

    return (
        <Circle
            center={[selectedPoint.lat, selectedPoint.lng]}
            radius={20}
            pathOptions={{ color: 'yellow', weight: 10, opacity: 0.5, fillOpacity: 0 }}
            interactive={false}
        >
            {!zooming &&toolTip}
        </Circle>
    );
};

export default SelectCircle;
