import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers, adduser, updateuser, deleteuser } from "../redux/slices/adminslice";
import { useTranslation } from "react-i18next";

export default function UserManagement() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users = [], loading, error } = useSelector((state) => state.admin);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchusers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || (!editMode && !formData.password) || !formData.role) {
      alert(t('admin.users.fillAll'));
      return;
    }

    if (editMode) {
      try {
        await dispatch(updateuser({
          id: editingUserId,
          name: formData.name,
          email: formData.email,
          role: formData.role
        })).unwrap();
        
        setFormData({ name: "", email: "", password: "", role: "customer" });
        setEditMode(false);
        setEditingUserId(null);
      } catch (err) {
        console.error("Update failed:", err);
      }
    } else {
      try {
        const userdata = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        };
        
        await dispatch(adduser(userdata)).unwrap();
        
        setFormData({ name: "", email: "", password: "", role: "customer" });
      } catch (err) {
        console.error("Add failed:", err);
      }
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role
    });
    setEditMode(true);
    setEditingUserId(user._id);
  };

  const handleDelete = async (userId) => {
    try {
      await dispatch(deleteuser(userId)).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", password: "", role: "customer" });
    setEditMode(false);
    setEditingUserId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex flex-wrap items-center justify-between gap-2">
          <span>⚠️ {error}</span>
          <button
            onClick={() => dispatch(fetchusers())}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
          >
            {t('admin.users.retry')}
          </button>
        </div>
      )}

      {/* Add User Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          {t('admin.users.title')}
        </h1>

        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700">
          {editMode ? t('admin.users.editUser') : t('admin.users.addUser')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('admin.users.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('admin.users.namePlaceholder')}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('admin.users.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('admin.users.emailPlaceholder')}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('admin.users.passwordPlaceholder')}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={t('admin.users.passwordPlaceholder')}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                disabled={loading || editMode}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">{t('admin.users.role')}</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2.5 sm:p-3 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                disabled={loading}
              >
                <option value="customer">{t('admin.users.customer')}</option>
                <option value="admin">{t('admin.users.admin')}</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 sm:py-3 rounded-lg disabled:bg-gray-400 font-medium transition"
              disabled={loading}
            >
              {loading ? t('admin.users.processing') : editMode ? t('admin.users.updateUser') : t('admin.users.addUser_btn')}
            </button>
            
            {editMode && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 sm:py-3 rounded-lg font-medium transition"
              >
                {t('admin.users.cancel')}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* User List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {t('admin.users.userList')}
          </h2>
        </div>

        {loading && !editMode && (
          <div className="p-4 text-center text-gray-500">
            {t('admin.users.loading')}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-start min-w-[640px]">
            <thead className="bg-gray-50 text-start border-b border-gray-200">
              <tr>
                <th className="text-start p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600">{t('admin.users.name')}</th>
                <th className="text-start p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600">{t('admin.users.email')}</th>
                <th className="text-start p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600">{t('admin.users.role')}</th>
                <th className="text-start p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600">{t('admin.users.status')}</th>
                <th className="text-center p-3 sm:p-4 text-xs sm:text-sm font-semibold text-gray-600">{t('admin.users.actions')}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    {t('admin.users.noUsers')}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/80 transition"
                  >
                    <td className="p-3 sm:p-4 text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">
                      {user.name}
                    </td>

                    <td className="p-3 sm:p-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="p-3 sm:p-4 text-xs sm:text-sm capitalize whitespace-nowrap">
                      {user.role === 'admin' ? t('admin.users.admin') : t('admin.users.customer')}
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status || "Active"}
                      </span>
                    </td>

                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:bg-gray-400 transition"
                          title="Edit User"
                          disabled={loading}
                        >
                          <Edit size={16} />
                        </button>

                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg disabled:bg-gray-400 transition"
                          title="Delete User"
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}