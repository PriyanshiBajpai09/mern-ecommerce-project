import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #0A1931, #1A3D63)",
      }}
    >
      <div
        className="spinner-border"
        style={{ color: "#E6C07B", width: "3rem", height: "3rem" }}
      ></div>
    </div>
  );
};

export default Spinner;