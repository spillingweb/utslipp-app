import L from 'leaflet';

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

export const makeVannNettPopupContent = (data: { features: VannNettDataFeature[] }) => {
    let popupContent = '';

    data.features.forEach((feature) => {
        const { VannforekomstID: id, Vannforekomstnavn: name, Økologisk_tilstand_potensial: potential } = feature.properties;

        popupContent += `<table style="margin-bottom:1rem; border-spacing:0.5rem">
            <tbody>
                <tr>
                    <td colspan="2">
                        <a href="https://vann-nett.no/waterbodies/${id}" target="_blank" style="cursor:pointer">
                            Åpne Vann-Nett
                        </a>
                    </td>
                </tr>
                <tr>
                    <th>Navn:</th>
                    <td>${name}</td>
                </tr>
                <tr>
                    <th>Tilstand:</th>
                    <td>${potential}</td>
                </tr>
            </tbody>
        </table>`;
    });

    return popupContent;
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

export const makeGrunnforurensningPopupContent = (data: { features: GrunnforurensningFeature[] }) => {
    let popupContent = '';

    data.features.forEach((feature) => {
        const {
            Lokalitetnavn: name,
            Lokalitettype: type,
            Myndighet: responsible,
            Pavirkningsgrad: degree,
            Prosesstatus: status,
        } = feature.properties;

        popupContent += `<table style="margin-bottom:1rem; border-spacing:0.5rem">
            <thead>
                <th colspan="2">${name.toUpperCase()}</td>
            </thead>
            <tbody>
                <tr>
                    <th>Lokalitetstype:</th>
                    <td>${type}</td>
                </tr>
                <tr>
                    <th>Myndighet:</th>
                    <td>${responsible}</td>
                </tr>
                <tr>
                    <th>Påvirkningsgrad:</th>
                    <td>${degree}</td>
                </tr>
                <tr>
                    <th>Prosesstatus:</th>
                    <td>${status}</td>
                </tr>
            </tbody>
        </table>`;
    });

    return popupContent;
};
