import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  Truck,
  RotateCcw,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Lock,
  Share2,
  UserCheck,
  PackageCheck,
  AlertCircle,
  Building2,
  Sparkles,
  ChevronRight
} from "lucide-react";

const Privacypolicy = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("privacy");

  const navItems = [
    { id: "privacy", label: t("privacyPage.nav.privacy"), icon: <ShieldCheck className="w-4 h-4 shrink-0" /> },
    { id: "terms", label: t("privacyPage.nav.terms"), icon: <FileText className="w-4 h-4 shrink-0" /> },
    { id: "delivery", label: t("privacyPage.nav.deliveryLink"), icon: <Truck className="w-4 h-4 shrink-0" />, isLink: true, linkTo: "/delivery-and-returns" },
    { id: "brand", label: t("privacyPage.nav.brand"), icon: <Award className="w-4 h-4 shrink-0" /> },
    { id: "contact", label: t("privacyPage.nav.contact"), icon: <MapPin className="w-4 h-4 shrink-0" /> },
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

  return (
    <div className="bg-[#f8f5f0] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-20">
      {/* Light Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50/70 via-gray-50 to-amber-50/50 text-gray-900 py-14 sm:py-20 px-4 sm:px-6 border-b border-gray-200/70 overflow-hidden">
        {/* Soft Ambient Glows */}
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
              {t("privacyPage.hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-gray-900 leading-tight">
              {t("privacyPage.hero.title")}
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed px-2">
              {t("privacyPage.hero.subtitle")}
            </p>
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs sm:text-sm text-orange-600 font-medium bg-white/70 backdrop-blur-xs py-1.5 px-4 rounded-full w-max mx-auto border border-orange-100 shadow-2xs">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>{t("privacyPage.hero.lastUpdated")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Responsive Sticky Quick Nav Bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all duration-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 py-3 overflow-x-auto no-scrollbar scroll-smooth">
            {navItems.map((item) =>
              item.isLink ? (
                <Link
                  key={item.id}
                  to={item.linkTo}
                  className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200/80 font-semibold"
                >
                  {item.icon}
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
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
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-10 sm:space-y-14">

        {/* 1. Privacy Policy Section */}
        <section id="privacy" className="scroll-mt-32">
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
                  {t("privacyPage.privacy.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wide uppercase mt-0.5">
                  PDPL Compliant Policy
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 bg-orange-50/40 p-4 sm:p-5 rounded-2xl border-s-4 border-orange-500">
              {t("privacyPage.privacy.intro")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Data Collected */}
              <div className="bg-orange-50/60 p-5 sm:p-6 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                  <UserCheck className="w-5 h-5 shrink-0" />
                  <h3>{t("privacyPage.privacy.collectedData.title")}</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.collectedData.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.collectedData.item2")}</span>
                  </li>
                </ul>
              </div>

              {/* Data Usage */}
              <div className="bg-amber-50/60 p-5 sm:p-6 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm sm:text-base mb-3 sm:mb-4">
                  <Lock className="w-5 h-5 shrink-0" />
                  <h3>{t("privacyPage.privacy.dataUsage.title")}</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.dataUsage.item1")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.dataUsage.item2")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.dataUsage.item3")}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span>{t("privacyPage.privacy.dataUsage.item4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Non-Sale Promise Banner */}
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 sm:p-5 rounded-2xl flex items-center gap-3 mb-6 sm:mb-8 shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-xs sm:text-sm font-semibold leading-snug">
                {t("privacyPage.privacy.noSell")}
              </p>
            </div>

            {/* Data Sharing & User Rights */}
            <div className="space-y-4 sm:space-y-6">
              <div className="p-4 sm:p-6 bg-gray-50/80 rounded-2xl border border-gray-200/70">
                <div className="flex items-center gap-2 font-semibold text-gray-900 text-sm sm:text-base mb-2">
                  <Share2 className="w-5 h-5 text-orange-500 shrink-0" />
                  <h3>{t("privacyPage.privacy.dataSharing.title")}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">{t("privacyPage.privacy.dataSharing.desc")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    💳 {t("privacyPage.privacy.dataSharing.item1")}
                  </div>
                  <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    🚚 {t("privacyPage.privacy.dataSharing.item2")}
                  </div>
                  <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    🛠️ {t("privacyPage.privacy.dataSharing.item3")}
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base sm:text-lg">{t("privacyPage.privacy.userRights.title")}</h4>
                  <p className="text-xs sm:text-sm text-orange-50 font-light mt-1">{t("privacyPage.privacy.userRights.desc")}</p>
                </div>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-5 py-2.5 bg-white text-orange-600 hover:bg-orange-50 rounded-full text-xs sm:text-sm font-bold transition shadow-sm shrink-0 self-stretch sm:self-auto text-center"
                >
                  {t("privacyPage.nav.contact")}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. Terms & Conditions Section */}
        <section id="terms" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.terms.title")}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                  {t("privacyPage.terms.intro")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {[
                t("privacyPage.terms.item1"),
                t("privacyPage.terms.item2"),
                t("privacyPage.terms.item3"),
                t("privacyPage.terms.item4"),
                t("privacyPage.terms.item5"),
                t("privacyPage.terms.item6"),
              ].map((termText, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50/80 hover:bg-orange-50/50 border border-gray-200/70 hover:border-orange-200 transition-all flex items-start gap-3"
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                    {termText}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. Delivery & Returns Policy Callout Banner */}
        <section id="delivery" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="absolute top-0 end-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-orange-100 text-xs font-bold uppercase tracking-wider">
                <Truck className="w-4 h-4" />
                {t("privacyPage.deliveryCallout.title")}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                {t("privacyPage.nav.deliveryLink")}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-orange-50 font-normal max-w-xl leading-relaxed">
                {t("privacyPage.deliveryCallout.subtitle")}
              </p>
            </div>

            <Link
              to="/delivery-and-returns"
              className="relative z-10 px-6 sm:px-8 py-3.5 bg-white text-orange-600 hover:bg-orange-50 font-extrabold rounded-full text-xs sm:text-sm shadow-md transition-all transform hover:-translate-y-0.5 whitespace-nowrap flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
            >
              <span>{t("privacyPage.deliveryCallout.cta")}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* 5. Brand Policy & Standards */}
        <section id="brand" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <Award className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.brand.title")}
                </h2>
                <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wider uppercase mt-0.5">
                  {t("privacyPage.brand.slogan")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {[
                { title: t("privacyPage.brand.item1"), icon: "⚖️" },
                { title: t("privacyPage.brand.item2"), icon: "📝" },
                { title: t("privacyPage.brand.item3"), icon: "🏷️" },
                { title: t("privacyPage.brand.item4"), icon: "🤝" },
                { title: t("privacyPage.brand.item5"), icon: "✨" },
                { title: t("privacyPage.brand.item6"), icon: "🛡️" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/70 hover:bg-orange-50/50 hover:border-orange-200 transition-all text-center"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <p className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. Contact Us Section (Light Theme) */}
        <section id="contact" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-md border border-gray-200/90 relative overflow-hidden"
          >
            <div className="absolute top-0 end-0 w-72 h-72 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-3.5 mb-6 sm:mb-8 pb-4 border-b border-gray-100">
                <div className="p-3 rounded-2xl bg-orange-500 text-white shrink-0 shadow-xs">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    {t("privacyPage.contact.title")}
                  </h2>
                  <p className="text-xs sm:text-sm text-orange-600 font-semibold tracking-wider uppercase mt-0.5">
                    {t("privacyPage.contact.brandName")} — {t("privacyPage.brand.slogan")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Location */}
                <div className="bg-gray-50/90 p-4 sm:p-5 rounded-2xl border border-gray-200/80 hover:border-orange-200 transition-all">
                  <MapPin className="w-5 h-5 text-orange-500 mb-2 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {t("privacyPage.contact.addressLabel")}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    {t("privacyPage.contact.address")}
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-gray-50/90 p-4 sm:p-5 rounded-2xl border border-gray-200/80 hover:border-orange-200 transition-all">
                  <Phone className="w-5 h-5 text-orange-500 mb-2 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {t("privacyPage.contact.phonesLabel")}
                  </p>
                  <div className="text-xs font-semibold text-gray-900 space-y-1">
                    <a href="tel:+971529205556" className="hover:text-orange-600 block transition">+971 52 920 5556</a>
                    <a href="tel:+971553935052" className="hover:text-orange-600 block transition">+971 55 393 5052</a>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-gray-50/90 p-4 sm:p-5 rounded-2xl border border-gray-200/80 hover:border-orange-200 transition-all">
                  <Mail className="w-5 h-5 text-orange-500 mb-2 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {t("privacyPage.contact.emailLabel")}
                  </p>
                  <a
                    href="mailto:support@padoraonline.com"
                    className="text-xs font-semibold text-orange-600 hover:underline block break-all"
                  >
                    {t("privacyPage.contact.email")}
                  </a>
                </div>

                {/* Hours */}
                <div className="bg-gray-50/90 p-4 sm:p-5 rounded-2xl border border-gray-200/80 hover:border-orange-200 transition-all">
                  <Clock className="w-5 h-5 text-orange-500 mb-2 shrink-0" />
                  <p className="text-xs text-gray-500 font-medium mb-1">
                    {t("privacyPage.contact.hoursLabel")}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">
                    {t("privacyPage.contact.hours")}
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200/80 p-4 rounded-xl text-center">
                <p className="text-xs sm:text-sm text-orange-900 font-semibold">
                  ⚡ {t("privacyPage.contact.sla")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Privacypolicy;
