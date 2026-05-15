import { Link, useSearchParams } from "react-router-dom";
import useSearchProducts from "../hooks/useSearchProducts";

function SearchResults() {
  const [params] = useSearchParams();
  const stext = params.get("s");
  const { products: prodsdata, loading } = useSearchProducts(stext);

  return (
    <>
      {/* HERO */}

      <section className="search-hero">
        <div className="search-hero-overlay">
          <span className="search-badge">Search Products</span>

          <h1>
            Find your favorite
            <br />
            groceries instantly
          </h1>

          <p>Search fresh fruits, vegetables, snacks and daily essentials.</p>
        </div>
      </section>

      {/* SEARCH RESULTS */}

      <section className="search-results-section">
        <div className="container">
          {!stext ? (
            <div className="empty-state">
              <h2>Search for products</h2>

              <p>Try searching fruits, vegetables or snacks.</p>
            </div>
          ) : loading ? (
            <div className="empty-state">
              <h2>Searching...</h2>
            </div>
          ) : prodsdata.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Results for "{stext}"</h2>

                <p>{prodsdata.length} products found</p>
              </div>

              <div className="products-grid">
                {prodsdata.map((data) => (
                  <div className="product-card" key={data._id}>
                    <Link to={`/details?pid=${data._id}`}>
                      <img
                        src={`${process.env.REACT_APP_APIURL}/uploads/${data.picname}`}
                        alt={data.prodname}
                      />
                    </Link>

                    <h3>{data.prodname}</h3>

                    <div className="product-price">₹{data.rate}</div>

                    {data.discount > 0 && (
                      <span className="discount-badge">
                        {data.discount}% OFF
                      </span>
                    )}

                    <Link
                      to={`/details?pid=${data._id}`}
                      className="product-btn"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>No products found</h2>

              <p>Try another search keyword.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SearchResults;
