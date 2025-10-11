import { popup } from 'leaflet';
import { useState } from 'react';
import { useMapEvent, WMSTileLayer } from 'react-leaflet';

type WMSOptions = {
    layers: string;
    attribution?: string;
    opacity?: number;
    identify?: boolean;
    info_format?: string;
    query_layers?: string;
    minZoomQuery?: number;
};

const INFO_FORMATS_TEXT = ['text/plain', 'text/html', 'application/vnd.ogc.gml'];
const INFO_FORMATS_JSON = ['application/json', 'application/geojson', 'application/gml+json', 'application/geo+json'];

const WMSLayer = ({ url, options, makePopupContent }: { url: string; options: WMSOptions; makePopupContent?: (data: any) => string }) => {
    const [isVisible, setIsVisible] = useState(false);

    const { layers, identify, info_format = 'text/plain', query_layers, minZoomQuery } = options;

    const map = useMapEvent('click', (e) => {
        if (!isVisible || !identify) return; // Check if the layer is visible and identify is enabled
        if (minZoomQuery && map.getZoom() < minZoomQuery) return; // Check if the current zoom level is below the minimum required for querying
        if (!map.options.crs) return; // Ensure the map has a CRS defined

        const crs = map.options.crs;

        // Project coordinates to the map's CRS for WMS request
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const swProjected = crs.project(sw);
        const neProjected = crs.project(ne);

        const { x, y } = e.containerPoint || { x: 0, y: 0 };

        const params = new URLSearchParams({
            request: 'GetFeatureInfo',
            service: 'WMS',
            version: '1.3.0',
            layers: layers,
            query_layers: query_layers || layers,
            info_format: info_format,
            feature_count: '10',
            width: map.getSize().x.toString(),
            height: map.getSize().y.toString(),
            bbox: `${swProjected.x},${swProjected.y},${neProjected.x},${neProjected.y}`,
            crs: crs.code!.toString(),
            x: x.toString(),
            y: y.toString(),
        });

        fetch(`${url}?${params.toString()}`)
            .then((response) => {
                return INFO_FORMATS_TEXT.includes(info_format) ? response.text() : response.json();
            })
            .then((data) => {
                if (INFO_FORMATS_JSON.includes(info_format) && data.features.length === 0) return; // No features found
                if (INFO_FORMATS_TEXT.includes(info_format) && data === '') return; // No data returned

                // Make popup with information from the response
                popup({ maxHeight: 300, maxWidth: 400 })
                    .setLatLng(e.latlng)
                    .setContent(makePopupContent ? makePopupContent(data) : data)
                    .openOn(map);
            })
            .catch((error) => console.error('Error fetching WMS:', error));
    });

    return (
        <WMSTileLayer
            eventHandlers={{ add: () => setIsVisible(true), remove: () => setIsVisible(false) }}
            url={url}
            format="image/png"
            transparent={true}
            crossOrigin={true}
            {...options}
        />
    );
};

export default WMSLayer;
