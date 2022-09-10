const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;

const textSearchEl = document.getElementById("autocomplete");

// text input for "search for a city"
const currentCityNameEl = document.getElementById("currentCityName");

/**
 * OPTIONS FOR CONVERTING UTC TO "en-US" DATE FORMAT
 */

const options = {
	// weekday: "short",
	year: "numeric",
	month: "numeric",
	day: "numeric",
};

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

// ids used to insert text
const currentTempEl = document.getElementById("currentTemp");
const currentWindEl = document.getElementById("currentWind");
const currentHumidityEl = document.getElementById("currentHumidity");

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
	const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,daily&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

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
			console.log(value);
			const currentWeatherIcon = value.weather[0].icon;
			currentCityNameEl.innerHTML = `${city} <span id="currentWeatherIcon"><img src="http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt=""></span>`;

			currentTempEl.innerText = `${value.main.temp} ℉`;
			currentWindEl.innerText = `${value.wind.speed} mph`;
			currentHumidityEl.innerText = value.main.humidity;
		})
		.then(() => {
			getForecast(latitude, longitude);
		});
}

/**
 * WEATHER FORECAST FOR CARDS
 */

// go through forecast response to find dates and put them in this array
let dateArray = [];

/**
 *
 * @param {number} latitude from Google autocomplete
 * @param {number } longitude from Google autocomplete
 */

function getForecast(latitude, longitude) {
	console.log("====== getForecast() ======");

	// remove any previous forecast cards
	while (forecastCardsContainerEl.firstChild) {
		forecastCardsContainerEl.removeChild(forecastCardsContainerEl.firstChild);
	}

	// create string for API call
	const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_API_KEY}&units=imperial`;

	fetch(forecastApiUrl)
		.then((response) => {
			// handle bad responses
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			} else {
				console.log("response OK");
				return response.json();
			}
		})
		// handle good responses
		.then((json) => {
			console.log(json);
			let todaysDate = new Date();
			todaysDate = todaysDate.toLocaleDateString("en-US", options);
			console.log(todaysDate);
			for (let i = 0; i < json.list.length; i++) {
				let date = new Date(json.list[i].dt * 1000);
				console.log(date);
				date = date.toLocaleDateString("en-US", options);
				if (dateArray.indexOf(date) === -1 && date != todaysDate) {
					dateArray.push(date);
				}
			}
			/**
			 * forEach() ON `dateArray`: find all the dates in UTC format returned in the forecast API call: json.list.dt
			 *
			 * for...of inside the forEach(): organinizes data into arrays based on dates found in `dateArray`, then finds min/max values from each day, adding them to `dailyHighsAndLows` object
			 */
			let dailyHisAndLows;
			let forecastArray = [];
			const forecastCardsContainerEl = document.getElementById("forecastCardsContainerEl");

			dateArray.forEach((day) => {
				// lowest temperature
				let lowTempArray = [];
				let lowestTemp;

				// highest temperature
				let highTempArray = [];
				let highestTemp;

				// humidity
				let humidityArray = [];
				let lowestHumidity;
				let highestHumidity;

				// wind
				let windArray = [];
				let lowestWind;
				let highestWind;

				// console.log(`===============${day}===============`);
				/**
				 * INNER FOR...OF LOOP
				 */
				// match json.list.dt values to the forecast data from those specific dates
				for (const forecastObject of json.list) {
					// find the corresponding array elements
					let minTemp = forecastObject.main.temp_min;
					let highTemp = forecastObject.main.temp_max;
					let humidity = forecastObject.main.humidity;
					let wind = forecastObject.wind.speed;

					// Convert this iteration's json.list.dt UTC timecode into American timecode to compare
					// Multiply timecode by 1,000 because API's UTC data uses UNIX epoch which counts in seconds. JS epoch counts milliseconds.
					let forecastDate = new Date(forecastObject.dt * 1000);
					forecastDate = forecastDate.toLocaleDateString("en-US", options);
					if (day === forecastDate) {
						lowTempArray.push(minTemp);
						highTempArray.push(highTemp);
						humidityArray.push(humidity);
						windArray.push(wind);
					}
					lowestTemp = Math.min(...lowTempArray);
					highestTemp = Math.max(...highTempArray);
					lowestHumidity = Math.min(...humidityArray);
					highestHumidity = Math.max(...humidityArray);
					lowestWind = Math.min(...windArray);
					highestWind = Math.max(...windArray);
					dailyHisAndLows = {
						forecastDate: day,
						lowestTemp: Math.round(lowestTemp),
						highestTemp: Math.round(highestTemp),
						lowestHumidity: Math.round(lowestHumidity),
						highestHumidity: Math.round(highestHumidity),
						lowestWind: Math.round(lowestWind),
						highestWind: Math.round(highestWind),
					};
				}
				forecastArray.push(dailyHisAndLows);
			});
			console.log(forecastArray);

			/**
			 * create DOM elements and append
			 */

			forecastArray.forEach((date) => {
				console.log(date.forecastDate);
				const cardTemplateLiteral = `
			<div class="card">
				<div class="card-body">
					<p class="card-title fs-5">${date.forecastDate}</p>
					<table class="table table-borderless">
						<tbody>
							<tr>
								<td>Temp:</td>
								<td>${date.lowestTemp}-${date.highestTemp} ℉</td>
							</tr>
							<tr>
								<td>Wind</td>
								<td>${date.lowestWind}-${date.highestWind} mph</td>
							</tr>
							<tr>
								<td>Humidity</td>
								<td>${date.lowestHumidity}-${date.highestHumidity}%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		`;

				const colLgAuto = document.createElement("div");
				colLgAuto.classList.add("col-lg-auto");

				colLgAuto.innerHTML = cardTemplateLiteral;

				forecastCardsContainerEl.appendChild(colLgAuto);
			});
		});
}

/**
 * forEach() ON `dateArray`: find the dates in UTC format returned in the forecast API call: json.list.dt
 * for...of inside the forEach() organinizes data into arrays based on given dates, then finds min/max values
 */

/**
 * TBD
 */
function alertMessage() {}

// DELETE?
// event listener for "search for city" button
// formBtnEl.addEventListener("click", getTextValue, false);

window.initAutocomplete = initAutocomplete;
export {};
