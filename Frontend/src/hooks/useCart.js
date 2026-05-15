import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useCart(autoFetch = true) {
  const [cartdata, setcartdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  // FETCH CART

  async function fetchCart() {
    try {
      setloading(true);
      seterror(null);

      const res = await axios.get("/api/cart/all");

      if (res.data.code === 1) {
        setcartdata(res.data.cartdata);
      } else {
        setcartdata([]);
      }
    } catch (e) {
      seterror(e.message);
      setcartdata([]);
    } finally {
      setloading(false);
    }
  }

  // ADD TO CART

  async function addToCart(prodid, qty) {
    try {
      const res = await axios.post("/api/cart/add", {
        prodid,
        qty,
      });

      if (res.data.code === 1) {
        toast.success("Added to cart");
        return true;
      } else {
        toast.error(res.data.msg || "Failed to add");
        return false;
      }
    } catch (e) {
      toast.error(e.response?.data?.msg || e.message);
      return false;
    }
  }

  // DELETE ITEM

  async function deleteCartItem(id) {
    try {
      const res = await axios.delete(`/api/cart/delete/${id}`);

      if (res.data.code === 1) {
        toast.success("Item removed");

        fetchCart();

        return true;
      } else {
        toast.error("Delete failed");
        return false;
      }
    } catch (e) {
      toast.error(e.message);
      return false;
    }
  }

  // TOTAL

  const carttotal = cartdata.reduce((sum, item) => sum + Number(item.tcost), 0);

  useEffect(() => {
    if (autoFetch) {
      fetchCart();
    }
  }, []);

  return {
    cartdata,
    carttotal,
    loading,
    error,
    fetchCart,
    addToCart,
    deleteCartItem,
  };
}

export default useCart;
