import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useFetchSubcategories(catid) {
  const [subcategories, setsubcategories] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchSubcategories() {
    if (!catid) {
      setsubcategories([]);
      return;
    }

    try {
      setloading(true);
      seterror(null);

      const res = await axios.get(
        `/api/subcategory/by-category?cid=${catid}`,
      );

      if (res.data.code === 1) {
        setsubcategories(res.data.scdata);
      } else {
        setsubcategories([]);
      }
    } catch (e) {
      seterror(e.message);
      setsubcategories([]);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchSubcategories();
  }, [catid]);

  return {
    subcategories,
    loading,
    error,
    fetchSubcategories,
  };
}

export default useFetchSubcategories;