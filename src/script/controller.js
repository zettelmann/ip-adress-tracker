import "../sass/main.scss";
import * as model from "./model";
import view from "./view";

const controlClientIP = async () => {
  try {
    view.renderSpinner();
    await model.loadClientIP();
    await model.loadLocationCoords(model.state.ip);
    view.renderOutput(model.state.results);
    view.renderMap(model.state.coords);
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = async (input) => {
  try {
    view.renderSpinner();
    model.validateInput(input);
    await model.loadLocationCoords(input, model.state.inputParameter);
    view.renderOutput(model.state.results);
    view.renderMap(model.state.coords);
  } catch (err) {
    view.renderError();
    console.error(err);
  }
};

const init = () => {
  navigator.geolocation.getCurrentPosition(controlClientIP);
  view.addHandlerSearch(controlSearch);
};
init();
