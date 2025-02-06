const apiKey = 'e4b41b028b3ffff06760f8eb06be3c56';
const weatherInfo = document.getElementById('weatherInfo');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

// create local storage
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("city")) {
        fetchWeather(localStorage.getItem("city"));
    }
});

// get weather info from api
searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
        localStorage.setItem("city", city);
    }
});

// open location
locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => alert("Location permission denied"));
    } else {
        alert("Geolocation not supported");
    }
});

// fetch API weather 
function fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert("City not found"));
}

function fetchWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert("Weather data not available"));
}

// dispplay results
function displayWeather(data) {
    weatherInfo.classList.remove("hidden");
    document.getElementById("cityName").innerText = data.name;
      document.getElementById("temperature").innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById("windSpeed").innerText = `Wind Speed: ${data.wind.speed} m/s`;
}

// dark mode
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkmode', 'enabled');
    } else {
        localStorage.setItem('darkmode', 'disabled');
    }
});