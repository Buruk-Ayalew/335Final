const fetch = require("node-fetch");

async function getWeather(city, country) {
  const apiWeatherKey = process.env.WEATHERSTACK_API_KEY;
  const query = `${city}, ${country}`;

  const url =
    `http://api.weatherstack.com/current` +
    `?access_key=${apiWeatherKey}` +
    `&query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return { error: data.error.info };
    }
    return {
      temperature: data.current.temperature,
      feelsLike: data.current.feelslike
    };
    
  } catch (err) {
    return { error: "Weatherstack request failed" };
  }
}

module.exports = getWeather;