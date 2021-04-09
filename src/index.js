function formatDate(currentTime) {

  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;}

return `${day} ${hours}:${minutes}`;

}

function searchCity(city) {
let apiKey = "d688e0aec682fb0302505306304b61bc";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML= `${city.value}`;
 
 searchCity(city);
}

function userLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function currentLocation(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "d688e0aec682fb0302505306304b61bc";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
 axios.get(apiUrl).then(showTemperature)
}

function showTemperature(response) {
console.log(response.data);
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#feelingTemp").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
}



//Show current day of the week and current time
let h3 = document.querySelector("h3");
let now = new Date();
h3.innerHTML = formatDate(now);

//console.log(hours,minutes);

//Show city input in H1
let enterCityForm = document.querySelector("#enter-city");
enterCityForm.addEventListener("submit", handleSubmit);
enterCityForm.addEventListener("click", handleSubmit);

//Get current location
let getLocation = document.querySelector("#current-location-button");
getLocation.addEventListener("click", userLocation);

//On load show data of this city be default
searchCity("Sydney");