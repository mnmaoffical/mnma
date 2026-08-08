import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  Mail,
  ShoppingBag,
  LogOut,
  Package,
  Clock,
  Shield,
  ChevronRight,
  LogIn,
  UserPlus,
  Inbox,
} from "lucide-react";
import { logout } from "../redux/slices/authslice";
import { fetchuserorders } from "../redux/slices/orderslice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ── Auth: check BOTH storage strategies (Redux authslice & direct SigninPage) ──
  const reduxUser = useSelector((state) => state.auth.user);
  const [localUser, setLocalUser] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("userInfo")) ||
        JSON.parse(localStorage.getItem("user")) ||
        null
      );
    } catch {
      return null;
    }
  });

  // Merge: prefer Redux state, fall back to localStorage
  const user = reduxUser || localUser;
  const isLoggedIn = !!user;

  const { orders = [], totalorders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchuserorders());
    }
  }, [dispatch, isLoggedIn]);

  // ── Logout: clear ALL auth keys used anywhere in the codebase ──
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) return;

    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLocalUser(null);

    toast.success("Logged out successfully!");
    navigate("/");
  };

  const getStatusStyle = (status = "") => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 shadow-sm shadow-blue-200";
      case "processing":
        return "bg-amber-100 text-amber-700 shadow-sm shadow-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-700 shadow-sm shadow-red-200";
      default:
        return "bg-gray-100 text-gray-600 shadow-sm";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-AE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalSpent = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const delivered = orders.filter(
    (o) => o.status?.toLowerCase() === "delivered"
  ).length;
  const inProgress = orders.filter(
    (o) =>
      o.status?.toLowerCase() === "processing" ||
      o.status?.toLowerCase() === "shipped"
  ).length;

  const avatarInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-200 hover:scale-105 transition-transform duration-300">
            <User size={36} color="white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
            Your Profile
          </h1>
          <p className="text-gray-500 mb-8 sm:mb-10 text-base leading-relaxed">
            Sign in to view your orders, manage your account, and get a
            personalised experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              to="/SigninPage"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg shadow-violet-200 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-violet-300 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <LogIn size={18} />
              Sign In
            </Link>
            <Link
              to="/SignupPage"
              className="flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold px-6 sm:px-8 py-3 rounded-xl border-2 border-gray-200 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <UserPlus size={18} />
              Create Account
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-2">
            {[
              { icon: <ShoppingBag size={20} />, label: "Track Orders" },
              { icon: <Package size={20} />, label: "Easy Returns" },
              { icon: <Shield size={20} />, label: "Secure Account" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl p-3 sm:p-4 flex flex-col items-center gap-2 border border-gray-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-200"
              >
                <span className="text-violet-500">{icon}</span>
                <span className="text-xs font-semibold text-gray-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-emerald-50 py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 pb-12 sm:pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            {
              label: "Total Orders",
              value: totalorders ?? orders.length,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
              icon: <ShoppingBag size={18} className="text-indigo-500" />,
            },
            {
              label: "Delivered",
              value: delivered,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
              icon: <Package size={18} className="text-emerald-500" />,
            },
            {
              label: "In Progress",
              value: inProgress,
              color: "text-amber-600",
              bg: "bg-amber-50",
              icon: <Clock size={18} className="text-amber-500" />,
            },
            {
              label: "Total Spent",
              value: `AED ${totalSpent.toLocaleString()}`,
              color: "text-violet-600",
              bg: "bg-violet-50",
              icon: <span className="text-violet-500 font-bold text-xs">AED</span>,
            },
          ].map(({ label, value, color, bg, icon }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col items-center gap-2 hover:shadow-md hover:border-indigo-100 transition-all duration-200"
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${bg} flex items-center justify-center`}>
                {icon}
              </div>
              <p className={`text-lg sm:text-xl font-extrabold ${color}`}>
                {value}
              </p>
              <p className="text-xs text-gray-400 font-medium text-center">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-5">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-sm sm:text-base font-bold text-gray-800">
                Account Info
              </h2>
            </div>

            <div className="divide-y divide-gray-50">
              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <User size={14} className="text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase font-semibold text-gray-400 tracking-wider">
                    Name
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Mail size={14} className="text-indigo-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase font-semibold text-gray-400 tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Shield size={14} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-semibold text-gray-400 tracking-wider">
                    Role
                  </p>
                  <span
                    className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 capitalize shadow-sm ${
                      user?.role === "admin"
                        ? "bg-purple-100 text-purple-700 shadow-purple-200"
                        : "bg-emerald-100 text-emerald-700 shadow-emerald-200"
                    }`}
                  >
                    {user?.role || "customer"}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl border border-red-100 hover:border-red-200 transition-all duration-200 text-sm hover:shadow-md hover:shadow-red-200 transform hover:-translate-y-0.5"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-50 bg-gradient-to-r from-gray-50 to-white">
              <h2 className="text-sm sm:text-base font-bold text-gray-800">
                Recent Orders
              </h2>
              <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2.5 py-1 rounded-full">
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </span>
            </div>

            {ordersLoading && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 border-3 border-gray-200 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading orders...</p>
              </div>
            )}

            {!ordersLoading && orders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 text-center">
                <Inbox size={40} className="text-gray-200 mb-3" />
                <p className="text-gray-500 font-semibold text-sm mb-1">
                  No orders yet
                </p>
                <p className="text-gray-300 text-xs mb-5">
                  Your orders will appear here once you shop
                </p>
                <Link
                  to="/collection"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all shadow-md shadow-violet-200 hover:shadow-lg hover:shadow-violet-300 transform hover:-translate-y-0.5"
                >
                  Browse Collection
                </Link>
              </div>
            )}

            {!ordersLoading && orders.length > 0 && (
              <div className="divide-y divide-gray-50">
                {orders.slice(0, 7).map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Package size={14} className="text-indigo-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 font-mono">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatDate(order.createdAt)} &bull;{" "}
                        {order.orderItems?.length || 0} item
                        {order.orderItems?.length !== 1 ? "s" : ""}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gray-800">
                        AED {order.totalPrice?.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getStatusStyle(order.status)}`}
                      >
                        {order.status || "Processing"}
                      </span>
                    </div>

                    <ChevronRight
                      size={14}
                      className="text-gray-300 group-hover:text-gray-500 flex-shrink-0 transition-colors group-hover:translate-x-0.5 transform"
                    />
                  </div>
                ))}

                {orders.length > 7 && (
                  <p className="text-center text-xs text-gray-400 font-medium py-3 sm:py-4">
                    + {orders.length - 7} more orders
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}