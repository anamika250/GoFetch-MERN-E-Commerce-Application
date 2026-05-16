import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useOrders from "../hooks/useOrders";

function OrderItems() {
  const [params] = useSearchParams();
  const oid = params.get("oid");
  const { orderItems: orderitems, fetchOrderItems } = useOrders();
  useEffect(() => {
    if (oid) {
      fetchOrderItems(oid);
    }
  }, [oid]);

  // TOTAL

  const grandTotal = orderitems.reduce(
    (acc, item) => acc + Number(item.tcost),
    0,
  );

  return (
    <>
      {/* HERO */}

      <section className="orderitems-hero">
        <div className="orderitems-overlay">
          <span className="orderitems-badge">Order Details</span>

          <h1>
            Your ordered
            <br />
            grocery items
          </h1>

          <p>View all products included in this order.</p>
        </div>
      </section>

      {/* ITEMS */}

      <section className="orderitems-section">
        <div className="container">
          {orderitems.length > 0 ? (
            <>
              <div className="section-title">
                <h2>Order Items</h2>

                <p>{orderitems.length} items found</p>
              </div>

              {/* GRID */}

              <div className="orderitems-grid">
                {orderitems.map((item, i) => (
                  <div className="orderitem-card" key={i}>
                    {/* IMAGE */}

                    <div className="orderitem-image">
                      <img
                        src={`${process.env.REACT_APP_APIURL}/uploads/${
                          item.picname || "defaultpic.jpg"
                        }`}
                        alt={item.prodname}
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="orderitem-content">
                      <h3>{item.prodname}</h3>

                      <div className="orderitem-info">
                        <div>
                          <span>Price</span>

                          <strong>₹{item.rate}</strong>
                        </div>

                        <div>
                          <span>Quantity</span>

                          <strong>{item.qty}</strong>
                        </div>
                      </div>

                      {/* TOTAL */}

                      <div className="orderitem-total">
                        <span>Total</span>

                        <h4>₹{parseFloat(item.tcost || 0).toFixed(2)}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* GRAND TOTAL */}

              <div className="grand-total-card">
                <span>Grand Total</span>

                <h2>₹{parseFloat(grandTotal || 0).toFixed(2)}</h2>
              </div>
            </>
          ) : (
            <div className="empty-orderitems">
              <img src="/images/empty-cart.png" alt="No Items" />

              <h2>No items found</h2>

              <p>This order does not contain any products.</p>

              <Link to="/orderhistory" className="back-orders-btn">
                Back to Orders
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderItems;
