import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
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
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
  <Layout>
    <div className="auth-container">
      <div className="auth-box row">

        <div className="col-md-6 left-panel d-none d-md-flex">
          <div className="left-content">
            <h3>Welcome Back</h3>
            <p>Login to continue your journey</p>
          </div>
        </div>

        <div className="col-md-6 right-panel">
          <form onSubmit={handleSubmit}>
            <h2 className="auth-title">Login</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              className="forgot-btn"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>

            <button type="submit" className="btn-auth">
              Login
            </button>
          </form>
        </div>

      </div>
    </div>
  </Layout>
);
}
export default Login;
