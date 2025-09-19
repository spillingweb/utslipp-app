import * as turf from '@turf/turf';
import { GeoJSON as GeoJSONtype } from 'leaflet';
import { useEffect, useMemo, useRef } from 'react';
import { GeoJSON, LayerGroup, useMap } from 'react-leaflet';

const ProjectLayer = ({ features, selectedProject }: { features: GeoJSON.FeatureCollection; selectedProject: string | null }) => {
    const map = useMap();
    const ProjectLayerRef = useRef<GeoJSONtype | null>(null);

    // Loop through features to find the ones that match the selected project
    const filteredFeatures: GeoJSON.FeatureCollection = useMemo(
        () => ({
            type: 'FeatureCollection',
            features: features.features.filter((feature) => {
                if (selectedProject === 'ingen') {
                    return feature.properties!.project_id === null;
                }
                return feature.properties!.project_id == selectedProject;
            }),
        }),
        [features, selectedProject],
    );

    const projectPolygon = turf.convex(filteredFeatures) as GeoJSON.FeatureCollection | null;

    useEffect(() => {
        if (!ProjectLayerRef.current) return;

        // Update url search query parameter 'prosjekt'
        const params = new URLSearchParams(window.location.search);
        if (selectedProject === 'null') {
            params.set('prosjekt', 'ingen');
        } else if (selectedProject) {
            params.set('prosjekt', selectedProject);
        } else {
            params.delete('prosjekt');
        }
        window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);

        // Zoom to selected project
        if (filteredFeatures.features.length > 0) {
            const bounds = ProjectLayerRef.current.getBounds();
            map.fitBounds(bounds, { paddingTopLeft: [350, 0] });
        }
    }, [selectedProject, filteredFeatures, ProjectLayerRef, map]);

    return (
        <LayerGroup>
            {projectPolygon && (
                <GeoJSON data={projectPolygon} style={{ color: '#0074d9', weight: 2, fillOpacity: 0.1 }} />
            )}
            <GeoJSON data={filteredFeatures} ref={ProjectLayerRef} />
        </LayerGroup>
    );
};

export default ProjectLayer;
