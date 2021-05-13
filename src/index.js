function formatDate(timeStamp) {
let date = new Date(timeStamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;}

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[date.getDay()];

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
//console.log(response.data);
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#feelingTemp").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
celsiusTemperature = response.data.main.temp;
}


function convertToFahrenheit(event) {
  event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add("active");
   let fahrenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 
function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast() {

  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {

  forecastHTML = forecastHTML +
  `
          <div class="col-2">
            <div class="card h-100" style="width: 8rem">
              <p class="card-text">${day}</p>
              <img
                class="card-img"
                src="images/rainycloud.png"
                alt="Rainy cloud"
              />
              <div class="card-body">
                <p class="card-text">7°/11°</p>
              </div>
            </div>
          </div>
  `;
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
//console.log(forecastHTML);
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

let celsiusTemperature = null;


//Celsius to Fahrenheit
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",convertToFahrenheit);
 
//Fahrenheit to celsius
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",showCelsius);

//On load show data of this city be default
searchCity("Sydney");

displayForecast();