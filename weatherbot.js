require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return {
        temp: data.temp,
        condition: data.weather[0].description,
        humidity: data.humidity
    };
}
async function askWeatherGpt(city, profession, question) {
    const weather = await getWeather(city);
    const prompt = `
    ROLE: You are WeatherGPT, giving practical weather advice. 
    DATA (real, form OpenWeatherMap for ${city}): ${JSON.stringify(weather)}
    USER: A ${profession} asking: "${question}"
    CONSTRAINTS: only use facts in DATA. Never invent numbers. Keep it under 3 sentences. Give profession-relevant advice.
    `;

    const response = await genAI.models.generateContent({
        model: "gemini-3.7-flash",
        max_tokens: 200,
        contents: prompt;
    });
    return response.text;
}
askWeatherGpt("Alappuzha", "farmer", "Should i go to the field tomorrow?")
    .then(answer => console.log(answer))
    .catch(err => console.error("Error:", err));