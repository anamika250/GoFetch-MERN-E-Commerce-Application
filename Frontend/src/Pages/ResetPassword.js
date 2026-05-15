import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

function ResetPassword() {
  const [newpass, setnewpass] = useState("");
  const [cnewpass, setcnewpass] = useState("");
  const [loading, setloading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const token = params.get("token");

  // SUBMIT

  async function handlesubmit(e) {
    e.preventDefault();

    if (!token) {
      return toast.error("Invalid reset link");
    }

    if (newpass !== cnewpass) {
      toast.error("Passwords do not match");

      return;
    }

    if (newpass.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    try {
      setloading(true);

      const success = await resetPassword(token, newpass);

      if (success) {
        setTimeout(() => {
          navigate("/login");
        }, 1800);
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="reset-page">
        {/* LEFT SIDE */}

        <div className="reset-left">
          <div className="reset-overlay">
            <span className="reset-badge">Secure Password Reset</span>

            <h1>
              Create a new
              <br />
              password safely
            </h1>

            <p>Choose a strong password to keep your account secure.</p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="reset-right">
          <div className="reset-card">
            <h2>Reset Password</h2>

            <p className="reset-subtitle">Enter your new password 🔐</p>

            {/* FORM */}

            <form onSubmit={handlesubmit}>
              {/* NEW PASSWORD */}

              <div className="input-group">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newpass}
                  onChange={(e) => setnewpass(e.target.value)}
                  required
                />
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={cnewpass}
                  onChange={(e) => setcnewpass(e.target.value)}
                  required
                />
              </div>

              {/* BUTTON */}

              <button type="submit" className="reset-btn" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            {/* LOGIN */}

            <div className="back-login">
              Remember password?
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
