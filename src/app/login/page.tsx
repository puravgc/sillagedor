"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Add login logic here
    if (!email || !password) {
      setError("Please fill in both fields");
    } else {
      setError("");
      // Your login logic here (e.g., API call)
      console.log("Logged in with:", { email, password });
    }
  };

  const handleGoogleLogin = (response: any) => {
    signIn("google");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side (Image) */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images6.alphacoders.com/641/641465.jpg')",
        }}
      >
        <div className="h-full bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <Image
            src={"/logo.png"}
            width={200}
            height={200}
            alt="perfume model image"
          />
          <h1 className="custom-font text-5xl font-bold text-gray-200">
            Sillage D'oR Official
          </h1>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="w-1/2  flex justify-center items-center py-16 px-8">
        <div className="w-full max-w-lg border shadow-xl rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="w-full mb-2 lg:mb-0">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
            >
              <FaGoogle className="text-black h-6 w-6" /> Log In with Google{" "}
            </button>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Login Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Google Login Button */}
          <div className="mt-4"></div>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?{" "}
            </span>
            <a href="/signup" className="text-blue-600 font-semibold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
