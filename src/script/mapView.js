import { LEAFLET_LAYER } from "./config";
import { ZOOM_LEVEL } from "./config";
import iconLocation from "../images/icon-location.svg";

import View from "./view";

class MapView extends View {
  // initialize leaflet map
  #map = L.map("map", {
    zoomControl: false,
  });

  #icon = L.icon({
    iconUrl: iconLocation,
    iconSize: [46, 56],
    iconAnchor: [22, -25],
    popupAnchor: [-3, -76],
  });

  renderMap(coords) {
    this.#map.setView(coords, ZOOM_LEVEL);

    L.tileLayer(LEAFLET_LAYER, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.#map);

    L.marker(coords, {
      icon: this.#icon,
    }).addTo(this.#map);
  }
}
export default new MapView();
