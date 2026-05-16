import axios from "../utils/axiosConfig";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dataContext } from "../App";

function Checkout() {
  const [addr, setaddr] = useState("");
  const [pmode, setpmode] = useState("");

  const [hname, sethname] = useState("");
  const [cardno, setcardno] = useState("");
  const [cvv, setcvv] = useState("");
  const [exp, setexp] = useState("");

  const { udata } = useContext(dataContext);

  const navigate = useNavigate();

  async function handlesubmit(e) {
    e.preventDefault();

    if (!addr.trim()) {
      return toast.error("Address is required");
    }

    if (!pmode) {
      return toast.error("Select payment mode");
    }

    if (pmode === "CARD") {
      if (!hname || !cardno || !cvv || !exp) {
        return toast.error("Enter complete card details");
      }

      if (cardno.length < 12) {
        return toast.error("Invalid card number");
      }

      if (cvv.length !== 3) {
        return toast.error("Invalid CVV");
      }
    }

    try {
      const cardinfo = pmode === "CARD" ? { hname, cardno, cvv, exp } : {};

      const apidata = {
        billamt: sessionStorage.getItem("gtotal"),

        pmode,

        cardinfo,

        addr,
      };

      const apiresp = await axios.post("/api/order/place", apidata);

      if (apiresp.data.code === 1) {
        sessionStorage.removeItem("gtotal");

        toast.success("Order placed successfully");

        navigate("/ordersummary");
      } else {
        toast.error(apiresp.data.msg || "Order failed");
      }
    } catch (e) {
      toast.error("Error: " + e.message);
    }
  }

  return (
    <>
      <div className="checkout-page">
        {/* LEFT SIDE */}

        <div className="checkout-left">
          <div className="checkout-overlay">
            <span className="checkout-badge">Secure Checkout</span>

            <h1>
              Complete your
              <br />
              grocery order
            </h1>

            <p>Fast, secure and reliable payment experience with GoFetch.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="checkout-right">
          <div className="checkout-card">
            <h2>Checkout</h2>

            <p className="checkout-subtitle">Complete your payment 🛒</p>

            {/* BILL */}

            <div className="bill-box">
              <span>Total Amount</span>

              <h3>₹ {parseFloat(sessionStorage.getItem("gtotal") || 0).toFixed(2)}</h3>
            </div>

            {/* FORM */}

            <form onSubmit={handlesubmit}>
              {/* ADDRESS */}

              <div className="input-group">
                <textarea
                  placeholder="Shipping Address"
                  value={addr}
                  onChange={(e) => setaddr(e.target.value)}
                />
              </div>

              {/* PAYMENT MODE */}

              <div className="input-group">
                <select
                  value={pmode}
                  onChange={(e) => setpmode(e.target.value)}
                >
                  <option value="">Choose Payment Mode</option>

                  <option value="COD">Cash on Delivery</option>

                  <option value="CARD">Card Payment</option>
                </select>
              </div>

              {/* CARD DETAILS */}

              {pmode === "CARD" && (
                <div className="card-details">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      value={hname}
                      onChange={(e) => sethname(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={cardno}
                      onChange={(e) => setcardno(e.target.value)}
                    />
                  </div>

                  <div className="card-row">
                    <div className="input-group">
                      <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setcvv(e.target.value)}
                      />
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={exp}
                        onChange={(e) => setexp(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* BUTTON */}

              <button type="submit" className="checkout-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
