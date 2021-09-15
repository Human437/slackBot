const axios = require("axios");

module.exports = async () => {
  console.log("Calling getCatImg module");
  const res = await axios.get("https://api.thecatapi.com/v1/images/search");
  const response = res.data[0].url;
  return response;
};
