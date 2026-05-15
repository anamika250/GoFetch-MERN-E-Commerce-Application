import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAdminUsers from "../hooks/useAdminUsers";

function Searcallusers() {
  const { users: uinfo, loading, fetchAllUsers, deleteUser } = useAdminUsers();
  useEffect(() => {
    document.title = "Search All Users";

    fetchAllUsers();
  }, []);

  return (
    <>
      {/* BREADCRUMB */}

      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <Link to="/adminhome">Home</Link>
            </li>

            <li className="active">All Users</li>
          </ol>
        </div>
      </div>

      {/* PAGE */}

      <div className="allusers-page">
        <div className="allusers-container">
          {/* HEADER */}

          <div className="allusers-header">
            <h2>All Registered Users</h2>
          </div>

          {/* LOADING */}

          {loading ? (
            <div className="allusers-loading">
              <div className="allusers-loader"></div>

              <p>Loading users...</p>
            </div>
          ) : uinfo.length > 0 ? (
            <>
              {/* TABLE */}

              <div className="allusers-table-wrap">
                <table className="allusers-table">
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Phone</th>

                      <th>Email</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {uinfo.map((user) => (
                      <tr key={user._id}>
                        <td className="allusers-name">{user.name}</td>

                        <td>{user.phone}</td>

                        <td>{user.username}</td>

                        <td>
                          <button
                            className="allusers-delete-btn"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="allusers-empty">
              <img src="/images/empty-users.png" alt="" />

              <h2>No Users Found</h2>

              <p>There are no registered users yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Searcallusers;
