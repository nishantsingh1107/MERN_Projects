import { Navbar } from "../Components/Navbar";
import { Link, useNavigate } from "react-router";
import React from "react";  

const SignupPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const gender = e.target.gender.value;

    const dataObj = {
      name,
      email,
      password,
      gender,
    };

    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      const result = await resp.json();

      if (resp.status === 201) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col">
      <Navbar />
      <form
        className="max-w-md w-full mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6"
        onSubmit={handleRegister}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Sign Up</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="gender" className="text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Super-Admin">Super-Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition duration-200 shadow"
        >
          Register
        </button>
        <div>
          <p>
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export { SignupPage };