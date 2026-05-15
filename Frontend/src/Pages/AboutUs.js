import { Link } from "react-router-dom";

function Aboutus() {
  return (
    <>
      {/* HERO */}

      <section className="about-hero">
        <div className="about-overlay">
          <span className="about-badge">About GoFetch</span>

          <h1>
            Fresh groceries
            <br />
            delivered faster
          </h1>

          <p>
            GoFetch is your modern grocery platform designed to make shopping
            simple, fast and enjoyable for every household.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* IMAGE */}

            <div className="about-image">
              <img
                src="/images/shop.jpg"
                alt="about"
              />
            </div>

            {/* CONTENT */}

            <div className="about-content">
              <span className="section-tag">Who We Are</span>

              <h2>Grocery shopping made modern</h2>

              <p>
                At GoFetch, we believe grocery shopping should be smooth,
                affordable and accessible. We bring fresh products, categories
                and daily essentials directly to your doorstep with an easy
                shopping experience.
              </p>

              <p>
                Our mission is to combine convenience, technology and quality
                into one platform that customers can trust every day.
              </p>

              <Link to="/categories" className="about-btn">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="about-features">
        <div className="container">
          <div className="about-heading">
            <span className="section-tag">Why Choose Us</span>

            <h2>Built for modern grocery shopping</h2>
          </div>

          <div className="features-grid">
            {/* CARD */}

            <div className="feature-card">
              <div className="feature-icon">🥬</div>

              <h3>Fresh Products</h3>

              <p>Carefully selected groceries and fresh items every day.</p>
            </div>

            {/* CARD */}

            <div className="feature-card">
              <div className="feature-icon">🚚</div>

              <h3>Fast Delivery</h3>

              <p>Quick doorstep delivery with secure packaging.</p>
            </div>

            {/* CARD */}

            <div className="feature-card">
              <div className="feature-icon">💳</div>

              <h3>Easy Payments</h3>

              <p>Smooth checkout experience with multiple payment methods.</p>
            </div>

            {/* CARD */}

            <div className="feature-card">
              <div className="feature-icon">⭐</div>

              <h3>Trusted Service</h3>

              <p>Thousands of happy customers trust GoFetch daily.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h2>10K+</h2>
              <p>Happy Customers</p>
            </div>

            <div className="stat-card">
              <h2>500+</h2>
              <p>Products Available</p>
            </div>

            <div className="stat-card">
              <h2>24/7</h2>
              <p>Customer Support</p>
            </div>

            <div className="stat-card">
              <h2>99%</h2>
              <p>Delivery Success</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
