import "../sass/main.scss";
import {
  API_KEY,
  GET_IP_API,
  GET_GEO_API,
  REGEX_CHECK_IP,
  REGEX_CHECK_DOMAIN,
  REGEX_CHECK_EMAIL,
  LEAFLET_LAYER,
} from "./config";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".form__input");

const ipOutput = document.querySelector(".result__ip-data");
const locationOutput = document.querySelector(".result__location-data");
const timzoneOutput = document.querySelector(".result__timezone-data");
const ipsOutput = document.querySelector(".result__isp-data");

/* ------------------------------------ */
/* ------------------------------------ */
/* GET FORM INPUT */

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
const getClientIP = async () => {
  const response = await fetch(GET_IP_API);
  const data = await response.json();
  console.log(data);
  getLocation(data.ip);
};
navigator.geolocation.getCurrentPosition(getClientIP);

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

const getLocation = async (address, inputParameter = "ipAddress") => {
  const response = await fetch(
    `${GET_GEO_API}Key=${API_KEY}&${inputParameter}=${address}`
  );
  const data = await response.json();
  console.log(data);
  const results = {
    lat: data.location.lat,
    lng: data.location.lng,
    ip: data.ip,
    locationCity: data.location.city,
    locationRegion: data.location.region,
    timezone: data.location.timezone,
    isp: data.isp,
  };
  console.log(results.lat, results.lng, results.isp);
  renderOutput(results);
  displayingMap([results.lat, results.lng]);
};
/* ------------------------------------ */
/* ------------------------------------ */
/* DISPLAYING OUTPUT */
const renderOutput = (results) => {
  console.log(results.isp);
  console.log(ipsOutput);
  ipOutput.innerHTML = results.ip;
  locationOutput.innerHTML = `${results.locationCity}, ${results.locationRegion}`;
  timzoneOutput.innerHTML = results.timezone;
  ipsOutput.innerHTML = results.isp;
};

/* ------------------------------------ */
/* ------------------------------------ */
/* DISPLAYING MAP */
/* INTIALIZING MAP OUTSIDE A FUNCTION, ALLOWS TO REFRESH THE MAP*/
var map = L.map("map");

const displayingMap = (coords) => {
  map.setView(coords, 15);

  L.tileLayer(LEAFLET_LAYER, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
    .openPopup();
};

/* ------------------------------------ */
/* ------------------------------------ */
