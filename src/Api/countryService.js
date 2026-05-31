const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  const response = await fetch(
    `${BASE_URL}/all?fields=name,flags,capital,region,population,cca3`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }

  return response.json();
};

export const getCountryByCode = async (code) => {
  const response = await fetch(
    `${BASE_URL}/alpha/${code}`
  );

  if (!response.ok) {
    throw new Error("Country not found");
  }

  return response.json();
};
