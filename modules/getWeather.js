const axios = require("axios");
module.exports = async (city) => {
  let res;
  try {
    res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: process.env.WEATHER_TOKEN,
      },
    });
  } catch (err) {
    console.log(err);
    if (err.response.status === 400) {
      res = "You may want to try this: weather {city name}";
    } else if (err.response.status === 404) {
      res = "City not found";
    }
  }
  return res;
};
