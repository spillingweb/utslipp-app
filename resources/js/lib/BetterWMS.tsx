import L from "leaflet";
import "./L.TileLayer.BetterWMS";
import {
  createTileLayerComponent,
  createElementObject,
  updateGridLayer,
} from "@react-leaflet/core";

const BetterWMS = createTileLayerComponent(
  function createBetterWMSLayer({ options, url, layers, username, password, ...props }, context) {
    const layer = L.TileLayer.betterWms(url, { layers, ...props }, username, password);

    return createElementObject(layer, context);
  },
  (layer, props, prevProps) => {
    updateGridLayer(layer, props, prevProps);

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params);
    }
  }
);

export default BetterWMS;