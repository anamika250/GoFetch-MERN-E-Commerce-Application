import { Route, Routes } from "react-router-dom";

// ADMIN
import Searchuser from "../Admin/Searchuser";
import Searchallusers from "../Admin/Searchallusers";
import Adminhome from "../Admin/Adminhome";
import Createadmin from "../Admin/Createadmin";
import Managecategory from "../Admin/Managecategory";
import ManageSubCategory from "../Admin/Managesubcategory";
import Manageproduct from "../Admin/Manageproduct";
import ViewOrders from "../Admin/ViewOrders";
import UpdateStatus from "../Admin/UpdateStatus";

// COMPONENTS
import Login from "../components/Login";
import Home from "../components/Home";
import Register from "../components/Register";
import Changepassword from "../components/Changepassword";
import SearchResults from "../components/SearchResults";

// ROUTE PROTECTOR
import RouteProtector from "./RouteProtector";

// PAGES
import Categories from "../Pages/Categories";
import SubCategories from "../Pages/SubCategories";
import Products from "../Pages/Products";
import Details from "../Pages/Details";
import ShowCart from "../Pages/ShowCart";
import Checkout from "../Pages/Checkout";
import OrderHistory from "../Pages/OrderHistory";
import OrderSummary from "../Pages/OrderSummary";
import OrderItems from "../Pages/OrderItems";
import Contactus from "../Pages/Contactus";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import ActivateAccount from "../Pages/ActivateAccount";
import AboutUs from "../Pages/AboutUs";

function Siteroutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/activateaccount" element={<ActivateAccount />} />

      <Route path="/contactus" element={<Contactus />} />

      <Route path="/searchresults" element={<SearchResults />} />

      {/* ================= USER PROTECTED ================= */}

      <Route
        path="/changepassword"
        element={<RouteProtector CompName={Changepassword} />}
      />

      <Route
        path="/showcart"
        element={<RouteProtector CompName={ShowCart} />}
      />

      <Route
        path="/checkout"
        element={<RouteProtector CompName={Checkout} />}
      />

      <Route
        path="/orderhistory"
        element={<RouteProtector CompName={OrderHistory} />}
      />

      <Route
        path="/ordersummary"
        element={<RouteProtector CompName={OrderSummary} />}
      />

      <Route
        path="/orderitems"
        element={<RouteProtector CompName={OrderItems} />}
      />

      {/* ================= PRODUCT FLOW ================= */}

      <Route path="/categories" element={<Categories />} />

      <Route path="/subcategories" element={<SubCategories />} />

      <Route path="/products" element={<Products />} />

      <Route path="/details" element={<Details />} />
      <Route path="/aboutus" element={<AboutUs />} />

      {/* ================= ADMIN PROTECTED ================= */}

      <Route
        path="/adminhome"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Adminhome}
          />
        }
      />

      <Route
        path="/createadmin"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Createadmin}
          />
        }
      />

      <Route
        path="/searchuser"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Searchuser}
          />
        }
      />

      <Route
        path="/searchallusers"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Searchallusers}
          />
        }
      />

      <Route
        path="/managecategory"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Managecategory}
          />
        }
      />

      <Route
        path="/managesubcategory"
        element={
          <RouteProtector
            adminonly={true}
            CompName={ManageSubCategory}
          />
        }
      />

      <Route
        path="/manageproduct"
        element={
          <RouteProtector
            adminonly={true}
            CompName={Manageproduct}
          />
        }
      />

      <Route
        path="/vieworders"
        element={
          <RouteProtector
            adminonly={true}
            CompName={ViewOrders}
          />
        }
      />

      <Route
        path="/updatestatus"
        element={
          <RouteProtector
            adminonly={true}
            CompName={UpdateStatus}
          />
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default Siteroutes;