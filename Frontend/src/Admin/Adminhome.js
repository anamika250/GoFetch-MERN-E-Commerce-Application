import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import useAuth from "../hooks/useAuth";
import { dataContext } from "../App";

function Adminhome() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { setudata, udata } = useContext(dataContext);

  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  // LOGOUT

  async function handleLogout() {
    await logoutUser();

    setudata(null);

    sessionStorage.clear();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <>
      {/* HERO */}

      <section className="adminhome-hero">
        <div className="adminhome-overlay">
          <span className="adminhome-badge">Admin Dashboard</span>

          <h1>
            Manage your
            <br />
            grocery platform
          </h1>

          <p>
            Control products, categories, users and orders from one powerful
            dashboard.
          </p>
        </div>
      </section>

      {/* DASHBOARD */}

      <section className="adminhome-section">
        <div className="container">
          {/* HEADER */}

          <div className="adminhome-header">
            <div>
              <h2>Welcome, {udata?.name || "Admin"}</h2>

              <p>Manage your entire grocery application here.</p>
            </div>

            <button onClick={handleLogout} className="admin-logout-main">
              Logout
            </button>
          </div>

          {/* GRID */}

          <div className="adminhome-grid">
            {/* USERS */}

            <Link to="/searchuser" className="admin-card">
              <div className="admin-card-icon">👤</div>

              <h3>Search User</h3>

              <p>Find and manage registered users.</p>
            </Link>

            {/* ALL USERS */}

            <Link to="/searchallusers" className="admin-card">
              <div className="admin-card-icon">👥</div>

              <h3>All Users</h3>

              <p>View all users in the platform.</p>
            </Link>

            {/* CREATE ADMIN */}

            <Link to="/createadmin" className="admin-card">
              <div className="admin-card-icon">🛡️</div>

              <h3>Create Admin</h3>

              <p>Add another admin account securely.</p>
            </Link>

            {/* CATEGORY */}

            <Link to="/managecategory" className="admin-card">
              <div className="admin-card-icon">🥬</div>

              <h3>Manage Category</h3>

              <p>Create and edit grocery categories.</p>
            </Link>

            {/* SUBCATEGORY */}

            <Link to="/managesubcategory" className="admin-card">
              <div className="admin-card-icon">🧺</div>

              <h3>Manage Sub Category</h3>

              <p>Organize products efficiently.</p>
            </Link>

            {/* PRODUCT */}

            <Link to="/manageproduct" className="admin-card">
              <div className="admin-card-icon">🍎</div>

              <h3>Manage Product</h3>

              <p>Add, update and manage products.</p>
            </Link>
            <Link to="/vieworders" className="admin-card">
              <div className="admin-card-icon">📦</div>

              <h3>View Orders</h3>

              <p>Review and manage all customer orders.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Adminhome;
