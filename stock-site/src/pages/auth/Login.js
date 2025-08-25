import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { TrendingUp, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import logo from "../../asset/vrlogo.png";
import { Zap } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.username, form.password);
    if (res.success) {
      toast.success(
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span>Welcome to VR68 Trading</span>
        </div>
      );
      navigate("/");
    } else {
      toast.error(res.message || "❌ Login failed");
      setError(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden w-[900px]">
        {/* Left section with stock vibes */}
        <div
          className="flex flex-col  justify-center items-center bg-gradient-to-br from-blue-600 to-green-500 w-1/2 p-10 text-white bg-center bg-no-repeat bg-contain shadow-lg"
          style={{ backgroundImage: `url(${logo})` }}
        >
          {/* <TrendingUp size={80} className="mb-6" /> */}

          {/* <h1 className="text-3xl font-bold mb-2">Stock Market Pro</h1>
          <p className="text-lg text-center opacity-90">
            Track. Trade. Grow. Login to your dashboard to start investing 🚀
          </p> */}
        </div>

        {/* Right section - login form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back
          </h2>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email input with icon */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Email or Username"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            {/* Password input with icon */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-center mt-6 text-gray-600">
            <Link
              to="/forgotpassword"
              className="text-blue-600 font-semibold hover:underline"
            >
              Forgot Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
