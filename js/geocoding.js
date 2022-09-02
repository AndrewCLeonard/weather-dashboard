// let autocomplete;

// let latitude, longitude;

// export function initAutocomplete() {
// 	autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {
// 		types: ["locality"],
// 		// componentRestrictions: { country: ["AU"] },
// 		fields: ["name", "formatted_address", "geometry.location"],
// 	});
// 	autocomplete.addListener("place_changed", onPlaceChanged);
// }
// export function onPlaceChanged() {
// 	var place = autocomplete.getPlace();

// 	if (!place.geometry) {
// 		// User didn't select a prediciton: reset the input field
// 		document.getElementById("autocomplete").placeholder = "Enter a place";
// 	} else {
// 		// Display details about the valid place
// 		console.log(place.geometry.location.lat());
// 		console.log(place.geometry.location.lng());
// 		latitude = place.geometry.location.lat();
// 		longitude = place.geometry.location.lng();
// 		// document.getElementById("currentCityName").innerHTML = place.formatted_address;
// 	}
// }
