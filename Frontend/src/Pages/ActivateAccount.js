import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ActivateAccount() {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const id = params.get("id");

  const [status, setstatus] = useState("loading");

  useEffect(() => {
    async function activate() {
      if (!id) {
        setstatus("error");
        return;
      }

      try {
        const res = await axios.get(`/api/users/activate?id=${id}`);

        if (res.data.code === 1) {
          setstatus("success");

          toast.success("Account activated successfully");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setstatus("error");

          toast.error(res.data.msg || "Invalid or expired link");
        }
      } catch (e) {
        setstatus("error");

        toast.error("Error: " + e.message);
      }
    }

    activate();
  }, [id, navigate]);

  return (
    <>
      <div className="activate-page">
        {/* LEFT SIDE */}

        <div className="activate-left">
          <div className="activate-overlay">
            <span className="activate-badge">GoFetch Account</span>

            <h1>
              Fresh groceries
              <br />
              delivered fast
            </h1>

            <p>
              Secure, fast and reliable grocery shopping at your fingertips.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="activate-right">
          <div className="activate-card">
            {status === "loading" && (
              <>
                <div className="status-icon loading-icon">⏳</div>

                <h2>Activating Account</h2>

                <p>Please wait while we verify your account...</p>

                <div className="loader"></div>
              </>
            )}

            {status === "success" && (
              <>
                <div className="status-icon success-icon">✅</div>

                <h2>Account Activated!</h2>

                <p>Your account has been activated successfully.</p>

                <span className="redirect-text">Redirecting to login...</span>
              </>
            )}

            {status === "error" && (
              <>
                <div className="status-icon error-icon">❌</div>

                <h2>Activation Failed</h2>

                <p>Invalid or expired activation link.</p>

                <button
                  className="activate-btn"
                  onClick={() => navigate("/register")}
                >
                  Create Account Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ActivateAccount;
