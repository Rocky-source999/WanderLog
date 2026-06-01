import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./Components/Auth/LoginForm"
import SignForm from "./Components/Auth/SignForm"
import Explore from "./Pages/Explore"
import CountryDetails from "./Pages/CountyDetails"

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={showLogin ? (<LoginForm onSwitch={() => setShowLogin(false)}/>) 
        : 
        (<SignForm onSwitch={() => setShowLogin(true)}/>)}/>
        <Route path="/explore" element={<Explore />}/>
        <Route path="/country/:code" element={<CountryDetails />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;