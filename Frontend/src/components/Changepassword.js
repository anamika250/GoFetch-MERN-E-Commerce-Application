import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function Changepassword() {
  const API = process.env.REACT_APP_APIURL;

  const [currpass, setcurrpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [confpass, setconfpass] = useState("");
  const { changePassword } = useAuth();

  useEffect(() => {
    document.title = "Change Password";
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();

    if (!currpass || !newpass || !confpass) {
      toast.error("All fields are required");
      return;
    }

    if (newpass !== confpass) {
      toast.error("Passwords do not match");
      return;
    }

    if (newpass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const success = await changePassword(currpass, newpass);

    if (success) {
      setcurrpass("");

      setnewpass("");

      setconfpass("");
    }
  }

  return (
    <>
      <div className="change-password-page">
        {/* LEFT SIDE */}

        <div className="change-left">
          <div className="change-overlay">
            <span className="change-badge">Secure Your Account</span>

            <h1>
              Update your
              <br />
              password safely
            </h1>

            <p>Keep your GoFetch account secure with a strong password.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="change-right">
          <div className="change-card">
            <h2>Change Password</h2>

            <p className="change-subtitle">Enter your new password 🔒</p>

            <form onSubmit={handlesubmit}>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currpass}
                  onChange={(e) => setcurrpass(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newpass}
                  onChange={(e) => setnewpass(e.target.value)}
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confpass}
                  onChange={(e) => setconfpass(e.target.value)}
                />
              </div>

              <button type="submit" className="change-btn">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Changepassword;
