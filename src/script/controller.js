import "../sass/main.scss";
import * as model from "./model";
import resultView from "./resultView";
import mapView from "./mapView";
import view from "./view";

const controlClientIP = async () => {
  try {
    resultView.renderSpinner();
    //mapView.renderSpinner();

    await model.loadClientIP();
    await model.loadLocationCoords(model.state.ip);
    resultView.renderOutput(model.state.results);
    mapView.renderMap(model.state.coords);
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = async (input) => {
  try {
    resultView.renderSpinner();
    model.validateInput(input);
    await model.loadLocationCoords(input, model.state.inputParameter);
    resultView.renderOutput(model.state.results);
    mapView.renderMap(model.state.coords);
  } catch (err) {
    resultView.renderError();
    console.error(err);
  }
};

const init = () => {
  navigator.geolocation.getCurrentPosition(controlClientIP);
  resultView.addHandlerSearch(controlSearch);
};
init();
