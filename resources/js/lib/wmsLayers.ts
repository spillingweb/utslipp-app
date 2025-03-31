// ******  Topografisk norgeskart  ******

var srcTopo = L.WMS.source("https://openwms.statkart.no/skwms1/wms.topo?", {
  "transparent": true,
  "format": "image/png",
  "identify": false,
});
var lyrVannFKB = srcTopo.getLayer("fkb_vann");
var lyrVannflate = srcTopo.getLayer("kd_vannflate");
var lyrVannkontur = srcTopo.getLayer("kd_vannkontur");
lyrVann = L.layerGroup([lyrVannflate, lyrVannkontur, lyrVannFKB]);

var lyrBygg = srcTopo.getLayer("fkb_bygning");
var lyrAdresseTopo = srcTopo.getLayer("adresse");
lyrByggAdr = L.layerGroup([lyrBygg,lyrAdresseTopo]);

// ******  Matrikkel  ******

var srcMatr = L.WMS.source(
  "https://openwms.statkart.no/skwms1/wms.matrikkel?",
  {
    "transparent": true,
    "format": "image/png",
    "identify": false,
  }
);
var lyrGrense = srcMatr.getLayer("eiendomsgrense"),
  lyrID = srcMatr.getLayer("eiendoms_id"),
  lyrAdresse = srcMatr.getLayer("adresse");
lyrMatr = L.layerGroup([lyrGrense, lyrID, lyrAdresse]);

// ******  Vann-nett (økologisk tilstand vassdrag)  ******

var MySourceVN = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }

    if (info.substring(0, 7) != "<iframe") {
        var infoArray = info.split(";");
      var navn = infoArray[19];
      var id = infoArray[18];
      var tilstand = infoArray[22];
      info =
        '\
                <table class="table-condensed">\
                    <tr>\
                        <td colspan="2"><a href="https://vann-nett.no/portal/#/waterbody/' +
        id +
        '" target="_blank" style="cursor:pointer">Åpne Vann-Nett</a></td>\
                    </tr>\
                    <tr>\
                        <th>Navn på vannforekomst:</th>\
                        <td>' +
        navn +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Økologisk tilstand/potensial:</th>\
                        <td>" +
        tilstand +
        "</td>\
                    </tr>\
                </table>";
      this._map.openPopup(info, latlng);
    }
  },
});

var srcVN = new MySourceVN(
  "https://kart2.miljodirektoratet.no/arcgis/services/WMS/Vannforskriften_TilstandPotensialRisiko_OGC/MapServer/WMSServer",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/plain",
  }
);
var lyrVNElv = srcVN.getLayer("Oekologisk_tilstand_eller_potensial_elv");
var lyrVNInn = srcVN.getLayer("Oekologisk_tilstand_eller_potensial_innsjoe");
var lyrVannNett = L.layerGroup([lyrVNElv, lyrVNInn]);

// ******  Løsmassekart  ******

var MySourceNGU = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }
    var infoHTML = document.createElement("span");
    infoHTML.innerHTML = info;
    var infoTabell = infoHTML.querySelector(".feature-losmasseflater");
    var overskrifter = infoHTML.querySelectorAll(".layer-result-section");
    overskrifter.forEach((overskrift) => {
      if (!overskrift.contains(infoTabell)) {
        overskrift.remove();
      }
    });
    this._map.openPopup(infoHTML, latlng, {
      maxWidth: 400,
    });
  },
});

var srcNGU = new MySourceNGU("https://geo.ngu.no/mapserver/LosmasserWMS2", {
  format: "image/png",
  transparent: true,
  srs: "4326",
  info_format: "text/html",
  opacity: 0.7,
});

var lyrLosGrense = srcNGU.getLayer("LosmasseGrense"),
  lyrLosFlate = srcNGU.getLayer("Losmasse_flate");
lyrLos = L.layerGroup([lyrLosFlate, lyrLosGrense]);

// ******  Artsdatabanken  ******

var MySourceArt = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }
    if (info) {
      this._map.openPopup(info, latlng, {
        maxWidth: 400,
        maxHeight: 400,
      });
    }
  },
});

var srcFremArt = new MySourceArt(
  "https://kart.artsdatabanken.no/WMS/artskartfa.aspx",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/html",
  }
);

var lyrSE = srcFremArt.getLayer("SE"),
  lyrHI = srcFremArt.getLayer("HI");
lyrPH = srcFremArt.getLayer("PH");
lyrLO = srcFremArt.getLayer("LO");
lyrNK = srcFremArt.getLayer("NK");
lyrFremArt = L.layerGroup([lyrSE, lyrHI, lyrPH, lyrLO, lyrNK]);

var srcRødArt = new MySourceArt(
  "https://kart.artsdatabanken.no/WMS/artskart.aspx",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/html",
  }
);
var lyrDD = srcRødArt.getLayer("DD"),
  lyrNT = srcRødArt.getLayer("NT");
lyrVU = srcRødArt.getLayer("VU");
lyrEN = srcRødArt.getLayer("EN");
lyrCR = srcRødArt.getLayer("CR");
lyrRE = srcRødArt.getLayer("RE");
lyrRødArt = L.layerGroup([lyrDD, lyrNT, lyrVU, lyrEN, lyrCR, lyrRE]);

// ******  Flom aktsomhet  ******

