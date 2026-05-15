import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useFetchFeaturedProducts() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchFeaturedProducts() {
    try {
      setloading(true);
      seterror(null);

      const res = await axios.get("/api/product/featured");

      if (res.data.code === 1) {
        setproducts(res.data.pdata);
      } else {
        setproducts([]);
      }
    } catch (e) {
      seterror(e.message);
      setproducts([]);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchFeaturedProducts,
  };
}

export default useFetchFeaturedProducts;