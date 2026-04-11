import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0A1931, #1A3D63)",
        }}
      >
        <div className="row w-75 text-center">
          <h2 className="mb-4" style={{ color: "#E6C07B" }}>
            Explore Categories
          </h2>

          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <Link to={`/category/${c.slug}`} className="text-decoration-none">
                <div
                  className="p-4 rounded-4 shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    color: "#EAF4FF",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  <h5
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {c.name}
                  </h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
