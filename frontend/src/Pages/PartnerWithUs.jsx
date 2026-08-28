import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Sparkles, Send, Building, ShieldCheck, Mail, MapPin } from "lucide-react";

const PartnerWithUs = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = t("partnerPage.form.validation.name");
    if (!formData.email.trim()) {
      tempErrors.email = t("partnerPage.form.validation.email");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t("partnerPage.form.validation.email");
    }
    if (!formData.phone.trim()) tempErrors.phone = t("partnerPage.form.validation.phone");
    if (!formData.country.trim()) tempErrors.country = t("partnerPage.form.validation.country");
    if (!formData.message.trim()) tempErrors.message = t("partnerPage.form.validation.message");

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // This was missing in your file — inputs referenced it but it was never defined.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — if this hidden field is filled, it's a bot. Silently drop.
    if (formData.honeypot) {
      return;
    }

    if (!validate()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "b9fa5b6f-f0f7-4033-b6f9-68a043672241",
          subject: "New Franchise Partner Inquiry - N2MA",
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t("partnerPage.form.success"));
        setFormData({ name: "", email: "", phone: "", country: "", message: "", honeypot: "" });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(t("partnerPage.form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-20">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-orange-50/70 via-gray-50 to-amber-50/50 text-gray-900 py-16 sm:py-24 px-4 sm:px-6 border-b border-gray-200/70 overflow-hidden text-center">
        <div className="absolute top-0 start-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200/80 text-orange-600 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Franchise Opportunities
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
              {t("partnerPage.title")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("partnerPage.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact & Partner Form Grid */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/80"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field — hidden from real users, bots tend to fill it in */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot || ""}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
              aria-hidden="true"
            />

            {/* Name */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                {t("partnerPage.form.name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.name
                    ? "border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/20"
                    : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email & Phone Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  {t("partnerPage.form.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                    errors.email
                      ? "border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/20"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                  placeholder="name@example.com"
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                  {t("partnerPage.form.phone")}
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                    errors.phone
                      ? "border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/20"
                      : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  }`}
                  placeholder="+971 52 123 4567"
                />
                {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                {t("partnerPage.form.country")}
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all ${
                  errors.country
                    ? "border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/20"
                    : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
                placeholder="e.g. United Arab Emirates"
              />
              {errors.country && <p className="text-xs text-rose-500 mt-1">{errors.country}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5">
                {t("partnerPage.form.message")}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-all resize-none ${
                  errors.message
                    ? "border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/20"
                    : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                }`}
                placeholder="Tell us about your franchise plan, target city, and timeline."
              />
              {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-10 py-3.5 bg-black text-white hover:bg-gray-900 rounded-full font-bold text-xs sm:text-sm shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                {loading ? (
                  <span>{t("partnerPage.form.submitting")}</span>
                ) : (
                  <>
                    <span>{t("partnerPage.form.submit")}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerWithUs;