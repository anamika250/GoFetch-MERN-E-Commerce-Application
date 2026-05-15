import { Link } from "react-router-dom";
import { useContext } from "react";
import { dataContext } from "../App";

function Footer() {
  const { udata } = useContext(dataContext);

  return (
    <>
      <footer className="footer">
        <div className="container footer-grid">

          {/* BRAND */}
          <div className="footer-brand">
            <h2>GoFetch</h2>

            <p>
              Fresh groceries and daily essentials
              delivered to your doorstep quickly
              and safely.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3>Quick Links</h3>

            <ul>
              <li>
                <Link to="/homepage">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/categories">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/products">
                  Products
                </Link>
              </li>

              <li>
                <Link to="/contactus">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3>Account</h3>

            <ul>
              {!udata ? (
                <>
                  <li>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/orderhistory">
                      My Orders
                    </Link>
                  </li>

                  <li>
                    <Link to="/showcart">
                      Cart
                    </Link>
                  </li>

                  <li>
                    <Link to="/changepassword">
                      Change Password
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3>Contact</h3>

            <ul>
              <li>📍 Punjab, India</li>
              <li>📧 gofetch783@gmail.com</li>
              <li>📞 +91 9876543210</li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} GoFetch.
            All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;