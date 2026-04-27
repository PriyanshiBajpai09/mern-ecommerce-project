import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
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
        Dashboard
      </h4>

      {/* MENU */}
      <div className="flex flex-col gap-2">

        <NavLink
          to="/dashboard/user/profile"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
          className={({ isActive }) =>
            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          📦 Orders
        </NavLink>

      </div>

    </div>
  );
};

export default UserMenu;