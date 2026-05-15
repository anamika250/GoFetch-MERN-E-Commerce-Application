import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Siteroutes from "./Routes/Siteroutes";
import { useState, createContext, useEffect } from "react";
import AdminHeader from "./Admin/AdminHeader";

const dataContext = createContext(null);

function App() {
  const [udata, setudata] = useState(() => {
    const stored = sessionStorage.getItem("uinfo");

    return stored ? JSON.parse(stored) : null;
  });
  useEffect(() => {
    if (udata) {
      sessionStorage.setItem("uinfo", JSON.stringify(udata));
    } else {
      sessionStorage.removeItem("uinfo");
    }
  }, [udata]);

  return (
    <dataContext.Provider value={{ udata, setudata }}>
      {udata !== null ? (
        udata.usertype === "admin" ? (
          <AdminHeader />
        ) : (
          <Header />
        )
      ) : (
        <Header />
      )}
      <ToastContainer />
      <Siteroutes />
      {udata !== null ? (
        udata.usertype === "user" ? (
          <Footer />
        ) : null
      ) : (
        <Footer />
      )}
    </dataContext.Provider>
  );
}

export default App;
export { dataContext };
