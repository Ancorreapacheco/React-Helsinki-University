import FindCountries from "./components/FindCountries";
import ShowCountries from "./components/ShowCountries";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countryFilter, setCountryFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const[weather, setWeather]= useState({})

  const handleChangeFilter = (e) => {
    setCountryFilter(e.target.value);
  };

  const handleShowCountry = (e) => {
    setCountryFilter(e.target.dataset.country);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const countriesToShow =
    countryFilter === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(countryFilter.toLowerCase())
        );

  const api_key = process.env.REACT_APP_API_KEY_WEATHER;

  useEffect(() => {
    if (countriesToShow.length > 0) {
      let lat= countriesToShow[0].capitalInfo.latlng[0];
      let lon= countriesToShow[0].capitalInfo.latlng[0];
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
      axios.get(url).then(res=>{        
        setWeather(res.data)
      })
    }
    return
  }, [countryFilter]);

  return (
    <div>
      <FindCountries
        countryFilter={countryFilter}
        handleChangeFilter={handleChangeFilter}
      />
      <ShowCountries
        countries={countriesToShow}
        handleShowCountry={handleShowCountry}
        weather={weather}
      />
    </div>
  );
}

export default App;
