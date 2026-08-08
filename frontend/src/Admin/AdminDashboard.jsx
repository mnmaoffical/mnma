import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchadminproduct } from "../redux/slices/adminproductslice";
import { fetchallorders } from "../redux/slices/adminorderslice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.adminproduct || {});
  const { orders = [], totalorders = 0, totalsales = 0, loading } = useSelector(
    (state) => state.adminorders || {}
  );

  useEffect(() => {
    dispatch(fetchadminproduct());
    dispatch(fetchallorders());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold mt-2">AED {totalsales.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
          <Link to="/admin/orders" className="text-blue-500 text-sm mt-2 hover:underline">
            Manage Orders
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
          <Link to="/admin/products" className="text-blue-500 text-sm mt-2 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <p className="p-4">Loading orders...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-4 text-sm font-semibold">ORDER ID</th>
                  <th className="p-4 text-sm font-semibold">USER</th>
                  <th className="p-4 text-sm font-semibold">TOTAL PRICE</th>
                  <th className="p-4 text-sm font-semibold">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-4 text-sm">{order._id}</td>
                    <td className="p-4 text-sm">{order.user?.name || "Admin User"}</td>
                    <td className="p-4 text-sm font-medium">
                      AED {order.totalprice || order.totalPrice || 0}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
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