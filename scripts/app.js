const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const forecast = new Forecast();

const updateUI = (data) => {
  const { cityDetails, weather } = data;

  const cityName = details.querySelector(".city-name");
  const weatherConditions = details.querySelector(".weather-con");
  const temperature = details.querySelector(".temp span");
  cityName.innerText = cityDetails.EnglishName;
  weatherConditions.innerText = weather.WeatherText;
  temperature.innerText = weather.Temperature.Metric.Value;

  let timeSource = null;
  weather.IsDayTime
    ? (timeSource = "img/day.svg")
    : (timeSource = "img/night.svg");
  time.setAttribute("src", timeSource);

  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  if (card.classList.contains("hidden")) {
    card.classList.remove("hidden");
  }
};

cityForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  forecast.updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
  localStorage.setItem("city", city);
});

const storedCity = localStorage.getItem("city");
if (storedCity) {
  forecast.updateCity(storedCity)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
