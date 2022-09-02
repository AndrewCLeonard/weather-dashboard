import { apiKeys } from "./keys.mjs";

// including function in index.js for now
// import { initAutocomplete } from "./geocoding.js";

const textSearchEl = document.getElementById("autocomplete");
const formBtnEl = document.getElementById("formBtn");

// text input for "search for a city"
const currentCityName = document.getElementById("currentCityName");
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

function getTextValue(e) {
	e.preventDefault;
	const citySearched = textSearchEl.value;
	// handle search response or blank queries
	citySearched
		? getCurrentWeatherData(latitude, longitude)
		: // needs to be written
		  alertMessage();
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
const currentWeatherIconEl = document.getElementById("currentWeatherIcon");
function getCurrentWeatherData(city, latitude, longitude) {
	console.log("====== getCurrentWeatherData() ======");

	// create string for API call for current weather data: https://openweathermap.org/current#one
	const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${apiKeys.openWeatherKey}`;

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
			console.log(value.name);
			console.table(value.weather);
			console.log(value.weather);
			currentCityName.innerText = city;
			const currentWeatherIcon = value.weather[0].icon;
			currentWeatherIconEl.innerHTML = `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`;
			console.log(currentWeatherIcon);
			console.log(currentWeatherIconEl.innerHTML);
			console.log(currentWeatherIconEl);
			currentTempEl.innerText = value.main.temp;
			currentWindEl.innerText = value.wind.speed;
			currentHumidityEl.innerText = value.main.humidity;
			currentUVIndexEl.innerText = "???";
		}).catch;
}

/**
 * TBD
 */
function alertMessage() {}

// event listener for "search for city" button
formBtnEl.addEventListener("click", getTextValue, false);

window.initAutocomplete = initAutocomplete;
export {};
