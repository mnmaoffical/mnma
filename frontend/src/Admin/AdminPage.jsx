import React from "react";
import logo from "../assets/mnma_logo.png";
import { toast } from "sonner";
import {
  Users,
  Package,
  ClipboardList,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../Components/Common/LanguageSwitcher";

export default function AdminPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#071127] text-white flex flex-col">
        {/* Logo */}
        <img
          src={logo}
          alt="MNMA Logo"
          className="h-12 w-12 rounded-full object-cover mx-auto mt-4 mb-4"
        />

        {/* Title */}
        <div className="px-6 mb-4 text-center">
          <h2 className="text-xl font-medium">{t('admin.dashboard.title')}</h2>
          <div className="mt-3 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 mt-2">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <LayoutDashboard size={18} />
                {t('admin.sidebar.dashboard')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <Users size={18} />
                {t('admin.sidebar.users')}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <Package size={18} />
                {t('admin.sidebar.products')}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 transition ${
                    isActive ? "bg-slate-800 font-semibold text-white" : "text-slate-300"
                  }`
                }
              >
                <ClipboardList size={18} />
                {t('admin.sidebar.orders')}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={() => {
              const confirmLogout = window.confirm(t('admin.sidebar.logoutConfirm'));
              if (confirmLogout) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                toast.success(t('profile.loggedOut'));
                setTimeout(() => {
                  navigate("/");
                }, 1000);
              }
            }}
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-md flex items-center justify-center gap-2 font-medium transition"
          >
            <LogOut size={18} />
            {t('admin.sidebar.logout')}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}