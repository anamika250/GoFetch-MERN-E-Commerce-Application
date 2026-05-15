import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function AdminHeader() {
  const { udata, setudata } = useContext(dataContext);
  const navigate = useNavigate();
  const [stext, setstext] = useState("");
  const [mobileMenu, setmobileMenu] = useState(false);
  const { logoutUser } = useAuth();

  // LOGOUT

  async function handlelogout() {
    await logoutUser();

    setudata(null);

    sessionStorage.clear();

    toast.success("Logged out successfully");

    navigate("/login", {
      replace: true,
    });
  }

  // SEARCH

  function handlesearch(e) {
    e.preventDefault();

    if (!stext.trim()) return;

    navigate(`/searchresults?s=${encodeURIComponent(stext)}`);
  }

  return (
    <>
      {/* TOPBAR */}

      <div className="admin-topbar">
        <div className="container admin-topbar-inner">
          <p>
            Welcome back, <strong>{udata ? udata?.name : "Admin"}</strong>
          </p>

          <div className="admin-user-actions">
            {!udata ? (
              <>
                <Link to="/register">Register</Link>

                <Link to="/login">Login</Link>
              </>
            ) : (
              <>
                <Link to="/changepassword">Change Password</Link>

                <button onClick={handlelogout} className="admin-logout-btn">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}

      <header className="admin-navbar">
        <div className="container admin-navbar-inner">
          {/* LOGO */}

          <div className="admin-logo">
            <Link to="/adminhome">GoFetch</Link>
          </div>

          {/* MOBILE BUTTON */}

          <div
            className="admin-mobile-btn"
            onClick={() => setmobileMenu(!mobileMenu)}
          >
            <i className="fa fa-bars"></i>
          </div>

          {/* NAVIGATION */}

          <nav className={`admin-nav-links ${mobileMenu ? "active" : ""}`}>
            <Link to="/adminhome">Home</Link>

            {/* MANAGE */}

            <div className="admin-dropdown">
              <span>
                Manage <i className="fa fa-angle-down"></i>
              </span>

              <div className="admin-dropdown-menu">
                <Link to="/managecategory">Category</Link>

                <Link to="/managesubcategory">Sub Category</Link>

                <Link to="/manageproduct">Product</Link>
              </div>
            </div>

            {/* VIEW */}

            <div className="admin-dropdown">
              <span>
                View <i className="fa fa-angle-down"></i>
              </span>

              <div className="admin-dropdown-menu">
                <Link to="/vieworders">Orders</Link>

                <Link to="/searchuser">Search User</Link>

                <Link to="/searchallusers">All Users</Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default AdminHeader;
