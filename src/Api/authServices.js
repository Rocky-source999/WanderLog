const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key":"pro_704a21b4089633a9171988ab28a819908ea9e8eb8dd4999224e82c243dee4237"
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "x-api-key":"pro_704a21b4089633a9171988ab28a819908ea9e8eb8dd4999224e82c243dee4237"
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data)
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};