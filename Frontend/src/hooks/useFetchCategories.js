import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";

function useFetchCategories() {
  const [allcat, setallcat] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchCategories() {
    try {
      setloading(true);
      seterror(null);

      const res = await axios.get("/api/category/all");

      if (res.data.code === 1) {
        setallcat(res.data.cdata);
      } else {
        setallcat([]);
      }
    } catch (e) {
      seterror(e.message);
      setallcat([]);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    allcat,
    loading,
    error,
    fetchCategories,
  };
}

export default useFetchCategories;
