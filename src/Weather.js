import React, { useState } from "react";
import axios from "axios";
import date from "date-and-time";
import LoaderSpinner from "./LoaderSpinner";

export default function Weather() {
  let [input, setInput] = useState("");
  const [submit, setSubmit] = useState(false);
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState("");
  const [units, setUnits] = useState("C");
  const [data, setData] = useState({});
  const [currentmin, setCurrentMin] = useState("");
  const [currentmax, setCurrentMax] = useState("");
  const now = new Date();
  const pattern = date.compile(" ddd, MMM DD YYYY");

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
      <button className="btn btn-outline-light my-2 my-sm-0" type="button">
        Current
      </button>
      <div className="SetDate"> {date.format(now, pattern)} </div>
    </form>
  );

  let weatherDetails = (
    <div className="weather-details">
      <div className="row principal">
        <div className="col-5">
          <h2 id="city">{city} </h2>
          <p className="mainData">
            {" "}
            Precipitation: <span id="humidity" /> {data.humidity}%
            <br /> Wind : <span id="wind" /> {data.wind} km/hr{" "}
          </p>
        </div>
        <div className="col-2" id="col-temp">
          <h2>
            {temperature}˚{units}
          </h2>
          <h5 className="change-metric">
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

      <div className="row rowTodayForecast">
        <div className="col-1" />
        <div className="col-2 min">
          <span id="temp-min"> {currentmin}</span>
          <span> ˚{units} min</span>
        </div>
        <div className="col-6">
          <h3 className="currentTemperatureLabel">
            <img
              className="left-arrow"
              src={
                "https://d29fhpw069ctt2.cloudfront.net/icon/image/39040/preview.png"
              }
              width="12"
              height="auto"
              alt="left arrow"
            />
            Current Temperature
            <img
              src={
                "https://d29fhpw069ctt2.cloudfront.net/icon/image/39041/preview.png"
              }
              width="12"
              height="auto"
              alt="right arrow"
            />
          </h3>
        </div>
        <div className="col-2" id="col-max">
          <span id="temp-max"> {currentmax} </span>
          <span>˚{units} max</span>
        </div>
        <div className="col-1" />
      </div>
      <div className="row row-header-forecast">
        <h3 id="forecast-title">Forecast</h3>
        <h6>Next Days</h6>
      </div>
      <div className="row rowDetailForecast mh-30" id="forecast" />
    </div>
  );

  return (
    <div className="weather-app-wrapper">
      <div className="weather-app" id="weather-background">
        <h1 className="AppTitle">Weather</h1>

        <div className="row rowHeader">{form}</div>
        <div>{submit ? <LoaderSpinner /> : weatherDetails} </div>
      </div>
      <small id="gitHubUrl">
        <a
          href="https://github.com/Mariannkmb/"
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
