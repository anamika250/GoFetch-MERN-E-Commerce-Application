import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAdminUsers from "../hooks/useAdminUsers";

function Searchuser() {
  const [uname, setuname] = useState("");

  const { singleUser: uinfo, loading, searchUser } = useAdminUsers();

  useEffect(() => {
    document.title = "Search User Details";
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();

    if (!uname.trim()) {
      return;
    }

    await searchUser(uname);
  }

  return (
    <>
      {/* BREADCRUMB */}

      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <Link to="/adminhome">Home</Link>
            </li>

            <li className="active">Search User</li>
          </ol>
        </div>
      </div>

      {/* PAGE */}

      <div className="searchuser-page">
        <div className="searchuser-container">
          {/* HEADER */}

          <div className="searchuser-header">
            <h2>Search User</h2>

            <p>Find user details by email address.</p>
          </div>

          {/* SEARCH FORM */}

          <form onSubmit={handlesubmit} className="searchuser-form">
            <input
              type="email"
              placeholder="Enter user email"
              value={uname}
              onChange={(e) => setuname(e.target.value)}
            />

            <button type="submit">
              {loading ? "Searching..." : "Search User"}
            </button>
          </form>

          {/* USER CARD */}

          {uinfo && (
            <div className="searchuser-card">
              {/* AVATAR */}

              <div className="searchuser-avatar">
                {uinfo.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* CONTENT */}

              <div className="searchuser-content">
                <h3>{uinfo.name}</h3>

                <p>
                  <span>📧</span>

                  {uinfo.username}
                </p>

                <p>
                  <span>📞</span>

                  {uinfo.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Searchuser;
