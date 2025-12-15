const fetch = require("node-fetch");

async function getWeather(city, country) {
  const apiWeatherKey = process.env.WEATHERSTACK_API_KEY;

  const url =
    "http://api.weatherstack.com/current" +
    `?access_key=${apiWeatherKey}` +
    `&query=${encodeURIComponent(city + ", " + country)}`;

  try {
    const apiResponse = await fetch(url);
    const weatherData = await apiResponse.json();

    if (data.error) {
      return { error: weatherData.error.info };
    }

    return {
      temp: data.current.temperature,
      feels: data.current.feelslike
    };
  } catch (err) {
    return { error: "FAIL: can't fetch weather data" };
  }
}

module.exports = getWeather;