import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallorders,
  updateorderstatus,
  deleteorder,
} from "../redux/slices/adminorderslice";
import { useTranslation } from "react-i18next";

export default function OrderManagement() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const dispatch = useDispatch();

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
    if (window.confirm(t('admin.orders.deleteConfirm'))) {
      dispatch(deleteorder(id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount}`;
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.orders.title')}</h1>
        </div>

        {error && <div className="p-4 text-red-600">{error}</div>}
        {loading && <div className="p-4 text-gray-500">{t('admin.orders.loading')}</div>}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-start">
              <tr>
                <th className="text-start p-4">{t('admin.orders.orderId')}</th>
                <th className="text-start p-4">{t('admin.orders.customer')}</th>
                <th className="text-start p-4">{t('admin.orders.totalPrice')}</th>
                  <th className="text-start p-4">{t('admin.orders.address')}</th>
                <th className="text-start p-4">{t('admin.orders.status')}</th>
                <th className="text-center p-4">{t('admin.orders.actions')}</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4 font-medium font-mono">{order._id}</td>
                  <td className="p-4">{order.user?.name || t('admin.orders.unknown')}</td>
                  <td className="p-4 font-semibold">
                    {formatPrice(order.totalprice || order.totalPrice || 0)}
                  </td>
                  <td className="p-4">{order.shippingaddress?.address || t('admin.orders.noAddress')}</td>
                  <td className="p-4">
                    <select
                      value={order.status || "Processing"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`border rounded-lg px-3 py-2 text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value="Processing">{t('admin.orders.statuses.processing')}</option>
                      <option value="Shipped">{t('admin.orders.statuses.shipped')}</option>
                      <option value="Delivered">{t('admin.orders.statuses.delivered')}</option>
                      <option value="Cancelled">{t('admin.orders.statuses.cancelled')}</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
                    >
                      {t('admin.orders.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}