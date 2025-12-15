
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/trip', async (req, res) => {
    const { name, city, country } = req.body;

    const weather = await getWeather(city);
    res.render('index', { name, city, country, weather });
});  

async function getWeather(city) {
    if (!city) return null;
  
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod !== 200) {
        return { error: data.message };
      }
  
      return {
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description
      };
    } catch (err) {
      return { error: 'Unable to fetch weather data' };
    }
  }

const PORT = 3001;
app.listen(PORT, () => { console.log(`Web server started and running at http://localhost:${PORT}`);});