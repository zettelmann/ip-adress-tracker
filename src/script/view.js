import { LEAFLET_LAYER } from "./config";
import { ZOOM_LEVEL } from "./config";
const ipOutput = document.querySelector(".result__ip-data");
const locationOutput = document.querySelector(".result__location-data");
const timzoneOutput = document.querySelector(".result__timezone-data");
const ipsOutput = document.querySelector(".result__isp-data");

class View {
  /* INTIALIZING MAP OUTSIDE A FUNCTION, ALLOWS TO REFRESH THE MAP*/
  #map = L.map("map");

  renderOutput(results) {
    ipOutput.innerHTML = results.ip;
    locationOutput.innerHTML = `${results.locationCity}, ${results.locationRegion}`;
    timzoneOutput.innerHTML = results.timezone;
    ipsOutput.innerHTML = results.isp;
  }

  renderMap(coords) {
    this.#map.setView(coords, ZOOM_LEVEL);

    L.tileLayer(LEAFLET_LAYER, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
      .openPopup();
  }
}
export default new View();
