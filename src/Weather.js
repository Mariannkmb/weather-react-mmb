import React, { useState } from "react";
import axios from "axios";
import date from "date-and-time";
// import FormatDate from "./FormatDate";
import LoaderSpinner from "./LoaderSpinner";
import { usePosition } from "use-position";
import WeatherDetails from "./WeatherDetails";

export default function Weather(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [data, setData] = useState({ submit: false });
  const now = new Date();
  const pattern = date.compile(" ddd, MMM DD YYYY");
  const watch = true;
  const { latitude, longitude } = usePosition(watch);
  let count = 0;

  function GetData(response) {
    setData({
      submit: true,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      tempmax: Math.round(response.data.main.temp_max),
      tempmin: Math.round(response.data.main.temp_min),
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      city: response.data.name,
    });
  }

  function HandleSubmit(event) {
    event.preventDefault();
    SearchCity();
  }

  function HandleCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function SearchCity() {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b5de5ed43000236f70d3412957f9f340`;
    axios.get(apiUrl).then(GetData);
  }

  function GetCurrentCity() {
    let apiKey = "b5de5ed43000236f70d3412957f9f340";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(GetData);
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
      <div className="SetDate mt-6"> {date.format(now, pattern)}</div>
    </form>
  );

  if (data.submit) {
    return (
      <div className="WeatherAppWrapper">
        <div className="weather-app">
          <h1 className="AppTitle">Weather</h1>
          <div className="row rowHeader">{form}</div>
          <div>
            {" "}
            <WeatherDetails weather={data} />{" "}
          </div>
        </div>
        <small className="GitHubUrl">
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
  } else {
    return (
      <div>
        <LoaderSpinner /> {SearchCity(city)}
      </div>
    );
  }
}

// <FormatDate date={data.date} />;
