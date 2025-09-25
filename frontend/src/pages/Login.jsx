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
      // optionally store user info if returned
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/upload"); // <- redirect to Upload page after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <input
          type="email"
          className="w-full mb-2 p-2 border"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">
          Login
        </button>
      </form>
    </div>
  );
}
