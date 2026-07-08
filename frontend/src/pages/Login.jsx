import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/SoftNium_Logo.png";
import { login } from "../services/auth";
import { Link } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid email or password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10">

                <div className="flex justify-center">
                    <img src={logo} alt="SoftNium" className="w-48 mb-6" />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Welcome Back
                </h1>

                <p className="text-gray-500 text-center mt-2 mb-8">
                    Sign in to manage your gym.
                </p>

                <form className="space-y-5" onSubmit={handleLogin}>

                    <div>
                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-lime-400 hover:bg-lime-500 transition-all text-white font-semibold py-3 rounded-xl disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-lime-600 ml-2"
                    >
                        Register Now
                    </Link>

                </p>

            </div>
        </div>
    );
}