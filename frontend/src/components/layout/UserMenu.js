import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>

      <h4
        style={{
          color: "#E6C07B",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Dashboard
      </h4>

      <div className="d-flex flex-column gap-2">

        <NavLink
          to="/dashboard/user/profile"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "12px",
            borderRadius: "10px",
            background: isActive
              ? "linear-gradient(90deg, #1A3D63, #4A7FA7)"
              : "rgba(255,255,255,0.05)",
            color: "#F6FAFD",
            transition: "0.3s",
          })}
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/dashboard/user/orders"
          style={({ isActive }) => ({
            textDecoration: "none",
            padding: "12px",
            borderRadius: "10px",
            background: isActive
              ? "linear-gradient(90deg, #1A3D63, #4A7FA7)"
              : "rgba(255,255,255,0.05)",
            color: "#F6FAFD",
            transition: "0.3s",
          })}
        >
          📦 Orders
        </NavLink>

      </div>
    </div>
  );
};

export default UserMenu;