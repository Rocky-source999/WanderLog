const BASE_URL = "https://www.jsonkeeper.com/b/IEOGK";

export const getAllCountries = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  return await response.json();
};

export const getCountryByCode = async (code) => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch countries");
  }
  const countries = await response.json();
  const country = countries.find(
    (item) => item.code === code
  );
  if (!country) {
    throw new Error("Country not found");
  }
  return country;
};