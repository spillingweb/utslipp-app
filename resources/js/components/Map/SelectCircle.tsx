import { lyrSoner } from '@/lib/layersDefinitions';
import { SelectedPointContext } from '@/store/selected-point-context';
import { SidebarContext } from '@/store/sidebar-context';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { AddressData, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import pointInPolygon from 'point-in-polygon';
import { ReactNode, use, useEffect, useState } from 'react';
import { Circle, Tooltip, useMap } from 'react-leaflet';

type SelectCircleProps = {
    address?: AddressData;
};

const SelectCircle = ({ address }: SelectCircleProps) => {
    const { can } = usePage<SharedData>().props;

    const { selectedPoint } = use(SelectedPointContext);
    const { startNewTilsyn } = use(TilsynFormContext);
    const { setSidebarTabOpen } = use(SidebarContext);

    const [zooming, setZooming] = useState(true);
    const map = useMap();

    useEffect(() => {
        if (selectedPoint) {
            map.flyToBounds([[selectedPoint.lat, selectedPoint.lng]], { maxZoom: 18, paddingTopLeft: [350, 0] });
        }
        map.on('zoomend', () => {
            setZooming(false);
        });
    }, [map, selectedPoint]);

    if (!selectedPoint) return null;

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
                eventHandlers={
                    can.tilsyn_object_edit
                        ? {
                              click: () => {
                                  setSidebarTabOpen('tilsyn');
                                  startNewTilsyn(address, zone);
                              },
                          }
                        : undefined
                }
            >
                <b>{`${gnr}/${bnr}${fnr ? `/${fnr}` : ''} - ${adressetekst}`}</b>
                <br />
                {can.tilsyn_object_edit && <a href="#">Legg til tilsynsobjekt</a>}
                <br />
                <a href={`https://ringerike.documaster.no/browse/?gnr=${gnr}&bnr=${bnr}${fnr ? `&fnr=${fnr}` : ''}`} target="_blank">
                    Åpne Documaster
                </a>
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
            {!zooming && toolTip}
        </Circle>
    );
};

export default SelectCircle;
