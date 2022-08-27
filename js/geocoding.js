import openWeatherKey from "./keys.js";

const textSearchEl = document.getElementById("citySearch");
const formBtnEl = document.getElementById("formBtn");

let searchResult = [];

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
	const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=${apiKeys.googleMapsKey}`;
	fetch(apiURL) //
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
				// console.table(response.json());
			}
			return response.json();
		});
	// .then((data) => {
	// 	for (const name of data.name) {
	// 		const listItem = document.createElement("li");

	// 		const nameElement = document.createElement("strong");
	// 		nameElement.textContent =
	// 	}
	// })
}

fetch("testData.json") //
	.then((response) => {
		if (!response.ok) {
			throw new Error(`HTTP error, status = ${response.status}`);
		}
	});

// TO-DO
function alertMessage() {}

formBtnEl.addEventListener("click", getTextValue, false);
