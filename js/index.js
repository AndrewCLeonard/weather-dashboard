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
	const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=00c70bf62c63ba041038f831dea34af6`;
	fetch(apiURL) //
		.then(function (response) {
			if (response.ok) {
				console.log(response);
                console.log(response.json())
			}
		});
}
// TO-DO
function alertMessage() {}

formBtnEl.addEventListener("click", getTextValue, false);
