import "../sass/main.scss";
import {
  REGEX_CHECK_IP,
  REGEX_CHECK_DOMAIN,
  REGEX_CHECK_EMAIL,
  LEAFLET_LAYER,
} from "./config";

import * as model from "./model";
import view from "./view";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".form__input");

/* ------------------------------------ */
/* ------------------------------------ */
/* GET FORM INPUT */

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
navigator.geolocation.getCurrentPosition(controlClientIP);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = searchInput.value.trim();
  let inputParameter;
  console.log(input);

  if (checkIP(input)) inputParameter = "ipAddress";
  if (checkEmail(input)) inputParameter = "email";
  if (checkDomain(input)) inputParameter = "domain";

  getLocation(input, inputParameter);
});

/* ------------------------------------ */
/* ------------------------------------ */
/* GET CLIENT IP ADRESS */

/* ------------------------------------ */
/* ------------------------------------ */
/* CECK INPUT */
const checkIP = (input) => {
  return REGEX_CHECK_IP.test(input);
};
const checkEmail = (input) => {
  return REGEX_CHECK_EMAIL.test(input);
};
const checkDomain = (input) => {
  return REGEX_CHECK_DOMAIN.test(input);
};
/* ------------------------------------ */
/* ------------------------------------ */
/* GET LOCATION COORDS */

/* ------------------------------------ */
/* ------------------------------------ */
/* DISPLAYING OUTPUT */

/* ------------------------------------ */
/* ------------------------------------ */
/* DISPLAYING MAP */

/* ------------------------------------ */
/* ------------------------------------ */
