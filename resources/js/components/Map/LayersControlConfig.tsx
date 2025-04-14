import {
    BuffersoneOverlay,
    ByggAdresse,
    FargerBackground,
    FlomAkt,
    FremmedeArter,
    GraatoneBackground,
    Granada,
    GrunnForurensning,
    Kulturminner,
    Kvikkleire,
    Losmasser,
    MarinGrense,
    Matrikkel,
    RandsoneOverlay,
    TruedeArter,
    UtbyggingOverlay,
    Vann,
    Vannmiljo,
    VannNett,
} from '@/lib/layersDefinitions';
import { LayersControl } from 'react-leaflet';

export const LAYERS = {
    basemaps: [
        { name: 'Gråtone', component: <GraatoneBackground /> },
        { name: 'Farger', component: <FargerBackground /> },
    ],
    overlays: [
        { name: 'Buffersone avløp (100 m)', component: <BuffersoneOverlay /> },
        { name: 'Randsoner', component: <RandsoneOverlay /> },
        { name: 'Nye VA-traseer', component: <UtbyggingOverlay /> },
        { name: 'Eiendom', component: <Matrikkel /> },
        { name: 'Bygninger med adresse', component: <ByggAdresse /> },
        { name: 'Vannflater', component: <Vann /> },
        { name: 'Økologisk tilstand (Vann-Nett)', component: <VannNett /> },
        { name: 'Løsmassekart', component: <Losmasser /> },
        { name: 'Flom (200 år) aktsomhet', component: <FlomAkt /> },
        { name: 'Marin Grense', component: <MarinGrense /> },
        { name: 'Kvikkleire', component: <Kvikkleire /> },
        { name: 'Grunnvann (Granada)', component: <Granada /> },
        { name: 'Grunnforurensning', component: <GrunnForurensning /> },
        { name: 'Vannmiljø', component: <Vannmiljo /> },
        { name: 'Fremmede arter', component: <FremmedeArter /> },
        { name: 'Truede arter', component: <TruedeArter /> },
        { name: 'Kulturminner', component: <Kulturminner /> },
    ],
};

const LayersControlConfig = () => {
    return (
        <LayersControl position="topright">
            {LAYERS.basemaps.map((layer, index) => (
                <LayersControl.BaseLayer key={layer.name} checked={index === 0} name={layer.name}>
                    {layer.component}
                </LayersControl.BaseLayer>
            ))}
            {LAYERS.overlays.map((layer) => (
                <LayersControl.Overlay key={layer.name} name={layer.name}>
                    {layer.component}
                </LayersControl.Overlay>
            ))}
        </LayersControl>
    );
};

export default LayersControlConfig;
