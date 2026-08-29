import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Briefcase, Mail, Phone, Clock, Award, BookOpen } from "lucide-react";

const Careers = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8f5f0] min-h-screen text-gray-900 selection:bg-orange-500 selection:text-white pb-20">
      {/* Hero Section */}
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
              {t("careersPage.hero.badge")}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 leading-tight">
              {t("careersPage.hero.title")}
            </h1>
            <p className="text-gray-700 italic text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-3 pr-2 rounded-r-xl">
              {t("careersPage.hero.quote")}
            </p>
            <p className="mt-6 text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("careersPage.hero.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Requirements Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 space-y-10">
        <div className="text-center sm:text-start">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">
            {t("careersPage.intro")}
          </h2>
        </div>

        <div className="space-y-6">
          {/* Job 1: Sales Associate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {t("careersPage.jobs.sales.title")}
                </h3>
                <span className="inline-block px-2.5 py-0.5 mt-1 bg-orange-50 text-orange-600 border border-orange-100 rounded-full text-xs font-semibold">
                  Full-Time
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              {t("careersPage.jobs.sales.desc")}
            </p>
          </motion.div>

          {/* Job 2: Other Positions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-gray-200/80 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3.5 mb-4 pb-3 border-b border-gray-100">
              <div className="p-3 rounded-2xl bg-orange-100 text-orange-600 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {t("careersPage.jobs.other.title")}
                </h3>
                <span className="inline-block px-2.5 py-0.5 mt-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-xs font-semibold">
                  Various Roles
                </span>
              </div>
            </div>
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              {t("careersPage.jobs.other.desc")}
            </p>
          </motion.div>
        </div>

        {/* Dynamic Apply CTA Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-start">
            <h4 className="font-bold text-lg sm:text-xl">Apply Today</h4>
            <p className="text-xs sm:text-sm text-orange-50 font-light max-w-md">
              Send your CV/Resume to our HR team and we will get back to you within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-center">
            <a
              href="mailto:mnmasupport@gmail.com"
              className="flex items-center gap-2 px-5 py-3 bg-white text-orange-600 hover:bg-orange-50 rounded-full font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <Mail className="w-4 h-4" />
              <span>Email CV</span>
            </a>
            <a
              href="https://wa.me/+971529205556"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white hover:bg-emerald-600 rounded-full font-bold text-xs sm:text-sm shadow-sm transition"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp HR</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
