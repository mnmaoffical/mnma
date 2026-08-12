import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/register.webp";
import MNMALOGO from "../assets/mnma_logo.png";
import { useTranslation } from "react-i18next";

export default function SigninPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://mnma-backend.onrender.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/CheckoutPage");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2">
        <img
          src={logoImg}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 bg-[#f8f5f0]">
        <img
          src={MNMALOGO}
          alt="logo"
          className="h-12 w-12 rounded-full mx-auto mb-4"
        />

        <h1 className="text-4xl font-bold text-center mb-2">
          {t('signin.title')}
        </h1>

        <p className="text-center text-gray-600 mb-8">
          {t('signin.subtitle')}
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder={t('signin.emailPlaceholder')}
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />

          <input
            type="password"
            name="password"
            placeholder={t('signin.passwordPlaceholder')}
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
          >
            {loading ? t('signin.signingIn') : t('signin.signIn')}
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          {t('signin.noAccount')}{" "}
          <span
            className="text-blue-600 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/SignupPage")}
          >
            {t('signin.register')}
          </span>
        </p>
      </div>
    </div>
  );
}