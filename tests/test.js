import json from "../js/testForecastData.js";
import formattedForcastData from "../js/sampleForecastObject.js";
import markers from "./mapsMarkers.js";
import names from "../js/nameList.js";

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
 * FIND DATES OF FORECAST DATA
 */

let dateArray = [];

for (let i = 0; i < json.list.length; i++) {
	let date = new Date(json.list[i].dt * 1000);
	date = date.toLocaleDateString("en-US", options);
	if (dateArray.indexOf(date) === -1) {
		dateArray.push(date);
	}
}
/**
 * forEach() ON `dateArray`:
 * - find all the dates in UTC format returned in the forecast API call: json.list.dt
 *
 * for...of inside the forEach():
 * - organinizes data into arrays based on given dates, then finds min/max values
 */
let dailyHighsAndLows;
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
		dailyHighsAndLows = {
			forecastDate: day,
			lowestTemp: lowestTemp,
			highestTemp: highestTemp,
			lowestHumidity: lowestHumidity,
			highestHumidity: highestHumidity,
			lowestWind: lowestWind,
			highestWind: highestWind,
		};
	}
	forecastArray.push(dailyHighsAndLows);
});

console.table(forecastArray);

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
								<td>${date.lowestTemp} ℉ / ${date.highestTemp} ℉</td>
							</tr>
							<tr>
								<td>Wind</td>
								<td>${date.lowestWind} mph / ${date.highestWind} mph</td>
							</tr>
							<tr>
								<td>Humidity</td>
								<td>${date.lowestHumidity}% / ${date.highestHumidity}%</td>
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

/**
 * CREATING CARDS WITH TEMPLATE LITERAL
 */

/**
 * CREATING CARDS with APPEND CHILD
 */

// forecastArray.forEach((forecastCard, i) => {
// 	// card elements (need to be declared locally so they can be reassigned each iteration)
// 	const containerEl = document.createElement("div");
// 	containerEl.classList.add("container");

// 	const rowEl = document.createElement("div").classList.add("row");
// 	rowEl.classList.add("row");

// 	const colLgAuto = document.createElement("div").classList.add("col-lg-auto");
// 	colLgAuto.classList.add("col-lg-auto");

// 	const cardDivEl = document.createElement("div");
// 	cardDivEl.classList.add("card");

// 	const cardBodyEl = document.createElement("div");
// 	cardBodyEl.classList.add("card-body");

// 	const h5El = document.createElement("h5");
// 	h5El.classList.add("card-title");

// 	const h6El = document.createElement("h6");
// 	h6El.classList.add("card-subtitle", "mb-2", "text-muted");

// 	const paraEl = document.createElement("p");

// 	const cardSectionEl = document.getElementById("cards");

// 	cardDivEl.setAttribute("width", "18rem");
// 	h5El.innerText = `${forecastCard.forecastDate} ${i}`;

// 	// append elements together
// 	cardBodyEl.appendChild(h5El);
// 	cardDivEl.appendChild(cardBodyEl);
// 	cardSectionEl.appendChild(cardDivEl);
// 	console.log(forecastCard.forecastDate);
// });

/** 
 * sample card layouts:
 * 
//  * basic card
<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>
*/

// MY CARD LAYOUT
// const cardTemplateLiteral = `
// <div class="container">
// 	<div class="row">
// 		<div class="col-lg-auto">
// 			<div class="card">
// 				<div class="card-body">
// 					<p class="card-title fs-5">09/01/2022</p>
// 					<table class="table table-borderless">
// 						<tbody>
// 							<tr>
// 								<td>Temp:</td>
// 								<td>48 degrees</td>
// 							</tr>
// 							<tr>
// 								<td>Wind</td>
// 								<td>3.39 mph</td>
// 							</tr>
// 							<tr>
// 								<td>Humidity</td>
// 								<td>24%</td>
// 							</tr>
// 						</tbody>
// 					</table>
// 				</div>
// 			</div>
// 		</div>
// `;
