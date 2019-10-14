if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const OpenWeatherMap_API_Key = process.env.Open_Weather_Map_API_key;
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post("/weather", (req, res) => {
  // console.log(req.body);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&APPID=${OpenWeatherMap_API_Key}`
  axios({
    url: url,
    responseType: "json"
  }).then(data => {
    res.send(data.data);
  });
});

app.listen(3000, () => {
  console.log("server started");
});
