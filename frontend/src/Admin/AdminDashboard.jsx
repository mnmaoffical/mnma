import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchadminproduct } from "../redux/slices/adminproductslice";
import { fetchallorders } from "../redux/slices/adminorderslice";
import { useTranslation } from "react-i18next";

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.adminproduct || {});
  const { orders = [], totalorders = 0, totalsales = 0, loading } = useSelector(
    (state) => state.adminorders || {}
  );

  useEffect(() => {
    dispatch(fetchadminproduct());
    dispatch(fetchallorders());
  }, [dispatch]);

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount.toFixed(2)}`;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{t('admin.dashboard.title')}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">{t('admin.dashboard.revenue')}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{formatPrice(totalsales)}</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">{t('admin.dashboard.totalOrders')}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
          <Link to="/admin/orders" className="text-blue-600 text-sm mt-2 hover:underline inline-block font-medium">
            {t('admin.dashboard.manageOrders')}
          </Link>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-700">{t('admin.dashboard.totalProducts')}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
          <Link to="/admin/products" className="text-blue-600 text-sm mt-2 hover:underline inline-block font-medium">
            {t('admin.dashboard.manageProducts')}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t('admin.dashboard.recentOrders')}</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-gray-500">{t('admin.dashboard.loading')}</p>
          ) : (
            <table className="w-full text-start min-w-[500px]">
              <thead className="bg-gray-50 text-start border-b border-gray-200">
                <tr>
                  <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600 text-start">{t('admin.dashboard.orderId')}</th>
                  <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600 text-start">{t('admin.dashboard.user')}</th>
                  <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600 text-start">{t('admin.dashboard.totalPrice')}</th>
                  <th className="p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600 text-start">{t('admin.dashboard.status')}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/80 transition">
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-mono whitespace-nowrap">{order._id}</td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm whitespace-nowrap">{order.user?.name || t('admin.dashboard.adminUser')}</td>
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium whitespace-nowrap">
                      {formatPrice(order.totalprice || order.totalPrice || 0)}
                    </td>
                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status || "Processing"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}