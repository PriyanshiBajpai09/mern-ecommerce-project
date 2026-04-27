import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data?.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error("Login failed 😢");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center pt-[90px] px-4">

        {/* CARD */}
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden flex">

          {/* LEFT */}
          <div className="hidden md:flex w-[45%] items-center justify-center bg-[#f4efe8] p-10">
            <div className="text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="login"
                className="w-[140px] mx-auto mb-4"
              />
              <p className="text-sm text-gray-500">
                Shop smarter with us
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-[55%] p-10 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-2 tracking-tight">
              Sign In
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Welcome back, login to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-gray-500 hover:text-black transition"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 text-sm rounded-md hover:bg-gray-800 transition"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="w-full border py-2.5 text-sm rounded-md hover:bg-gray-100 transition"
              >
                Create an account
              </button>

            </form>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Login;