import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Register() {
  const [pname, setpname] = useState("");
  const [phone, setphone] = useState("");
  const [uname, setuname] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [terms, setterms] = useState(false);
  const [loading, setloading] = useState(false);
  const [verrors, setverrors] = useState({});
  const { registerUser } = useAuth();

  const navigate = useNavigate();

  // VALIDATION
  const validateForm = () => {
    const errors = {};

    if (!pname.trim() || pname.trim().length < 3) {
      errors.pname = "Name must be at least 3 characters";
    }

    if (!/^\d{10}$/.test(phone.trim())) {
      errors.phone = "Phone must be 10 digits";
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname.trim())) {
      errors.email = "Invalid email format";
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}/.test(pass)) {
      errors.password =
        "Password must contain uppercase, lowercase, number & special char";
    }

    if (pass !== cpass) {
      errors.passmatch = "Passwords do not match";
    }

    if (!terms) {
      errors.terms = "Accept terms & conditions";
    }

    setverrors(errors);
    return Object.keys(errors).length === 0;
  };

  // REGISTER
  async function handleRegister(e) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setloading(true);

      const success = await registerUser({
        pname: pname.trim(),
        phone: phone.trim(),
        uname: uname.trim(),
        pass,
      });

      if (success) {
        navigate("/login");
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="register-page">
        {/* LEFT SIDE */}

        <div className="register-left">
          <div className="register-overlay">
            <span className="register-badge">Join GoFetch</span>

            <h1>
              Fresh groceries
              <br />
              at your fingertips
            </h1>

            <p>
              Create your account and start ordering groceries, fruits and daily
              essentials.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="register-right">
          <div className="register-card">
            <h2>Create Account</h2>

            <p className="register-subtitle">Start shopping today 🛒</p>

            <form onSubmit={handleRegister}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={pname}
                  onChange={(e) => setpname(e.target.value)}
                />

                {verrors.pname && (
                  <span className="error-text">{verrors.pname}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />

                {verrors.phone && (
                  <span className="error-text">{verrors.phone}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={uname}
                  onChange={(e) => setuname(e.target.value)}
                />

                {verrors.email && (
                  <span className="error-text">{verrors.email}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                />

                {verrors.password && (
                  <span className="error-text">{verrors.password}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={cpass}
                  onChange={(e) => setcpass(e.target.value)}
                />

                {verrors.passmatch && (
                  <span className="error-text">{verrors.passmatch}</span>
                )}
              </div>

              {/* TERMS */}

              <label className="terms-box">
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setterms(e.target.checked)}
                />

                <span>Accept Terms & Conditions</span>
              </label>

              {verrors.terms && (
                <span className="error-text">{verrors.terms}</span>
              )}

              <button type="submit" className="register-btn" disabled={loading}>
                {loading ? "Registering..." : "Create Account"}
              </button>
            </form>

            <div className="login-link">
              Already have an account?
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
