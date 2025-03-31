import L from "leaflet";
import { useEffect, useRef } from "react";
import {
  lyrGraatone,
  lyrHvittRundt,
  lyrSoner,
} from "../lib/layersDefinitions";
import { layers } from "../lib/layersControl";

export const useInitMap = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<L.Map>(null);

  useEffect(() => {
    if (map.current) return; // avoid re-creating map
    if (!mapContainer.current) return; // avoid creating map without container

    // initialize map with center and max bounds coordinates, a zoom value, and initial layers
    map.current = new L.Map(mapContainer.current, {
      center: [60.34, 9.8],
      zoom: 10,
      zoomControl: false,
      minZoom: 10,
      maxZoom: 18,
      maxBounds: [
        [59.9784, 8.5281],
        [60.6885, 11.1154],
      ],
      layers: [lyrGraatone, lyrSoner, lyrHvittRundt],
    });

    if (map.current) {
      // Add layers control and scale
      L.control.layers(layers.basemaps, layers.overlays).addTo(map.current);

      L.control
        .scale({ position: "bottomright", imperial: false, maxWidth: 200 })
        .addTo(map.current);
    }
  }, []);

  return { map, mapContainer };
};
