import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchcart, clearcart } from "../redux/slices/cartslice";
import { createcheckout } from "../redux/slices/checkoutslice";
import PayPalButton from "../Components/Cart/PayPalButton";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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
      alert(t('checkout.fillRequired'));
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
      alert(t('checkout.checkoutFailed'));
    }
  };

  const handlePaymentSuccess = async (paymentDetails) => {
    const checkoutId = activeCheckoutId || localStorage.getItem("checkoutId");

    if (!checkoutId) {
      alert(t('checkout.sessionExpired'));
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
      alert(t('checkout.orderSaveFailed', { message }));
    }
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount.toFixed(2)}`;
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">{t('checkout.loadingCart')}</p>
        </div>
      </div>
    );
  }

  if (cartError && !cartItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
        {cartError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] py-10 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 text-sm font-medium ${!activeCheckoutId ? "text-black" : "text-gray-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${!activeCheckoutId ? "bg-black text-white" : "bg-gray-300 text-white"}`}>1</span>
            {t('checkout.step.delivery')}
          </div>
          <div className="h-px w-10 bg-gray-300" />
          <div className={`flex items-center gap-2 text-sm font-medium ${activeCheckoutId ? "text-black" : "text-gray-400"}`}>
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${activeCheckoutId ? "bg-black text-white" : "bg-gray-300 text-white"}`}>2</span>
            {t('checkout.step.payment')}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left — Delivery & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">

              {/* Step 1 — Delivery Info */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{t('checkout.deliveryInfo')}</h2>
                  {activeCheckoutId && (
                    <button
                      onClick={() => {
                        setActiveCheckoutId(null);
                        localStorage.removeItem("checkoutId");
                      }}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      {t('checkout.edit')}
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('checkout.emailPlaceholder')}
                    disabled={!!activeCheckoutId}
                    className="w-full border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('checkout.firstNamePlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t('checkout.lastNamePlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('checkout.addressPlaceholder')}
                    disabled={!!activeCheckoutId}
                    className="w-full border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t('checkout.cityPlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder={t('checkout.postalCodePlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder={t('checkout.countryPlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('checkout.phonePlaceholder')}
                      disabled={!!activeCheckoutId}
                      className="border border-gray-300 p-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* CTA / PayPal */}
              <div className="pt-2">
                {!activeCheckoutId ? (
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={checkoutLoading || cartItems.length === 0}
                    className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {checkoutLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('checkout.processing')}
                      </span>
                    ) : (
                      t('checkout.continueToPayment')
                    )}
                  </button>
                ) : (
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1 text-center">
                      {t('checkout.total')}: <span className="font-semibold text-gray-800">{formatPrice(total)}</span>
                      <span className="text-xs text-gray-400 ms-1">(≈ ${(total / 3.67).toFixed(2)} USD)</span>
                    </p>
                    <p className="text-xs text-center text-gray-400 mb-4">
                      {t('checkout.youWillBeCharged')}
                    </p>
                    <PayPalButton
                      amount={(total / 3.67).toFixed(2)}
                      onSuccess={handlePaymentSuccess}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        alert(t('checkout.paymentFailed'));
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6">
            <h2 className="text-lg font-semibold mb-5">{t('checkout.orderSummary')}</h2>

            {cartItems.length === 0 ? (
              <p className="text-center text-gray-400 py-6">{t('checkout.emptyCart')}</p>
            ) : (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pe-1">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 border-b pb-4 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 truncate">{item.name}</h3>
                      <p className="text-gray-400 text-xs mt-0.5">{t('checkout.qty')}: {item.quantity}</p>
                      {item.size && <p className="text-xs text-gray-400">{t('checkout.size')}: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-400">{t('checkout.color')}: {item.color}</p>}
                    </div>
                    <span className="font-semibold text-sm flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t('checkout.subtotal')}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t('checkout.shipping')}</span>
                <span className="text-green-600 font-medium">{t('checkout.free')}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-3 text-gray-900">
                <span>{t('checkout.total')}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}