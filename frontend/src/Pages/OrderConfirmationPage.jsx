// Pages/OrderConfirmationPage.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function OrderConfirmationPage() {
  const orderId = "MNMA2026001";

  return (
    <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8 md:p-12">
        
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Thank you for shopping with MNMA.
          </p>
          <p className="text-gray-500 mt-2">
            Your order has been placed successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-10 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Order Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-semibold">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Order Date</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status</span>
              <span className="text-green-600 font-semibold">
                Paid
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-semibold">
                3 - 5 Business Days
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            Shipping Address
          </h2>

          <p className="text-gray-700">
            John Doe
          </p>

          <p className="text-gray-600">
            123 Main Street
          </p>

          <p className="text-gray-600">
            New Delhi, India - 110001
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-black text-white text-center font-medium hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="px-6 py-3 rounded-xl border border-gray-300 text-center font-medium hover:bg-gray-100 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}