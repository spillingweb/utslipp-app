import L from 'leaflet';
import { GeoJSON, LayerGroup, TileLayer, WMSTileLayer } from 'react-leaflet';
import { bakgrunn } from './geoJSON/bakgrunn';
import { kummer } from './geoJSON/kummer';
import { randsoner } from './geoJSON/randsoner';
import { soner } from './geoJSON/soner';
import { trase } from './geoJSON/trase';
import { vaBuffer } from './geoJSON/vaBuffer';

/******** Background layer and inital layers *********/

export const GraatoneBackground = () => (
    <TileLayer
        attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
        url="https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png"
    />
);

export const FargerBackground = () => (
    <TileLayer
        attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
        url="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
    />
);

export const lyrHvittRundt = L.geoJSON(bakgrunn, {
    style: {
        color: 'darkgrey',
        weight: 1,
        fillColor: 'white',
        fillOpacity: 0.8,
    },
});

export const lyrSoner = L.geoJSON(soner, {
    style: {
        color: 'darkviolet',
        weight: 1,
        fillOpacity: 0,
    },
});

/******* Overlay layers and custom styling **********/

// layer for areas that are considered for public sewage
export const RandsoneOverlay = () => (
    <GeoJSON
        data={randsoner}
        style={{ color: 'pink' }}
        onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
            const popupOptions = { maxWidth: 200 };

            layer.bindPopup(
                '<b>Område:</b> ' + feature.properties?.Omraade + '<br><b>Anbefaling: </b>' + feature.properties?.Anbefaling,
                popupOptions,
            );
        }}
    />
);

// layer for new sewage pipes
function styleKumMarker(feature: GeoJSON.Feature): L.CircleMarkerOptions {
    let circleMarkerOptions: L.CircleMarkerOptions = {
        radius: 2.5,
        opacity: 1,
        weight: 1.0,
        fill: true,
        fillOpacity: 1,
        interactive: true,
        color: 'gold',
        lineCap: 'butt',
        lineJoin: 'miter',
        fillColor: 'yellow',
    };

    if (!feature.properties) return circleMarkerOptions;

    if (feature.properties['KUR_anlegg'] === 'ja') {
        circleMarkerOptions = {
            ...circleMarkerOptions,
            color: 'darkgreen',
            fillColor: 'green',
            radius: 3.5,
        };
    }

    return circleMarkerOptions;
}

const returnKumMarker = (feature: GeoJSON.Feature, latlng: L.LatLng) => {
    return L.circle(latlng, styleKumMarker(feature));
};

export const UtbyggingOverlay = () => (
    <LayerGroup>
        <GeoJSON data={trase} style={{ color: 'yellow' }} />
        <GeoJSON data={kummer} pointToLayer={returnKumMarker} />
    </LayerGroup>
);

// layer for buffer zones around sewage pipes
export const BuffersoneOverlay = () => (
    <GeoJSON
        data={vaBuffer}
        style={{
            color: '#31F731',
            weight: 1,
            fillOpacity: 0.1,
        }}
    />
);

/************ WMS overlay layers ************/

type WMSOptions = {
    layers: string;
    attribution?: string;
    opacity?: number;
    identify?: boolean;
};

const WMSLayer = ({ url, options }: { url: string; options: WMSOptions }) => {
    return <WMSTileLayer url={url} format="image/png" transparent={true} crossOrigin={true} {...options} />;
};

// layer for sediments (Løsmassekart)
export const Losmasser = () => (
    <WMSLayer
        url="https://geo.ngu.no/mapserver/LosmasserWMS2"
        options={{
            layers: 'Losmasse_Norge,LosmasseFlate_enkel,LosmasseGrense',
            attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
            opacity: 0.7,
        }}
    />
);

// layer for water surfaces
export const Vann = () => (
    <WMSLayer
        url="https://wms.geonorge.no/skwms1/wms.topo"
        options={{
            layers: 'fkb_vann,Vannkontur,kd_vannflate,kd_vannkontur',
        }}
    />
);

