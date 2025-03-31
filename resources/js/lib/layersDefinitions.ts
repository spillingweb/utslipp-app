import L from "leaflet";
import { soner } from "./geoJSON/soner";
import { bakgrunn } from "./geoJSON/bakgrunn";
import { randsoner } from "./geoJSON/randsoner";
import { trase } from "./geoJSON/trase";
import { kummer } from "./geoJSON/kummer";
import { vaBuffer } from "./geoJSON/vaBuffer";

// Base maps and background layers
export const lyrGraatone = L.tileLayer(
  "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png",
  { attribution: '<a href="http://www.kartverket.no/">Kartverket</a>' }
);

export const lyrFarger = L.tileLayer(
  "https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png",
  { attribution: '<a href="http://www.kartverket.no/">Kartverket</a>' }
);

export const lyrHvittRundt = L.geoJSON(bakgrunn, {
  style: {
    "color": "darkgrey",
    "weight": 1,
    "fillColor": "white",
    "fillOpacity": 0.8,
  },
});

export const lyrSoner = L.geoJSON(soner, {
  style: {
    "color": "darkviolet",
    "weight": 1,
    "fillOpacity": 0,
  },
});

// layer for potential zones (Randsoner = Skoglundsoner og Åsa)
export const lyrRandsone = L.geoJSON(randsoner, {
  style: {
    "color": "pink",
  },
  onEachFeature: function (feature, layer) {
    const popupOptions = { maxWidth: 200 };
    layer.bindPopup(
      "<b>Område:</b> " +
        feature.properties.Omraade +
        "<br><b>Anbefaling: </b>" +
        feature.properties.Anbefaling,
      popupOptions
    );
  },
});

// layers for planned water and sewage
function styleKumMarker(feature: GeoJSON.Feature): L.CircleMarkerOptions {
  let circleMarkerOptions: L.CircleMarkerOptions = {
    radius: 2.5,
    opacity: 1,
    weight: 1.0,
    fill: true,
    fillOpacity: 1,
    interactive: true,
  };

  if (!feature.properties) return circleMarkerOptions;

  if (feature.properties["KUR_anlegg"] === "ja") {
    circleMarkerOptions = {
      ...circleMarkerOptions,
      color: "darkslategrey",
      fillColor: "gray",
    };
  } else if (feature.properties["KUR_anlegg"] === "nei") {
    circleMarkerOptions = {
      ...circleMarkerOptions,
      color: "gold",
      dashArray: "",
      lineCap: "butt",
      lineJoin: "miter",
      fillColor: "yellow",
    };
  }

  return circleMarkerOptions;
}

function returnKumMarker(feature: GeoJSON.Feature, latlng: L.LatLng) {
  return L.circle(latlng, styleKumMarker(feature));
}

const lyrNyeTraseer = L.geoJSON(trase, {
  style: { "color": "yellow", "weight": 2, "dashOffset": "3" },
});
const lyrNyeKummer = L.geoJSON(kummer, { pointToLayer: returnKumMarker });
export const lyrUtbygging = L.layerGroup([lyrNyeTraseer, lyrNyeKummer]);

// layer for buffer zones around sewage pipes
export const lyrBuffersone = L.geoJSON(vaBuffer, {
  style: {
    "color": "#31F731",
    "weight": 1,
    "fillOpacity": 0.1,
  },
});

/************ WMS layers ************/

type WMSOptions = {
  layers: string;
  attribution?: string;
  opacity?: number;
  identify?: boolean;
};

function makeWMSLayer(url: string, options: WMSOptions): L.TileLayer.WMS {
  return L.tileLayer.wms(url, {
    format: "image/png",
    transparent: true,
    crossOrigin: true,
    ...options,
  });
}

// layer for sediments (Løsmassekart)
export const lyrLosmasser = makeWMSLayer(
  "https://geo.ngu.no/mapserver/LosmasserWMS2",
  {
    layers: "Losmasse_Norge,LosmasseFlate_enkel,LosmasseGrense",
    attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
    opacity: 0.7,
  }
);

