import CountryDisplay from "./components/CountryDisplay";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY; // Access the API key from the environment variable

  // Fetch all countries when the component mounts
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // Filter countries based on the search query
  useEffect(() => {
    if (searchQuery) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(results);
      setSelectedCountry(null); // Reset selected country on new search
      setWeather(null); // Reset weather data on new search
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null); // Reset selected country on empty search
      setWeather(null); // Reset weather data on empty search
    }
  }, [searchQuery, countries]);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital); // Fetch weather when country is selected
  };

  const fetchWeather = (capital) => {
    if (capital) {
      axios
        .get(
          `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  return (
    <div>
      <h1>Country Search</h1>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search for a country...'
      />
      {selectedCountry ? (
        <CountryDisplay country={selectedCountry} weather={weather} />
      ) : (
        <CountryDisplay
          filteredCountries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      )}
    </div>
  );
};

export default App;
