require('dotenv').config();
console.log("Key loaded as:", process.env.WEATHER_API_KEY);
console.log("Key length:", process.env.WEATHER_API_KEY.length);
const Anthropic = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    console.log("Requesting URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
        temp: data.temp,
        condition: data.weather[0].description,
        humidity: data.humidity
    };
}
getWeather("Thrissur").then(result => console.log(result));