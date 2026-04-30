const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;

// Route: Get weather by city
app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = response.data;

        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            windSpeed: data.wind.speed
        };

        res.json(weatherData);

    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch weather data",
            details: error.message
        });
    }
});

// Route: Health check
app.get("/", (req, res) => {
    res.send("Weather API Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
