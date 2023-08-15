import { useState, useEffect } from "react";
import React from "react";
import { createContext } from "react";
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { themeConstext } from "../App";

export const CountryDetails = ({ countries, showDetails, refetch }) => {
  const { theme } = useContext(themeConstext);
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryCode } = useParams();

  const handleShowDetail = () => {
    showDetails(countryCode);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        const countryInfo = res.data[0];
        setCountry(countryInfo);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryCode]);
  const borders = country.borders || [];
  const countryBorders = borders
    ? borders.map((border) => {
        const borderCountry = countries.find(
          (country) => country.ccn3 === border
        );
        return borderCountry ? borderCountry.name.common : border;
      })
    : [];
  const currencyValues = Object.values(country.currencies || {}).map(
    (currency) => currency.name
  );
  const languageValues = Object.values(country.languages || {}).map(
    (language) => language
  );
  console.log(country);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="country-details" id={theme}>
      <div className="go-back" onClick={goBack}>
        <button className="btn-back">
          <FaArrowLeft />
          <p>Go Back</p>
        </button>
      </div>
      <div className="country-details-body">
        <div className="img-container">
          <img src={country.flags?.png} alt="" />
        </div>
        <div className="info">
          <h2>{country.name?.common}</h2>
          <div className="info-container">
            <div className="l-info">
              <div className="data-info">
                <p>
                  Native Name:
                  <span className="values">{country.name?.official}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Population :
                  <span className="values">{country.population}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Region:
                  <span className="values">{country.region}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Sub Region:
                  <span className="values">{country.subregion}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Capital:
                  <span className="values">{country.capital}</span>
                </p>
              </div>
            </div>
            <div className="r-info">
              <div className="data-info">
                <p>
                  Top Level Domain:
                  <span className="values">{country.tld}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Currencies:
                  <span className="values">{currencyValues}</span>
                </p>
              </div>
              <div className="data-info">
                <p>
                  Languages:
                  <span className="values">{languageValues}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-countries-container">
            <p>Border Countries:</p>
            <div className="border-countries">
              {countryBorders.map((name, index) => (
                <div
                  key={index}
                  className="border"
                  onClick={() => {
                    refetch();
                    navigate(`/${name}`);
                  }}>
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
