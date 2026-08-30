import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
  HelpCircle
} from "lucide-react";

const Privacypolicy = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("privacy");

  const navItems = [
    { id: "privacy", label: t("privacyPage.nav.privacy"), icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "terms", label: t("privacyPage.nav.terms"), icon: <FileText className="w-4 h-4" /> },
    { id: "shipping", label: t("privacyPage.nav.shipping"), icon: <Truck className="w-4 h-4" /> },
    { id: "cancellation", label: t("privacyPage.nav.cancellation"), icon: <RotateCcw className="w-4 h-4" /> },
    { id: "brand", label: t("privacyPage.nav.brand"), icon: <Award className="w-4 h-4" /> },
    { id: "contact", label: t("privacyPage.nav.contact"), icon: <MapPin className="w-4 h-4" /> },
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    // <div className="bg-[#FAF8F5] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-20">
    //   {/* Hero Section */}
    //   <section className="relative bg-gradient-to-br from-orange-50/70 via-amber-50/40 to-gray-50 text-gray-900  border-b border-gray-200/70 py-20 px-6 overflow-hidden">
    //     {/* Glow Effects */}
    //     <div className="absolute -top-24 -left-24 w-96 h-96  bg-orange-200/40 rounded-full blur-3xl pointer-events-none" />
    //     <div className="absolute -bottom-24 -right-24 w-96 h-96  bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

    //     <div className="max-w-5xl mx-auto text-center relative z-10">
    //       <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.6 }}
    //       >
    //         <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-widest mb-6">
    //           <Sparkles className="w-3.5 h-3.5" />
    //           {t("privacyPage.hero.badge")}
    //         </span>
    //         <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r  text-gray-900 via-gray-100 to-gray-400">
    //           {t("privacyPage.hero.title")}
    //         </h1>
    //         <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
    //           {t("privacyPage.hero.subtitle")}
    //         </p>
    //         <div className="mt-8 flex items-center justify-center gap-2 text-xs text-orange-400/80 font-medium">
    //           <Clock className="w-3.5 h-3.5 inline" />
    //           <span>{t("privacyPage.hero.lastUpdated")}</span>
    //         </div>
    //       </motion.div>
    //     </div>
    //   </section>
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
                  {t("privacyPage.hero.badge")}
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 text-gray-900 leading-tight">
                  {t("privacyPage.hero.title")}
                </h1>
                <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed px-2">
                  {t("privacyPage.hero.subtitle")}
                </p>
                 <div className="mt-8 flex items-center justify-center gap-2 text-xs text-orange-400/80 font-medium">
               <Clock className="w-3.5 h-3.5 inline" />
             <span>{t("privacyPage.hero.lastUpdated")}</span>
             </div>
              </motion.div>
            </div>
          </section>

      {/* Sticky Quick Nav Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all duration-200">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start md:justify-center gap-2 py-3 min-w-max">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                    : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 space-y-16">

        {/* 1. Privacy Policy Section */}
        <section id="privacy" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.privacy.title")}
                </h2>
                <p className="text-xs text-orange-600 font-semibold tracking-wide uppercase">
                  PDPL Compliant Policy
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 bg-gray-50 p-4 md:p-5 rounded-2xl border-start-4 border-orange-500">
              {t("privacyPage.privacy.intro")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Data Collected */}
              <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-2 text-orange-600 font-semibold text-base mb-4">
                  <UserCheck className="w-5 h-5" />
                  <h3>{t("privacyPage.privacy.collectedData.title")}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
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
              <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-base mb-4">
                  <Lock className="w-5 h-5" />
                  <h3>{t("privacyPage.privacy.dataUsage.title")}</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-700">
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
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 mb-8">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-sm font-semibold">
                {t("privacyPage.privacy.noSell")}
              </p>
            </div>

            {/* Data Sharing & User Rights */}
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 font-semibold text-gray-900 text-base mb-2">
                  <Share2 className="w-5 h-5 text-orange-500" />
                  <h3>{t("privacyPage.privacy.dataSharing.title")}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4">{t("privacyPage.privacy.dataSharing.desc")}</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    💳 {t("privacyPage.privacy.dataSharing.item1")}
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    🚚 {t("privacyPage.privacy.dataSharing.item2")}
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 text-center shadow-2xs">
                    🛠️ {t("privacyPage.privacy.dataSharing.item3")}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-lg">{t("privacyPage.privacy.userRights.title")}</h4>
                  <p className="text-sm text-orange-50 font-light mt-1">{t("privacyPage.privacy.userRights.desc")}</p>
                </div>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-5 py-2.5 bg-white text-orange-600 rounded-full text-xs font-bold hover:bg-orange-50 transition shadow"
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
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.terms.title")}
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  {t("privacyPage.terms.intro")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: t("privacyPage.terms.item1"), tag: "Availability" },
                { title: t("privacyPage.terms.item2"), tag: "Product Representations" },
                { title: t("privacyPage.terms.item3"), tag: "UAE 5% VAT Included" },
                { title: t("privacyPage.terms.item4"), tag: "Store Cancellation Right" },
                { title: t("privacyPage.terms.item5"), tag: "Intellectual Property" },
                { title: t("privacyPage.terms.item6"), tag: "UAE Governing Laws" },
              ].map((term, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-gray-50 hover:bg-orange-50/40 border border-gray-200/70 hover:border-orange-200 transition-all flex items-start gap-3"
                >
                  <span className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 leading-snug">
                      {term.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 3. Shipping Policy & Delivery Time */}
        <section id="shipping" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <Truck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.shipping.title")}
                </h2>
                <p className="text-xs text-orange-600 font-semibold tracking-wide uppercase">
                  {t("privacyPage.shipping.coverage")}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Delivery Times */}
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center gap-2 font-bold text-lg mb-4">
                  <Clock className="w-5 h-5" />
                  <h3>{t("privacyPage.shipping.times.title")}</h3>
                </div>
                <div className="space-y-4 text-sm font-light">
                  <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-xs border border-white/20">
                    <p className="font-semibold text-white">{t("privacyPage.shipping.times.uae")}</p>
                  </div>
                  <div className="bg-white/10 p-3.5 rounded-xl backdrop-blur-xs border border-white/20">
                    <p className="font-semibold text-white">{t("privacyPage.shipping.times.gcc")}</p>
                  </div>
                </div>
              </div>

              {/* Free Delivery & Tracking */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <div className="flex items-center gap-2 font-semibold text-emerald-800 mb-2">
                    <PackageCheck className="w-5 h-5 text-emerald-600" />
                    <h4>Free Delivery</h4>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {t("privacyPage.shipping.freeShipping")}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <h4>{t("privacyPage.shipping.tracking.title")}</h4>
                  </div>
                  <p className="text-xs text-blue-900 leading-relaxed">
                    {t("privacyPage.shipping.tracking.desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Courier Responsibility */}
            <div className="p-5 rounded-2xl bg-gray-900 text-white flex items-start gap-4 shadow-sm">
              <Building2 className="w-6 h-6 text-orange-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-base text-orange-400 mb-1">
                  {t("privacyPage.shipping.responsibility.title")}
                </h4>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  {t("privacyPage.shipping.responsibility.desc")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. Cancellation Policy Section */}
        <section id="cancellation" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <RotateCcw className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.cancellation.title")}
                </h2>
                <p className="text-xs text-gray-500">Clear & Fair Order Policy</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-sm text-emerald-900 mb-1">Before Dispatch</h4>
                <p className="text-xs text-gray-600">{t("privacyPage.cancellation.item1")}</p>
              </div>

              <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 text-center">
                <AlertCircle className="w-7 h-7 text-rose-500 mx-auto mb-3" />
                <h4 className="font-bold text-sm text-rose-900 mb-1">After Dispatch</h4>
                <p className="text-xs text-gray-600">{t("privacyPage.cancellation.item2")}</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
                <Lock className="w-7 h-7 text-amber-600 mx-auto mb-3" />
                <h4 className="font-bold text-sm text-amber-900 mb-1">Custom Orders</h4>
                <p className="text-xs text-gray-600">{t("privacyPage.cancellation.item3")}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center">
              <p className="text-xs md:text-sm font-semibold text-orange-900">
                🔄 {t("privacyPage.cancellation.refundInfo")}
              </p>
            </div>
          </motion.div>
        </section>

        {/* 5. Brand Policy & Standards */}
        <section id="brand" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {t("privacyPage.brand.title")}
                </h2>
                <p className="text-xs text-orange-600 font-semibold tracking-wider uppercase">
                  {t("privacyPage.brand.slogan")}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-orange-50/50 hover:border-orange-200 transition-all text-center"
                >
                  <span className="text-2xl mb-2 block">{item.icon}</span>
                  <p className="text-xs md:text-sm font-medium text-gray-800 leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6. Contact Us Section */}
        <section id="contact" className="scroll-mt-32">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 end-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-orange-500 text-white">
                  <MapPin className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t("privacyPage.contact.title")}
                  </h2>
                  <p className="text-xs text-orange-400 font-semibold tracking-widest uppercase">
                    {t("privacyPage.contact.brandName")} — {t("privacyPage.brand.slogan")}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Location */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <MapPin className="w-5 h-5 text-orange-400 mb-2" />
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {t("privacyPage.contact.addressLabel")}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {t("privacyPage.contact.address")}
                  </p>
                </div>

                {/* Phone */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <Phone className="w-5 h-5 text-orange-400 mb-2" />
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {t("privacyPage.contact.phonesLabel")}
                  </p>
                  <p className="text-xs font-semibold text-white space-y-1">
                    <a href="tel:+971529205556" className="hover:text-orange-400 block transition">+971 52 920 5556</a>

                  </p>
                </div>

                {/* Email */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <Mail className="w-5 h-5 text-orange-400 mb-2" />
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {t("privacyPage.contact.emailLabel")}
                  </p>
                  <a
                    href="mailto:mnmasupport@gmail.com"
                    className="text-xs font-semibold text-orange-400 hover:underline block break-all"
                  >
                    {t("privacyPage.contact.email")}
                  </a>
                </div>

                {/* Hours */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-xs">
                  <Clock className="w-5 h-5 text-orange-400 mb-2" />
                  <p className="text-xs text-gray-400 font-medium mb-1">
                    {t("privacyPage.contact.hoursLabel")}
                  </p>
                  <p className="text-xs font-semibold text-white">
                    {t("privacyPage.contact.hours")}
                  </p>
                </div>
              </div>

              <div className="bg-orange-500/20 border border-orange-500/30 p-4 rounded-xl text-center">
                <p className="text-xs md:text-sm text-orange-300 font-medium">
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
