import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { dataContext } from "../App";
import useOrders from "../hooks/useOrders";

function OrderSummary() {
  const { udata } = useContext(dataContext);
  const { orderSummary: orderData, loading, fetchOrderSummary } = useOrders();
  useEffect(() => {
    if (udata) {
      fetchOrderSummary();
    }
  }, [udata]);

  return (
    <>
      {/* HERO */}

      <section className="summary-hero">
        <div className="summary-overlay">
          <span className="summary-badge">Order Successful</span>

          <h1>
            Thank you for
            <br />
            shopping with us
          </h1>

          <p>Your grocery order has been placed successfully 🎉</p>
        </div>
      </section>

      {/* SUMMARY */}

      <section className="summary-section">
        <div className="container">
          {loading ? (
            <div className="summary-loading">
              <div className="summary-loader"></div>

              <h2>Loading order summary...</h2>
            </div>
          ) : orderData ? (
            <div className="summary-card">
              {/* SUCCESS ICON */}

              <div className="summary-success">✅</div>

              {/* TITLE */}

              <h2>Order Confirmed</h2>

              <p className="summary-text">
                Thanks for shopping with GoFetch. Your order has been received.
              </p>

              {/* ORDER INFO */}

              <div className="summary-info">
                <div className="summary-row">
                  <span>Order ID</span>

                  <strong>#{orderData._id}</strong>
                </div>

                <div className="summary-row">
                  <span>Total Amount</span>

                  <strong className="summary-price">
                    ₹{orderData.billamt}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Payment Mode</span>

                  <strong>{orderData.pmode}</strong>
                </div>

                <div className="summary-row">
                  <span>Order Status</span>

                  <strong
                    className={`summary-status ${orderData.status?.toLowerCase()}`}
                  >
                    {orderData.status}
                  </strong>
                </div>
              </div>

              {/* ADDRESS */}

              <div className="summary-address">
                <span>Delivery Address</span>

                <p>{orderData.address}</p>
              </div>

              {/* ACTIONS */}

              <div className="summary-actions">
                <Link to="/orderhistory" className="summary-btn">
                  View Orders
                </Link>

                <Link to="/homepage" className="summary-btn secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="summary-empty">
              <img src="/images/empty-cart.png" alt="No Order" />

              <h2>No order found</h2>

              <p>Looks like you have not placed an order yet.</p>

              <Link to="/homepage" className="summary-btn">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderSummary;