var srcFlomAkt = L.WMS.source(
  "https://nve.geodataonline.no/arcgis/services/FlomAktsomhet/MapServer/WMSServer?",
  {
    "transparent": true,
    "format": "image/png",
    "identify": false,
  }
);
var lyrFlomAkt = srcFlomAkt.getLayer("Flom_aktsomhetsomrade");

// ******  Marin leire  ******

var srcNGUmarin = L.WMS.source(
  "https://geo.ngu.no/mapserver/MarinGrenseWMS3?",
  {
    "transparent": true,
    "format": "image/png",
    "identify": false,
  }
);
var lyrMuligMarin = srcNGUmarin.getLayer("Mulig_marin_leire"),
  lyrMarinGrense = srcNGUmarin.getLayer("Marin_grense_linje");
lyrMarinFlateUnder = srcNGUmarin.getLayer("Marin_grense_flate_under");
lyrMarin = L.layerGroup([lyrMuligMarin, lyrMarinGrense, lyrMarinFlateUnder]);

// ******  Kvikkleire  ******

var srcKvikkleire = L.WMS.source(
  "https://nve.geodataonline.no/arcgis/services/SkredKvikkleire2/MapServer/WMSServer",
  {
    "transparent": true,
    "format": "image/png",
    "identify": false,
  }
);
var lyrKartlagt = srcKvikkleire.getLayer("KvikkleireKartlagtOmrade"),
  lyrRisiko = srcKvikkleire.getLayer("KvikkleireRisiko");
lyrKvikkleire = L.layerGroup([lyrKartlagt, lyrRisiko]);

// ******  Grunnvann (Granada)  ******

var srcGranada = L.WMS.source("https://geo.ngu.no/mapserver/GranadaWMS3", {
  "transparent": true,
  "format": "image/png",
  "identify": false,
});
var lyrGranada = srcGranada.getLayer("GranadaWMS3");

// ******  Kulturminner  ******

var MySourceKultur = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }
    if (info) {
      this._map.openPopup(info, latlng, {
        maxWidth: 400,
        maxHeight: 400,
      });
    }
  },
});

var srcKultur = new MySourceKultur(
  "https://kart.ra.no/wms/kulturminner",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/html",
  }
);
var lyrKultur = srcKultur.getLayer("Kulturminner");

// ******  Grunnforurensning  ******

var MySourceGrunn = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }

    if (info.substring(0, 7) != "<iframe") {
      infoArray = info.split(";");
      var lokNavn = infoArray[12];
      var lokType = infoArray[13];
      var paavirk = infoArray[15];
      var lokID = infoArray[18];
      var myndig = infoArray[19];
      var prosess = infoArray[20];
      info =
        '\
                <table class="table-condensed">\
                    <tr>\
                        <th>Lokalitet:</th>\
                        <td>' +
        lokID +
        " - " +
        lokNavn +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Lokalitetstype:</th>\
                        <td>" +
        lokType +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Myndighet:</th>\
                        <td>" +
        myndig +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Påvirkningsgrad:</th>\
                        <td>" +
        paavirk +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Prosesstatus:</th>\
                        <td>" +
        prosess +
        "</td>\
                    </tr>\
                </table>";
      this._map.openPopup(info, latlng);
    }
  },
});

var srcGrunnFor = new MySourceGrunn(
  "https://kart.miljodirektoratet.no/arcgis/services/grunnforurensning2/MapServer/WMSServer",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/plain",
  }
);

var lyrGrunnForFlate = srcGrunnFor.getLayer("forurenset_omrade");
lyrGrunnForPunkt = srcGrunnFor.getLayer("forurenset_omrade_pkt");
lyrGrunnFor = L.layerGroup([lyrGrunnForFlate, lyrGrunnForPunkt]);

// ******  Vannmiljø  ******

var MySourceVannmiljo = L.WMS.Source.extend({
  "showFeatureInfo": function (latlng, info) {
    if (!this._map) {
      return;
    }

    if (info.substring(0, 7) != "<iframe") {
      infoArray = info.split(";");
      console.log(infoArray);
      var lokNavn = infoArray[9];
      var besk = infoArray[10];
      var aktiv = infoArray[11];
      var lokID = infoArray[13];

      info =
        '\
                <table class="table-condensed">\
                    <tr>\
                        <td colspan="2"><a href="https://vannmiljofaktaark.miljodirektoratet.no/Home/Details/' +
        lokID +
        '" target="_blank" style="cursor:pointer">Faktaark Vannmiljø</a></td>\
                    </tr>\
                    <tr>\
                        <th>Vannlokalitet:</th>\
                        <td>' +
        lokID +
        " - " +
        lokNavn +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Beskrivelse:</th>\
                        <td>" +
        (besk !== null ? besk : "") +
        "</td>\
                    </tr>\
                    <tr>\
                        <th>Aktiviteter:</th>\
                        <td>" +
        (aktiv !== null ? aktiv : "") +
        "</td>\
                    </tr>\
                </table>";
      this._map.openPopup(info, latlng);
    }
  },
});

var srcVannmiljo = new MySourceVannmiljo(
  "https://kart.miljodirektoratet.no/arcgis/services/vannmiljo/MapServer/WMSServer",
  {
    transparent: true,
    format: "image/png",
    info_format: "text/plain",
  }
);

var lyrVannmiljo = srcVannmiljo.getLayer("vannlokaliteter_pkt");
