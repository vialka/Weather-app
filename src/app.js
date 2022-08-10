// Show current Day and Time

let now = new Date();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let h2 = document.querySelector(".currentDay");
h2.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;

// Show searching day and data in the searching city
/*function FormatData(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return ` ${hours}:${minutes}`;
}

document.querySelector("#currentdata").innerHTML = FormatData(
  response.data.dt * 1000
);
*/
// Changing Celsius and Fahrengate

function convertF(event) {
  event.preventDefault();
  let tempNew = document.querySelector("#temperature");
  let temperature = tempNew.innerHTML;
  tempNew.innerHTML = Math.round(temperature * 1.8 + 32);
}

function convertS(event) {
  event.preventDefault();
  let tempNew = document.querySelector("#temperature");
  let temperature = tempNew.innerHTML;
  tempNew.innerHTML = Math.round((temperature - 32) / 1.8);
}

let fahrengate = document.querySelector("#fara");
fahrengate.addEventListener("click", convertF);

let celsius = document.querySelector("#cels");
celsius.addEventListener("click", convertS);

// Serching City= cheng weather on page

function showWeather(response) {
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#sky").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Opens the city that I specified
function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

// Opens a city through search

function search(event) {
  event.preventDefault();
  let myCity = document.querySelector("#formes");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${myCity.value}`;
  let apiKey = "4a8e2f6facdabec0ff87798adbd38ad7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${myCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}
let form = document.querySelector("#serch-cities");
form.addEventListener("submit", search);

// Opens current position

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4a8e2f6facdabec0ff87798adbd38ad7";
  let apiNew = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiNew).then(showWeather);
}

//49.274384877555356, 23.490808055763512
function current() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-weather");
currentButton.addEventListener("click", current);

searchCity("Kyiv");

// https://codesandbox.io/s/admiring-ramanujan-w40dt1?file=/src/app.js
