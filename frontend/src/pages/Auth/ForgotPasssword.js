import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data?.message);
        navigate("/login");
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Reset failed 😢");
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-box row">

          <div className="col-md-6 left-panel d-none d-md-flex">
            <div className="left-content">
              <h3>Reset Password</h3>
              <p>Securely update your account password</p>
            </div>
          </div>

          <div className="col-md-6 right-panel">
            <form onSubmit={handleSubmit}>
              <h2 className="auth-title">Reset Password</h2>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Your first school name?"
                required
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />

              <button type="submit" className="btn-auth">
                Reset Password
              </button>

              <p style={{ marginTop: "10px", color: "#ccc" }}>
                Remember your password?{" "}
                <span
                  style={{ color: "#E6C07B", cursor: "pointer" }}
                  onClick={() => navigate("/login")}
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

export default ForgotPasssword;