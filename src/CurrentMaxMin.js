import React from "react";

export default function CurrentTemperature(props) {
  return (
    <div className="row RowTodayForecast">
      <div className="col-1" />
      <div className="col-2 Min">
        {props.weather.tempmin} ˚{props.weather.units} min
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
        {props.weather.tempmax} ˚{props.weather.units} max
      </div>
      <div className="col-1" />
    </div>
  );
}
