import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition">
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-28 object-cover rounded-lg"/>
      <h3 className="font-bold text-lg mt-3">
        {country.name.common}
      </h3>
      <p className="text-gray-500 text-sm">
        {country.capital?.[0]}
      </p>
      <p className="text-gray-500 text-sm">
        {country.population.toLocaleString()}
      </p>
      <p className="text-gray-500 text-sm">
        {country.region}
      </p>
    </Link>
  );
}

export default CountryCard;