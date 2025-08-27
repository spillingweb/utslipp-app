import { returnTilsynMarker } from '@/lib/layerStyles';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';
import { GeoJSON as GeoJSONtype, LatLngBounds } from 'leaflet';
import { use, useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { SelectedPointContext } from '@/store/selected-point-context';
import { SidebarContext } from '@/store/sidebar-context';

type TilsynLayerProps = {
    features: GeoJSON.FeatureCollection;
    setTilsynLayerBounds: React.Dispatch<React.SetStateAction<LatLngBounds | null>>;
};

const TilsynLayer = ({ features, setTilsynLayerBounds }: TilsynLayerProps) => {
    const { setData, setTilsynFormProperties } = use(TilsynFormContext);
    const { setSelectedPoint } = use(SelectedPointContext);
    const { setSidebarTabOpen } = use(SidebarContext);

    const tilsynLayerRef = useRef<GeoJSONtype | null>(null);
    const map = useMap();

    useEffect(() => {
        if (!tilsynLayerRef.current) return;

        tilsynLayerRef.current.clearLayers(); // Clear previous layers
        tilsynLayerRef.current.addData(features); // Add new features
        setTilsynLayerBounds(tilsynLayerRef.current.getBounds()); // Update bounds

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
            ref={tilsynLayerRef}
        />
    );
};

export default TilsynLayer;
