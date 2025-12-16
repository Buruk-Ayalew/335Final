const express = require("express");
const router = express.Router();

const Trip = require("../model/Trip");
const getWeather = require("../api/weather");

router.post("/", async (req, res) => {
  const { name, city, country } = req.body;

  const newTrip = new Trip({ name, city, country });
  await newTrip.save();

  const weather = await getWeather(city, country);

  res.render("index", {
    name,
    city,
    country,
    weather
  });
});

module.exports = router;
