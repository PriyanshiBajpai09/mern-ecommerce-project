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
    let total = 0;
    cart?.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    return total;
  };

  const removeCartItem = (pid) => {
    let updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (pid, type) => {
    const updatedCart = cart.map((item) => {
      if (item._id === pid) {
        if (type === "inc") {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        if (type === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="min-h-screen flex justify-center pt-[90px]">

        <div className="w-full max-w-6xl px-6 py-12">

          {/* TITLE */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-2">
              Home / Cart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* LEFT SIDE */}
            <div className="md:col-span-2 space-y-6">

              {cart?.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  🛒 Your cart is empty
                </div>
              ) : (
                cart?.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-5 rounded-xl border shadow-sm hover:shadow-md transition"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <button
                        onClick={() => removeCartItem(p._id)}
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ✕
                      </button>

                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-20 h-20 object-contain"
                      />

                      <div>
                        <h4 className="font-medium">{p.name}</h4>
                        <p className="text-sm text-gray-500">
                          {p.description?.substring(0, 40)}...
                        </p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <p className="text-sm font-medium">
                      ₹ {p.price}
                    </p>

                    {/* QUANTITY */}
                    <div className="flex items-center border rounded-md overflow-hidden">

                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(p._id, "dec")}
                      >
                        -
                      </button>

                      <span className="px-4 text-sm">
                        {p.quantity || 1}
                      </span>

                      <button
                        className="px-3 py-1 hover:bg-gray-100"
                        onClick={() => updateQuantity(p._id, "inc")}
                      >
                        +
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border shadow-sm h-fit">

              <h3 className="text-xl font-semibold mb-6">
                Order Summary
              </h3>

              <div className="flex justify-between mb-3 text-sm">
                <span>Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span>Subtotal</span>
                <span>₹ {totalPrice()}</span>
              </div>

              <div className="flex justify-between mb-3 text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between mb-6 font-medium text-lg">
                <span>Total</span>
                <span>₹ {totalPrice()}</span>
              </div>

              <button
                className="w-full bg-black text-white py-3 text-sm tracking-wide rounded-md hover:bg-gray-800 transition"
                onClick={() =>
                  auth?.token
                    ? navigate("/checkout")
                    : navigate("/login", { state: "/cart" })
                }
              >
                {auth?.token
                  ? "Proceed to Checkout"
                  : "Login to Checkout"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default CartPage;