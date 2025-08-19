import { returnTilsynMarker } from '@/lib/layerStyles';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';
import { GeoJSON as GeoJSONtype, LatLngBounds, LatLngLiteral } from 'leaflet';
import { use, useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { SidebarTab } from '../Sidebar/Sidebar';

type TilsynLayerProps = {
    features: GeoJSON.FeatureCollection;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
    setSidebarTabOpen: React.Dispatch<React.SetStateAction<SidebarTab | null>>;
    setTilsynLayerBounds: React.Dispatch<React.SetStateAction<LatLngBounds | null>>;
};

const TilsynLayer = ({ features, setSelectedPoint, setSidebarTabOpen, setTilsynLayerBounds }: TilsynLayerProps) => {
    const { setData, setTilsynFormProperties } = use(TilsynFormContext);
    const tilsynRef = useRef<GeoJSONtype | null>(null);
    const map = useMap();

    useEffect(() => {
        if (!tilsynRef.current) return;

        tilsynRef.current.clearLayers(); // Clear previous layers
        tilsynRef.current.addData(features); // Add new features
        setTilsynLayerBounds(tilsynRef.current.getBounds()); // Update bounds

    }, [features, setTilsynLayerBounds]);

    const handleTilsynClick = (feature: GeoJSON.Feature<GeoJSON.Point>) => {
        setSidebarTabOpen('tilsyn');
        setData(feature.properties as TilsynObject);
        setTilsynFormProperties({
            open: true,
            disabled: true,
            mode: 'edit',
        });

        // Make yellow circle around the clicked point
        const lat = feature.geometry.coordinates[1];
        const lng = feature.geometry.coordinates[0];
        setSelectedPoint({ lat, lng });
        map.fire('click'); // Trigger click event to close any open tooltips
    };

    return (
        <GeoJSON
            data={features}
            pointToLayer={returnTilsynMarker}
            onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
                if (feature.geometry.type === 'Point') {
                    layer.on('click', () => handleTilsynClick(feature as GeoJSON.Feature<GeoJSON.Point>));
                }
            }}
            ref={tilsynRef}
        />
    );
};

export default TilsynLayer;
