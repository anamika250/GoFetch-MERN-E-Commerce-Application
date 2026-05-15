import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import useCart from "../hooks/useCart";

function ShowCart() {
  const { udata } = useContext(dataContext);

  const navigate = useNavigate();
  const { cartdata, carttotal, loading, deleteCartItem } = useCart(
    udata ? true : false,
  );

  // CHECKOUT

  function handlecheckout() {
    sessionStorage.setItem("gtotal", carttotal);

    navigate("/checkout");
  }

  return (
    <>
      <section className="cart-page">
        <section className="cart-hero">
          <div className="cart-overlay">
            <span className="cart-badge">GOFETCH CART</span>

            <h1>Your Shopping Cart</h1>

            <p>Review your products and proceed to checkout</p>
          </div>
        </section>
        <div className="container">
          {loading ? (
            <div className="cart-loading">
              <h2>Loading cart...</h2>
            </div>
          ) : cartdata.length > 0 ? (
            <>
              <div className="cart-container">
                {cartdata.map((item) => (
                  <div className="cart-row" key={item._id}>
                    {/* IMAGE */}

                    <div className="cart-left">
                      <img
                        src={`${process.env.REACT_APP_APIURL}/uploads/${
                          item.picname || "defaultpic.jpg"
                        }`}
                        alt={item.prodname}
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="cart-middle">
                      <h3>{item.prodname}</h3>

                      <p>Price: ₹{item.rate}</p>

                      <span>Qty: {item.qty}</span>
                    </div>

                    {/* RIGHT */}

                    <div className="cart-right">
                      <h2>₹{Number(item.tcost).toFixed(2)}</h2>

                      <button
                        className="remove-btn"
                        onClick={() => deleteCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SUMMARY */}

              <div className="cart-summary">
                <div>
                  <p>Grand Total</p>

                  <h1>₹{carttotal.toFixed(2)}</h1>
                </div>

                <button className="checkout-btn" onClick={handlecheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            <div className="empty-cart">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="empty"
              />

              <h2>Your cart is empty</h2>

              <p>Add products to continue shopping</p>

              <Link to="/categories" className="shop-btn">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ShowCart;
