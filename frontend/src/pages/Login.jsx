import React, { useState } from 'react';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/upload';
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-2xl shadow-xl w-full max-w-sm transition-transform duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>

        <div className="mb-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-800 transition-all font-medium shadow-md hover:shadow-lg"
        >
          Login
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </form>
    </div>
  );
}
  