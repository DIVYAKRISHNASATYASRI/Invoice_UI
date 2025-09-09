import { useNavigate } from "react-router-dom";
import LoginForm from "./../components/auth/LoginForm";

export default function LoginPage({ onAuth }) {
  const navigate = useNavigate();

  const handleLoginSuccess = (userData) => {
    onAuth(userData);
    navigate("/process"); // redirect after login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <LoginForm onLogin={handleLoginSuccess} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
