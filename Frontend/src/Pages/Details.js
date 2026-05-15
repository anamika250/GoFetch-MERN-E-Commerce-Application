import { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { dataContext } from "../App";
import useFetchProductDetails from "../hooks/useFetchProductDetails";
import useCart from "../hooks/useCart";

function Details() {
  const [params] = useSearchParams();
  const prodid = params.get("pid");
  const [qty, setqty] = useState("");
  const { addToCart } = useCart(false);

  const navigate = useNavigate();

  const { udata } = useContext(dataContext);

  const { product: prodinfo, loading, error } = useFetchProductDetails(prodid);

  // STOCK

  const availstock = Array.from(
    {
      length: Math.min(prodinfo.stock || 0, 10),
    },
    (_, i) => i + 1,
  );

  // DISCOUNT PRICE

  const remcost = prodinfo.rate
    ? Math.round(prodinfo.rate - (prodinfo.rate * prodinfo.discount) / 100)
    : 0;

  // ADD TO CART

  async function handleSubmit(e) {
    e.preventDefault();

    if (!qty) {
      return toast.warn("Please select quantity");
    }

    if (!udata) {
      toast.warn("Login required");

      return navigate("/login", {
        state: {
          from: window.location.pathname + window.location.search,
        },
      });
    }

    const success = await addToCart(prodid, Number(qty));

    if (success) {
      navigate("/showcart");
    }
  }

  // ERROR PAGE

  if (error) {
    return (
      <div className="details-error">
        <img
          src={`${process.env.REACT_APP_APIURL}/uploads/Errorimg.png`}
          alt="error"
        />

        <h2>Product Not Found</h2>

        <p>Invalid product or something went wrong.</p>

        <button onClick={() => navigate("/homepage")}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}

      <section className="details-hero">
        <div className="details-hero-overlay">
          <span className="details-badge">Product Details</span>

          <h1>
            Fresh groceries
            <br />
            for your daily needs
          </h1>
        </div>
      </section>

      {/* PRODUCT */}

      <section className="details-section">
        <div className="container">
          <div className="details-card">
            {/* IMAGE */}

            <div className="details-image">
              <img
                src={`${process.env.REACT_APP_APIURL}/uploads/${
                  prodinfo.picname || "defaultpic.jpg"
                }`}
                alt={prodinfo.prodname}
              />
            </div>

            {/* CONTENT */}

            <div className="details-content">
              <span className="stock-badge">In Stock: {prodinfo.stock}</span>

              <h2>{prodinfo.prodname}</h2>

              {/* PRICE */}

              <div className="details-price-row">
                <h3>₹{remcost}</h3>

                {prodinfo.discount > 0 && (
                  <span className="discount-pill">
                    {prodinfo.discount}% OFF
                  </span>
                )}
              </div>

              {prodinfo.discount > 0 && (
                <p className="old-price">₹{prodinfo.rate}</p>
              )}

              {/* DESCRIPTION */}

              <p className="details-description">{prodinfo.description}</p>

              {/* QUANTITY */}

              {availstock.length > 0 ? (
                <form onSubmit={handleSubmit} className="details-form">
                  <select value={qty} onChange={(e) => setqty(e.target.value)}>
                    <option value="">Choose Quantity</option>

                    {availstock.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>

                  <button type="submit">Add to Cart</button>
                </form>
              ) : (
                <h3 className="out-stock">Out of stock</h3>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Details;
