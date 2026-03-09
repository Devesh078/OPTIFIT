const axios = require("axios");

const searchFood = async (query) => {
  const response = await axios.get(
    "https://api.spoonacular.com/food/ingredients/search",
    {
      params: {
        query: query,
        number: 10,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    }
  );

  return response.data;
};

module.exports = { searchFood };