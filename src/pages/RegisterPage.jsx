import { useNavigate } from "react-router-dom";
import RegisterForm from "./../components/auth/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegisterSuccess = (userData) => {
    // Do NOT call onAuth here
    alert("Registration successful! Please login."); // Notify user
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <RegisterForm onRegister={handleRegisterSuccess} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
