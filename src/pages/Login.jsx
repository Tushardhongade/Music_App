import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let __URL__;
  if (document.domain === "localhost") {
    __URL__ = "http://localhost:1337";
  } else {
    __URL__ = "https://music-app-gules-phi.vercel.app/";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${__URL__}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    const data = await res.json();
    setLoading(false);

    if (data.status === "success") {
      localStorage.setItem("access_token", data.token);
      alert("Login Successful");
      navigate("/");
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#213C51] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#6594B1] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">
            Sign in to your MusicStream account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    required
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#6594B1] focus:ring-1 focus:ring-[#6594B1]"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-[#6594B1] text-white py-3 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <FiLogIn />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-4">
            <Link
              to="/forgot-password"
              className="text-sm text-[#6594B1] hover:text-opacity-80"
            >
              Forgot your password?
            </Link>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#6594B1] hover:text-opacity-80 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
