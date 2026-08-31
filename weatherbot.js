require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');
const fetch = require('node-fetch');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
async function getWeather(city) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric';
    const response = await fetch(url);
    const data = await response.json();
    return {
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity
    };

}