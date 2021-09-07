const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require('axios');

const app = express();

const mealTypes = {
  'three': ['Breakfast', 'Lunch', 'Dinner'],
  'four': ['Breakfast', 'Lunch', 'Tea', 'Dinner'],
  'five': ['Breakfast Snack', 'Breakfast', 'Lunch', 'Afternoon Snack', 'Dinner']
};

const appKey = '86577f7b936561855eac4d586e23ec55';
const appId = '3304cf1a';

app.use(cors());
app.use(express.json());

app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use("/build", express.static(path.resolve(__dirname, "build")));

const renderHTML = (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
};

const generateQueryString = (data, id, key) => {
  let healthLabels = '';
  if (data.healthPreferences) {
    for (let healthLabel of data.healthPreferences) {
      healthLabels += `&health=${healthLabel}`;
    }
  }
  let queries = [];
  for (let i = 0; i < mealTypes[data.mealCount].length; i++) {
    let queryParam = mealTypes[data.mealCount][i];
    let query = `q=${queryParam}&app_id=${id}&app_key=${key}&to=${data.planType}&diet=${data.diet}${healthLabels}&random=true`;
    queries.push(query);
  }
  return queries;
};

const getPlan = (data) => {
  let result = [];
  let promises = [];
  let queries = generateQueryString(data, appId, appKey);
  for(const q of queries) {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&${q}`;
    promises.push(
      axios.get(url)
        .then(res => {
          result.push(res.data.hits);
        })
        .catch(err => {
          console.log(err);
        })
    );
  }
  
  return Promise.all(promises).then(() => {
    return result;
  });
};

app.get("/*", renderHTML);
app.post("/api/getPlan", (req, res) => {
  getPlan(req.body).then(result => {
    res.send(result);
  });
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
