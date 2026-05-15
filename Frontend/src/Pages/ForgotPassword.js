import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function ForgotPassword() {
  const [email, setemail] = useState("");
  const { forgotPassword } = useAuth();
  const [loading, setloading] = useState(false);

  // VALIDATION

  const validate = () => {
    if (!email) {
      return "Email is required";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return "Invalid email format";
    }

    return null;
  };

  // SUBMIT

  async function handlesubmit(e) {
    e.preventDefault();

    const err = validate();

    if (err) {
      return toast.error(err);
    }

    try {
      setloading(true);
      const success = await forgotPassword(email);

      if (success) {
        setemail("");
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="forgot-page">
        {/* LEFT SIDE */}

        <div className="forgot-left">
          <div className="forgot-overlay">
            <span className="forgot-badge">Reset Password</span>

            <h1>
              Forgot your
              <br />
              password?
            </h1>

            <p>
              No worries. Enter your email and we’ll send you a secure reset
              link.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="forgot-right">
          <div className="forgot-card">
            <h2>Forgot Password</h2>

            <p className="forgot-subtitle">Reset your account password 🔐</p>

            <form onSubmit={handlesubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <button type="submit" className="forgot-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

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

export default ForgotPassword;
