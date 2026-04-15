import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div
        className="container-fluid py-4"
        style={{
          background: "linear-gradient(135deg, #0A1931, #1A3D63)",
          minHeight: "100vh",
        }}
      >
        <div className="row">
          <div className="col-md-3 mb-3">
            <div
              style={{
                background: "rgba(74,127,167,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "20px",
                color: "#EAF4FF",
              }}
            >
              <AdminMenu />
            </div>
          </div>

          <div className="col-md-9">
            <h2 style={{ color: "#E6C07B", marginBottom: "20px" }}>
              Create Product
            </h2>

            <form onSubmit={handleCreate}>
              <select
                className="form-select mb-3 custom-select-dark"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="mb-3">
                <label className="btn btn-secondary w-100">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <input
                type="text"
                placeholder="Product Name"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
              />

              <textarea
                placeholder="Description"
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
              />

              <input
                type="number"
                placeholder="Price"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
              />

              <input
                type="number"
                placeholder="Quantity"
                className="form-control mb-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ background: "rgba(255,255,255,0.08)", color: "white" }}
              />

              <select
                className="form-select mb-3 custom-select-dark"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <option value="">Shipping?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;