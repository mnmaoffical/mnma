import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/login.webp";
import MNMALOGO from "../assets/mnma_logo.png";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError(t('signup.passwordMismatch'));
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://mnma-backend.onrender.com/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/SigninPage");
    } catch (err) {
      setError(err.message || t('signup.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2">
        <img
          src={logoImg}
          alt="signup"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-8 bg-[#f8f5f0]">
        <img
          src={MNMALOGO}
          alt="logo"
          className="h-12 w-12 rounded-full mx-auto mb-6"
        />

        <h1 className="text-4xl font-bold text-center text-gray-900">
          {t('signup.title')}
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          {t('signup.subtitle')}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder={t('signup.namePlaceholder')}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder={t('signup.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder={t('signup.passwordPlaceholder')}
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder={t('signup.confirmPasswordPlaceholder')}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? t('signup.creatingAccount') : t('signup.register')}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          {t('signup.haveAccount')}{" "}
          <span
            onClick={() => navigate("/SigninPage")}
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
          >
            {t('signup.login')}
          </span>
        </p>
      </div>
    </div>
  );
}