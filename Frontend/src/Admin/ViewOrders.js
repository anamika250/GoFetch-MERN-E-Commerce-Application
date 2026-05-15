import { useState } from "react";
import { Link } from "react-router-dom";
import useAdminOrders from "../hooks/useAdminOrders";

function ViewOrders() {
  const [stdate, setstdate] = useState("");
  const [enddate, setenddate] = useState("");
  const { ordersdata, loading, fetchOrders } = useAdminOrders();

  return (
    <>
      {/* BREADCRUMB */}

      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <Link to="/adminhome">Home</Link>
            </li>

            <li className="active">View Orders</li>
          </ol>
        </div>
      </div>
      {/* HERO */}

      <section className="vieworders-hero">
        <div className="vieworders-overlay">
          <span className="vieworders-badge">Admin Dashboard</span>

          <h1>
            Manage customer
            <br />
            grocery orders
          </h1>

          <p>View all orders, track deliveries and update statuses easily.</p>
        </div>
      </section>

      {/* SECTION */}

      <section className="vieworders-section">
        <div className="container">
          {/* FILTER CARD */}

          <div className="orders-filter-card">
            <div className="orders-filter-header">
              <h2>View Orders</h2>

              <p>Select a date range to filter customer orders.</p>
            </div>

            {/* FILTERS */}

            <div className="orders-filter-grid">
              <div className="filter-group">
                <label>Start Date</label>

                <input
                  type="date"
                  value={stdate}
                  onChange={(e) => setstdate(e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label>End Date</label>

                <input
                  type="date"
                  value={enddate}
                  onChange={(e) => setenddate(e.target.value)}
                />
              </div>

              <button
                className="fetch-orders-btn"
                onClick={() => fetchOrders(stdate, enddate)}
              >
                {loading ? "Loading..." : "View Orders"}
              </button>
            </div>
          </div>

          {/* ORDERS */}

          {ordersdata.length > 0 && (
            <div className="orders-list-grid">
              {ordersdata.map((data) => {
                const readableDate = new Date(data.orderdate).toLocaleString(
                  "en-IN",
                  {
                    timeZone: "Asia/Kolkata",
                  },
                );

                return (
                  <div className="admin-order-card" key={data._id}>
                    {/* TOP */}

                    <div className="admin-order-top">
                      <div>
                        <span>Order ID</span>

                        <h3>#{data._id.slice(-6)}</h3>
                      </div>

                      <span
                        className={`admin-order-status ${data.status
                          ?.toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {data.status}
                      </span>
                    </div>

                    {/* INFO */}

                    <div className="admin-order-info">
                      <div className="admin-order-row">
                        <span>Customer</span>

                        <strong>{data.uname}</strong>
                      </div>

                      <div className="admin-order-row">
                        <span>Amount</span>

                        <strong className="amount-text">₹{data.billamt}</strong>
                      </div>

                      <div className="admin-order-row">
                        <span>Payment</span>

                        <strong>{data.pmode}</strong>
                      </div>

                      <div className="admin-order-row">
                        <span>Order Date</span>

                        <strong>{readableDate}</strong>
                      </div>
                    </div>

                    {/* ADDRESS */}

                    <div className="admin-order-address">
                      <span>Delivery Address</span>

                      <p>{data.address}</p>
                    </div>

                    {/* BUTTONS */}

                    <div className="admin-order-actions">
                      <Link
                        to={`/orderitems?oid=${data._id}`}
                        className="view-items-btn"
                      >
                        View Items
                      </Link>

                      <Link
                        to={`/updatestatus?oid=${data._id}&currst=${data.status}`}
                        className="update-order-btn"
                      >
                        Update Status
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ViewOrders;
