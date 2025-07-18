import L from 'leaflet';
import 'leaflet-wms-header';
import { GeoJSON, LayerGroup, TileLayer } from 'react-leaflet';
import { bakgrunn } from './geoJSON/bakgrunn';
import { kummer } from './geoJSON/kummer';
import { randsoner } from './geoJSON/randsoner';
import { soner } from './geoJSON/soner';
import { trase } from './geoJSON/trase';
import { vaBuffer } from './geoJSON/vaBuffer';
import { GrunnforurensningPopupContent, VannNettPopupContent, VannmiljoPopupContent, returnKumMarker } from './layerStyles';
import WMSLayer from './WMSLayer';

/******** Inital layers used on map inititialization (not on layer control) *********/

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
    onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
        layer.on('click', () => {
            return layer;
        });
    },
});

/************ Gemini Portal WMS with authentication *************/

// const base64UserNameAndPassword = btoa(`${import.meta.env.VITE_WMS_USER}:${import.meta.env.VITE_WMS_PASS}`);

// export const GeminiPortalWMS: L.TileLayer.WMSHeader = L.TileLayer.wmsHeader(
//     'https://ringerike.geminisuite.com/portal/api/proxy/map/va-basis.wms?',
//     {
//         layers: 'va_basis',
//         format: 'image/png',
//         transparent: true,
//     },
//     [
//         {
//             header: 'Authorization',
//             value: `Basic ${base64UserNameAndPassword}`,
//         },
//     ],
//     null,
// );

/**************** Object containing all layers for layer control **********/

