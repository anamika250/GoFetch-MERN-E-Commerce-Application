import { Link, useSearchParams } from "react-router-dom";
import useFetchSubcategories from "../hooks/useFetchSubcategories";

function SubCategories() {
  const [params] = useSearchParams();

  const catid = params.get("cid");
  const { subcategories: subcatdata, loading } = useFetchSubcategories(catid);

  return (
    <>
      {/* HERO */}

      <section className="subcat-hero">
        <div className="subcat-overlay">
          <span className="subcat-badge">Explore Subcategories</span>

          <h1>
            Find products
            <br />
            by collections
          </h1>

          <p>Browse grocery collections and discover fresh products.</p>
        </div>
      </section>

      {/* SUBCATEGORIES */}

      <section className="subcat-section">
        <div className="container">
          {loading ? (
            <div className="subcat-loading">
              <div className="subcat-loader"></div>

              <h2>Loading subcategories...</h2>
            </div>
          ) : subcatdata.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Sub Categories</h2>

                <p>{subcatdata.length} collections found</p>
              </div>

              {/* GRID */}

              <div className="subcat-grid">
                {subcatdata.map((data) => (
                  <Link
                    to={`/products?scid=${data._id}`}
                    className="subcat-card"
                    key={data._id}
                  >
                    {/* IMAGE */}

                    <div className="subcat-image">
                      <img
                        src={`${process.env.REACT_APP_APIURL}/uploads/${
                          data.picname || "defaultpic.jpg"
                        }`}
                        alt={data.subcatname}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="subcat-content">
                      <h3>{data.subcatname}</h3>

                      <span>Explore Products →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-subcat">
              <img
                src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTFqMGl0cnhhOHp1MTk5dnRpMmV0OXlreWo2bHZjanVyeDl5Y244diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Km2YiI2mzRKgw/giphy.gif"
                alt="No Subcategories"
              />

              <h2>No subcategories found</h2>

              <p>There are no collections available right now.</p>

              <Link to="/categories" className="browse-subcat-btn">
                Browse Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SubCategories;
