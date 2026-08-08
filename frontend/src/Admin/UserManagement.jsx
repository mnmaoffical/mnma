import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchusers, adduser, updateuser, deleteuser } from "../redux/slices/adminslice";

export default function UserManagement() {
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
      alert("Please fill all fields");
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
        
        setFormData({ name: "", email: "", password: "", role: "Customer" });
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
        
        setFormData({ name: "", email: "", password: "", role: "Customer" });
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
    setFormData({ name: "", email: "", password: "", role: "Customer" });
    setEditMode(false);
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={() => dispatch(fetchusers())}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Add User Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Edit User" : "Add New User"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
              disabled={loading || editMode}
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border p-3 rounded-lg"
              disabled={loading}
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              
            </select>

            <div className="flex gap-3">
              <button 
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Processing..." : editMode ? "Update User" : "Add User"}
              </button>
              
              {editMode && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* User List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">
              User List
            </h2>
          </div>

          {loading && !editMode && (
            <div className="p-4 text-center text-gray-500">
              Loading users...
            </div>
          )}

          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && !loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-medium">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.role}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg disabled:bg-gray-400"
                          disabled={loading}
                        >
                          <Edit size={18} />
                        </button>

                        <button 
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg disabled:bg-gray-400"
                          disabled={loading}
                        >
                          <Trash2 size={18} />
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