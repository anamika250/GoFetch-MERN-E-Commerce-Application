import axios from "../utils/axiosConfig";
import { useState } from "react";
import { toast } from "react-toastify";

function useAdminOrders() {
  const [ordersdata, setordersdata] = useState([]);
  const [loading, setloading] = useState(false);

  // FETCH ORDERS

  async function fetchOrders(stdate, enddate) {
    if (!stdate || !enddate) {
      toast.error("Please select both dates");

      return false;
    }

    try {
      setloading(true);

      const res = await axios.get(
        `/api/order/all?stdate=${stdate}&enddate=${enddate}`,
      );

      if (res.data.code === 1) {
        setordersdata(res.data.ordersdata);

        return true;
      } else {
        toast.error("No orders found");

        setordersdata([]);

        return false;
      }
    } catch (e) {
      toast.error("Error: " + e.message);

      return false;
    } finally {
      setloading(false);
    }
  }

  // UPDATE STATUS

  async function updateOrderStatus(
    oid,
    newstatus,
  ) {
    try {
      setloading(true);

      const res = await axios.put(
        "/api/order/status",
        {
          oid,
          newstatus,
        },
      );

      if (res.data.code === 1) {
        toast.success(
          "Status updated successfully",
        );

        return true;
      } else {
        toast.error(
          res.data.msg || "Update failed",
        );

        return false;
      }
    } catch (e) {
      toast.error("Error: " + e.message);

      return false;
    } finally {
      setloading(false);
    }
  }

  return {
    ordersdata,
    loading,
    fetchOrders,
    updateOrderStatus,
  };
}

export default useAdminOrders;