import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode } from "../api/countryService";

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountry();
  }, [code]);

  const fetchCountry = async () => {
    try {
      const data = await getCountryByCode(code);
      if (Array.isArray(data)) {
        setCountry(data[0]);
      } else {
        setCountry(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find((item) => item.cca3 === country.cca3);
    if (!exists) {
      wishlist.push(country);
      localStorage.setItem("wishlist",JSON.stringify(wishlist));
      alert("Added to Bucket List");
    } else {
      alert("Already in Bucket List");
    }
  };

  const markVisited = () => {
    const visited = JSON.parse(localStorage.getItem("visited")) || [];
    const exists = visited.find((item) => item.cca3 === country.cca3);
    if (!exists) {
      visited.push(country);
      localStorage.setItem("visited",JSON.stringify(visited));
      alert("Marked as Visited");
    } else {
      alert("Already Marked as Visited");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h2 className="text-xl font-semibold">
          Country Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-5">
        <button
          onClick={() => navigate("/explore")}
          className="text-teal-700 mb-4 flex items-center gap-2 font-medium">
          <i className="fa-solid fa-chevron-left"></i>
          Back
        </button>
        <img
          src={country.flags?.svg}
          alt={country.name?.common}
          className="w-full h-64 object-cover rounded-xl"/>
        <h1 className="text-5xl font-bold text-slate-800 mt-5">
          {country.name?.common}
        </h1>
        <p className="text-teal-700 mt-2 flex items-center gap-2 text-lg">
          <i className="fa-solid fa-location-dot"></i>
          {country.capital?.[0] || "N/A"}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-6 border rounded-xl overflow-hidden">
          <div className="border p-5 text-center">
            <i className="fa-solid fa-building-columns text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Capital
            </p>
            <p className="font-semibold mt-1">
              {country.capital?.[0] || "N/A"}
            </p>
          </div>
          <div className="border p-5 text-center">
            <i className="fa-solid fa-users text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Population
            </p>
            <p className="font-semibold mt-1">
              {(country.population / 1000000).toFixed(2)}
              M
            </p>
          </div>
          <div className="border p-5 text-center">
            <i className="fa-regular fa-comments text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Languages
            </p>
            <p className="font-semibold mt-1">
              {country.languages? Object.values(country.languages).join(", "): "N/A"}
            </p>
          </div>
          <div className="border p-5 text-center">
            <i className="fa-solid fa-money-bill-wave text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Currency
            </p>
            <p className="font-semibold mt-1">
              {country.currencies? Object.values(country.currencies)[0]?.name: "N/A"}
            </p>
          </div>
          <div className="border p-5 text-center">
            <i className="fa-regular fa-clock text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Timezone
            </p>
            <p className="font-semibold mt-1">
              {country.timezones?.[0] || "N/A"}
            </p>
          </div>
          <div className="border p-5 text-center">
            <i className="fa-solid fa-earth-americas text-2xl text-gray-400"></i>
            <p className="text-gray-500 mt-2 text-sm">
              Region
            </p>
            <p className="font-semibold mt-1">
              {country.region}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-3">
            Neighboring Countries
          </h3>
          <div className="flex flex-wrap gap-2">
            {country.borders?.length ? (
              country.borders.map((border) => (
                <span
                  key={border}
                  className="px-4 py-1 border border-teal-300 rounded-full text-sm text-teal-700">
                  {border}
                </span>
              ))
            ) : (
              <span className="text-gray-500">
                No neighboring countries
              </span>
            )}
          </div>
        </div>
        <button
          onClick={addToWishlist}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-xl mt-8 font-medium">
          <i className="fa-regular fa-heart mr-2"></i>
          Add To Bucket List
        </button>
        <button
          onClick={markVisited}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-xl mt-4 font-medium">
          <i className="fa-regular fa-circle-check mr-2"></i>
          Mark As Visited
        </button>
      </div>
    </div>
  );
}

export default CountryDetails;