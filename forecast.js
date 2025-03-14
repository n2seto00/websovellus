const API_KEY = "Kirjoita tähän omasi";

async function fetchForecast(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}&lang=fi`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Kaupunkia ei löytynyt!`);

        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error("API-virhe:", error);
        document.getElementById("forecastResult").innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById("forecastResult");
    forecastDiv.innerHTML = "<h3>5 päivän ennuste:</h3>";

    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString("fi-FI");
        forecastDiv.innerHTML += `
            <p><strong>${date}</strong>: ${day.weather[0].description}, 🌡 ${day.main.temp}°C</p>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("forecastSearchBtn").addEventListener("click", () => {
        const city = document.getElementById("forecastCityInput").value.trim();
        if (city) {
            fetchForecast(city);
        } else {
            document.getElementById("forecastResult").innerHTML = `<p class="error">Syötä kaupungin nimi!</p>`;
        }
    });
});

