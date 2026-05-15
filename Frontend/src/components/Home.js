import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useFetchCategories from "../hooks/useFetchCategories";
import useFetchFeaturedProducts from "../hooks/useFetchFeaturedProducts";

const heroImages = ["/images/11.jpg", "/images/22.jpg", "/images/44.jpg"];

function Home() {
  const { allcat } = useFetchCategories();
  const scrollRef = useRef();
  const [currentImage, setCurrentImage] = useState(0);
  const { products, loading } = useFetchFeaturedProducts();

  useEffect(() => {
    document.title = "GoFetch | Home";
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  // CHANGE HERO IMAGE EVERY 2 SECONDS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    heroImages.forEach((img) => {
      const image = new Image();

      image.src = img;
    });
  }, []);

  return (
    <>
      {/* HERO SECTION */}

      <section
        className="hero"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.55),
              rgba(0,0,0,0.55)
            ),
            url(${heroImages[currentImage]})
          `,
        }}
      >
        <div className="hero-overlay">
          <span className="hero-badge">Fresh Grocery Delivered</span>

          <h1>
            We bring the store
            <br />
            to your door
          </h1>

          <p>
            Fresh groceries, vegetables, fruits and daily essentials delivered
            quickly and safely.
          </p>

          <div className="hero-buttons">
            <Link to="/categories" className="hero-btn">
              Shop Now
            </Link>

            <Link to="/products" className="hero-btn-outline">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}

      <section className="home-categories">
        <div className="container">
          <div className="home-cat-heading">
            <span>SHOP BY CATEGORY</span>

            <h2>Find Everything You Need</h2>
          </div>

          <div className="category-wrapper">
            <button className="scroll-btn left" onClick={scrollLeft}>
              ❮
            </button>

            <div className="category-scroll" ref={scrollRef}>
              {allcat.map((cat) => (
                <Link
                  to={`/subcategories?cid=${cat._id}`}
                  className="category-item"
                  key={cat._id}
                >
                  <div className="category-image">
                    <img
                      src={`${process.env.REACT_APP_APIURL}/uploads/${cat.picname}`}
                      alt={cat.catname}
                    />
                  </div>

                  <p title={cat.catname}>{cat.catname}</p>
                </Link>
              ))}
            </div>

            <button className="scroll-btn right" onClick={scrollRight}>
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}

      <section className="products-section">
        <div className="container">
          <div className="section-title">
            <h2>Featured Products</h2>

            <p>Popular products this week</p>
          </div>

          {loading ? (
            <h2 className="loading-text">Loading products...</h2>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map((data) => (
                <div className="product-card" key={data._id}>
                  <Link to={`/details?pid=${data._id}`}>
                    <img
                      src={`${process.env.REACT_APP_APIURL}/uploads/${
                        data.picname || "defaultpic.jpg"
                      }`}
                      alt={data.prodname}
                    />
                  </Link>

                  <h3>{data.prodname}</h3>

                  <Link to={`/details?pid=${data._id}`} className="product-btn">
                    View Product
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h2 className="loading-text">No products found</h2>
          )}
        </div>
      </section>

      {/* PROMO BANNER */}

      <section className="promo-banner">
        <div className="promo-content">
          <div>
            <h2>Get Fresh Groceries Delivered</h2>

            <p>Healthy products delivered directly to your doorstep.</p>
          </div>

          <Link to="/categories" className="promo-btn">
            Start Shopping
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
