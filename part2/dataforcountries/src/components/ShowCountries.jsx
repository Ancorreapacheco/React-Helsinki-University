const ShowCountry = ({ country, weather }) => {
  let urlIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h2> {country.name.common}</h2>
      <p>Capital:{country.capital} </p>
      <p>Area:{country.area} </p>
      <h3>Languajes</h3>
      <ul>
        {Object.entries(country.languages).map((lang) => (
          <li key={lang[0]}>{lang[1]}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt="bandera del pais" />
      <h2>Wheather in {country.capital} </h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <img src={urlIcon} alt="icono" />      
      <p>Wind: {weather.wind.speed} km/h</p>
    </>
  );
};

const ShowCountries = ({ countries, handleShowCountry, weather }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (countries.length > 1 && countries.length < 10) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}
            <button
              onClick={handleShowCountry}
              data-country={country.name.common}
            >
              {" "}
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  }
  if (countries.length === 1) {
    return <ShowCountry country={countries[0]} weather={weather} />;
  }
  return <p>Countries vacios</p>;
};

export default ShowCountries;
