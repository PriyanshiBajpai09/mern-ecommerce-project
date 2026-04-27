import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );

      if (res && res.data.success) {
        toast.success(res.data?.message);
        navigate("/login");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      toast.error("Registration failed 😢");
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
                alt="register"
                className="w-[140px] mx-auto mb-4"
              />
              <p className="text-sm text-gray-500">
                Create your account today
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full md:w-[55%] p-10 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-2 tracking-tight">
              Create Account
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Join us and start your journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

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

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your first school name?"
                required
                className="w-full border px-4 py-2.5 rounded-md text-sm outline-none focus:border-black bg-white/70"
              />

              {/* REGISTER BTN */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2.5 text-sm rounded-md hover:bg-gray-800 transition"
              >
                Register
              </button>

              {/* LOGIN LINK */}
              <p className="text-sm text-gray-500 text-center mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-black font-medium cursor-pointer hover:underline"
                >
                  Login
                </span>
              </p>

            </form>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Register;