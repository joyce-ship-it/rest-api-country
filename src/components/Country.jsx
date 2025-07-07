import React from "react";
import { Link } from "react-router-dom";

export default function Country({
  imgUrl,
  alt,
  name,
  population,
  region,
  capital,
}) {
  return (
    <Link
      to={`/details/${name}`}
      className="flex flex-col min-w-[200px]  max-w-[300px] flex-1  shadow-2xl rounded-2xl"
    >
      <div className="rounded-t-2xl overflow-hidden h-[50%]">
        <img className="w-full h-[100%]" src={imgUrl} alt={alt} />
      </div>
      <div className="pl-2 pt-2 ">
        <h2 className="text-[1.1rem]">{name}</h2>
        <div className="pt-4 pb-4">
          <p>
            Population: <span className="text-lightInput">{population}</span>
          </p>
          <p>
            Region: <span className="text-lightInput">{region}</span>{" "}
          </p>
          <p>
            Capital: <span className="text-lightInput">{capital}</span>{" "}
          </p>
        </div>
      </div>
    </Link>
  );
}
