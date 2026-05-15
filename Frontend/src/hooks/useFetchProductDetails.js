import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useFetchProductDetails(prodid) {
  const [product, setproduct] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);

  async function fetchProductDetails() {
    if (!prodid) {
      setproduct({});
      return;
    }

    try {
      setloading(true);
      seterror(false);

      const res = await axios.get(
        `/api/product/details/${prodid}`,
      );

      if (res.data.code === 1) {
        setproduct(res.data.pdata);
      } else {
        seterror(true);
      }
    } catch (e) {
      seterror(true);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchProductDetails();
  }, [prodid]);

  return {
    product,
    loading,
    error,
    fetchProductDetails,
  };
}

export default useFetchProductDetails;