import L from "leaflet";
import axios from "axios";

L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  initialize: function (url, options, username, password) {
    L.TileLayer.WMS.prototype.initialize.call(this, url, options);
    this._username = username;
    this._password = password;
  },

  async _fetchImage(url, callback) {
    const { data: res } = await axios.get(url, {
      responseType: "blob",
      auth: {
        username: this._username,
        password: this._password,
      },
    });
    callback(res);
  },

  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    this._fetchImage(url, (resp) => {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        if (this.results) {
          this.results.next(reader.result);
        }
      };
      reader.readAsDataURL(resp);
      done(null, img);
    });
    return img;
  },

  getFeatureInfo(evt) {
    return this.getFeatureInfoUrl(evt.latlng);
  },

  getWmsParams() {
    return {
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.query_layers,
    };
  },

  getLegend() {
    const bounds = this._map.getBounds();
    let sw = bounds.getSouthWest();
    let ne = bounds.getNorthEast();
    sw = [sw.lng, sw.lat];
    ne = [ne.lng, ne.lat];
    const params = {
      request: "GetLegendGraphic",
      styles: this.wmsParams.styles,
      service: "WMS",
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: [sw.join(","), ne.join(",")].join(","),
      height: 20,
      width: 20,
      token: this.wmsParams.token,
      layer: this.wmsParams.layers,
      info_format: "image/png",
    };

    return this._url + L.Util.getParamString(params, this._url, true);
  },

  getUrlRoot() {
    return this._url;
  },

  getLayerName() {
    return this.wmsParams.layers;
  },

  getFeatureInfoUrl(latlng) {
    // Construct a GetFeatureInfo request URL given a point
    const point = this._map.latLngToContainerPoint(latlng).round();
    const size = this._map.getSize();
    const bounds = this._map.getBounds();
    let sw = bounds.getSouthWest();
    let ne = bounds.getNorthEast();
    sw = [sw.lng, sw.lat];
    ne = [ne.lng, ne.lat];

    const params = {
      request: "GetFeatureInfo",
      service: "WMS",
      styles: this.wmsParams.styles,
      transparent: this.wmsParams.transparent,
      version: this.wmsParams.version,
      format: this.wmsParams.format,
      bbox: [sw.join(","), ne.join(",")].join(","),
      height: size.y,
      width: size.x,
      token: this.wmsParams.token,
      layers: this.wmsParams.layers,
      query_layers: this.wmsParams.layers,
      info_format: "application/json",
    };

    if (this.wmsParams.propertyName) params.propertyName = this.wmsParams.propertyName;

    params[params.version === "1.3.0" ? "i" : "x"] = point.x;
    params[params.version === "1.3.0" ? "j" : "y"] = point.y;

    return this._url + L.Util.getParamString(params, this._url, true);
  },
});

L.TileLayer.betterWms = (url, options, username, password) => {
  return new L.TileLayer.BetterWMS(url, options, username, password);
};