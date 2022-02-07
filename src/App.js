import "./App.css";
import "leaflet/dist/leaflet.css";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import Infobox from "./Infobox";
import Maps from "./Map";
import numeral from "numeral";
import { prettyPrintStat } from "./utils.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setMapCountries(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App p-8">
      <h1 className="my-auto text-4xl lg:text-6xl" id="title">Corona Tracker</h1>
      <div className="app__header flex flex-col md:flex-row mb-4 justify-center m-3">
        <FormControl className="app_dropdown flex flex-col md:flex-row">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="flex flex-col pt-4 md:flex-row" id="card">
        <Infobox
          total={numeral(countryInfo.cases).format("0.0a")}
          title="Coronavirus Cases"
          cases={prettyPrintStat(countryInfo.todayCases)}
        />
        <Infobox
          total={numeral(countryInfo.recovered).format("0.0a")}
          title="Recovered"
          cases={prettyPrintStat(countryInfo.todayRecovered)}
        />
        <Infobox
          total={numeral(countryInfo.deaths).format("0.0a")}
          title="Deaths"
          cases={prettyPrintStat(countryInfo.todayDeaths)}
        />
      </div>
      <Maps countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      <footer class="bg-gray-200 text-center lg:text-left">
        <div
          class="text-gray-700 text-center p-4"
        >
          data from disease.sh
        </div>
      </footer>
    </div>
  );
}

export default App;
