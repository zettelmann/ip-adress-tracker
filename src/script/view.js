import { LEAFLET_LAYER } from "./config";
import { ZOOM_LEVEL } from "./config";
import iconLocation from "../images/icon-location.svg";

import "core-js/stable";
import { mark } from "regenerator-runtime";

class View {
  // initialize leaflet map
  #map = L.map("map", {
    zoomControl: false,
  });
  /*   
  #ipOutput = document.querySelector(".result__ip-data");
  #locationOutput = document.querySelector(".result__location-data");
  #timzoneOutput = document.querySelector(".result__timezone-data");
  #ipsOutput = document.querySelector(".result__isp-data");
 */
  #searchForm = document.querySelector(".form");
  #searchInput = document.querySelector(".form__input");
  #results = document.querySelector(".result");
  #icon = L.icon({
    iconUrl: iconLocation,
    iconSize: [46, 56],
    iconAnchor: [22, -25],
    popupAnchor: [-3, -76],
  });

  renderSpinner() {
    this.#results.innerHTML = "";
    const markup = `
    <div class="loading-spinner__container">
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
    </div>
    `;
    this.#results.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    console.log(this.#results);
    console.log("ERROR");
    this.#results.innerHTML = "";
    this.#results.innerHTML = `
    <li class="result__error">
      <p>
        Please supply an IP address, a domain or an email address!
      </p>
    </li>
    `;
  }

  addHandlerSearch(handler) {
    this.#searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.#searchInput.value.trim();
      handler(input);
    });
  }

  renderOutput(results) {
    this.#results.innerHTML = "";
    const markup = `
    <li class="result__item">
    <h2 class="result__title">IP Adress</h2>
    <p class="result__ip-data">${results.ip}</p>
    </li>
    <li class="result__item">
      <h2 class="result__title">Location</h2>
      <p class="result__location-data">${results.locationCity}, ${results.locationRegion}</p>
    </li>
    <li class="result__item">
      <h2 class="result__title">Timezone</h2>
      <p class="result__timezone-data">UTC ${results.timezone}</p>
    </li>
    <li class="result__item">
      <h2 class="result__title">ISP</h2>
      <p class="result__isp-data">${results.isp}</p>
    </li>
    `;
    this.#results.insertAdjacentHTML("afterbegin", markup);
  }

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
export default new View();
