import "core-js/stable";
import { mark } from "regenerator-runtime";

export default class View {
  #searchForm = document.querySelector(".form");
  #searchInput = document.querySelector(".form__input");

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    this._clear();
    const markup = `
    <div class="loading-spinner__container">
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
      <div class="loading-spinner__item"></div>
    </div>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    console.log("ERROR");
    this._clear();
    const markup = `
    <li class="result__error">
      <p>
        Please supply an IP address, a domain or an email address!
      </p>
    </li>
    `;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerSearch(handler) {
    this.#searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.#searchInput.value.trim();
      handler(input);
    });
  }

  renderOutput(results) {
    this._clear();
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
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

//export default new View();
