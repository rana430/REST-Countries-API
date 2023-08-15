import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { FaMoon } from "react-icons/fa";
import { createContext } from "react";
import "./App.css";
import { HeaderSection } from "./components/HeaderSections";
import { Countries } from "./components/Countries";
import { CountryDetails } from "./components/CountryDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const themeConstext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  const [countries, setCountry] = useState([]);
  const CountryInputRef = useRef();
  const RegionRef = useRef();
  const navigate = useNavigate();
  const isCountry = countries.status || countries.message;
  console.log(isCountry);
  const dataFetch = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    setCountry(response.data);
  };
  useEffect(() => {
    dataFetch();
  }, []);

  const handleInputChange = () => {
    const SearchValue = CountryInputRef.current.value.toLowerCase();
    if (SearchValue.trim()) {
      const fetchSearch = async () => {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${SearchValue}`
        );
        const info = response.data;
        setCountry(info);
      };
      fetchSearch();
    } else {
      dataFetch();
    }
  };

  const handleRegionChange = (selectedRegion) => {
    if (selectedRegion === "All") {
      dataFetch();
    } else {
      const FilterValue = RegionRef.current.value;

      if (FilterValue.trim()) {
        const fetchFilter = async () => {
          const response = await axios.get(
            `https://restcountries.com/v3.1/region/${FilterValue}`
          );

          setCountry(response.data);
        };

        fetchFilter();
      } else {
        dataFetch();
      }
    }
  };
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const showDetails = (code) => {
    navigate(`/${code}`);
  };
  return (
    <themeConstext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className="Mains">
          <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-section">
            <div className="container-md">
              <h5>
                <a href="../public/index.html" className="navbar-brand">
                  Where in the World ?
                </a>
              </h5>
              <div className="theme-switch">
                <button
                  onClick={toggleTheme}
                  type="button"
                  className="btn btn-light">
                  <FaMoon className="fa-moon" />
                  Dark Mode
                </button>
              </div>
            </div>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <HeaderSection
                    handleInput={handleInputChange}
                    CountryInputRef={CountryInputRef}
                    RegionRef={RegionRef}
                    handleRegion={handleRegionChange}
                  />
                  <div className="country">
                    {!isCountry ? (
                      countries.map((country, index) => (
                        <Countries
                          key={index}
                          code={country.ccn3}
                          name={country.name}
                          capital={country.capital}
                          population={country.population}
                          region={country.region}
                          flag={country.flags}
                          showDetails={showDetails}
                        />
                      ))
                    ) : (
                      <p>No Countries Found!</p>
                    )}
                  </div>
                </div>
              }
            />
            <Route
              path="/:countryCode"
              element={
                <CountryDetails
                  countries={countries}
                  showDetails={showDetails}
                  refetch={dataFetch}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </themeConstext.Provider>
  );
}

export default App;
