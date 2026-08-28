import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart, clearcart } from "../redux/slices/cartslice";
import { createcheckout } from "../redux/slices/checkoutslice";
import PayPalButton from "../Components/Cart/PayPalButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Truck, CreditCard, ShoppingBag, CheckCircle2 } from "lucide-react";

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [activeCheckoutId, setActiveCheckoutId] = useState(
    () => localStorage.getItem("checkoutId") || null
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.cart);
  const { loading: checkoutLoading } = useSelector((state) => state.checkout);

  const user = JSON.parse(localStorage.getItem("user"));
  const guestId = localStorage.getItem("guestId");
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    dispatch(
      fetchcart({
        userId: user?._id || null,
        guestId: user ? null : guestId,
      })
    );
  }, [dispatch]);

  const cartItems = cart?.products || [];
  const subtotal = cart?.totalprice || 0;
  const total = subtotal;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!formData.email || !formData.firstName || !formData.address || !formData.city) {
      alert(t("checkout.fillRequired"));
      return;
    }

    const checkoutData = {
      checkoutItems: cartItems,
      shippingAddress: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },
      paymentMode: "PayPal",
      totalPrice: total,
    };

    try {
      const result = await dispatch(
        createcheckout({ checkoutdata: checkoutData })
      ).unwrap();

      const newCheckoutId = result._id;
      setActiveCheckoutId(newCheckoutId);
      localStorage.setItem("checkoutId", newCheckoutId);
    } catch (error) {
      console.error("Checkout creation error:", error);
      alert(t("checkout.checkoutFailed"));
    }
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    const checkoutId = activeCheckoutId || localStorage.getItem("checkoutId");

    if (!checkoutId) {
      alert(t("checkout.sessionExpired"));
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails },
        config
      );

      const finaliseRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalise`,
        {},
        config
      );

      const confirmedOrder = finaliseRes.data.order;

      dispatch(clearcart());
      localStorage.removeItem("checkoutId");

      navigate(`/order-confirmation/${confirmedOrder._id}`, {
        state: { order: confirmedOrder },
      });
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.error("Finalise error:", err.response?.data || err);
      alert(t("checkout.orderSaveFailed", { message }));
    }
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat("ar-AE", { style: "currency", currency: "AED" }).format(amount);
    }
    return `AED ${amount.toFixed(2)}`;
  };

  if (cartLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f8f5f0]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 text-sm sm:text-base font-medium">{t("checkout.loadingCart")}</p>
        </div>
      </div>
    );
  }

  if (cartError && !cartItems.length) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#f8f5f0] text-red-500 font-medium text-sm sm:text-base text-center">
        {cartError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
          <div className={`flex items-center gap-2 font-semibold ${!activeCheckoutId ? "text-gray-900" : "text-gray-400"}`}>
            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${!activeCheckoutId ? "bg-black text-white shadow-xs" : "bg-emerald-600 text-white"}`}>
              {!activeCheckoutId ? "1" : <CheckCircle2 className="w-4 h-4" />}
            </span>
            <span>{t("checkout.step.delivery")}</span>
          </div>
          <div className="h-0.5 w-8 sm:w-12 bg-gray-300 rounded-full" />
          <div className={`flex items-center gap-2 font-semibold ${activeCheckoutId ? "text-gray-900" : "text-gray-400"}`}>
            <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${activeCheckoutId ? "bg-black text-white shadow-xs" : "bg-gray-300 text-white"}`}>
              2
            </span>
            <span>{t("checkout.step.payment")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Left Column — Delivery & Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-xs border border-gray-200/80">

              {/* Step 1 — Delivery Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 text-gray-900 font-bold text-base sm:text-xl">
                    <Truck className="w-5 h-5 text-orange-500 shrink-0" />
                    <h2>{t("checkout.deliveryInfo")}</h2>
                  </div>
                  {activeCheckoutId && (
                    <button
                      onClick={() => {
                        setActiveCheckoutId(null);
                        localStorage.removeItem("checkoutId");
                      }}
                      className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
                    >
                      {t("checkout.edit")}
                    </button>
                  )}
                </div>

                <div className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("checkout.emailPlaceholder")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("checkout.emailPlaceholder")}
                      disabled={!!activeCheckoutId}
                      className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.firstNamePlaceholder")}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder={t("checkout.firstNamePlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.lastNamePlaceholder")}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder={t("checkout.lastNamePlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      {t("checkout.addressPlaceholder")}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t("checkout.addressPlaceholder")}
                      disabled={!!activeCheckoutId}
                      className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.cityPlaceholder")}
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder={t("checkout.cityPlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.postalCodePlaceholder")}
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder={t("checkout.postalCodePlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.countryPlaceholder")}
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder={t("checkout.countryPlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {t("checkout.phonePlaceholder")}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t("checkout.phonePlaceholder")}
                        disabled={!!activeCheckoutId}
                        className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 — CTA or PayPal */}
              <div className="pt-2">
                {!activeCheckoutId ? (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={checkoutLoading || cartItems.length === 0}
                    className="w-full bg-black hover:bg-gray-900 text-white py-3.5 rounded-xl font-semibold text-sm transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {checkoutLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("checkout.processing")}
                      </span>
                    ) : (
                      t("checkout.continueToPayment")
                    )}
                  </button>
                ) : (
                  <div className="bg-gray-50/80 p-4 sm:p-6 rounded-2xl border border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm sm:text-base mb-3">
                      <CreditCard className="w-5 h-5 text-orange-500" />
                      <span>{t("checkout.step.payment")}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 mb-1 text-center font-medium">
                      {t("checkout.total")}: <span className="font-bold text-gray-900">{formatPrice(total)}</span>
                      <span className="text-xs text-gray-500 ms-1">(≈ ${(total / 3.67).toFixed(2)} USD)</span>
                    </p>
                    <p className="text-xs text-center text-gray-500 mb-4">
                      {t("checkout.youWillBeCharged")}
                    </p>
                    <PayPalButton
                      amount={(total / 3.67).toFixed(2)}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        alert(t("checkout.paymentFailed"));
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column — Order Summary */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xs border border-gray-200/80 lg:sticky lg:top-6 lg:h-fit">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-base sm:text-lg mb-4 sm:mb-5 pb-3 border-b border-gray-100">
              <ShoppingBag className="w-5 h-5 text-orange-500 shrink-0" />
              <h2>{t("checkout.orderSummary")}</h2>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 py-6 text-sm">{t("checkout.emptyCart")}</p>
            ) : (
              <div className="space-y-3.5 max-h-[340px] sm:max-h-[380px] overflow-y-auto pe-1.5 scrollbar-thin">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 border-b border-gray-100 pb-3.5 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs sm:text-sm text-gray-900 truncate">{item.name}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{t("checkout.qty")}: {item.quantity}</p>
                      {item.size && <p className="text-xs text-gray-500">{t("checkout.size")}: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-500">{t("checkout.color")}: {item.color}</p>}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-gray-900 shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 sm:mt-5 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                <span>{t("checkout.subtotal")}</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                <span>{t("checkout.shipping")}</span>
                <span className="text-emerald-600 font-semibold">{t("checkout.free")}</span>
              </div>
              <div className="flex justify-between font-bold text-sm sm:text-base border-t border-gray-200 pt-3 text-gray-900">
                <span>{t("checkout.total")}</span>
                <span className="text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}