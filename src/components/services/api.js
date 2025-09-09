// services/api.js
import axios from "axios";

const API_BASE_URL = "https://invoice-api-9xlf.onrender.com"; // Change if your backend is hosted elsewhere

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------- Auth -------------------
export const registerUser = (name, email, password) => {
  return api.post("/register", { name, email, password });
};

export const loginUser = (email, password) => {
  return api.post("/login", { email, password });
};

// ------------------- Vendors -------------------
export const getVendors = () => api.get("/vendors");

export const addVendor = (name) => api.post("/add_vendor", { name });

export const addPrompt = (vendor_id, prompt) =>
  api.post("/add_prompt", { vendor_id, prompt });

export const deleteVendor = (vendor_id) =>
  api.delete(`/delete_vendor/${vendor_id}`);

// ------------------- Invoice Processing -------------------
export const validateInvoice = (formData) =>
  api.post("/validate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const saveInvoice = (vendor_id, prompt, data) =>
  api.post("/save_invoice", { vendor_id, prompt, data });

export const getInvoices = () => api.get("/invoices");

// ------------------- Dashboard Analytics -------------------
export const getAnalytics = () => api.get("/analytics");

// ------------------- Stripe Payments -------------------
export const createCheckoutSession = (plan_id) =>
  api.post("/create-checkout-session", { plan_id });

// ------------------- Export default -------------------
export default api;