export const LAYERS: {
    basemaps: { name: string; component: React.JSX.Element }[];
    overlays: { name: string; component: React.JSX.Element; checked?: boolean }[];
} = {
    basemaps: [
        {
            name: 'Gråtone',
            component: (
                <TileLayer
                    attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
                    url="https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png"
                />
            ),
        },
        {
            name: 'Farger',
            component: (
                <TileLayer
                    attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
                    url="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
                />
            ),
        },
    ],
    overlays: [
        {
            name: 'Buffersone avløp (100 m)',
            component: (
                <GeoJSON
                    data={vaBuffer}
                    style={{
                        color: '#31F731',
                        weight: 1,
                        fillOpacity: 0.1,
                    }}
                />
            ),
        },
        {
            name: 'Randsoner',
            component: (
                <GeoJSON
                    data={randsoner}
                    style={{ color: 'pink' }}
                    onEachFeature={(feature: GeoJSON.Feature, layer: L.Layer) => {
                        const popupOptions = { maxWidth: 200 };

                        layer.bindPopup(
                            `<b>Område: </b>${feature.properties?.Omraade}<br><b>Anbefaling: </b>${feature.properties?.Anbefaling}`,
                            popupOptions,
                        );
                    }}
                />
            ),
        },
        {
            name: 'Nye VA-traseer',
            component: (
                <LayerGroup>
                    <GeoJSON data={trase} style={{ color: 'yellow' }} />
                    <GeoJSON data={kummer} pointToLayer={returnKumMarker} />
                </LayerGroup>
            ),
        },
        {
            name: 'Bygninger med adresse',
            component: (
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
            ),
            checked: true,
        },
        {
            name: 'Eiendom',
            component: (
                <WMSLayer
                    url="https://wms.geonorge.no/skwms1/wms.matrikkel"
                    options={{
                        layers: 'eiendomsgrense,eiendoms_id',
                    }}
                />
            ),
        },
        {
            name: 'Vannflater',
            component: (
                <WMSLayer
                    url="https://wms.geonorge.no/skwms1/wms.topo"
                    options={{
                        layers: 'fkb_vann,Vannkontur,kd_vannflate,kd_vannkontur',
                    }}
                />
            ),
        },
        {
            name: 'Økologisk tilstand (Vann-Nett)',
            component: (
                <WMSLayer
                    url="https://kart2.miljodirektoratet.no/arcgis/services/WMS/Vannforskriften_TilstandPotensialRisiko_OGC/MapServer/WMSServer"
                    options={{
                        layers: 'Oekologisk_tilstand_eller_potensial_elv,Oekologisk_tilstand_eller_potensial_innsjoe',
                        attribution: '<a href="https://vann-nett.no/waterbodies/map/" target="_blank">Miljødirektoratet</a>',
                        identify: true,
                        info_format: 'application/geo+json',
                    }}
                    makePopupContent={VannNettPopupContent}
                />
            ),
        },
        {
            name: 'Løsmassekart',
            component: (
                <WMSLayer
                    url="https://geo.ngu.no/mapserver/LosmasserWMS2"
                    options={{
                        layers: 'Losmasse_Norge,LosmasseFlate_enkel,LosmasseGrense',
                        query_layers: 'LosmasseFlate_enkel',
                        attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
                        opacity: 0.7,
                        identify: true,
                        info_format: 'text/html',
                        minZoomQuery: 12,
                    }}
                />
            ),
        },
        {
            name: 'Flom (200 år) aktsomhet',
            component: (
                <WMSLayer
                    url="https://nve.geodataonline.no/arcgis/services/FlomAktsomhet/MapServer/WMSServer"
                    options={{
                        layers: 'Flom_aktsomhetsomrade',
                        attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
                        identify: false,
                    }}
                />
            ),
        },
        {
            name: 'Marin Grense',
            component: (
                <WMSLayer
                    url="https://geo.ngu.no/mapserver/MarinGrenseWMS4"
                    options={{
                        layers: 'Marin_grense_linjer,Mulig_marin_leire',
                        attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
                    }}
                />
            ),
        },
        {
            name: 'Kvikkleire',
            component: (
                <WMSLayer
                    url="https://nve.geodataonline.no/arcgis/services/SkredKvikkleire2/MapServer/WMSServer"
                    options={{
                        layers: 'KvikkleireKartlagtOmrade,KvikkleireRisiko',
                        attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
                        identify: false,
                    }}
                />
            ),
        },
        {
            name: 'Grunnvann (Granada)',
            component: (
                <WMSLayer
                    url="https://geo.ngu.no/mapserver/GranadaWMS3"
                    options={{
                        layers: 'GranadaWMS3',
                        attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
                        identify: false,
                    }}
                />
            ),
        },
        {
            name: 'Grunnforurensning',
            component: (
                <WMSLayer
                    url="https://kart.miljodirektoratet.no/arcgis/services/grunnforurensning2/MapServer/WMSServer"
                    options={{
                        layers: 'forurenset_omrade,forurenset_omrade_pkt',
                        query_layers: 'forurenset_omrade',
                        attribution: '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
                        identify: true,
                        info_format: 'application/geojson',
                    }}
                    makePopupContent={GrunnforurensningPopupContent}
                />
            ),
        },
        {
            name: 'Vannmiljø',
            component: (
                <WMSLayer
                    url="https://kart.miljodirektoratet.no/arcgis/services/vannmiljo/MapServer/WMSServer"
                    options={{
                        layers: 'vannlokaliteter_pkt',
                        attribution: '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
                        identify: true,
                        info_format: 'application/geojson',
                    }}
                    makePopupContent={VannmiljoPopupContent}
                />
            ),
        },
        {
            name: 'Fremmede arter',
            component: (
                <WMSLayer
                    url="https://kart.artsdatabanken.no/WMS/artskartfa.aspx"
                    options={{
                        layers: 'SE,HI,PH,LO,NK',
                        attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
                        identify: true,
                        info_format: 'text/html',
                    }}
                />
            ),
        },
        {
            name: 'Truede arter',
            component: (
                <WMSLayer
                    url="https://kart.artsdatabanken.no/WMS/artskart.aspx"
                    options={{
                        layers: 'DD,NT,VU,EN,CR,RE',
                        attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
                        identify: true,
                        info_format: 'text/html',
                    }}
                />
            ),
        },
        {
            name: 'Kulturminner',
            component: (
                <WMSLayer
                    url="https://kart.ra.no/wms/kulturminner"
                    options={{
                        layers: 'Kulturminner',
                        attribution: '<a href="http://www.ra.no/" target="_blank">Riksantikvaren</a>',
                        identify: true,
                        info_format: 'text/html',
                    }}
                />
            ),
        },
    ],
};
