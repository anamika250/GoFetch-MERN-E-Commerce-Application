import axios from "../utils/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";

function useAdminUsers() {
  const [users, setusers] = useState([]);
  const [singleUser, setsingleUser] = useState(null);
  const [loading, setloading] = useState(false);

  // FETCH ALL USERS

  async function fetchAllUsers() {
    try {
      setloading(true);

      const res = await axios.get("/api/users/all");

      if (res.data.code === 1) {
        setusers(res.data.udata);
      } else {
        setusers([]);

        toast.info("No users found");
      }
    } catch (e) {
      toast.error("Error fetching users");
    } finally {
      setloading(false);
    }
  }

  // SEARCH USER

  async function searchUser(uname) {
    try {
      setloading(true);

      const res = await axios.get(
        `/api/users/search/${uname}`,
      );

      if (res.data.code === 1) {
        setsingleUser(res.data.udata);

        return true;
      } else {
        setsingleUser(null);

        toast.error("User not found");

        return false;
      }
    } catch (e) {
      toast.error("Error searching user");

      return false;
    } finally {
      setloading(false);
    }
  }

  // DELETE USER

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `/api/users/delete/${id}`,
      );

      if (res.data.code === 1) {
        toast.success(
          "User deleted successfully",
        );

        fetchAllUsers();

        return true;
      } else {
        toast.error("User not deleted");

        return false;
      }
    } catch (e) {
      toast.error("Error deleting user");

      return false;
    }
  }

  return {
    users,
    singleUser,
    loading,
    fetchAllUsers,
    searchUser,
    deleteUser,
  };
}

export default useAdminUsers;