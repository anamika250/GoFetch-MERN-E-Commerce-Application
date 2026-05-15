import { Link, useSearchParams } from "react-router-dom";
import useFetchFeaturedProducts from "../hooks/useFetchFeaturedProducts";
import useFetchProductsBySubcat from "../hooks/useFetchProductsBySubcat";

function Products() {
  const [params] = useSearchParams();

  const scatid = params.get("scid");

  const { products: subcatProducts, loading } =
    useFetchProductsBySubcat(scatid);

  const { products: featuredProducts } = useFetchFeaturedProducts();

  const prodsdata = scatid ? subcatProducts : featuredProducts;

  return (
    <>
      {/* HERO */}

      <section className="products-hero">
        <div className="products-overlay">
          <span className="products-badge">Fresh Products</span>

          <h1>
            Discover fresh
            <br />
            groceries daily
          </h1>

          <p>
            Shop premium fruits, vegetables, snacks and essentials at the best
            prices.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}

      <section className="products-section">
        <div className="container">
          {loading ? (
            <div className="products-loading">
              <div className="products-loader"></div>

              <h2>Loading products...</h2>
            </div>
          ) : prodsdata.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Available Products</h2>

                <p>{prodsdata.length} products found</p>
              </div>

              {/* GRID */}

              <div className="products-grid">
                {prodsdata.map((data) => {
                  const discountedPrice =
                    data.discount > 0
                      ? Math.round(
                          data.rate - (data.rate * data.discount) / 100,
                        )
                      : data.rate;

                  return (
                    <div className="modern-product-card" key={data._id}>
                      {/* IMAGE */}

                      <div className="modern-product-image">
                        <Link to={`/details?pid=${data._id}`}>
                          <img
                            src={`${process.env.REACT_APP_APIURL}/uploads/${
                              data.picname || "defaultpic.jpg"
                            }`}
                            alt={data.prodname}
                          />
                        </Link>

                        {data.discount > 0 && (
                          <span className="modern-discount-badge">
                            {data.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* CONTENT */}

                      <div className="modern-product-content">
                        <h3>{data.prodname}</h3>

                        {/* PRICE */}

                        <div className="modern-price-row">
                          <h4>₹{discountedPrice}</h4>

                          {data.discount > 0 && (
                            <span className="old-product-price">
                              ₹{data.rate}
                            </span>
                          )}
                        </div>

                        {/* STOCK */}

                        {data.stock > 0 ? (
                          <span className="stock-status in-stock">
                            In Stock
                          </span>
                        ) : (
                          <span className="stock-status out-stock">
                            Out of Stock
                          </span>
                        )}

                        {/* BUTTON */}

                        <Link
                          to={`/details?pid=${data._id}`}
                          className="modern-product-btn"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="empty-products">
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWc3c3ZxMmt4amFuaWNmOWx5MWhnNHN6b2J5c240eHkyYTU4bmUwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FaFu1s2hO1xYHdpk6N/giphy.gif"
                alt="No Products"
              />

              <h2>No products found</h2>

              <p>This subcategory currently has no products available.</p>

              <Link to="/categories" className="browse-btn">
                Browse Categories
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Products;
