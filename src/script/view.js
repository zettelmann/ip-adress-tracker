import { LEAFLET_LAYER } from "./config";
import { ZOOM_LEVEL } from "./config";

class View {
  /* INTIALIZING MAP OUTSIDE A FUNCTION, ALLOWS TO REFRESH THE MAP*/
  #map = L.map("map");
  #ipOutput = document.querySelector(".result__ip-data");
  #locationOutput = document.querySelector(".result__location-data");
  #timzoneOutput = document.querySelector(".result__timezone-data");
  #ipsOutput = document.querySelector(".result__isp-data");
  #searchForm = document.querySelector(".form");
  #searchInput = document.querySelector(".form__input");

  addHandlerSearch(handler) {
    this.#searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.#searchInput.value.trim();
      handler(input);
    });
  }

  renderOutput(results) {
    this.#ipOutput.innerHTML = results.ip;
    this.#locationOutput.innerHTML = `${results.locationCity}, ${results.locationRegion}`;
    this.#timzoneOutput.innerHTML = results.timezone;
    this.#ipsOutput.innerHTML = results.isp;
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
