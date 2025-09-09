// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from "react-router-dom";
import InvoiceProcessor from "./pages/InvoiceProcessor";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import PricingPage from "./pages/PricingPage";
import Loader from "./components/UI/Loader";
import Toast from "./components/UI/Toast";
import SubscriptionPlans from "./components/Payments/SubscriptionPlans";
import StripeCheckout from "./components/Payments/StripeCheckout";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import PaymentCancel from "./components/Payments/PaymentCancel";

function ProtectedRoute({ user, children }) {
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setToast({ message: "Login/Register successful!", type: "success" });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setToast({ message: "Logged out successfully!", type: "success" });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 transition-colors duration-300">
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
          <div className="flex items-center space-x-2">
            <img src="/invoice.jpg" alt="Logo" className="w-10 h-10 rounded-full shadow-md" />
            <h1 className="font-extrabold text-2xl tracking-wide text-yellow-300 drop-shadow-lg">
              InvoicePro ✨
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {["Dashboard", "Subscriptions"].map((menu) => (
              <NavLink
                key={menu}
                to={`/${menu.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg shadow-md transform transition-all duration-300
                   hover:scale-105 hover:bg-blue-600
                   ${isActive ? "bg-blue-800 font-bold" : "bg-blue-500"}`
                }
              >
                {menu}
              </NavLink>
            ))}
            {!user ? (
              ["Login", "Register"].map((menu) => (
                <NavLink
                  key={menu}
                  to={`/${menu.toLowerCase()}`}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg shadow-md transform transition-all duration-300
                     hover:scale-105 hover:bg-blue-600
                     ${isActive ? "bg-blue-800 font-bold" : "bg-blue-500"}`
                  }
                >
                  {menu}
                </NavLink>
              ))
            ) : (
              <>
                <NavLink
                  to="/process"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg shadow-md transform transition-all duration-300
                     hover:scale-105 hover:bg-blue-600
                     ${isActive ? "bg-blue-800 font-bold" : "bg-blue-500"}`
                  }
                >
                  Process
                </NavLink>
                <span className="px-4 py-2 bg-yellow-400 rounded-lg shadow-md text-gray-800">
                  👋 Welcome, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transform transition-all duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Loader */}
        {loading && <Loader size={60} />}

        {/* Toast Notification */}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/login" element={<LoginPage onAuth={handleAuth} setToast={setToast} />} />
            <Route path="/register" element={<RegisterPage onAuth={handleAuth} setToast={setToast} />} />
            <Route path="/dashboard" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
            {/* <Route path="/pricing" element={<PricingPage />} /> */}
            <Route path="/process" element={<ProtectedRoute user={user}><InvoiceProcessor setLoading={setLoading} setToast={setToast} /></ProtectedRoute>} />

            {/* Payment Routes */}
            <Route path="/subscriptions" element={<ProtectedRoute user={user}><SubscriptionPlans /></ProtectedRoute>} />
            <Route path="/checkout/:planId" element={<ProtectedRoute user={user}><StripeCheckout /></ProtectedRoute>} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
