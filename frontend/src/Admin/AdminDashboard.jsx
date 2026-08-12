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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">{t('admin.dashboard.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">{t('admin.dashboard.revenue')}</h3>
          <p className="text-3xl font-bold mt-2">{formatPrice(totalsales)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">{t('admin.dashboard.totalOrders')}</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
          <Link to="/admin/orders" className="text-blue-500 text-sm mt-2 hover:underline inline-block">
            {t('admin.dashboard.manageOrders')}
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">{t('admin.dashboard.totalProducts')}</h3>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
          <Link to="/admin/products" className="text-blue-500 text-sm mt-2 hover:underline inline-block">
            {t('admin.dashboard.manageProducts')}
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">{t('admin.dashboard.recentOrders')}</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4 text-gray-500">{t('admin.dashboard.loading')}</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 text-start">
                <tr>
                  <th className="p-4 text-sm font-semibold">{t('admin.dashboard.orderId')}</th>
                  <th className="p-4 text-sm font-semibold">{t('admin.dashboard.user')}</th>
                  <th className="p-4 text-sm font-semibold">{t('admin.dashboard.totalPrice')}</th>
                  <th className="p-4 text-sm font-semibold">{t('admin.dashboard.status')}</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4 text-sm font-mono">{order._id}</td>
                    <td className="p-4 text-sm">{order.user?.name || t('admin.dashboard.adminUser')}</td>
                    <td className="p-4 text-sm font-medium">
                      {formatPrice(order.totalprice || order.totalPrice || 0)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
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