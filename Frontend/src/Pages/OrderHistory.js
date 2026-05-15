import { Link } from "react-router-dom";
import { dataContext } from "../App";
import useOrders from "../hooks/useOrders";
import { useContext, useEffect } from "react";

function OrderHistory() {
  const { udata } = useContext(dataContext);
  const { orders: ordersdata, fetchUserOrders } = useOrders();
  useEffect(() => {
    if (udata) {
      fetchUserOrders();
    }
  }, [udata]);

  return (
    <>
      {/* HERO */}

      <section className="orders-hero">
        <div className="orders-hero-overlay">
          <span className="orders-badge">My Orders</span>

          <h1>
            Track your grocery
            <br />
            orders easily
          </h1>

          <p>
            View all your previous orders, payment details and delivery status.
          </p>
        </div>
      </section>

      {/* ORDERS */}

      <section className="orders-section">
        <div className="container">
          {ordersdata.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Order History</h2>

                <p>{ordersdata.length} orders found</p>
              </div>

              <div className="orders-grid">
                {ordersdata.map((data) => {
                  const readableDate = new Date(data.orderdate).toLocaleString(
                    "en-IN",
                    {
                      timeZone: "Asia/Kolkata",
                    },
                  );

                  return (
                    <div className="order-card" key={data._id}>
                      {/* TOP */}

                      <div className="order-top">
                        <div>
                          <span className="order-label">Order ID</span>

                          <h3>#{data._id.slice(-6)}</h3>
                        </div>

                        <span
                          className={`order-status ${data.status?.toLowerCase()}`}
                        >
                          {data.status}
                        </span>
                      </div>

                      {/* DETAILS */}

                      <div className="order-details">
                        <div className="order-row">
                          <span>Amount</span>

                          <strong>₹{data.billamt}</strong>
                        </div>

                        <div className="order-row">
                          <span>Payment</span>

                          <strong>{data.pmode}</strong>
                        </div>

                        <div className="order-row">
                          <span>Date</span>

                          <strong>{readableDate}</strong>
                        </div>
                      </div>

                      {/* ADDRESS */}

                      <div className="order-address">
                        <span>Delivery Address</span>

                        <p>{data.address}</p>
                      </div>

                      {/* BUTTON */}

                      <Link
                        to={`/orderitems?oid=${data._id}`}
                        className="order-btn"
                      >
                        View Order Items
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="empty-orders">
              <img src="/images/empty-cart.png" alt="No Orders" />

              <h2>No orders placed yet</h2>

              <p>Start shopping fresh groceries today.</p>

              <Link to="/homepage" className="shop-btn">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderHistory;
