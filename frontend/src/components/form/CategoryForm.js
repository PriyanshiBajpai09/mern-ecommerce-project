import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="form-control"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#F6FAFD",
            borderRadius: "10px",
            padding: "10px",
          }}
        />
      </div>

      <button
        type="submit"
        className="btn w-100"
        style={{
          background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
          color: "white",
          borderRadius: "10px",
          padding: "10px",
          border: "none",
          fontWeight: "500",
        }}
      >
        {value ? "Save Category" : "Create Category"}
      </button>

    </form>
  );
};

export default CategoryForm;