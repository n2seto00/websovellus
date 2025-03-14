const API_KEY = "Kirjoita tähän omasi";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("searchBtn").addEventListener("click", getWeather);
    document.getElementById("saveFavoriteBtn").addEventListener("click", saveFavoriteFromInput);

    
    const urlParams = new URLSearchParams(window.location.search);
    const cityFromFavorites = urlParams.get("city");

    if (cityFromFavorites) {
        document.getElementById("cityInput").value = cityFromFavorites;
        getWeather(); 
    }
});

async function fetchWeather(city) {
    if (!city) {
        showError("Syötä kaupungin nimi!");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fi`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Kaupunkia "${city}" ei löytynyt!`);
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("API-virhe:", error);
        showError(error.message);
    }
}

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        showError("Syötä kaupungin nimi!");
        return;
    }
    fetchWeather(city);
}

function displayWeather(data) {
    const weatherDiv = document.getElementById("weatherResult");
    if (!weatherDiv) return;

    weatherDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${capitalize(data.weather[0].description)}</p>
        <p>🌡 Lämpötila: ${data.main.temp}°C</p>
        <p>💨 Tuuli: ${data.wind.speed} m/s</p>
    `;
}

function showError(message) {
    const weatherDiv = document.getElementById("weatherResult");
    if (weatherDiv) {
        weatherDiv.innerHTML = `<p class="error">❌ ${message}</p>`;
    }
}

function saveFavoriteFromInput() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Syötä kaupungin nimi ennen tallennusta!");
        return;
    }
    saveFavorite(city);
}

function saveFavorite(city) {
    if (!city) return;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(city)) {
        favorites.push(city);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert(`${city} lisätty suosikkeihin!`);
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}










