
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

const getWeather = require('./api/weather');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/trip', async (req, res) => {
    const { name, city, country } = req.body;

    const newTrip = new Trip({ name, city, country });
    await newTrip.save();

    const weather = await getWeather(city);
    res.render('index', { name, city, country, weather });
});

const PORT = 3001;
app.listen(PORT, () => { console.log(`Web server started and running at http://localhost:${PORT}`);});