function CountryInfo({ country }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow">
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="w-full h-64 object-cover rounded-xl"
      />

      <h1 className="text-4xl font-bold mt-5">
        {country.name.common}
      </h1>

      <p className="text-gray-500 mt-2">
        {country.capital?.[0]}
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <h4 className="font-semibold">Population</h4>
          <p>{country.population.toLocaleString()}</p>
        </div>

        <div>
          <h4 className="font-semibold">Region</h4>
          <p>{country.region}</p>
        </div>

        <div>
          <h4 className="font-semibold">Currencies</h4>
          <p>
            {country.currencies &&
              Object.values(country.currencies)[0]?.name}
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Languages</h4>
          <p>
            {country.languages &&
              Object.values(country.languages).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;