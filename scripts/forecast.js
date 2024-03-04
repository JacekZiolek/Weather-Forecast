function Forecast() {
  this.key = "";
  this.weatherURI =
    "http://dataservice.accuweather.com/locations/v1/cities/search";
  this.cityURI = "http://dataservice.accuweather.com/currentconditions/v1/";
}
Forecast.prototype.updateCity = async function (city) {
  const cityDetails = await this.getCity(city);
  const weather = await this.getWeather(cityDetails.Key);
  return { cityDetails, weather };
};
Forecast.prototype.getCity = async function (city) {
  const query = `?apikey=${this.key}&q=${city}`;
  const response = await fetch(this.weatherURI + query);
  const data = await response.json();
  return data[0];
};
Forecast.prototype.getWeather = async function (id) {
  const query = `${id}?apikey=${this.key}`;
  const response = await fetch(this.cityURI + query);
  const data = await response.json();
  return data[0];
};
