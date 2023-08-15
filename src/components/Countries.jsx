import { useState, useEffect } from "react";
import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { themeConstext } from "../App";
import { Link } from "react-router-dom";

export const Countries = ({
  name,
  capital,
  population,
  region,
  flag,
  showDetails,
  code,
}) => {
  const { theme } = useContext(themeConstext);
  const handleShowDetail = () => {
    showDetails(code);
  };

  return (
    <div id={theme} onClick={handleShowDetail}>
      <div className="card">
        <div className="flag-country">
          <img src={flag.png} alt="" />
        </div>
        <div className="details">
          <h3 className="name">{name.common}</h3>
          <div className="liner"></div>
          <p>
            Population :<span className="values">{population}</span>
          </p>
          <div className="liner"></div>
          <p>
            Region :<span className="values">{region}</span>
          </p>
          <div className="liner"></div>
          <p>
            Capital :<span className="values">{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
