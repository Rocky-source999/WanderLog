import CountryCard from "./CountryCard";

function CountryGrid({ countries }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
        />
      ))}
    </div>
  );
}

export default CountryGrid;