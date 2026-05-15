import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useAdminOrders from "../hooks/useAdminOrders";
import { toast } from "react-toastify";

function UpdateStatus() {
  const [params] = useSearchParams();
  const oid = params.get("oid");
  const cstatus = params.get("currst");
  const [newstatus, setnewstatus] = useState("");

  const navigate = useNavigate();
  const { loading, updateOrderStatus } = useAdminOrders();

  // SUBMIT

  async function handlesubmit(e) {
    e.preventDefault();

    if (!newstatus || newstatus === "Choose New Status") {
      toast.error("Please select a valid status");

      return;
    }

    const success = await updateOrderStatus(oid, newstatus);

    if (success) {
      navigate("/vieworders");
    }
  }

  return (
    <>
      {/* HERO */}

      <section className="status-hero">
        <div className="status-overlay">
          <span className="status-badge">Order Management</span>

          <h1>
            Update order
            <br />
            delivery status
          </h1>

          <p>Manage and track customer delivery progress efficiently.</p>
        </div>
      </section>

      {/* UPDATE SECTION */}

      <section className="status-section">
        <div className="container">
          <div className="status-card">
            {/* TITLE */}

            <div className="status-header">
              <h2>Update Order Status</h2>

              <p>Modify the latest delivery progress for this order.</p>
            </div>

            {/* ORDER INFO */}

            <div className="status-info">
              <div className="status-info-box">
                <span>Order ID</span>

                <strong>#{oid}</strong>
              </div>

              <div className="status-info-box">
                <span>Current Status</span>

                <strong
                  className={`status-label ${cstatus
                    ?.toLowerCase()
                    .replace(/\s/g, "-")}`}
                >
                  {cstatus}
                </strong>
              </div>
            </div>

            {/* FORM */}

            <form onSubmit={handlesubmit} className="status-form">
              <label>Choose New Status</label>

              <select
                value={newstatus}
                onChange={(e) => setnewstatus(e.target.value)}
              >
                <option value="">Choose New Status</option>

                <option value="Confirmed">Confirmed</option>

                <option value="Shipped">Shipped</option>

                <option value="In-Transit">In-Transit</option>

                <option value="Out for Delivery">Out for Delivery</option>

                <option value="Delivered">Delivered</option>

                <option value="Cancelled">Cancelled</option>

                <option value="Returned">Returned</option>
              </select>

              {/* BUTTONS */}

              <div className="status-actions">
                <button
                  type="submit"
                  className="update-status-btn"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Status"}
                </button>

                <Link to="/vieworders" className="back-orders-link">
                  Back to Orders
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateStatus;
