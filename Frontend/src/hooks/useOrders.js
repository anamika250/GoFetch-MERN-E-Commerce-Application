import axios from "../utils/axiosConfig";
import { useState } from "react";

function useOrders() {
  const [orders, setorders] = useState([]);
  const [orderItems, setorderItems] = useState([]);
  const [orderSummary, setorderSummary] = useState(null);

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  // FETCH USER ORDERS

  async function fetchUserOrders() {
    try {
      setloading(true);
      seterror(null);

      const res = await axios.get("/api/order/user");

      if (res.data.code === 1) {
        setorders(res.data.ordersdata);
      } else {
        setorders([]);
      }
    } catch (e) {
      seterror(e.message);
      setorders([]);
    } finally {
      setloading(false);
    }
  }

  // FETCH ORDER ITEMS

  async function fetchOrderItems(oid) {
    if (!oid) return;

    try {
      setloading(true);
      seterror(null);

      const res = await axios.get(
        `/api/order/items/${oid}`,
      );

      if (res.data.code === 1) {
        setorderItems(res.data.oitems);
      } else {
        setorderItems([]);
      }
    } catch (e) {
      seterror(e.message);
      setorderItems([]);
    } finally {
      setloading(false);
    }
  }

  // FETCH ORDER SUMMARY

  async function fetchOrderSummary() {
    try {
      setloading(true);
      seterror(null);

      const res = await axios.get("/api/order/summary");

      if (res.data.code === 1) {
        setorderSummary(res.data.odata);
      } else {
        setorderSummary(null);
      }
    } catch (e) {
      seterror(e.message);
      setorderSummary(null);
    } finally {
      setloading(false);
    }
  }

  return {
    orders,
    orderItems,
    orderSummary,
    loading,
    error,
    fetchUserOrders,
    fetchOrderItems,
    fetchOrderSummary,
  };
}

export default useOrders;