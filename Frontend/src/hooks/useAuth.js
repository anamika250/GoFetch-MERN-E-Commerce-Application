import axios from "../utils/axiosConfig";
import { toast } from "react-toastify";

function useAuth() {
  // LOGIN

  async function loginUser(apidata) {
    try {
      const res = await axios.post("/api/users/login", apidata);

      if (res.data.code === 1) {
        toast.success("Login successful");

        return {
          success: true,
          data: res.data.udata,
        };
      } else {
        toast.error("Invalid credentials");

        return {
          success: false,
        };
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || "Login failed");

      return {
        success: false,
      };
    }
  }

  // REGISTER

  async function registerUser(apidata) {
    try {
      const res = await axios.post("/api/users/register", apidata);

      if (res.data.code === 1) {
        toast.success("Account created! Check email to activate.");

        return true;
      } else {
        toast.error(res.data.msg || "Registration failed");

        return false;
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || "Registration failed");

      return false;
    }
  }

  // LOGOUT

  async function logoutUser() {
    try {
      await axios.post("/api/users/logout");
    } catch (e) {
      console.log(e);
    }
  }

  async function resetPassword(token, newpass) {
    try {
      const res = await axios.post("/api/resetpass/reset", {
        token,
        newpass,
      });

      if (res.data.code === 1) {
        toast.success("Password reset successfully");

        return true;
      } else {
        toast.error(res.data.msg || "Reset failed");

        return false;
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || "Reset failed");

      return false;
    }
  }

  async function forgotPassword(uname) {
    try {
      const res = await axios.post("/api/resetpass/forgot", {
        username,
      });

      if (res.data.code === 1) {
        toast.success("Password reset link sent to email");

        return true;
      } else {
        toast.error(res.data.msg || "Request failed");

        return false;
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || "Request failed");

      return false;
    }
  }

  async function changePassword(currpass, newpass) {
    try {
      const res = await axios.post("/api/resetpass/change", {
        currpass,
        newpass,
      });

      if (res.data.code === 1) {
        toast.success("Password changed successfully");

        return true;
      } else if (res.data.code === -1) {
        toast.error("Current password incorrect");

        return false;
      } else {
        toast.error("Operation failed");

        return false;
      }
    } catch (e) {
      toast.error("Error: " + e.message);

      return false;
    }
  }

  async function createAdmin(apidata) {
    try {
      const res = await axios.post("/api/users/admin/create", apidata);

      if (res.data.code === 1) {
        toast.success("Admin created successfully");

        return true;
      } else {
        toast.error(res.data.msg || "Failed to create admin");

        return false;
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || "Server error");

      return false;
    }
  }

  return {
    loginUser,
    registerUser,
    logoutUser,
    resetPassword,
    forgotPassword,
    changePassword,
    createAdmin,
  };
}

export default useAuth;
