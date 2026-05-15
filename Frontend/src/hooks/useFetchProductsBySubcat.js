import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useFetchProductsBySubcat(scatid) {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchProductsBySubcat() {
    if (!scatid) {
      setproducts([]);
      return;
    }

    try {
      setloading(true);
      seterror(null);

      const res = await axios.get(
        `/api/product/bysubcat?scid=${scatid}`,
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
    fetchProductsBySubcat();
  }, [scatid]);

  return {
    products,
    loading,
    error,
    fetchProductsBySubcat,
  };
}

export default useFetchProductsBySubcat;