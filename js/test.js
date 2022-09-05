import json from "./testForecastData.js";

const bodyEl = document.getElementById("bodyEl");

const createUnorderedListEl = document.createElement("ul");

// set/append/get id attribute for `<ul id="unorderedListEl">`
createUnorderedListEl.setAttribute("id", "unorderedListEl");
bodyEl.appendChild(createUnorderedListEl);
let unorderedListEl = document.getElementById("unorderedListEl");

for (let i = 0; i < json.list.length; i++) {
	let temp = json.list[i].main.temp;
	// Why does it not create new nodes if `listItemEl` is declared globally?
	let listItemEl = document.createElement("li");
	listItemEl.innerText = temp;
	unorderedListEl.appendChild(listItemEl);
}
const horizontalRule = document.createElement("hr");
document.body.appendChild(horizontalRule);

// console.log(json.list[0].dt_txt);
// console.log(json.list[1].dt_txt);

// create array from all unique "dt_txt" values (date and time)
// cons: need to split on space to find date, more straightforward to use UTC code?
let dateTextArray = [];
for (let i = 0; i < json.list.length; i++) {
	// extract dates only, removing the times
	let dateText = json.list[i].dt_txt.slice(0, 10);
	// convert dates into proper format
	dateText = dateFormatConversion(dateText);
	if (dateTextArray.indexOf(dateText) === -1) {
		dateTextArray.push(dateText);
	}
}

const testDate = "2022-09-04";

function dateFormatConversion(date) {
	const year = date.slice(0, 4);
	const month = date.slice(5, 7);
	const day = date.slice(8, 10);
	return `${month}/${day}/${year}`;
}

dateFormatConversion(testDate);
