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
      className="d-flex align-items-center"
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        placeholder="Search products..."
        value={values.keyword}
        onChange={(e) =>
          setValues({ ...values, keyword: e.target.value })
        }
        style={{
          padding: "8px 12px",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "#F6FAFD",
          outline: "none",
          marginRight: "8px",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "8px 15px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
          color: "white",
          fontWeight: "500",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;