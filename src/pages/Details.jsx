import React from "react";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
const URL = `https://restcountries.com/v3.1/`;
export default function Details() {
  const { name } = useParams();
  console.log(name);
  const [countryDetails, setCountryDetails] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [borderCountries, setBorderCountries] = React.useState([]);
  function getLanguageJsx() {
    const languagesArr = Object.values(countryDetails?.languages);
    return languagesArr.map((lang, index) => {
      return (
        <span key={index}>
          {lang}
          {index != languagesArr.length - 1 ? ", " : "."}
        </span>
      );
    });
  }

  function getBorderCountries() {
    if (borderCountries.length === 0) {
      return "No Bordering Countries";
    }
    return borderCountries?.map((country) => {
      return (
        <Link
          to={`/details/${country.name.common}`}
          key={country.cca2}
          className="shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-2 hover:border-b-2 "
        >
          {country.name.common}
        </Link>
      );
    });
  }

  React.useEffect(() => {
    async function getCountryDetails(name) {
      try {
        setStatus("loading");
        const response = await fetch(URL + `name/${name}?fullText=true`);
        if (!response.ok) {
          throw Error("API error");
        }
        const data = await response.json();
        setCountryDetails(data[0]);
        setStatus("success");
        console.log(data);

        if (data[0].borders && data[0].borders.length > 0) {
          let borderCodes = data[0].borders.join(",");
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha/?codes=${borderCodes}`
          );
          const borderData = await borderResponse.json();
          setBorderCountries(borderData);
          console.log(borderData);
        }
      } catch (error) {
        setStatus("error");
        console.log(error);
      }
    }

    getCountryDetails(name);
  }, [name]);

  // console.log(Object.values(countryDetails?.languages));
  return (
    <div className=" max-w-[1024px]  mx-auto container">
      <div className="sm:max-w-[500px] sm:mx-auto md:max-w-[100%]">
        <Link to="/">
          <div className="flex flex-row justify-center items-center gap-4 px-4 py-2 max-w-[8rem] mt-4 ml-4 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
            <div>
              <IoArrowBackSharp />
            </div>
            <span>Back</span>
          </div>
        </Link>
        {status === "error" && <div>Something went wrong! 404</div>}
        {status === "success" && (
          <div className="min-w-[250px]  mt-4 p-4 md:flex md:gap-4 shadow-2xl md:p-6">
            <div className="w-full md:flex-1 ">
              <img
                src={countryDetails.flags.svg}
                alt={countryDetails.flags.alt}
                className="w-full max-w-[450px]"
              />
            </div>
            <div className="md:flex-1">
              <h2 className="text-[1.2rem] text-lightText mt-4 mb-2">
                {countryDetails.name.common}
              </h2>
              <div className="pt-4 ">
                <p>
                  Native Name:{" "}
                  <span>
                    {countryDetails.name.native || countryDetails.name.common}
                  </span>
                </p>
                <p>
                  Population: <span>{countryDetails.population}</span>
                </p>
                <p>
                  Region: <span>{countryDetails.region}</span>
                </p>
                <p>
                  Sub-region: <span>{countryDetails.subregion}</span>
                </p>
                <p>
                  Capital: <span>{countryDetails.capital}</span>{" "}
                </p>
              </div>

              <div className="pt-4 ">
                <p>
                  Top Level Domain: <span>{countryDetails.tld}</span>
                </p>
                <p>
                  Currencies:{" "}
                  <span>
                    {Object.values(countryDetails?.currencies)[0].name}
                  </span>
                </p>
                <p>Languages: {getLanguageJsx()} </p>
              </div>

              <div>
                <h2>Border Countries: </h2>
                <div className="flex flex-row flex-wrap gap-2 ">
                  {getBorderCountries()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
