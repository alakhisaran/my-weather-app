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

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay()
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[day];
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

function getForecast(coordinates) {
console.log(coordinates);
let apiKey = "d688e0aec682fb0302505306304b61bc";
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast)
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

getForecast(response.data.coord);

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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast =  response.data.daily;
  let forecastElement = document.querySelector("#forecast");


  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {

  forecastHTML = forecastHTML +
  `
          <div class="col-2">
            <div class="card h-100" style="width: 8rem">
              <p class="card-text">${formatDay(forecastDay.dt)}</p>
          
              <img
                class="card-img"
                src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
                alt=""
              />
              <div class="card-body">
                <p class="card-text">${Math.round(forecastDay.temp.min)}°/${Math.round(forecastDay.temp.max)}°</p>
              </div>
            </div>
          </div>
  `;
        }
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



//On load show data of this city be default
searchCity("Rotterdam");
