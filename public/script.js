const searchElement = document.querySelector("[data-city-search]");
const searchBox = new google.maps.places.SearchBox(searchElement);
searchBox.addListener("places_changed", () => {
  const place = searchBox.getPlaces()[0];
  if (place == null) return;
  const latitude = place.geometry.location.lat();
  const longitude = place.geometry.location.lng();
  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "apllication/json"
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  })
    .then(res => res.json())
    .then(data => {
     // console.log(data);
      setWeatherData(data);
    });
});

setWeatherData = (data) => {

    document.querySelector("#tempContainer").innerHTML = tempInFahrenheit(data.main.temp)
    document.querySelector("#humidityContainer").innerHTML = data.main.humidity;
    document.querySelector("#windContainer").innerHTML = data.wind.speed + " miles/hour"
}

tempInFahrenheit = (tempInKelvin) => {
    let tempInFahrenheit;
    tempInFahrenheit =((tempInKelvin - 273.15)*9/5 + 32).toFixed(2);
    return tempInFahrenheit;
}