import React, { useState } from "react";
import logo from "../assets/mnma_logo.png";
import { toast } from "sonner";
import {
  Users,
  Package,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Components/Common/LanguageSwitcher";

export default function AdminPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isRtl = i18n.language === "ar";

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-[#071127] text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md hover:bg-slate-800 focus:outline-none transition"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <img
            src={logo}
            alt="MNMA Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">{t("admin.dashboard.title")}</h2>
        </div>
        <div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Backdrop overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 ${
          isRtl ? "right-0" : "left-0"
        } z-50 w-64 bg-[#071127] text-white flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto ${
          isSidebarOpen
            ? "translate-x-0 shadow-2xl"
            : isRtl
            ? "translate-x-full lg:translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile close button inside sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:border-none">
          <div className="flex items-center gap-3 mx-auto lg:mt-2">
            <img
              src={logo}
              alt="MNMA Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Title & Language switcher (Desktop view) */}
        <div className="px-6 mb-4 text-center hidden lg:block">
          <h2 className="text-xl font-medium">{t("admin.dashboard.title")}</h2>
          <div className="mt-3 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-2 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <LayoutDashboard size={18} />
                {t("admin.sidebar.dashboard")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <Users size={18} />
                {t("admin.sidebar.users")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/products"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <Package size={18} />
                {t("admin.sidebar.products")}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orders"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <ClipboardList size={18} />
                {t("admin.sidebar.orders")}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800 lg:border-none">
          <button
            onClick={() => {
              const confirmLogout = window.confirm(t("admin.sidebar.logoutConfirm"));
              if (confirmLogout) {
                closeSidebar();
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                toast.success(t("profile.loggedOut"));
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }
            }}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-md flex items-center justify-center gap-2 font-medium transition"
          >
            <LogOut size={18} />
            {t("admin.sidebar.logout")}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}