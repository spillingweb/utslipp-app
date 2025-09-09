import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { TILSYN_STATUS } from './tilsynStatus';

/******* Marker styles ********/

// tilsyn objects
function styleTilsynObjectsMarker(feature: GeoJSON.Feature): L.CircleMarkerOptions {
    let circleMarkerOptions: L.CircleMarkerOptions = {
        radius: 15,
        fillOpacity: 0.3,
        color: 'black',
        interactive: true,
    };

    if (!feature.properties) return circleMarkerOptions;

    for (const status of TILSYN_STATUS) {
        const featureStatus = feature.properties.status;
        if (featureStatus === status.value) {
            if (featureStatus === 'O') {
                circleMarkerOptions = {
                    ...circleMarkerOptions,
                    radius: 7.5,
                    color: status.color,
                };
            } else {
                circleMarkerOptions = {
                    ...circleMarkerOptions,
                    color: status.color,
                };
            }
            break;
        }
    }
    return circleMarkerOptions;
}

export const returnTilsynMarker = (feature: GeoJSON.Feature, latlng: L.LatLng) => {
    return L.circle(latlng, styleTilsynObjectsMarker(feature));
};

// new sewage pipes
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

export const returnKumMarker = (feature: GeoJSON.Feature, latlng: L.LatLng) => {
    return L.circle(latlng, styleKumMarker(feature));
};

/******* Popup styles ********/

// Vann-Nett popup

type VannNettDataFeature = {
    properties: {
        VannforekomstID: string;
        Vannforekomstnavn: string;
        Økologisk_tilstand_potensial: string;
    };
};

export const VannNettPopupContent = (data: { features: VannNettDataFeature[] }) => {
    const JSXContent = (
        <>
            {data.features.map((feature) => {
                const { VannforekomstID: id, Vannforekomstnavn: name, Økologisk_tilstand_potensial: potential } = feature.properties;

                return (
                    <table key={id} style={{ marginBottom: '1rem', borderSpacing: '0.5rem' }}>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <a href={`https://vann-nett.no/waterbodies/${id}`} target="_blank" style={{ cursor: 'pointer' }}>
                                        Åpne Vann-Nett
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Navn:</th>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <th>Tilstand:</th>
                                <td>{potential}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}
        </>
    );

    // Render the JSX content to a static HTML string
    const htmlContent = renderToStaticMarkup(JSXContent);

    return htmlContent;
};

// Grunnforurensning popup

type GrunnforurensningFeature = {
    properties: {
        Lokalitetnavn: string;
        Lokalitettype: string;
        Myndighet: string;
        Pavirkningsgrad: string;
        Prosesstatus: string;
    };
};

export const GrunnforurensningPopupContent = (data: { features: GrunnforurensningFeature[] }) => {
    const JSXContent = (
        <>
            {data.features.map((feature) => {
                const {
                    Lokalitetnavn: name,
                    Lokalitettype: type,
                    Myndighet: responsible,
                    Pavirkningsgrad: degree,
                    Prosesstatus: status,
                } = feature.properties;

                return (
                    <table key={name} style={{ marginBottom: '1rem', borderSpacing: '0.5rem' }}>
                        <thead>
                            <th colSpan={2}>{name.toUpperCase()}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Lokalitetstype:</th>
                                <td>{type}</td>
                            </tr>
                            <tr>
                                <th>Myndighet:</th>
                                <td>{responsible}</td>
                            </tr>
                            <tr>
                                <th>Påvirkningsgrad:</th>
                                <td>{degree}</td>
                            </tr>
                            <tr>
                                <th>Prosesstatus:</th>
                                <td>{status}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            })}
        </>
    );

    // Render the JSX content to a static HTML string
    const htmlContent = renderToStaticMarkup(JSXContent);

    return htmlContent;
};

type VannmiljoFeature = {
    properties: {
        Navn: string;
        Faktaark: string;
    };
};

export const VannmiljoPopupContent = (data: { features: VannmiljoFeature[] }) => {
    const JSXContent = (
        <>
            {data.features.map((feature) => {
                const { Navn, Faktaark } = feature.properties;

                return (
                    <div key={Navn}>
                        <b>{Navn}</b>
                        <p style={{ margin: 0 }}>
                            <a target="_blank" href={Faktaark}>
                                {Faktaark}
                            </a>
                        </p>
                    </div>
                );
            })}
        </>
    );

    // Render the JSX content to a static HTML string
    const htmlContent = renderToStaticMarkup(JSXContent);

    return htmlContent;
};
