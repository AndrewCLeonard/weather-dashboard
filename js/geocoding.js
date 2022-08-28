import apiKeys from "./keys.js";

const textSearchEl = document.getElementById("citySearch");
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

// 
let weatherIcon, countryName, cityName;

function runGeoCodingAPI(citySearched) {
	console.log("===== runGeoCodingAPI =====");
	const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=${apiKeys.openWeatherKey}`;
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
		});
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

// TO-DO
function alertMessage() {}

// event listener for "search for city" button
formBtnEl.addEventListener("click", getTextValue, false);

// event listener for city results buttons
weatherReportContainerEl.addEventListener("click", cityChosen, false);

const weatherDataHTMLEl = `
				<div id="weatherReportContainerEl" class="col-md-8">
					<!-- current weather data -->
					<div class="row">
						<!-- current weather container -->
						<article>
							<div class="container current-weather border border-dark">
								<div class="row"><h2>${value.name} http://openweathermap.org/img/wn/${weatherIcon}@2x.png</h2></div>
								<div class="row">
									<div class="col current-weather-text">
										<p class="fs-3">Temperature:</p>
									</div>
									<div class="col-6">
										<p class="fs-3">68 degrees</p>
									</div>
								</div>
								<div class="row">
									<div class="col current-weather-text">
										<p class="fs-3">Wind:</p>
									</div>
									<div class="col">
										<p class="fs-3">5.57 mph</p>
									</div>
								</div>
								<div class="row">
									<div class="col current-weather-text">
										<p class="fs-3">Humidity:</p>
									</div>
									<div class="col current-weather-text">
										<p class="fs-3">40%</p>
									</div>
								</div>
								<div class="row">
									<div class="col current-weather-text">
										<p class="fs-3">UV Index:</p>
									</div>
									<div class="col">
										<p class="fs-3">12</p>
									</div>
								</div>
							</div>
						</article>
						<!-- current weather container END -->
					</div>

					<!-- forecast data container -->
					<div class="container">
						<h2>Five-Day Forecast:</h2>

						<!-- forecast card container -->
						<div class="container">
							<div class="row">
								<div class="col-lg-auto">
									<div class="card">
										<div class="card-body">
											<p class="card-title fs-5">09/01/2022</p>
											<table class="table table-borderless">
												<tbody>
													<tr>
														<td>Temp:</td>
														<td>48 degrees</td>
													</tr>
													<tr>
														<td>Wind</td>
														<td>3.39 mph</td>
													</tr>
													<tr>
														<td>Humidity</td>
														<td>24%</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-lg-auto">
									<div class="card">
										<div class="card-body">
											<p class="card-title fs-5">09/01/2022</p>
											<table class="table table-borderless">
												<tbody>
													<tr>
														<td>Temp:</td>
														<td>48 degrees</td>
													</tr>
													<tr>
														<td>Wind</td>
														<td>3.39 mph</td>
													</tr>
													<tr>
														<td>Humidity</td>
														<td>24%</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-lg-auto">
									<div class="card">
										<div class="card-body">
											<p class="card-title fs-5">09/01/2022</p>
											<table class="table table-borderless">
												<tbody>
													<tr>
														<td>Temp:</td>
														<td>48 degrees</td>
													</tr>
													<tr>
														<td>Wind</td>
														<td>3.39 mph</td>
													</tr>
													<tr>
														<td>Humidity</td>
														<td>24%</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-lg-auto">
									<div class="card">
										<div class="card-body">
											<p class="card-title fs-5">09/01/2022</p>
											<table class="table table-borderless">
												<tbody>
													<tr>
														<td>Temp:</td>
														<td>48 degrees</td>
													</tr>
													<tr>
														<td>Wind</td>
														<td>3.39 mph</td>
													</tr>
													<tr>
														<td>Humidity</td>
														<td>24%</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
								<div class="col-lg-auto">
									<div class="card">
										<div class="card-body">
											<p class="card-title fs-5">09/01/2022</p>
											<table class="table table-borderless">
												<tbody>
													<tr>
														<td>Temp:</td>
														<td>48 degrees</td>
													</tr>
													<tr>
														<td>Wind</td>
														<td>3.39 mph</td>
													</tr>
													<tr>
														<td>Humidity</td>
														<td>24%</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
`;
