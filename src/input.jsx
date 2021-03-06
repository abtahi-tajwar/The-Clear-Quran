import React, { Component } from "react";
import reactDom from "react-dom";
import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Input() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <React.Fragment>
      <form action="" method={`POST`}>
        <Select options={options} value={value} onChange={changeHandler} />
        <input type="text"></input>
      </form>
    </React.Fragment>
  );
}
