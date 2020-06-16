import React, { useState } from "react";
import Temperature from "./Temperature";
import CurrentMaxMin from "./CurrentMaxMin";

export default function WeatherDetails(props) {
  const [temperature, setTemperature] = useState(props.weather.temperature);

  return (
    <div className="Weather">
      <div className="row ">
        <div className="col-5 CityDetailsCeld">
          <h2 className="City">{props.weather.city} </h2>
          <div className="Main">
            <ul>
              <li> Precipitation: {props.weather.humidity}% </li>
              <li> Wind : {props.weather.wind} km/hr </li>
            </ul>
          </div>
        </div>
        <div className="col-2 TempCeld">
          <Temperature weather={props.weather} />
          {/* {temperature}˚{units} */}
        </div>
        <div className="col-5 DescriptionIcon">
          <img src={props.weather.icon} alt="" id="weather-icon" />
          {props.weather.description}
        </div>
      </div>

      <CurrentMaxMin weather={props.weather} />

      <div className="row RowHeaderForecast">
        <h3 className="ForecastTitle">Forecast</h3>
        <h6>Next Days</h6>
      </div>
      <div className="row RowDetailForecast mh-30" />
    </div>
  );
}
