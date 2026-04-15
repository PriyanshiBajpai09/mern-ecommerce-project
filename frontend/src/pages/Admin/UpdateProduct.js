import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );

      const p = data?.product;

      setName(p?.name);
      setId(p?._id);
      setDescription(p?.description);
      setPrice(p?.price);
      setQuantity(p?.quantity);
      setShipping(p?.shipping ? "1" : "0");
      setCategory(p?.category?._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) setCategories(data?.category);
    } catch {
      toast.error("Error fetching category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();

      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      if (photo) productData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated");
        navigate("/dashboard/admin/products");
      }
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted");
      navigate("/dashboard/admin/products");
    } catch {
      toast.error("Delete failed");
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
              Update Product
            </h2>

            <form style={{ maxWidth: "600px" }}>

              <select
                className="form-select mb-3 custom-select-dark"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
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
                    hidden
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </label>
              </div>

              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`
                  }
                  height="200"
                  style={{ borderRadius: "10px" }}
                  alt="product"
                />
              </div>

              <input
                type="text"
                className="form-control mb-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />

              <textarea
                className="form-control mb-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

              <input
                type="number"
                className="form-control mb-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

              <input
                type="number"
                className="form-control mb-3"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />

              <select
                className="form-select mb-3 custom-select-dark"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="">Shipping?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              <button
                className="btn w-100 mb-2"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>

              <button
                className="btn w-100"
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>

            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;