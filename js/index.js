import { apiKeys } from "./keys.mjs";

// including function in index.js for now
// import { initAutocomplete } from "./geocoding.js";

const textSearchEl = document.getElementById("autocomplete");
const formBtnEl = document.getElementById("formBtn");

// text input for "search for a city"
const currentCityNameEl = document.getElementById("currentCityName");

/**
 * GOOGLE MAPS AUTOCOMPLETE
 */

let city, latitude, longitude;

function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(textSearchEl, {
		types: ["locality"],
		fields: ["name", "formatted_address", "geometry.location"],
	});
	textSearchEl.focus();
	autocomplete.addListener("place_changed", onPlaceChanged);
}
function onPlaceChanged() {
	const place = autocomplete.getPlace();

	if (!place.geometry || !place.geometry.location) {
		// User didn't select a prediciton: reset the input field
		document.getElementById("autocomplete").placeholder = "Enter a place";
	} else {
		// Display details about the valid place
		latitude = place.geometry.location.lat();
		longitude = place.geometry.location.lng();
		city = place.formatted_address;
		// function for Open Weather API call
		console.log(place.geometry.location.lat());
		console.log(place.geometry.location.lng());
		getCurrentWeatherData(city, latitude, longitude);
	}
}

// DELETE?
// function getTextValue(e) {
// 	e.preventDefault;
// 	const citySearched = textSearchEl.value;
// 	// handle search response or blank queries
// 	citySearched
// 		? getCurrentWeatherData(latitude, longitude)
// 		: // needs to be written
// 		  alertMessage();
// }

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
const currentWeatherIconEl = document.querySelector("#currentWeatherIcon");

/**
 * GET CURRENT WEATHER
 */

/**
 * @param {string} city  - city name returned by Google Place Autocomplete
 * @param {number} latitude latitude returned by Google
 * @param {number} longitude longitude returned by Google
 */
function getCurrentWeatherData(city, latitude, longitude) {
	console.log("====== getCurrentWeatherData() ======");

	// create string for API call for current weather data: https://openweathermap.org/current#one
	const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${apiKeys.openWeatherKey}&units=imperial`;

	fetch(currentWeatherApiUrl)
		.then((response) => {
			// handle bad responses
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}
			return response.json();
		})
		// handle good responses
		.then((value) => {
			const currentWeatherIcon = value.weather[0].icon;
			currentCityNameEl.innerHTML = `${city} <span id="currentWeatherIcon"><img src="http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt=""></span>`;

			currentTempEl.innerText = `${value.main.temp} ℉`;
			currentWindEl.innerText = `${value.wind.speed} mph`;
			currentHumidityEl.innerText = value.main.humidity;
			currentUVIndexEl.innerText = "???";
		}).catch;
}

function getForecast(city, latitude, longitude) {
	console.log("====== getForecast() ======");

	// creaste string for API call
	const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKeys.openWeatherKey}&units=imperial`;
}

/**
 * TBD
 */
function alertMessage() {}

// DELETE?
// event listener for "search for city" button
// formBtnEl.addEventListener("click", getTextValue, false);

window.initAutocomplete = initAutocomplete;
export {};
