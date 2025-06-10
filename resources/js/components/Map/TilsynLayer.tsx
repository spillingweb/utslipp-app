import { returnTilsynMarker } from '@/lib/layerStyles';
import { TilsynFormContext } from '@/store/tilsyn-form-context';
import { TilsynObject } from '@/types';
import { LatLngLiteral, LeafletMouseEvent } from 'leaflet';
import { use } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';

type TilsynLayerProps = {
    features: GeoJSON.FeatureCollection;
    setSelectedPoint: React.Dispatch<React.SetStateAction<LatLngLiteral | null>>;
};

const TilsynLayer = ({ features, setSelectedPoint }: TilsynLayerProps) => {
    const { setTilsynFormData, setTilsynFormProperties } = use(TilsynFormContext);
    const map = useMap();

    const handleTilsynClick = (e: LeafletMouseEvent, feature: GeoJSON.Feature) => {
        setTilsynFormData(feature.properties as TilsynObject);
        setTilsynFormProperties({
            open: true,
            disabled: true,
        });

        // Make yellow circle around the clicked point
        const { lat, lng } = e.target.getLatLng();
        setSelectedPoint({ lat, lng });
        map.setView([lat, lng], 18, { animate: true });
        map.fire('click'); // Trigger click event to close any open tooltips
    };

    return (
        <GeoJSON
            data={features}
            pointToLayer={returnTilsynMarker}
            onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
                layer.on('click', (e) => handleTilsynClick(e, feature));
            }}
        />
    );
};

export default TilsynLayer;
