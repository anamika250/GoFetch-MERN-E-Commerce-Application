import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataContext } from "../App";

const RouteProtector = ({ CompName, adminonly }) => {
  const { udata } = useContext(dataContext);
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!udata) {
      navigate("/login", { replace: true });
      return;
    }

    if (adminonly && udata.usertype?.toLowerCase() !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    setAllowed(true);

  }, [udata, adminonly, navigate]);

  if (!allowed) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return <CompName />;
};

export default RouteProtector;