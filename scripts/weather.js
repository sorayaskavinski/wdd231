const apiKey = "815123c426417cedb6f39238699089a1"; 
const city = "São Paulo";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Weather data not available");
        }
        const data = await response.json();
        document.getElementById("weather").innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById("weather").innerHTML = "Failed to load weather data.";
    }
}

// Load weather when the page loads
window.onload = getWeather;
