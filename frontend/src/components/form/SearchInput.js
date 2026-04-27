import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white"
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
        className="px-5 py-2 text-sm bg-black text-white hover:bg-gray-800 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;