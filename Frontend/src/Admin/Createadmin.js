import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

function Createadmin() {
  const [pname, setpname] = useState("");
  const [phone, setphone] = useState("");
  const [uname, setuname] = useState("");
  const [pass, setpass] = useState("");
  const [cpass, setcpass] = useState("");
  const [terms, setterms] = useState(false);
  const [errors, seterrors] = useState({});
  const { createAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Create Admin";
  }, []);

  const validateForm = () => {
    const err = {};

    if (!pname.trim()) err.pname = "Name is required";
    if (!phone || !/^\d{10}$/.test(phone)) err.phone = "Valid phone required";
    if (!uname || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname))
      err.email = "Valid email required";
    if (!pass) err.password = "Password required";
    if (pass !== cpass) err.passmatch = "Passwords do not match";
    if (!terms) err.terms = "Accept terms";

    seterrors(err);
    return Object.keys(err).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await createAdmin({
      pname,
      phone,
      uname,
      pass,
    });

    if (success) {
      navigate("/adminhome");
    }
  };

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <Link to="/adminhome">Home</Link>
            </li>
            <li className="active">Create Admin</li>
          </ol>
        </div>
      </div>

      <div className="register">
        <div className="container">
          <h2>Create Admin</h2>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setpname(e.target.value)}
            />
            {errors.pname && <p>{errors.pname}</p>}

            <input
              type="text"
              placeholder="Phone"
              onChange={(e) => setphone(e.target.value)}
            />
            {errors.phone && <p>{errors.phone}</p>}

            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setuname(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setpass(e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setcpass(e.target.value)}
            />
            {errors.passmatch && <p>{errors.passmatch}</p>}

            <label>
              <input
                type="checkbox"
                onChange={(e) => setterms(e.target.checked)}
              />
              Accept terms
            </label>
            {errors.terms && <p>{errors.terms}</p>}

            <button type="submit">Create Admin</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createadmin;
