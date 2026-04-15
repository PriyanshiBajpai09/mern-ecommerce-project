import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

 
  const removeCartItem = (pid) => {
    let updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="container py-4">

        <div className="text-center mb-4">
          <h2 style={{ color: "#E6C07B" }}>
            Hello {auth?.user?.name || "Guest"}
          </h2>
          <p style={{ color: "#cbd5e1" }}>
            {cart?.length
              ? `You have ${cart.length} items in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div
                key={p._id}
                className="d-flex mb-3 p-3 rounded-4 shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  color: "#EAF4FF",
                }}
              >
                <div className="me-3">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="flex-grow-1">
                  <h5>{p.name}</h5>
                  <p style={{ fontSize: "14px" }}>
                    {p.description.substring(0, 50)}...
                  </p>
                  <p style={{ color: "#E6C07B" }}>$ {p.price}</p>
                </div>

                <div>
                  <button
                    className="btn btn-sm"
                    style={{
                      background: "#0A1931",
                      border: "1px solid #4A7FA7",
                      color: "white",
                    }}
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div
              className="p-4 rounded-4 shadow-lg"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                color: "#EAF4FF",
              }}
            >
              <h4 style={{ color: "#E6C07B" }}>Cart Summary</h4>

              <hr />

              <h5>Total: {totalPrice()}</h5>

              {auth?.user?.address ? (
                <>
                  <p className="mt-3">
                    <strong>Address:</strong>
                  </p>
                  <p>{auth?.user?.address}</p>

                  <button
                    className="btn w-100 mt-2"
                    style={{
                      background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                      color: "white",
                    }}
                    onClick={() =>
                      navigate("/dashboard/user/profile")
                    }
                  >
                    Update Address
                  </button>
                </>
              ) : auth?.token ? (
                <button
                  className="btn w-100 mt-3"
                  style={{
                    background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                    color: "white",
                  }}
                  onClick={() =>
                    navigate("/dashboard/user/profile")
                  }
                >
                  Add Address
                </button>
              ) : (
                <button
                  className="btn w-100 mt-3"
                  style={{
                    background: "#E6C07B",
                    color: "black",
                  }}
                  onClick={() =>
                    navigate("/login", { state: "/cart" })
                  }
                >
                  Login to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;