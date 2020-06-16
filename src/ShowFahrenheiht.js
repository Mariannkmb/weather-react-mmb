import React from "react";

export default function ShowFahrenheiht(props) {
  let fahrenheiht = Math.round(props.temperature * (9 / 5) + 32);
  return fahrenheiht;
}
