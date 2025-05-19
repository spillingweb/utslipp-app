import { LAYERS } from '@/lib/layersDefinitions';
import { ControlPosition } from 'leaflet';
import { LayersControl } from 'react-leaflet';

const LayersControlConfig = ({ position }: { position: ControlPosition }) => {
    return (
        <LayersControl position={position}>
            {LAYERS.basemaps.map((layer, index) => (
                <LayersControl.BaseLayer key={layer.name} checked={index === 0} name={layer.name}>
                    {layer.component}
                </LayersControl.BaseLayer>
            ))}
            {LAYERS.overlays.map((layer) => (
                <LayersControl.Overlay checked={layer.checked ? true : undefined} key={layer.name} name={layer.name}>
                    {layer.component}
                </LayersControl.Overlay>
            ))}
        </LayersControl>
    );
};

export default LayersControlConfig;