// layer for water surfaces
export const lyrVann = makeWMSLayer("https://wms.geonorge.no/skwms1/wms.topo", {
  layers: "fkb_vann,Vannkontur,kd_vannflate,kd_vannkontur",
});

// layer for buildings
export const lyrByggAdresse = makeWMSLayer(
  "https://wms.geonorge.no/skwms1/wms.topo",
  {
    layers: "fkb_bygning,adresse",
  }
);

// layer for property (Matrikkelen)
export const lyrMatrikkel = makeWMSLayer(
  "https://wms.geonorge.no/skwms1/wms.matrikkel",
  {
    layers: "eiendomsgrense,eiendoms_id",
  }
);

// layer for ecological status or potential of waters (Vann-Nett)
export const lyrVannNett = makeWMSLayer(
  "https://kart2.miljodirektoratet.no/arcgis/services/WMS/Vannforskriften_TilstandPotensialRisiko_OGC/MapServer/WMSServer",

  {
    layers:
      "Oekologisk_tilstand_eller_potensial_elv,Oekologisk_tilstand_eller_potensial_innsjoe",
    attribution:
      '<a href="https://vann-nett.no/waterbodies/map/" target="_blank">Miljødirektoratet</a>',
  }
);

// layer for invasive species
export const lyrFremmedeArter = makeWMSLayer(
  "https://kart.artsdatabanken.no/WMS/artskartfa.aspx",
  {
    layers: "SE,HI,PH,LO,NK",
    attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
  }
);

// layer for endangered species
export const lyrTruedeArter = makeWMSLayer(
  "https://kart.artsdatabanken.no/WMS/artskart.aspx",
  {
    layers: "DD,NT,VU,EN,CR,RE",
    attribution: '<a href="http://www.artsdatabanken.no/" target="_blank">Artsdatabanken</a>',
  }
);

// layer  for quick clay
export const lyrKvikkleire = makeWMSLayer(
  "https://nve.geodataonline.no/arcgis/services/SkredKvikkleire2/MapServer/WMSServer",
  {
    layers: "KvikkleireKartlagtOmrade,KvikkleireRisiko",
    attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
    identify: false,
  }
);

// layer for groundwater wells (Granada)
export const lyrGranada = makeWMSLayer(
  "https://geo.ngu.no/mapserver/GranadaWMS3",
  {
    layers: "GranadaWMS3",
    attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
    identify: false,
  }
);

// layer for flood risk
export const lyrFlomAkt = makeWMSLayer(
  "https://nve.geodataonline.no/arcgis/services/FlomAktsomhet/MapServer/WMSServer",
  {
    layers: "Flom_aktsomhetsomrade",
    attribution: '<a href="http://www.nve.no/" target="_blank">NVE</a>',
    identify: false,
  }
);

// layer for marine boundaries
export const lyrMarinGrense = makeWMSLayer(
  "https://geo.ngu.no/mapserver/MarinGrenseWMS4",
  {
    layers: "Marin_grense_linjer,Mulig_marin_leire",
    attribution: '<a href="http://www.ngu.no/" target="_blank">NGU</a>',
  }
);

// layer for cultural heritage
export const lyrKulturminner = makeWMSLayer("https://kart.ra.no/wms/kulturminner", {
  layers: "Kulturminner",
  attribution: '<a href="http://www.ra.no/" target="_blank">Riksantikvaren</a>',
});

// layer for groundwater pollution
export const lyrGrunnForurensning = makeWMSLayer(
  "https://kart.miljodirektoratet.no/arcgis/services/grunnforurensning2/MapServer/WMSServer",
  {
    layers: "forurenset_omrade,forurenset_omrade_pkt",
    attribution:
      '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
  }
);

// layer for water environment
export const lyrVannmiljo = makeWMSLayer(
  "https://kart.miljodirektoratet.no/arcgis/services/vannmiljo/MapServer/WMSServer",
  {
    layers: "vannlokaliteter_pkt",
    attribution:
      '<a href="http://www.miljodirektoratet.no/" target="_blank">Miljødirektoratet</a>',
  }
);

