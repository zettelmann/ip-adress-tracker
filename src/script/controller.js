import "../sass/main.scss";
import * as model from "./model";
import view from "./view";

const controlClientIP = async () => {
  try {
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
    model.validateInput(input);
    await model.loadLocationCoords(input, model.state.inputParameter);
    view.renderOutput(model.state.results);
    view.renderMap(model.state.coords);
  } catch (err) {
    console.error(err);
  }
};

const init = () => {
  navigator.geolocation.getCurrentPosition(controlClientIP);
  view.addHandlerSearch(controlSearch);
};
init();
