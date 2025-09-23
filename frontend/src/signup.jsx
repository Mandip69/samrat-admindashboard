
    import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if(password !== confirm) return alert("Passwords do not match");

    try {
      await API.post("/auth/signup", { email, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch(err) {
      alert(err.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Admin Signup</h1>
        <input type="email" placeholder="Email" required 
          value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded" />
        <input type="password" placeholder="Password" required
          value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded" />
        <input type="password" placeholder="Confirm Password" required
          value={confirm} onChange={e=>setConfirm(e.target.value)}
          className="w-full p-3 mb-4 border rounded" />
        <button type="submit" className="w-full bg-green-500 text-white p-3 rounded">Signup</button>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
}
