import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function OrderConfirmationPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const orderId = "MNMA2026001";

  const formatDate = () => {
    const locale = isRtl ? 'ar-AE' : 'en-AE';
    return new Date().toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

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
            {t('orderConfirmation.title')}
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            {t('orderConfirmation.thanks')}
          </p>
          <p className="text-gray-500 mt-2">
            {t('orderConfirmation.placed')}
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-10 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t('orderConfirmation.details')}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('orderConfirmation.orderId')}</span>
              <span className="font-semibold font-mono">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('orderConfirmation.orderDate')}</span>
              <span className="font-semibold">
                {formatDate()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('orderConfirmation.paymentStatus')}</span>
              <span className="text-green-600 font-semibold">
                {t('orderConfirmation.paid')}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('orderConfirmation.estimatedDelivery')}</span>
              <span className="font-semibold">
                {t('orderConfirmation.deliveryDays')}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            {t('orderConfirmation.shippingAddress')}
          </h2>

          <p className="text-gray-700 font-medium">
            John Doe
          </p>

          <p className="text-gray-600">
            123 Main Street
          </p>

          <p className="text-gray-600">
            Dubai, UAE - 00000
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-black text-white text-center font-medium hover:bg-gray-800 transition"
          >
            {t('orderConfirmation.continueShopping')}
          </Link>

          <Link
            to="/profile"
            className="px-6 py-3 rounded-xl border border-gray-300 text-center font-medium hover:bg-gray-100 transition"
          >
            {t('orderConfirmation.viewOrders')}
          </Link>
        </div>
      </div>
    </div>
  );
}