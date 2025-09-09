import React, { useState } from "react";
import api from "./../services/api";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      onLogin(res.data.user);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 p-6 bg-white shadow-lg rounded-xl
                 hover:shadow-2xl hover:bg-blue-50 transition-all duration-300"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}
