import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dataContext } from "../App";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../hooks/useAuth";

function Login() {
  const [uname, setuname] = useState("");
  const [pass, setpass] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState({});
  const [captchaValue, setcaptchaValue] = useState(null);
  const { loginUser } = useAuth();

  const navigate = useNavigate();
  const { setudata } = useContext(dataContext);

  const validateForm = () => {
    const err = {};
    if (!captchaValue) err.captcha = "Please verify captcha";

    if (!uname) err.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname))
      err.email = "Invalid email";

    if (!pass) err.password = "Password required";
    else if (pass.length < 6) err.password = "Minimum 6 characters";

    seterrors(err);
    return Object.keys(err).length === 0;
  };

  async function handlesubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setloading(true);

      const result = await loginUser({
        uname,
        pass,
        captchaToken: captchaValue,
      });

      if (result.success) {
        const userData = result.data;

        sessionStorage.setItem("uinfo", JSON.stringify(userData));

        setudata(userData);

        if (userData.usertype?.toLowerCase() === "admin") {
          navigate("/adminhome");
        } else {
          navigate("/homepage");
        }
      }
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <div className="login-page">
        {/* LEFT SIDE */}
        <div className="login-left">
          <div className="login-overlay">
            <span className="login-badge">Welcome to GoFetch</span>

            <h1>
              Fresh groceries
              <br />
              delivered fast
            </h1>

            <p>
              Order groceries, vegetables, fruits and daily essentials online.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="login-card">
            <h2>Login</h2>

            <p className="login-subtitle">Welcome back 👋</p>

            <form onSubmit={handlesubmit}>
              <div className="input-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={uname}
                  onChange={(e) => setuname(e.target.value)}
                />

                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              <div className="input-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                />

                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              <div className="forgot-link">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </div>
              <div className="captcha-box">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={(value) => setcaptchaValue(value)}
                />

                {errors.captcha && (
                  <span className="error-text">{errors.captcha}</span>
                )}
              </div>
              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="register-link">
              Don't have an account?
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
