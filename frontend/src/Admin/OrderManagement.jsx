import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallorders,
  updateorderstatus,
  deleteorder,
} from "../redux/slices/adminorderslice";
import { useTranslation } from "react-i18next";

export default function OrderManagement() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const isRtl = i18n.language === "ar";

  const { orders = [], loading, error } = useSelector(
    (state) => state.adminorders || {}
  );

  useEffect(() => {
    dispatch(fetchallorders());
  }, [dispatch]);

  const handleStatusChange = (id, status) => {
    dispatch(updateorderstatus({ id, status }));
  };

  const handleDelete = (id) => {
    if (window.confirm(t("admin.orders.deleteConfirm"))) {
      dispatch(deleteorder(id));
    }
  };

  const statusCounts = useMemo(() => {
    return {
      total: orders.length,
      processing: orders.filter(
        (order) => !order.status || order.status === "Processing"
      ).length,
      shipped: orders.filter((order) => order.status === "Shipped").length,
      delivered: orders.filter((order) => order.status === "Delivered").length,
      cancelled: orders.filter((order) => order.status === "Cancelled").length,
    };
  }, [orders]);

  const formatPrice = (price) => {
    const amount = Number(price) || 0;

    return new Intl.NumberFormat(isRtl ? "ar-AE" : "en-AE", {
      style: "currency",
      currency: "AED",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "Shipped":
        return "bg-blue-50 text-blue-700 ring-blue-600/20";
      case "Cancelled":
        return "bg-red-50 text-red-700 ring-red-600/20";
      default:
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500";
      case "Shipped":
        return "bg-blue-500";
      case "Cancelled":
        return "bg-red-500";
      default:
        return "bg-amber-500";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Shipped":
        return t("admin.orders.statuses.shipped");
      case "Delivered":
        return t("admin.orders.statuses.delivered");
      case "Cancelled":
        return t("admin.orders.statuses.cancelled");
      default:
        return t("admin.orders.statuses.processing");
    }
  };

  const renderAddress = (shippingAddress) => {
    if (!shippingAddress) {
      return (
        <span className="text-sm italic text-slate-400">
          {t("admin.orders.noAddress")}
        </span>
      );
    }

    return (
      <div className="max-w-xs space-y-1 text-sm text-slate-600">
        {shippingAddress.address && (
          <p className="font-medium text-slate-800">
            {shippingAddress.address}
          </p>
        )}

        {shippingAddress.city && (
          <p>
            {shippingAddress.city}
            {shippingAddress.postalCode &&
              `, ${shippingAddress.postalCode}`}
          </p>
        )}

        {shippingAddress.country && <p>{shippingAddress.country}</p>}
      </div>
    );
  };

  const summaryCards = [
    {
      label: t("admin.orders.totalOrders"),
      value: statusCounts.total,
      icon: "📦",
      color: "from-violet-500 to-indigo-500",
    },
    {
      label: t("admin.orders.statuses.processing"),
      value: statusCounts.processing,
      icon: "⏳",
      color: "from-amber-400 to-orange-500",
    },
    {
      label: t("admin.orders.statuses.shipped"),
      value: statusCounts.shipped,
      icon: "🚚",
      color: "from-sky-400 to-blue-600",
    },
    {
      label: t("admin.orders.statuses.delivered"),
      value: statusCounts.delivered,
      icon: "✓",
      color: "from-emerald-400 to-green-600",
    },
  ];

  return (
    <main
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {t("admin.orders.management", "Management")}
            </p>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {t("admin.orders.title")}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {t(
                "admin.orders.subtitle",
                "Monitor and manage customer orders"
              )}
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(fetchallorders())}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className={loading ? "animate-spin" : ""}>↻</span>
            {t("admin.orders.refresh", "Refresh")}
          </button>
        </div>

        {/* Summary cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${card.color} opacity-10 transition group-hover:scale-125`}
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-xl text-white shadow-lg`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Orders panel */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t("admin.orders.title")}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {orders.length}{" "}
                {t("admin.orders.ordersFound", "orders found")}
              </p>
            </div>

            <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
              {t("admin.orders.latestOrders", "Latest orders")}
            </div>
          </div>

          {error && (
            <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <span className="mr-2">⚠</span>
              {error}
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center gap-3 p-10 text-sm text-slate-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
              {t("admin.orders.loading")}
            </div>
          )}

          {!loading && orders.length === 0 && !error && (
            <div className="px-6 py-16 text-center">
              <div className="mb-3 text-5xl">📦</div>
              <h3 className="font-semibold text-slate-800">
                {t("admin.orders.noOrders", "No orders found")}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                {t(
                  "admin.orders.noOrdersDescription",
                  "New orders will appear here."
                )}
              </p>
            </div>
          )}

          {/* Desktop table */}
          {!loading && orders.length > 0 && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.orderId")}
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.customer")}
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.totalPrice")}
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.address")}
                    </th>
                     <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.productDetails")}
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-start text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.status")}
                    </th>
                    <th className="whitespace-nowrap px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                      {t("admin.orders.actions")}
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const status = order.status || "Processing";

                    return (
                      <tr
                        key={order._id}
                        className="transition hover:bg-indigo-50/40"
                      >
                        <td className="px-6 py-5">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-600">
                            #{order._id?.slice(-8)}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                              {order.user?.name?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">
                                {order.user?.name ||
                                  t("admin.orders.unknown")}
                              </p>
                              {order.user?.email && (
                                <p className="text-xs text-slate-500">
                                  {order.user.email}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="font-bold text-slate-800">
                            {formatPrice(
                              order.totalprice || order.totalPrice || 0
                            )}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          {renderAddress(order.shippingAddress)}
                        </td>
                       
                       <td className="px-6 py-5">
  {order.orderItems?.map((item, index) => (
    <div key={item.productid || index} className="mb-2 flex items-center gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-10 h-10 rounded object-cover border border-slate-200"
      />
      <div>
        <p className="text-sm font-medium text-slate-800">
          {item.name} x {item.quantity}
        </p>
        <p className="text-xs text-slate-500">
          {item.size && <span>Size: {item.size} · </span>}
          {item.color && <span>Color: {item.color} · </span>}
          {formatPrice(item.price)}
        </p>
      </div>
    </div>
  ))}
</td>

                        <td className="px-6 py-5">
                          <select
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className={`rounded-full px-3 py-2 text-xs font-bold ring-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusStyles(
                              status
                            )}`}
                          >
                            <option value="Processing">
                              {t("admin.orders.statuses.processing")}
                            </option>
                            <option value="Shipped">
                              {t("admin.orders.statuses.shipped")}
                            </option>
                            <option value="Delivered">
                              {t("admin.orders.statuses.delivered")}
                            </option>
                            <option value="Cancelled">
                              {t("admin.orders.statuses.cancelled")}
                            </option>
                          </select>
                        </td>

                        <td className="px-6 py-5 text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(order._id)}
                            className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            {t("admin.orders.delete")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile cards */}
          {!loading && orders.length > 0 && (
            <div className="space-y-4 p-4 md:hidden">
              {orders.map((order) => {
                const status = order.status || "Processing";

                return (
                  <article
                    key={order._id}
                    className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                          {order.user?.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {order.user?.name ||
                              t("admin.orders.unknown")}
                          </h3>
                          <p className="font-mono text-xs text-slate-500">
                            #{order._id?.slice(-8)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${getStatusStyles(
                          status
                        )}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${getStatusDot(
                            status
                          )}`}
                        />
                        {getStatusLabel(status)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4">
                      <div>
                        <p className="text-xs text-slate-500">
                          {t("admin.orders.totalPrice")}
                        </p>
                        <p className="mt-1 font-bold text-slate-800">
                          {formatPrice(
                            order.totalprice || order.totalPrice || 0
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          {t("admin.orders.status")}
                        </p>
                        <select
                          value={status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`mt-1 w-full rounded-lg border px-2 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${getStatusStyles(
                            status
                          )}`}
                        >
                          <option value="Processing">
                            {t("admin.orders.statuses.processing")}
                          </option>
                          <option value="Shipped">
                            {t("admin.orders.statuses.shipped")}
                          </option>
                          <option value="Delivered">
                            {t("admin.orders.statuses.delivered")}
                          </option>
                          <option value="Cancelled">
                            {t("admin.orders.statuses.cancelled")}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        {t("admin.orders.address")}
                      </p>
                      {renderAddress(order.shippingAddress)}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(order._id)}
                      className="mt-4 w-full rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      {t("admin.orders.delete")}
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}