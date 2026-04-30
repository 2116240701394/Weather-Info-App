async function getWeather() {
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/weather/${city}`);
        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h3>${data.city}</h3>
            <p>Temperature: ${data.temperature} °C</p>
            <p>Condition: ${data.condition}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Wind Speed: ${data.windSpeed} m/s</p>
        `;

    } catch (error) {
        document.getElementById("result").innerHTML = "Error fetching data";
    }
}
