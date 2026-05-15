import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useSearchProducts(stext) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  async function searchProducts() {
    if (!stext || !stext.trim()) {
      setproducts([]);
      return;
    }

    try {
      setloading(true);
      seterror(null);

      const res = await axios.get(
        `/api/product/search?s=${encodeURIComponent(stext)}`,
      );

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
    searchProducts();
  }, [stext]);

  return {
    products,
    loading,
    error,
    searchProducts,
  };
}

export default useSearchProducts;
