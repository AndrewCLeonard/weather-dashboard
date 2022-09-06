import json from "./testForecastData.js";
import formattedForcastData from "./sampleForecastObject.js";

// console.log(formattedForcastData["2022-09-03"].temp_min);

let date = new Date(json.list[0].dt * 1000);
console.log(date);
console.log(date.getDay());
console.log(date.getMonth());
console.log(date.getDate());
const d = new Date(date);
console.log(d);

console.log(Date());

const bodyEl = document.getElementById("bodyEl");

const createUnorderedListEl = document.createElement("ul");

// set/append/get id attribute for `<ul id="unorderedListEl">`
createUnorderedListEl.setAttribute("id", "unorderedListEl");
bodyEl.appendChild(createUnorderedListEl);
let unorderedListEl = document.getElementById("unorderedListEl");

/**
 * </hr>
 */

const horizontalRule = document.createElement("hr");
document.body.insertBefore(horizontalRule, unorderedListEl);

for (let i = 0; i < json.list.length; i++) {
	let temp = json.list[i].main.temp;
	// Why does it not create new nodes if `listItemEl` is declared globally?
	let listItemEl = document.createElement("li");
	listItemEl.innerText = temp;
	unorderedListEl.appendChild(listItemEl);
}

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

/**
 * for...of version
 */

for (const date of json.list) {
}

/**
 * for...each version
 */

let dateTextArray = [];

json.list.forEach((date) => {
	// extract dates only, removing the times
	let dateText = date.dt_txt.slice(0, 10);
	// convert dates into proper format
	if (dateTextArray.indexOf(dateText) === -1) {
		dateTextArray.push(dateText);
	}
});

// find min/max temps of that day
let tempMinArray = [];
let minTemp;

const reformattedJson = [];

// set dateText in original fetch request for baseline

// format dateTextArray to "mm/dd/yyyy"
json.list.map((date) => {
	let dateText = date.dt_txt.slice(0, 10);
	if (reformattedJson.indexOf(dateText) === -1) {
		reformattedJson.push({ [dateText]: date.main.temp_min });
	}
	Math.min;
});

// console.table(reformattedJson);

dateTextArray.forEach((date) => {
	json.list.forEach((minTemp) => {
		let dateText = minTemp.dt_txt.slice(0, 10);
		// dateText === date ? console.log(true) : console.log(false);
	});
});

function dateFormatConversion(date) {
	const year = date.slice(0, 4);
	const month = date.slice(5, 7);
	const day = date.slice(8, 10);
	return `${month}/${day}/${year}`;
}
