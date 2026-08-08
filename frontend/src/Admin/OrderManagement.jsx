import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchallorders,
  updateorderstatus,
  deleteorder,
} from "../redux/slices/adminorderslice";

export default function OrderManagement() {
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
    if (window.confirm("Delete this order?")) {
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

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
        </div>

        {error && <div className="p-4 text-red-600">{error}</div>}
        {loading && <div className="p-4">Loading orders...</div>}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">ORDER ID</th>
                <th className="text-left p-4">CUSTOMER</th>
                <th className="text-left p-4">TOTAL PRICE</th>
                <th className="text-left p-4">STATUS</th>
                <th className="text-center p-4">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{order._id}</td>
                  <td className="p-4">{order.user?.name || "Unknown"}</td>
                  <td className="p-4 font-semibold">
                    AED {order.totalprice || order.totalPrice || 0}
                  </td>
                  <td className="p-4">
                    <select
                   value={order.status || "Processing"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`border rounded-lg px-3 py-2 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                    >
                      Delete
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