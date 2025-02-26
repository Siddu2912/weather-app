const apiKey = "57a0c2226d1270a652f361e3dba589ed"; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    }
});

// Function to fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        
        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ Temperature: ${data.main.temp}°C`;
        document.getElementById("description").innerText = `🌥️ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `💨 Wind Speed: ${data.wind.speed} km/h`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        alert("An error occurred while fetching data.");
        console.error(error);
    }
}

// Get user's location
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        });
    }
});

// Fetch weather using coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ Temperature: ${data.main.temp}°C`;
        document.getElementById("description").innerText = `🌥️ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").innerText = `💨 Wind Speed: ${data.wind.speed} km/h`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    } catch (error) {
        alert("An error occurred while fetching data.");
        console.error(error);
    }
}
