import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const API_BASE = "https://mnma-backend.onrender.com";

// Adjust this helper if your app stores auth differently
// (e.g. a redux slice, a cookie, a different localStorage key).
const getAuthToken = () => {
  try {
    const stored = localStorage.getItem("userInfo");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.token || null;
  } catch {
    return null;
  }
};

const getCurrentUserId = () => {
  try {
    const stored = localStorage.getItem("userInfo");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?._id || parsed?.id || null;
  } catch {
    return null;
  }
};

export default function OrderConfirmationPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError(t("orderConfirmation.noOrderId", "No order specified."));
        setLoading(false);
        return;
      }

      const token = getAuthToken();

      if (!token) {
        // Not logged in — send them to login instead of showing someone else's data
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401 || res.status === 403) {
          navigate("/login");
          return;
        }

        if (res.status === 404) {
          setError(t("orderConfirmation.notFound", "Order not found."));
          setLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch order");
        }

        const data = await res.json();

        // Safety net: even though the backend should already scope this
        // request to the logged-in user, don't render an order that
        // doesn't belong to them.
        const currentUserId = getCurrentUserId();
        const orderUserId = data?.user?._id || data?.user || data?.userId;

        if (currentUserId && orderUserId && orderUserId !== currentUserId) {
          setError(
            t("orderConfirmation.notYourOrder", "This order isn't yours.")
          );
          setLoading(false);
          return;
        }

        setOrder(data);
      } catch (err) {
        console.error(err);
        setError(
          t(
            "orderConfirmation.fetchError",
            "Couldn't load your order. Please try again."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate, t]);

  const formatDate = (dateValue) => {
    const locale = isRtl ? "ar-AE" : "en-AE";
    const date = dateValue ? new Date(dateValue) : new Date();
    return date.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    return new Intl.NumberFormat(isRtl ? "ar-AE" : "en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10">
        <div className="flex items-center gap-3 text-gray-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />
          {t("orderConfirmation.loading", "Loading your order...")}
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center">
          <p className="text-red-600 font-medium mb-6">
            {error || t("orderConfirmation.notFound", "Order not found.")}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            {t("orderConfirmation.continueShopping")}
          </Link>
        </div>
      </div>
    );
  }

  const shipping = order.shippingAddress || {};
  const isPaid = order.isPaid ?? order.paymentStatus === "Paid";
  const totalPrice = order.totalprice ?? order.totalPrice ?? 0;

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
            {t("orderConfirmation.title")}
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            {t("orderConfirmation.thanks")}
          </p>
          <p className="text-gray-500 mt-2">
            {t("orderConfirmation.placed")}
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-10 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            {t("orderConfirmation.details")}
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">
                {t("orderConfirmation.orderId")}
              </span>
              <span className="font-semibold font-mono">
                #{order._id?.slice(-8) || orderId}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                {t("orderConfirmation.orderDate")}
              </span>
              <span className="font-semibold">
                {formatDate(order.createdAt)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                {t("orderConfirmation.paymentStatus")}
              </span>
              <span
                className={`font-semibold ${
                  isPaid ? "text-green-600" : "text-amber-600"
                }`}
              >
                {isPaid
                  ? t("orderConfirmation.paid")
                  : t("orderConfirmation.pending", "Pending")}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">
                {t("orderConfirmation.estimatedDelivery")}
              </span>
              <span className="font-semibold">
                {order.estimatedDelivery ||
                  t("orderConfirmation.deliveryDays")}
              </span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-3 mt-3">
              <span className="text-gray-600">
                {t("orderConfirmation.total", "Total")}
              </span>
              <span className="font-bold text-gray-900">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        {Array.isArray(order.orderItems) && order.orderItems.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">
              {t("orderConfirmation.items", "Items")}
            </h2>

            <div className="space-y-3">
              {order.orderItems.map((item, index) => (
                <div
                  key={item.productid || index}
                  className="flex items-center gap-3"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover border border-gray-200"
                    />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {item.name} x {item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.size && <span>Size: {item.size} · </span>}
                      {item.color && <span>Color: {item.color} · </span>}
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipping Info */}
        <div className="mt-6 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">
            {t("orderConfirmation.shippingAddress")}
          </h2>

          {shipping.fullName && (
            <p className="text-gray-700 font-medium">{shipping.fullName}</p>
          )}

          {shipping.address && (
            <p className="text-gray-600">{shipping.address}</p>
          )}

          {(shipping.city || shipping.postalCode || shipping.country) && (
            <p className="text-gray-600">
              {[shipping.city, shipping.postalCode, shipping.country]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}

          {!shipping.address && (
            <p className="text-sm italic text-gray-400">
              {t("orderConfirmation.noAddress", "No shipping address on file.")}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-black text-white text-center font-medium hover:bg-gray-800 transition"
          >
            {t("orderConfirmation.continueShopping")}
          </Link>

          <Link
            to="/profile"
            className="px-6 py-3 rounded-xl border border-gray-300 text-center font-medium hover:bg-gray-100 transition"
          >
            {t("orderConfirmation.viewOrders")}
          </Link>
        </div>
      </div>
    </div>
  );
}