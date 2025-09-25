import React, { useState } from 'react';
import API from '../api';

export default function Signup() {
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      window.location.href = '/';
    } catch (err) {
      alert(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow max-w-sm mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Register Admin</h2>
      <input className="w-full mb-2 p-2 border" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
      <input className="w-full mb-2 p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full mb-4 p-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="w-full py-2 bg-green-600 text-white rounded">Register</button>
    </form>
  );
}
