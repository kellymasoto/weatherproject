function getWeather(response) {
  let temperatureElement = document.querySelector("#temp-value");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let conditionElement = document.querySelector("#condition");
  conditionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let now = new Date(response.data.time * 1000);
  timeElement.innerHTML = displayTime(now);

  let icon = `<img
                src="${response.data.condition.icon_url}"
                alt=""
                class="icon"
              />`;
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = icon;

  getForecast(response.data.city);
}

function displayTime(now) {
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
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

  let day = days[now.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "6a17ee632b5b60aea453bdfdf4of6te4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "6a17ee632b5b60aea453bdfdf4of6te4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
  
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°C</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}°C</div>
          </div>
        </div>
      `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Gaborone");
