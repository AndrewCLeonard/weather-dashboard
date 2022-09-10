import json from "./testForecastData.js";
import formattedForcastData from "./sampleForecastObject.js";
import markers from "./mapsMarkers.js";
import names from "./nameList.js";

// console.log(formattedForcastData["2022-09-03"].temp_min);

// console.log(json.list.length);

let date = new Date(json.list[0].dt * 1000);
// console.log(date);
// console.log(date.getMonth() + 1);
// console.log(date.getDate());
// console.log(date.getFullYear());
// console.log(Date());

const bodyEl = document.getElementById("bodyEl");

// for (let i = 0; i < json.list.length; i++) {
// 	let temp = json.list[i].main.temp;
// 	// Why does it not create new nodes if `listItemEl` is declared globally?
// 	let listItemEl = document.createElement("li");
// 	listItemEl.innerText = temp;
// 	unorderedListEl.appendChild(listItemEl);
// }

// console.log(json.list[0].dt_txt);
// console.log(json.list[1].dt_txt);

// create array from all unique "dt_txt" values (date and time)
// cons: need to split on space to find date, more straightforward to use UTC code?
// for (let i = 0; i < json.list.length; i++) {
// 	// extract dates only, removing the times
// 	let dateText = json.list[i].dt_txt.slice(0, 10);
// 	// convert dates into proper format
// 	dateText = dateFormatConversion(dateText);
// 	if (dateTextArray.indexOf(dateText) === -1) {
// 		dateTextArray.push(dateText);
// 	}
// }

// set dateText in original fetch request for baseline

// format dateTextArray to "mm/dd/yyyy"
// const dateObject = document.createElement("div");
// dateObject.setAttribute("id", "dates");

// const dateUl = document.createElement("ul");

/**
 * OPTIONS FOR CONVERTING UTC TO "en-US" DATE FORMAT
 */
const options = {
	// weekday: "short",
	year: "numeric",
	month: "numeric",
	day: "numeric",
};

// json.list.map((date) => {
// 	let listItemEl = document.createElement("li");
// 	let dateItem = new Date(date.dt * 1000);

// 	let formattedDate = dateItem.toLocaleString("en-US", options);
// 	if (reformattedJson.indexOf(formattedDate) === -1) {
// 		listItemEl.innerText = formattedDate;
// 		reformattedJson.push(formattedDate);
// 		dateUl.appendChild(listItemEl);
// 	}
// });
// console.log(reformattedJson);

// bodyEl.insertBefore(dateUl, horizontalRule);

// console.table(reformattedJson);

// dateTextArray.forEach((date) => {
// 	json.list.forEach((minTemp) => {
// 		let dateText = minTemp.dt_txt.slice(0, 10);
// 		// dateText === date ? console.log(true) : console.log(false);
// 	});
// });

// function dateFormatConversion(date) {
// 	const year = date.slice(0, 4);
// 	const month = date.slice(5, 7);
// 	const day = date.slice(8, 10);
// 	return `${month}/${day}/${year}`;
// }

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
 * forEach() ON `dateArray`: find the dates in UTC format returned in the forecast API call: json.list.dt
 * for...of inside the forEach() organinizes data into arrays based on given dates, then finds min/max values
 */
let dailyHisAndLows;
let forecastArray = [];

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

	console.log(`===============${day}===============`);
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
			lowestTemp: lowestTemp,
			highestTemp: highestTemp,
			lowestHumidity: lowestHumidity,
			highestHumidity: highestHumidity,
			lowestWind: lowestWind,
			highestWind: highestWind,
		};
	}
	forecastArray.push(dailyHisAndLows);
});

console.table(forecastArray);

/**
 * CREATING CARDS
 */
const cardDivEl = document.createElement("div");
const cardBodyEl = document.createElement("div");
const h5El = document.createElement("h5");
const h6El = document.createElement("h6");
const paraEl = document.createElement("p");

const cardSectionEl = document.getElementById("cards");

forecastArray.forEach((forecastCard, i) => {
	cardDivEl.classList.add("card");
	cardDivEl.setAttribute("width", "18rem");
	cardBodyEl.classList.add("card-body");
	h5El.classList.add("card-title");
	h5El.innerText = `${forecastCard.forecastDate} ${i}`;
	h6El.classList.add("card-subtitle", "mb-2", "text-muted");

	// append elements together
	cardBodyEl.appendChild(h5El);
	cardDivEl.appendChild(cardBodyEl);
	cardSectionEl.appendChild(cardDivEl);
});

const testString = "test string";

paraEl.innerText = testString;
cardDivEl.appendChild(paraEl);

/** 
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
