import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Clock,
  PackageCheck,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Sparkles,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  FileText,
  RefreshCw,
  ChevronDown
} from "lucide-react";

const Deliveryandreturns = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("shipping");
  const [openFaq, setOpenFaq] = useState(null);

  const navItems = [
    { id: "shipping", label: t("deliveryReturnsPage.nav.shipping"), icon: <Truck className="w-4 h-4 shrink-0" /> },
    { id: "returns", label: t("deliveryReturnsPage.nav.returns"), icon: <RotateCcw className="w-4 h-4 shrink-0" /> },
    { id: "cancellation", label: t("deliveryReturnsPage.nav.cancellation"), icon: <RefreshCw className="w-4 h-4 shrink-0" /> },
    { id: "responsibility", label: t("deliveryReturnsPage.nav.responsibility"), icon: <ShieldCheck className="w-4 h-4 shrink-0" /> },
    { id: "faq", label: t("deliveryReturnsPage.nav.faq"), icon: <HelpCircle className="w-4 h-4 shrink-0" /> },
    { id: "contact", label: t("deliveryReturnsPage.nav.contact"), icon: <MapPin className="w-4 h-4 shrink-0" /> },
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#f8f5f0] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-20">
      {/* Light Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-gray-50 text-gray-900 py-14 sm:py-20 px-4 sm:px-6 border-b border-gray-200/70 overflow-hidden">
        <div className="absolute top-0 start-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200/80 text-orange-600 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-4 sm:mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
              {t("deliveryReturnsPage.hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-gray-900 leading-tight">
              {t("deliveryReturnsPage.hero.title")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed px-2">
              {t("deliveryReturnsPage.hero.subtitle")}
            </p>

            {/* Quick Feature Stats Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-full border border-orange-100 shadow-2xs font-medium text-gray-800">
                <Truck className="w-4 h-4 text-orange-500" />
                <span>{t("deliveryReturnsPage.stats.uaeTime")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-full border border-orange-100 shadow-2xs font-medium text-gray-800">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{t("deliveryReturnsPage.stats.gccTime")}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-xs rounded-full border border-orange-100 shadow-2xs font-medium text-gray-800">
                <RotateCcw className="w-4 h-4 text-emerald-500" />
                <span>{t("deliveryReturnsPage.stats.easyReturns")}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Quick Nav Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all duration-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 py-3 overflow-x-auto no-scrollbar scroll-smooth">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === item.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 font-semibold"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50/80"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-10 sm:space-y-14">

        {/* 1. Shipping & Delivery Policy */}
        <section id="shipping" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("deliveryReturnsPage.shipping.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">
                  {t("deliveryReturnsPage.shipping.badge")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Delivery Timelines */}
              <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100/50 p-5 sm:p-6 rounded-2xl border border-orange-200/70 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-orange-900 mb-4">
                  <Clock className="w-5 h-5 text-orange-600 shrink-0" />
                  <h3>{t("deliveryReturnsPage.shipping.times.title")}</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-2xs">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 mb-1">
                      🇦🇪 {t("deliveryReturnsPage.shipping.times.uaeTitle")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t("deliveryReturnsPage.shipping.times.uaeDesc")}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-2xs">
                    <h4 className="font-bold text-xs sm:text-sm text-gray-900 mb-1">
                      🌍 {t("deliveryReturnsPage.shipping.times.gccTitle")}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {t("deliveryReturnsPage.shipping.times.gccDesc")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Free Delivery & Tracking */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm sm:text-base mb-1.5">
                    <PackageCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <h4>{t("deliveryReturnsPage.shipping.freeShipping.title")}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    {t("deliveryReturnsPage.shipping.freeShipping.desc")}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200/80 shadow-2xs">
                  <div className="flex items-center gap-2 font-bold text-sky-900 text-sm sm:text-base mb-1.5">
                    <Truck className="w-5 h-5 text-sky-600 shrink-0" />
                    <h4>{t("deliveryReturnsPage.shipping.tracking.title")}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-sky-950 leading-relaxed mb-3">
                    {t("deliveryReturnsPage.shipping.tracking.desc")}
                  </p>
                  <Link
                    to="/profile"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900 hover:underline"
                  >
                    <span>{t("deliveryReturnsPage.shipping.tracking.button")}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. Returns & Exchanges Policy */}
        <section id="returns" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <RotateCcw className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("deliveryReturnsPage.returns.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">
                  {t("deliveryReturnsPage.returns.badge")}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 bg-orange-50/50 p-4 sm:p-5 rounded-2xl border-s-4 border-orange-500">
              {t("deliveryReturnsPage.returns.intro")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {/* Eligibility */}
              <div className="bg-gray-50/90 p-5 sm:p-6 rounded-2xl border border-gray-200/80">
                <div className="flex items-center gap-2 font-bold text-gray-900 text-sm sm:text-base mb-4">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <h3>{t("deliveryReturnsPage.returns.eligibility.title")}</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span>{t("deliveryReturnsPage.returns.eligibility.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span>{t("deliveryReturnsPage.returns.eligibility.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                    <span>{t("deliveryReturnsPage.returns.eligibility.item3")}</span>
                  </li>
                </ul>
              </div>

              {/* Non Returnable */}
              <div className="bg-rose-50/60 p-5 sm:p-6 rounded-2xl border border-rose-100">
                <div className="flex items-center gap-2 font-bold text-rose-900 text-sm sm:text-base mb-4">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <h3>{t("deliveryReturnsPage.returns.nonReturnable.title")}</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{t("deliveryReturnsPage.returns.nonReturnable.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{t("deliveryReturnsPage.returns.nonReturnable.item2")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Return Process Steps */}
            <div className="p-5 sm:p-6 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-2xl shadow-md">
              <h3 className="font-bold text-lg sm:text-xl mb-4 text-center sm:text-start">
                {t("deliveryReturnsPage.returns.process.title")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20">
                  <span className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xs mb-2">
                    1
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-orange-50">
                    {t("deliveryReturnsPage.returns.process.step1")}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20">
                  <span className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xs mb-2">
                    2
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-orange-50">
                    {t("deliveryReturnsPage.returns.process.step2")}
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/20">
                  <span className="w-7 h-7 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xs mb-2">
                    3
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-orange-50">
                    {t("deliveryReturnsPage.returns.process.step3")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Cancellation & Refunds */}
        <section id="cancellation" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("deliveryReturnsPage.cancellation.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">
                  {t("deliveryReturnsPage.cancellation.badge")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mb-2" />
                <h4 className="font-bold text-sm text-emerald-950 mb-1">
                  {t("deliveryReturnsPage.cancellation.beforeDispatch.title")}
                </h4>
                <p className="text-xs text-gray-600">
                  {t("deliveryReturnsPage.cancellation.beforeDispatch.desc")}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-100">
                <AlertCircle className="w-6 h-6 text-rose-500 mb-2" />
                <h4 className="font-bold text-sm text-rose-950 mb-1">
                  {t("deliveryReturnsPage.cancellation.afterDispatch.title")}
                </h4>
                <p className="text-xs text-gray-600">
                  {t("deliveryReturnsPage.cancellation.afterDispatch.desc")}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-100">
                <FileText className="w-6 h-6 text-amber-600 mb-2" />
                <h4 className="font-bold text-sm text-amber-950 mb-1">
                  {t("deliveryReturnsPage.cancellation.customOrders.title")}
                </h4>
                <p className="text-xs text-gray-600">
                  {t("deliveryReturnsPage.cancellation.customOrders.desc")}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-100">
                <Clock className="w-6 h-6 text-purple-600 mb-2" />
                <h4 className="font-bold text-sm text-purple-950 mb-1">
                  {t("deliveryReturnsPage.cancellation.refundSla.title")}
                </h4>
                <p className="text-xs text-gray-600">
                  {t("deliveryReturnsPage.cancellation.refundSla.desc")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. Courier & Responsibility */}
        <section id="responsibility" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("deliveryReturnsPage.responsibility.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">
                  {t("deliveryReturnsPage.responsibility.badge")}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 bg-amber-50/80 border border-amber-200/90 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-base text-gray-800 leading-relaxed">
                {t("deliveryReturnsPage.responsibility.desc")}
              </p>
            </div>
          </motion.div>
        </section>

        {/* 5. Frequently Asked Questions */}
        <section id="faq" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("deliveryReturnsPage.faq.title")}
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { q: t("deliveryReturnsPage.faq.q1"), a: t("deliveryReturnsPage.faq.a1") },
                { q: t("deliveryReturnsPage.faq.q2"), a: t("deliveryReturnsPage.faq.a2") },
                { q: t("deliveryReturnsPage.faq.q3"), a: t("deliveryReturnsPage.faq.a3") },
              ].map((faq, idx) => (
                <div key={idx} className="border border-gray-200/80 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-start bg-gray-50/70 hover:bg-orange-50/60 font-semibold text-xs sm:text-sm text-gray-900 flex items-center justify-between gap-3 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-orange-500 shrink-0 transition-transform duration-200 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-4 sm:p-5 text-xs sm:text-sm text-gray-600 border-t border-gray-100 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. Contact & Support CTA */}
        <section id="contact" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-md border border-gray-200/90 relative overflow-hidden"
          >
            <div className="absolute top-0 end-0 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl text-center sm:text-start">
              <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-gray-100 justify-center sm:justify-start">
                <div className="p-3 rounded-2xl bg-orange-500 text-white shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {t("deliveryReturnsPage.contact.title")}
                  </h2>
                </div>
              </div>

              <p className="text-gray-600 text-xs sm:text-base mb-6">
                {t("deliveryReturnsPage.contact.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <a
                  href="https://wa.me/+971529205556"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm hover:bg-emerald-600 transition shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t("deliveryReturnsPage.contact.whatsapp")}</span>
                </a>

                <a
                  href="tel:+971529205556"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-orange-500 text-white font-bold text-xs sm:text-sm hover:bg-orange-600 transition shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t("deliveryReturnsPage.contact.phone")}</span>
                </a>

                <a
                  href="mailto:support@padoraonline.com"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-gray-900 text-white font-bold text-xs sm:text-sm hover:bg-black transition shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t("deliveryReturnsPage.contact.email")}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Deliveryandreturns;
