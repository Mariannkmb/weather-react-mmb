import React, { useState } from "react";
import axios from "axios";
import date from "date-and-time";
import LoaderSpinner from "./LoaderSpinner";
import { usePosition } from "use-position";

export default function Weather() {
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState(false);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [units, setUnits] = useState("C");
  const [data, setData] = useState({});
  const [currentmin, setCurrentMin] = useState("");
  const [currentmax, setCurrentMax] = useState("");
  const now = new Date();
  const pattern = date.compile(" ddd, MMM DD YYYY");
  const watch = true;
  const { latitude, longitude } = usePosition(watch);

  function GetData(response) {
    setData({
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      tempmax: response.data.main.temp_max,
      tempmin: response.data.main.temp_min,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    setCity(response.data.name);
    setTemperature(Math.round(response.data.main.temp));
    setCurrentMax(Math.round(response.data.main.temp_max));
    setCurrentMin(Math.round(response.data.main.temp_min));
    setSubmit(false);
  }

  function SearchCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b5de5ed43000236f70d3412957f9f340`;
    axios.get(apiUrl).then(GetData);
  }

  function GetCurrentCity() {
    let apiKey = "b5de5ed43000236f70d3412957f9f340";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(GetData);
    setSubmit(true);
  }

  function HandleSubmit(event) {
    event.preventDefault();
    SearchCity(input);
    setSubmit(true);
  }

  function HandleCity(event) {
    event.preventDefault();
    setInput(event.target.value);
  }

  function ShowCelcius(event) {
    event.preventDefault();
    setTemperature(Math.round(data.temperature));
    setCurrentMax(Math.round(data.tempmax));
    setCurrentMin(Math.round(data.tempmin));
    setUnits("C");
  }

  function ShowFarenheint(event) {
    event.preventDefault();
    let fahrenheiht = Math.round(data.temperature * (9 / 5) + 32);
    setTemperature(fahrenheiht);
    setCurrentMax(Math.round(data.tempmax * (9 / 5) + 32));
    setCurrentMin(Math.round(data.tempmin * (9 / 5) + 32));
    setUnits("F");
  }

  let form = (
    <form className="form-inline search-box" onSubmit={HandleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Enter City"
        aria-label="Search"
        id="searchButton"
        autoComplete="off"
        onChange={HandleCity}
      />
      <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
        Search
      </button>
      <button
        className="btn btn-outline-light my-2 my-sm-0"
        onClick={GetCurrentCity}
        type="button"
      >
        Current
      </button>
      <div className="SetDate mt-6"> {date.format(now, pattern)} </div>
    </form>
  );

  let weatherDetails = (
    <div className="Weather">
      <div className="row principal">
        <div className="col-5">
          <h2 className="City">{city} </h2>
          <div className="Main">
            <ul>
              <li> Precipitation: {data.humidity}% </li>
              <li> Wind : {data.wind} km/hr </li>
            </ul>
          </div>
        </div>
        <div className="col-2" id="col-temp">
          <h2>
            {temperature}˚{units}
          </h2>
          <h5 className="ChangeMetric">
            <a href="/" onClick={ShowCelcius}>
              ˚C
            </a>
            |
            <a href="/" onClick={ShowFarenheint}>
              ˚F
            </a>
          </h5>
        </div>
        <div className="col-5 DescriptionIcon">
          <img src={data.icon} alt="" id="weather-icon" />
          {data.description}
        </div>
      </div>

      <div className="row RowTodayForecast">
        <div className="col-1" />
        <div className="col-2 Min">
          {currentmin} ˚{units} min
        </div>
        <div className="col-1">
          <img
            src={
              "https://d29fhpw069ctt2.cloudfront.net/icon/image/39040/preview.png"
            }
            width="20"
            height="auto"
            alt="left arrow"
          />
        </div>
        <div className="col-4">
          <h3 className="CurrentTemperatureLabel">Current Temperature </h3>
        </div>
        <div className="col-1">
          <img
            src={
              "https://d29fhpw069ctt2.cloudfront.net/icon/image/39041/preview.png"
            }
            width="20"
            height="auto"
            alt="right arrow"
          />
        </div>
        <div className="col-2 Max">
          {currentmax} ˚{units} max
        </div>
        <div className="col-1" />
      </div>

      <div className="row RowHeaderForecast">
        <h3 className="ForecastTitle">Forecast</h3>
        <h6>Next Days</h6>
      </div>
      <div className="row RowDetailForecast mh-30" />
    </div>
  );

  return (
    <div className="WeatherAppWrapper">
      <div className="weather-app" id="weather-background">
        <h1 className="AppTitle">Weather</h1>

        <div className="row rowHeader">{form}</div>
        <div>{submit ? <LoaderSpinner /> : weatherDetails} </div>
      </div>
      <small id="gitHubUrl">
        <a
          href="https://github.com/Mariannkmb/weather-react-mmb"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-source code
        </a>
        , by Mariann Montoya
      </small>
    </div>
  );
}
