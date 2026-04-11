import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>

      <h4
        style={{
          color: "#E6C07B",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Admin Panel
      </h4>

      <div className="d-flex flex-column gap-2">

        <NavLink
          to="/dashboard/admin/create-category"
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
          📁 Create Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-product"
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
          ➕ Create Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/products"
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
          🛍️ Products
        </NavLink>

        <NavLink
          to="/dashboard/admin/users"
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
          👥 Users
        </NavLink>

      </div>
    </div>
  );
};

export default AdminMenu;