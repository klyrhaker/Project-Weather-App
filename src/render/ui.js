import { WeatherFetch } from "../core/api";
import { normalizeWeather, transformTemp } from "../core/weather";
import clearDay from "../assets/icons/clear-day.svg";
import clearNight from "../assets/icons/clear-night.svg";
import cloudy from "../assets/icons/cloudy.svg";
import drizzle from "../assets/icons/drizzle.svg";
import fog from "../assets/icons/fog.svg";
import partlyCloudyDay from "../assets/icons/partly-cloudy-day.svg";
import partlyCloudyNight from "../assets/icons/partly-cloudy-night.svg";
import rain from "../assets/icons/rain.svg";
import sleet from "../assets/icons/sleet.svg";
import snow from "../assets/icons/snow.svg";
import thunderstormsRain from "../assets/icons/thunderstorms-rain.svg";
import wind from "../assets/icons/wind.svg";

const iconMap = {
  "clear-day": clearDay,
  "clear-night": clearNight,
  cloudy: cloudy,
  drizzle: drizzle,
  fog: fog,
  "partly-cloudy-day": partlyCloudyDay,
  "partly-cloudy-night": partlyCloudyNight,
  rain: rain,
  "showers-day": rain,
  "showers-night": rain,
  sleet: sleet,
  snow: snow,
  "snow-showers-day": snow,
  "snow-showers-night": snow,
  "thunder-rain": thunderstormsRain,
  "thunder-showers-day": thunderstormsRain,
  "thunder-showers-night": thunderstormsRain,
  wind: wind,
};

const weatherBox = document.getElementById("weather-box");
const btn = document.querySelector("button");
const input = document.querySelector("input");

const weatherSafe = handleError(WeatherFetch);

function handleError(fn) {
  return function (...params) {
    return fn(...params).catch((err) => console.error(err));
  };
}
function renderSkeleton() {
  weatherBox.innerHTML = "";
  const weatherCardSkeleton = document.createElement("div");
  weatherCardSkeleton.classList.add("skeleton");

  const addressSkeleton = document.createElement("h1");
  addressSkeleton.classList.add("skeleton");

  const iconSkeleton = document.createElement("img");
  iconSkeleton.classList.add("skeleton");

  const conditionsSkeleton = document.createElement("p");
  conditionsSkeleton.classList.add("skeleton");

  const tempBoxSkeleton = document.createElement("div");
  tempBoxSkeleton.classList.add("skeleton");

  const tempBtnSkeleton = document.createElement("button");
  tempBtnSkeleton.classList.add("skeleton");

  const feelsLikeSkeleton = document.createElement("p");
  feelsLikeSkeleton.classList.add("skeleton");

  const tempSkeleton = document.createElement("p");
  tempSkeleton.classList.add("skeleton");

  tempBoxSkeleton.append(tempSkeleton, tempBtnSkeleton);

  weatherCardSkeleton.append(
    addressSkeleton,
    iconSkeleton,
    conditionsSkeleton,
    tempBoxSkeleton,
    feelsLikeSkeleton,
  );
  weatherBox.append(weatherCardSkeleton);
}
function renderWeather(weather) {
  if (!weather) return console.log(`error weather is undefined`);
  weatherBox.innerHTML = "";
  const weatherCard = document.createElement("div");
  const address = document.createElement("h1");
  const icon = document.createElement("img");
  const conditions = document.createElement("p");
  const tempBox = document.createElement("div");
  const tempBtn = document.createElement("button");
  tempBtn.classList.add("temp-btn");
  tempBtn.textContent = "c/f";
  const temp = document.createElement("p");
  temp.classList.add("temp");
  temp.dataset.value = weather.temp;
  const feelsLike = document.createElement("p");
  feelsLike.classList.add("feels-like");
  feelsLike.dataset.value = weather.feelsLike;

  address.textContent = weather.address;
  icon.src = iconMap[weather.icon];

  conditions.textContent = weather.conditions;
  temp.textContent = weather.temp;
  feelsLike.textContent = weather.feelsLike;

  tempBox.append(temp, tempBtn);
  weatherCard.append(address, icon, conditions, tempBox, feelsLike);
  weatherBox.append(weatherCard);
}
let isCelsius = false;
function handleWeather() {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (!input.value) {
      weatherBox.innerHTML = "Введите название города!";
      return;
    }
    renderSkeleton();
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?key=${process.env.API_KEY}&unitGroup=metric&lang=ru`;

    const weatherData = await weatherSafe(url);

    const weather = normalizeWeather(weatherData);

    renderWeather(weather);
    isCelsius = false;
  });
}

function handleTransformTemp() {
  weatherBox.addEventListener("click", (e) => {
    if (!e.target.classList.contains("temp-btn")) return;

    e.preventDefault();
    const feelsLikeEl = document.querySelector(".feels-like");
    const feelsLike = feelsLikeEl.dataset.value;
    const tempEl = document.querySelector(".temp");
    const temp = tempEl.dataset.value;

    const changedTemp = transformTemp(temp, isCelsius);
    const changedFeelsLike = transformTemp(feelsLike, isCelsius);
    if (!isCelsius) {
      feelsLikeEl.textContent = `${changedFeelsLike}°f`;
      feelsLikeEl.dataset.value = changedFeelsLike;
      tempEl.textContent = `${changedTemp}°f`;
      tempEl.dataset.value = changedTemp;
    } else {
      feelsLikeEl.textContent = `${changedFeelsLike}°c`;
      feelsLikeEl.dataset.value = changedFeelsLike;
      tempEl.textContent = `${changedTemp}°c`;
      tempEl.dataset.value = changedTemp;
    }
    isCelsius = !isCelsius;
  });
}
export { handleWeather, handleTransformTemp };
