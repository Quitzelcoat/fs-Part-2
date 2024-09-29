/* eslint-disable react/prop-types */
const CountryDisplay = ({
  filteredCountries,
  onShowCountry,
  country,
  weather,
}) => {
  if (country) {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <p>Languages: {Object.values(country.languages).join(", ")}</p>
        {weather && (
          <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.current.temp_c} °C</p>
            <p>Condition: {weather.current.condition.text}</p>
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
            />
          </div>
        )}
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name.common}`}
          style={{ width: "150px", height: "auto" }}
        />
      </div>
    );
  } else if (filteredCountries.length > 10) {
    return <p>Too many matches, please specify further.</p>;
  } else if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => onShowCountry(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>No matches found.</p>;
  }
};

export default CountryDisplay;
