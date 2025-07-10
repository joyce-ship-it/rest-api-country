import React from "react";
const URL = `https://restcountries.com/v3.1/all?fields=name,flags,population, region,capital,region`;
import Country from "../components/Country";
import { ThemeContext } from "../App";
export default function Home() {
  const [status, setStatus] = React.useState("loading");
  const [allCountries, setAllCountries] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [region, setRegion] = React.useState("");

  const { theme } = React.useContext(ThemeContext);

  function handleQueryChange(e) {
    const value = e.target.value;
    setSearchQuery(value);
  }

  function handleRegionChange(e) {
    setRegion(e.target.value);
  }

  React.useEffect(() => {
    async function getAllCountries(URL) {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw Error("API Error");
        }
        const data = await response.json();
        setAllCountries(data);
      } catch (error) {
        setStatus("error");
        console.log(error);
      } finally {
        setStatus("complete");
      }
    }
    getAllCountries(URL);
  }, []);

  // const filteredCountries = allCountries.filter((country) => {
  //   return country.name.common
  //     .toLowerCase()
  //     .includes(searchQuery.toLowerCase());
  // });

  const filteredCountries = allCountries
    .filter((country) => {
      return (
        country.region.toLowerCase() === region.toLowerCase() || region === ""
      );
    })
    .filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });

  if (filteredCountries.length > 0) {
    console.log(filteredCountries);
  }
  return (
    <div
      className={
        theme === "dark"
          ? "bg-bg-dark text-lime-50 flex-1 flex flex-col"
          : "flex-1 flex flex-col"
      }
    >
      <div className="mt-4 mb-4 mx-2 shadow-xl rounded-2xl md:hidden">
        <input
          type="text"
          placeholder="🔍 search for a country"
          value={searchQuery}
          onChange={handleQueryChange}
          className=" w-full p-2 pl-4 rounded-2xl outline-lightText "
        />
      </div>
      <div className="ml-4 mb-4 md:hidden">
        <label>
          Filter by region
          <select
            value={region}
            onChange={handleRegionChange}
            name="filter"
            id="filter"
            className="p-2.5 shadow-xl rounded-md outline-lightText ml-2 "
          >
            <option value="">All</option>
            <option value="africa">Africa</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="americas">America</option>
            <option value="oceania">Oceania</option>
          </select>
        </label>
      </div>
      <div className="mt-4 mb-4  hidden md:flex flex-row justify-between md:px-6">
        <div className="  shadow-xl rounded-2xl min-w-[25rem]">
          <input
            type="text"
            placeholder="🔍 search for a country"
            value={searchQuery}
            onChange={handleQueryChange}
            className=" w-full p-2 pl-4 rounded-2xl outline-lightText "
          />
        </div>
        <div className="max-w-[fit-content]">
          <label>
            Filter by region
            <select
              value={region}
              onChange={handleRegionChange}
              name="filter"
              id="filter"
              className="p-2.5 shadow-xl rounded-md outline-lightText ml-2 "
            >
              <option value="">All</option>
              <option value="africa">Africa</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="americas">America</option>
              <option value="oceania">Oceania</option>
            </select>
          </label>
        </div>
      </div>
      {status === "loading" && (
        <div className="flex-1 flex justify-center items-center">
          Loading...
        </div>
      )}
      {status === "error" && (
        <div className="flex-1 flex justify-center items-center text-red-500">
          something went wrong :(
        </div>
      )}
      <div className="flex flex-wrap justify-center md:justify-start gap-[1rem] sm:gap-y-[1.5rem] md:gap-y-[2rem] p-2 md:px-6">
        {status === "complete" &&
          filteredCountries.map((country) => {
            return (
              <Country
                key={country.name.common}
                imgUrl={country.flags.svg}
                alt={country.flags.alt}
                name={country?.name?.common}
                population={country.population}
                region={country.region}
                capital={country.capital[0]}
              ></Country>
            );
          })}
      </div>
    </div>
  );
}
