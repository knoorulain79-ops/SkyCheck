const API_KEY = '52f756f1193c5bf6b22f0d3ab20df39c';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Elements
const cityInput   = document.getElementById('cityInput');
const searchBtn   = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const errorDiv    = document.getElementById('error');
const loader      = document.getElementById('loader');
const cityName    = document.getElementById('cityName');
const country     = document.getElementById('country');
const dateEl      = document.getElementById('date');
const weatherIcon = document.getElementById('weatherIcon');
const temp        = document.getElementById('temp');
const description = document.getElementById('description');
const tempMin     = document.getElementById('tempMin');
const tempMax     = document.getElementById('tempMax');
const humidity    = document.getElementById('humidity');
const wind        = document.getElementById('wind');
const feelsLike   = document.getElementById('feelsLike');
const visibility  = document.getElementById('visibility');

// Get today's date
function getDate() {
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const now    = new Date();
  return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

// Show / hide helpers
function showLoader()  { loader.classList.add('show'); }
function hideLoader()  { loader.classList.remove('show'); }
function showError()   { errorDiv.classList.add('show'); weatherCard.classList.remove('show'); }
function hideError()   { errorDiv.classList.remove('show'); }
function showCard()    { weatherCard.classList.add('show'); }

// Fetch weather
async function getWeather(city) {
  if (!city.trim()) return;

  hideError();
  weatherCard.classList.remove('show');
  showLoader();

  try {
    const res  = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();

    hideLoader();

    if (data.cod !== 200) { showError(); return; }

    cityName.textContent    = data.name;
    country.textContent     = data.sys.country;
    dateEl.textContent      = getDate();
    temp.textContent        = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    tempMin.textContent     = `${Math.round(data.main.temp_min)}°C`;
    tempMax.textContent     = `${Math.round(data.main.temp_max)}°C`;
    humidity.textContent    = `${data.main.humidity}%`;
    wind.textContent        = `${Math.round(data.wind.speed)} m/s`;
    feelsLike.textContent   = `${Math.round(data.main.feels_like)}°C`;
    visibility.textContent  = `${(data.visibility / 1000).toFixed(1)} km`;
    weatherIcon.src         = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.alt         = data.weather[0].description;

    showCard();

  } catch (err) {
    hideLoader();
    showError();
  }
}

// Events
searchBtn.addEventListener('click', () => getWeather(cityInput.value));
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') getWeather(cityInput.value);
});

// Load Karachi by default
getWeather('Karachi');