// layer for buildings
export const ByggAdresse = () => (
    <LayerGroup>
        <WMSLayer
            url="https://wms.geonorge.no/skwms1/wms.topo"
            options={{
                layers: 'fkb_bygning',
            }}
        />
        <WMSLayer
            url="https://wms.geonorge.no/skwms1/wms.matrikkel"
            options={{
                layers: 'adresse',
            }}
        />
    </LayerGroup>
);

// layer for property (Matrikkelen)
export const Matrikkel = () => (
    <WMSLayer
        url="https://wms.geonorge.no/skwms1/wms.matrikkel"
        options={{
            layers: 'eiendomsgrense,eiendoms_id',
        }}
    />
);

// layer for ecological status or potential of waters (Vann-Nett)
export const VannNett = () => (
    <WMSLayer
        url="https://kart2.miljodirektoratet.no/arcgis/services/WMS/Vannforskriften_TilstandPotensialRisiko_OGC/MapServer/WMSServer"
        options={{
            layers: 'Oekologisk_tilstand_eller_potensial_elv,Oekologisk_tilstand_eller_potensial_innsjoe',
            attribution: '<a href="https://vann-nett.no/waterbodies/map/" target="_blank">Miljødirektoratet</a>',
        }}
    />
);

// layer for invasive species
export const FremmedeArter = () => (
    <WMSLayer
        url="https://kart.artsdatabanken.no/WMS/artskartfa.aspx"
        options={{
            layers: 'SE,HI,PH,LO,NK',
            attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
        }}
    />
);

// layer for endangered species
export const TruedeArter = () => (
    <WMSLayer
        url="https://kart.artsdatabanken.no/WMS/artskart.aspx"
        options={{
            layers: 'DD,NT,VU,EN,CR,RE',
            attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
        }}
    />
);

// layer  for quick clay
export const Kvikkleire = () => (
    <WMSLayer
        url="https://nve.geodataonline.no/arcgis/services/SkredKvikkleire2/MapServer/WMSServer"
        options={{
            layers: 'KvikkleireKartlagtOmrade,KvikkleireRisiko',
            attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
            identify: false,
        }}
    />
);

// layer for groundwater wells (Granada)
export const Granada = () => (
    <WMSLayer
        url="https://geo.ngu.no/mapserver/GranadaWMS3"
        options={{
            layers: 'GranadaWMS3',
            attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
            identify: false,
        }}
    />
);

// layer for flood risk
export const FlomAkt = () => (
    <WMSLayer
        url="https://nve.geodataonline.no/arcgis/services/FlomAktsomhet/MapServer/WMSServer"
        options={{
            layers: 'Flom_aktsomhetsomrade',
            attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
            identify: false,
        }}
    />
);

// layer for marine boundaries
export const MarinGrense = () => (
    <WMSLayer
        url="https://geo.ngu.no/mapserver/MarinGrenseWMS4"
        options={{
            layers: 'Marin_grense_linjer,Mulig_marin_leire',
            attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
        }}
    />
);

// layer for cultural heritage
export const Kulturminner = () => (
    <WMSLayer
        url="https://kart.ra.no/wms/kulturminner"
        options={{
            layers: 'Kulturminner',
            attribution: '<a href="http://www.ra.no/" target="_blank">Riksantikvaren</a>',
        }}
    />
);

// layer for groundwater pollution
export const GrunnForurensning = () => (
    <WMSLayer
        url="https://kart.miljodirektoratet.no/arcgis/services/grunnforurensning2/MapServer/WMSServer"
        options={{
            layers: 'forurenset_omrade,forurenset_omrade_pkt',
            attribution: '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
        }}
    />
);

// layer for water environment
export const Vannmiljo = () => (
    <WMSLayer
        url="https://kart.miljodirektoratet.no/arcgis/services/vannmiljo/MapServer/WMSServer"
        options={{
            layers: 'vannlokaliteter_pkt',
            attribution: '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
        }}
    />
);
