import "../sass/main.scss";
import * as model from "./model";
import resultView from "./resultView";
import mapView from "./mapView";

import "core-js/stable";
import "regenerator-runtime";
import { async } from "regenerator-runtime";

const controlClientIP = async () => {
  try {
    resultView.renderSpinner();
    await model.loadClientIP();
    await model.loadLocationCoords(model.state.ip);
    renderMap();
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = async (input) => {
  try {
    resultView.renderSpinner();
    model.validateInput(input);
    await model.loadLocationCoords(input, model.state.inputParameter);
    renderMap();
  } catch (err) {
    resultView.renderError();
    console.error(err);
  }
};

const renderMap = () => {
  resultView.renderOutput(model.state.results);
  mapView.renderMap(model.state.coords);
};

const init = () => {
  navigator.geolocation.getCurrentPosition(controlClientIP);
  resultView.addHandlerSearch(controlSearch);
};
init();
