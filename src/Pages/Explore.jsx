import { useEffect, useState } from "react";
import { getAllCountries } from "../api/countryService";
import { Link } from "react-router-dom";

function Explore() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    let data = [...countries];

    if (region !== "All") {
      data = data.filter((country) => country.region === region);
    }

    if (search) {
      data = data.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredCountries(data);
  }, [search, region, countries]);

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="bg-white rounded-2xl p-5 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-700">WanderLog</h1>

          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72"
          />
        </div>

        <div className="flex gap-3 mt-5 flex-wrap">
          {regions.map((item) => (
            <button
              key={item}
              onClick={() => setRegion(item)}
              className={`px-4 py-1 rounded-full border text-sm ${
                region === item ? "bg-teal-700 text-white" : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredCountries.map((country) => (
            <Link key={country.cca3} to={`/country/${country.cca3}`}>
              <div className="bg-white border rounded-xl p-3 hover:shadow-lg transition">
                <img
                  src={country.flags.svg}
                  alt=""
                  className="w-full h-28 object-cover rounded-lg"
                />

                <h3 className="font-bold text-lg mt-3">
                  {country.name.common}
                </h3>

                <div className="space-y-1 mt-2 text-sm text-gray-500">
                  <p>
                    <i className="fa-solid fa-location-dot mr-2"></i>
                    {country.capital?.[0]}
                  </p>

                  <p>
                    <i className="fa-solid fa-users mr-2"></i>
                    {(country.population / 1000000).toFixed(2)}M
                  </p>

                  <p>
                    <i className="fa-solid fa-earth-americas mr-2"></i>
                    {country.region}
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  <button className="w-8 h-8 rounded-full border border-red-300 text-red-400">
                    <i className="fa-regular fa-heart"></i>
                  </button>

                  <button className="w-8 h-8 rounded-full border border-teal-300 text-teal-600">
                    <i className="fa-solid fa-check"></i>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
