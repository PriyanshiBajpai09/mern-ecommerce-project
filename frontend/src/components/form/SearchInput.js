import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.keyword.trim()) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );

      setValues({ ...values, results: data });
      navigate("/search");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm focus-within:shadow-md transition"
    >
      {/* INPUT */}
      <input
        type="search"
        placeholder="Search products..."
        value={values.keyword}
        onChange={(e) =>
          setValues({ ...values, keyword: e.target.value })
        }
        className="px-4 py-2 text-sm w-full outline-none bg-transparent"
      />

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 text-sm bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
};

export default SearchInput;