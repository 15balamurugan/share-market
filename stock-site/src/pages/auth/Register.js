// src/pages/auth/Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(
      form.username,
      form.firstname,
      form.lastname,
      form.email,
      form.password,
      form.mobile
    );

    if (res.success) {
      navigate("/login");
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        {/* Firstname */}
        <input
          type="text"
          placeholder="First Name"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.firstname}
          onChange={(e) => setForm({ ...form, firstname: e.target.value })}
          required
        />

        {/* Lastname */}
        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.lastname}
          onChange={(e) => setForm({ ...form, lastname: e.target.value })}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full p-3 mb-3 border rounded-lg"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>

        {/* Link to login */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
