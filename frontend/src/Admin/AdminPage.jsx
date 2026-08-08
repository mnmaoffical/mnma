import React from "react";
import logo from "../assets/mnma_logo.png";
import { toast } from "sonner";
import {
  Users,
  Package,
  ClipboardList,
  Store,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#071127] text-white flex flex-col">
        
        {/* Logo */}
        <img
          src={logo}
          alt="MNMA Logo"
          className="h-12 w-12 rounded-full object-cover mx-auto mt-4 mb-6"
        />

        {/* Title */}
        <div className="px-6 mb-6">
          <h2 className="text-xl font-medium">Admin Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="space-y-3">
              <li>
              <NavLink
                to="/admin/dashBoard"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800"
              >
                <Users size={18} />
                 DashBoard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800"
              >
                <Users size={18} />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/products"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800"
              >
                <Package size={18} />
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orders"
                className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800"
              >
                <ClipboardList size={18} />
                Orders
              </NavLink>
            </li>

            <li>
            
            </li>
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
  onClick={() => {
     const confirmLogout = window.confirm(
         "Are you sure you want to logout?"
     );
      if(confirmLogout){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
      toast.success("Logged out successfully!");
          setTimeout(() => {
        navigate("/");
      }, 1000);
  }}
}
  className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-md flex items-center justify-center gap-2"
>
  <LogOut size={18} />
  Logout
</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}