import React, { useState } from "react";
import ShowFahrenheiht from "./ShowFahrenheiht";

export default function Temperature(props) {
  const [units, setUnits] = useState("C");
  const [temperature, setTemperature] = useState(props.weather.temperature);
  //   const [currentmin, setCurrentMin] = useState(props.weather.tempmin);
  //   const [currentmax, setCurrentMax] = useState(props.weather.tempmax);

  function ShowCelcius(event) {
    event.preventDefault();
    setTemperature(props.weather.temperature);
    setUnits("C");
  }

  function ShowFarenheint(event) {
    event.preventDefault();
    setTemperature(<ShowFahrenheiht temperature={temperature} />);
    setUnits("F");
  }
  if (units === "C") {
    return (
      <div>
        <h2>
          {props.weather.temperature} {units}
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
    );
  } else {
    return (
      <div>
        <h2>
          {temperature} {units}
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
    );
  }
}
