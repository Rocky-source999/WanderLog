import { useState } from "react";
import { loginUser } from "../../Api/authServices";
import { useNavigate } from "react-router-dom";

function Login({onSwitch}) {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const naviate=useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      naviate("/explore",{replace:true})
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-cyan-500 to-gray-300 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <div className="text-3xl text-teal-600">
            <i className="fa-solid fa-earth-americas"></i>
          </div>
          <h1 className="text-4xl font-bold text-teal-700 mt-4">
            WanderLog
          </h1>
          <p className="text-gray-500 mt-2">
            Your journey. Your bucket list.
          </p>
        </div>
        <h2 className="text-2xl font-bold mt-10">
          Welcome Back!
        </h2>
        <p className="text-gray-500 mb-6">
          Sign in to continue your adventures.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <div className="border rounded-lg flex items-center px-3 mt-2">
              <i className="fa-solid fa-envelope text-gray-400"></i>
              <input
                type="email"
                className="w-full p-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>
          <div>
            <label className="font-medium">Password</label>
            <div className="border rounded-lg flex items-center px-3 mt-2">
              <i className="fa-solid fa-lock text-gray-400"></i>
              <input
                type="password"
                className="w-full p-3 outline-none"
                value={password}
                placeholder="123"
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          {token && (
            <p className="text-green-600 text-sm break-all">
              Token: {token}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="flex items-center my-6">
          <div className="flex-1 border"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-1 border"></div>
        </div>
        <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-3">
          <i className="fa-brands fa-google"></i>
          Continue with Google
        </button>
        <p className="text-center mt-6 text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-teal-600 font-semibold">
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;