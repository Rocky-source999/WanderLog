import { useState } from "react";
import { registerUser } from "../../Api/authServices";

function Signup({onSwitch}) {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await registerUser(email, password);
      setToken(data.token);
      setUserId(data.id);
      localStorage.setItem("token", data.token);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <div className="text-6xl text-teal-600">
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
          Create Account
        </h2>
        <p className="text-gray-500 mb-6">
          Start your next adventure.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <div className="border rounded-lg flex items-center px-3 mt-2">
              <i className="fa-regular fa-envelope text-gray-400"></i>
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
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          {userId && (
            <p className="text-green-600 text-sm">
              User ID: {userId}
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
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <button
            onClick={onSwitch}
            className="text-teal-600 font-semibold">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;