async function fetchWeather(city) {
    const API_KEY = "25ed0fd877473ce17661b1ea96c6df5d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fi`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Kaupunkia ei löytynyt!`);
        return await response.json();
    } catch (error) {
        console.error("API-virhe:", error);
        return null;
    }
}

async function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);
    if (isNaN(guess)) {
        document.getElementById("gameResult").innerText = "Syötä numero!";
        return;
    }

    const weatherData = await fetchWeather("Helsinki");
    if (!weatherData) {
        document.getElementById("gameResult").innerText = "Säätietojen haku epäonnistui!";
        return;
    }

    const realTemp = weatherData.main.temp;
    let diff = Math.abs(realTemp - guess);
    let score = Math.max(0, 100 - diff * 10);

    document.getElementById("gameResult").innerHTML = `
        Oikea lämpötila: ${realTemp}°C. 
        Pisteesi: ${score} 🎯
    `;
}

document.getElementById("checkBtn").addEventListener("click", checkGuess);



