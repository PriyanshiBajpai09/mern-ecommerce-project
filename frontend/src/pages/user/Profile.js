import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const user = auth?.user;
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });

        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

        toast.success("Profile Updated Successfully");
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
              <UserMenu />
            </div>
          </div>

          <div className="col-md-9 d-flex justify-content-center">
            <div
              style={{
                width: "100%",
                maxWidth: "500px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                borderRadius: "20px",
                padding: "30px",
                color: "#F6FAFD",
                boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
              }}
            >
              <h3
                style={{
                  color: "#E6C07B",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                Update Profile
              </h3>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="form-control mb-3"
                  style={inputStyle}
                />

                <input
                  type="email"
                  value={email}
                  disabled
                  className="form-control mb-3"
                  style={{ ...inputStyle, opacity: 0.6 }}
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="form-control mb-3"
                  style={inputStyle}
                />

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
                  className="form-control mb-3"
                  style={inputStyle}
                />

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="form-control mb-3"
                  style={inputStyle}
                />

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    background: "linear-gradient(90deg, #1A3D63, #4A7FA7)",
                    color: "white",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  Update Profile
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const inputStyle = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  borderRadius: "10px",
};

export default Profile;