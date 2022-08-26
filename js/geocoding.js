import openWeatherKey from "./keys.js";

const textSearchEl = document.getElementById("citySearch");
const formBtnEl = document.getElementById("formBtn");

// get value of text box
const citySearched = "";

function getTextValue(e) {
	e.preventDefault;
	const citySearched = textSearchEl.value;
	console.log(citySearched);
	// handle search response or blank queries
	citySearched ? runGeoCodingAPI(citySearched) : alertMessage();
}

function runGeoCodingAPI(citySearched) {
	const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=${openWeatherKey}`;
	fetch(apiURL) //
		.then(function (response) {
			if (response.ok) {
				console.table(response.json());
			}
		});
}
// TO-DO
function alertMessage() {}

formBtnEl.addEventListener("click", getTextValue, false);
