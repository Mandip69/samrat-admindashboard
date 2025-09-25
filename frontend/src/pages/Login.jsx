import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- useNavigate for SPA redirect
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // initialize navigate

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/upload"); // <- redirect to Upload page after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-sm border border-white/20"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Samrat Admin
          <span className="block text-sm font-medium text-gray-300 mt-1">
            Dashboard Login
          </span>
        </h2>

        <input
          type="email"
          className="w-full mb-3 p-3 rounded-lg bg-gray-900/70 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full mb-5 p-3 rounded-lg bg-gray-900/70 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300">
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          © {new Date().getFullYear()} Samrat Admin Dashboard
        </p>
      </form>
    </div>
  );
}
