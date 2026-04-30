const express = require("express");
const axios = require("axios");

const router = express.Router();
const API_KEY = process.env.API_KEY;

// GET weather by city
router.get("/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            windSpeed: data.wind.speed
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching weather",
            error: error.message
        });
    }
});

module.exports = router;
