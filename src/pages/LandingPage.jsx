import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const storedUser = localStorage.getItem("user");

  // Redirect logged-in users
  if (storedUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="relative w-full h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left - Text */}
          <div className="text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
              Welcome to <span className="text-yellow-300">InvoicePro ✨</span>
            </h1>
            <p className="text-lg md:text-xl max-w-md drop-shadow-lg">
              Automate your invoices with AI, track analytics, and handle
              payments seamlessly — all in one place.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-xl shadow-xl hover:bg-yellow-300 transition transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-xl hover:bg-gray-100 transition transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          </div>

          {/* Right - Floating 3D Image */}
          <motion.div
            className="flex justify-center"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              src="/invoice_process.webp" // keep your image in public folder
              alt="Welcome Illustration"
              className="w-[480px] h-[380px] object-cover rounded-2xl shadow-2xl border-4 border-white"
              whileHover={{ rotateY: 15, rotateX: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 80 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1200px",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
