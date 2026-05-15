import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { dataContext } from "../App";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Header() {
  const { udata, setudata } = useContext(dataContext);
  const [stext, setstext] = useState("");
  const { logoutUser } = useAuth();

  const navigate = useNavigate();

  async function handlelogout() {
    await logoutUser();

    setudata(null);

    sessionStorage.clear();

    navigate("/login");
  }

  function handlesearch(e) {
    e.preventDefault();

    if (!stext.trim()) return;

    navigate(`/searchresults?s=${stext}`);
  }

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="container topbar-content">
          <p>🚚 Fresh groceries delivered in minutes</p>

          <div className="topbar-links">
            {!udata ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/orderhistory">Orders</Link>
                <Link to="/changepassword">Change Password</Link>
                <button onClick={handlelogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="main-header">
        <div className="container header-content">
          {/* LOGO */}
          <div className="logo">
            <Link to="/homepage">GoFetch</Link>
          </div>

          {/* NAVIGATION */}
          <nav className="nav-links">
            <Link to="/homepage">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contactus">Contact</Link>
            <Link to="/aboutus">About Us</Link>
          </nav>

          {/* SEARCH */}
          {/* HEADER ACTIONS */}
          <div className="header-actions">
            {/* SEARCH */}
            <form className="search-bar" onSubmit={handlesearch}>
              <input
                type="search"
                placeholder="Search products..."
                value={stext}
                onChange={(e) => setstext(e.target.value)}
              />

              <button type="submit">
                <span>⌕</span>
              </button>
            </form>

            {/* CART */}
            {udata && (
              <button
                className="cart-btn"
                onClick={() => navigate("/showcart")}
              >
                🛒
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
