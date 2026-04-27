import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter category name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border border-gray-300 px-4 py-2.5 rounded-md text-sm outline-none focus:ring-1 focus:ring-black bg-white text-black"
      />

      {/* BUTTON */}
      <button
        type="submit"
        className="bg-black text-white px-5 py-2.5 text-sm rounded-md hover:bg-gray-800 transition whitespace-nowrap"
      >
        {value ? "Save Category" : "Create Category"}
      </button>

    </form>
  );
};

export default CategoryForm;