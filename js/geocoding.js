import apiKeys from "./keys.js";

const textSearchEl = document.getElementById("autocomplete");
const formBtnEl = document.getElementById("formBtn");
// container where search result buttons appear and for subsequent weather forecast data
const weatherReportContainerEl = document.getElementById("weatherReportContainerEl");

let searchResult = [];

// get value of text box
const citySearched = "";

function getTextValue(e) {
	e.preventDefault;
	const citySearched = textSearchEl.value;
	// handle search response or blank queries
	citySearched ? runGeoCodingAPI(citySearched) : alertMessage();
}

// DOM Elements
const unorderedListEl = document.createElement("ul");
unorderedListEl.classList.add("returned-cities-list");

// for updating the DOM using fetch()
let weatherIcon, countryName;

// ids to insert text
const currentTempEl = document.getElementById("currentTemp");
const currentWindEl = document.getElementById("currentWind");
const currentHumidityEl = document.getElementById("currentHumidity");
const currentUVIndexEl = document.getElementById("currentUVIndex");
const currentCityName = document.getElementById("currentCityName");

function runGeoCodingAPI(citySearched) {
	console.log("===== runGeoCodingAPI =====");
	const apiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=${apiKeys.openWeatherKey}`;
	fetch(apiURL) //
		.then((response) => {
			// handle bad responses
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
				// console.table(response.json());
			}
			// handle good responses
			// empty the node of all children
			weatherReportContainerEl.replaceChildren();
			return response.json();
		})
		.then((data) => {
			for (const i of data) {
				console.log(i.country);
				console.log(i.lat);
				const listItemEl = document.createElement("li");
				const stateCountryNameEl = document.createElement("button");

				// handle cases where API leaves i.state undefined
				if (i.state) {
					stateCountryNameEl.textContent = `${i.name}, ${i.state}, ${i.country}`;
				} else stateCountryNameEl.textContent = `${i.name}, ${i.country}`;

				// add data attributes
				stateCountryNameEl.setAttribute("data-lat", i.lat);
				stateCountryNameEl.setAttribute("data-lon", i.lon);
				stateCountryNameEl.setAttribute("data-state", i.state);
				stateCountryNameEl.setAttribute("data-country", i.country);

				listItemEl.append(stateCountryNameEl);
				unorderedListEl.appendChild(listItemEl);
			}
			weatherReportContainerEl.appendChild(unorderedListEl);
		})
		.catch((error) => {
			const p = document.createElement("p");
			p.appendChild(document.createTextNode(`Error: ${error.message}`));
			document.body.insertBefore(p, listItemEl);
		});
}
let currentCityNameText;

function callCurrentWeatherData(lat, lon) {
	console.log("====== callCurrentWeatherData() ======");

	// create string for API call for current weather data: https://openweathermap.org/current#one
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeys.openWeatherKey}`;

	fetch(apiUrl)
		.then((response) => {
			// handle bad responses
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}
			return response.json();

			// handle good responses
		})
		.then((value) => {
			console.table(value.weather);
			console.log(value.name);
			console.log(value.weather);
			console.log("access granted!");
			console.log(value.weather[0]);
			console.log("access granted deeper!");
			console.log(value.weather[0].icon);
			weatherIcon = value.weather[0].icon;
			console.table(value.main.temp);
			currentCityNameText = value.name;
		});
	currentCityName.innerText = currentCityNameText;
	currentTempEl.innerText = value.main.temp;
	currentWindEl.innerText = value.wind.speed;
	currentHumidityEl.innerText = value.main.humidity;
	currentUVIndexEl.innerText = "???";
}

/**
 * After running a search, the user will click a button to select a city. This function will return that city's latitude and longitude in order to look up the weather
 */

let lat, lon;
function cityChosen(e) {
	console.log("====== cityChosen() ======");
	lat = e.target.getAttribute("data-lat");
	lon = e.target.getAttribute("data-lon");
	console.log(`button lat = ${lat}`);
	console.log(`button lon = ${lon}`);
	callCurrentWeatherData(lat, lon);
}

/**
 * initMap() doesn't do anything yet
 */
function initMap() {
	const CONFIGURATION = {
		ctaTitle: "Checkout",
		mapOptions: {
			center: { lat: 37.4221, lng: -122.0841 },
			fullscreenControl: true,
			mapTypeControl: false,
			streetViewControl: true,
			zoom: 11,
			zoomControl: true,
			maxZoom: 22,
			mapId: "",
		},
		mapsApiKey: "AIzaSyCmI3Q6AABGZ9ZbnD-TbXDEHKNnSlKXF6Q",
		capabilities: { addressAutocompleteControl: true, mapDisplayControl: false, ctaControl: false },
	};
	const componentForm = ["location", "locality", "administrative_area_level_1", "country", "postal_code"];

	const getFormInputElement = (component) => document.getElementById(component + "-input");
	const autocompleteInput = getFormInputElement("location");
	const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
		fields: ["address_components", "geometry", "name"],
		types: ["address"],
	});
	autocomplete.addListener("place_changed", function () {
		const place = autocomplete.getPlace();
		if (!place.geometry) {
			// User entered the name of a Place that was not suggested and
			// pressed the Enter key, or the Place Details request failed.
			window.alert("No details available for input: '" + place.name + "'");
			return;
		}
		fillInAddress(place);
	});

	function fillInAddress(place) {
		// optional parameter
		const addressNameFormat = {
			street_number: "short_name",
			route: "long_name",
			locality: "long_name",
			administrative_area_level_1: "short_name",
			country: "long_name",
			postal_code: "short_name",
		};
		const getAddressComp = function (type) {
			for (const component of place.address_components) {
				if (component.types[0] === type) {
					return component[addressNameFormat[type]];
				}
			}
			return "";
		};
		getFormInputElement("location").value = getAddressComp("street_number") + " " + getAddressComp("route");
		for (const component of componentForm) {
			// Location field is handled separately above as it has different logic.
			if (component !== "location") {
				getFormInputElement(component).value = getAddressComp(component);
			}
		}
	}
}

// TO-DO
function alertMessage() {}

// event listener for "search for city" button
formBtnEl.addEventListener("click", getTextValue, false);

// event listener for city results buttons
weatherReportContainerEl.addEventListener("click", cityChosen, false);
