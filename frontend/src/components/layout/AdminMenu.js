import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkStyle =
    "block px-4 py-3 text-sm rounded-md transition";

  const activeStyle =
    "bg-black text-white";

  const inactiveStyle =
    "text-gray-600 hover:bg-gray-100";

  return (
    <div>

      {/* TITLE */}
      <h4 className="text-lg font-semibold mb-6 text-center">
        Admin Panel
      </h4>

      {/* MENU */}
      <div className="flex flex-col gap-2">

        <NavLink
          to="/dashboard/admin/create-category"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          📁 Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          ➕ Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          🛍️ Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          👥 Users
        </NavLink>

      </div>

    </div>
  );
};

export default AdminMenu;