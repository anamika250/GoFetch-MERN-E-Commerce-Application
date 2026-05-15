import axios from "../utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Manageproduct() {
  const API = process.env.REACT_APP_APIURL;

  const [pname, setpname] = useState("");
  const [rate, setrate] = useState("");
  const [discount, setdiscount] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [featured, setfeatured] = useState(false);
  const [picfile, setpicfile] = useState(null);
  const [picname, setpicname] = useState("");
  const [allcat, setallcat] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [productdata, setproductdata] = useState([]);
  const [catid, setcatid] = useState("");
  const [scatid, setscatid] = useState("");
  const [pid, setpid] = useState("");
  const [editmode, seteditmode] = useState(false);
  const fileref = useRef();


  useEffect(() => {
    document.title = "Manage Product";

    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await axios.get("/api/category/all");

      setallcat(res.data.cdata || []);
    } catch (e) {
      toast.error(e.message);
    }
  }

  useEffect(() => {
    if (!catid) return;

    axios
      .get(`/api/subcategory/by-category?cid=${catid}`)
      .then((res) => {
        setsubcatdata(res.data.scdata || []);
      })
      .catch((e) => toast.error(e.message));
  }, [catid]);

  useEffect(() => {
    if (!scatid) return;

    fetchProducts();
  }, [scatid]);

  async function fetchProducts() {
    try {
      const res = await axios.get(`/api/product/bysubcat?scid=${scatid}`);

      setproductdata(res.data.pdata || []);
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("cid", catid);

      formData.append("scid", scatid);

      formData.append("pname", pname);

      formData.append("rate", rate);

      formData.append("discount", discount);

      formData.append("description", description);

      formData.append("stock", stock);

      formData.append("featured", featured);

      if (picfile) {
        formData.append("pic", picfile);
      }

      let res;

      /* UPDATE */

      if (editmode) {
        formData.append("pid", pid);

        formData.append("oldpicname", picname);

        res = await axios.put("/api/product/update", formData);
      } else {
        /* ADD */

        res = await axios.post("/api/product/add", formData);
      }

      if (res.data.code === 1) {
        toast.success(editmode ? "Product updated" : "Product added");

        handlecancel();

        fetchProducts();
      } else {
        toast.error(res.data.msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function deleteproduct(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await axios.delete(`/api/product/delete/${id}`);

      if (res.data.code === 1) {
        toast.success("Deleted successfully");

        fetchProducts();
      } else {
        toast.error(res.data.msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  function updateproduct(data) {
    seteditmode(true);

    setpname(data.prodname);

    setrate(data.rate);

    setdiscount(data.discount);

    setdescription(data.description);

    setstock(data.stock);

    setfeatured(data.featured);

    setcatid(data.catid);

    setscatid(data.subcatid);

    setpicname(data.picname);

    setpid(data._id);
  }

  function handlecancel() {
    seteditmode(false);

    setpname("");

    setrate("");

    setdiscount("");

    setdescription("");

    setstock("");

    setfeatured(false);

    setpicname("");

    setpid("");

    setpicfile(null);

    setcatid("");

    setscatid("");

    if (fileref.current) {
      fileref.current.value = "";
    }
  }

  return (
    <>
      {/* BREADCRUMB */}

      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1">
            <li>
              <Link to="/adminhome">Home</Link>
            </li>

            <li className="active">Manage Product</li>
          </ol>
        </div>
      </div>

      {/* PAGE */}

      <div className="manage-product-page">
        <div className="manage-product-container">
          {/* HEADER */}

          <div className="manage-product-header">
            <h2>Manage Products</h2>

            <p>Add, edit and manage grocery products.</p>
          </div>

          {/* FORM */}

          <form onSubmit={handlesubmit} className="manage-product-form">
            <div className="manage-product-grid">
              {/* CATEGORY */}

              <select value={catid} onChange={(e) => setcatid(e.target.value)}>
                <option value="">Select Category</option>

                {allcat.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.catname}
                  </option>
                ))}
              </select>

              {/* SUBCATEGORY */}

              <select
                value={scatid}
                onChange={(e) => setscatid(e.target.value)}
              >
                <option value="">Select Subcategory</option>

                {subcatdata.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.subcatname}
                  </option>
                ))}
              </select>

              {/* PRODUCT NAME */}

              <input
                type="text"
                placeholder="Product Name"
                value={pname}
                onChange={(e) => setpname(e.target.value)}
              />

              {/* RATE */}

              <input
                type="number"
                placeholder="Rate"
                value={rate}
                onChange={(e) => setrate(e.target.value)}
              />

              {/* DISCOUNT */}

              <input
                type="number"
                placeholder="Discount %"
                value={discount}
                onChange={(e) => setdiscount(e.target.value)}
              />

              {/* STOCK */}

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setstock(e.target.value)}
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              ></textarea>

              {/* FILE */}

              <input
                type="file"
                ref={fileref}
                onChange={(e) => setpicfile(e.target.files[0])}
              />
            </div>

            {/* FEATURED */}

            <label className="manage-product-checkbox">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setfeatured(e.target.checked)}
              />
              Featured Product
            </label>

            {/* PREVIEW */}

            {editmode && (
              <div className="manage-product-preview">
                <img src={`${API}/uploads/${picname}`} alt="" />
              </div>
            )}

            {/* BUTTONS */}

            <div className="manage-product-actions">
              <button type="submit" className="manage-product-btn primary">
                {editmode ? "Update Product" : "Add Product"}
              </button>

              {editmode && (
                <button
                  type="button"
                  className="manage-product-btn secondary"
                  onClick={handlecancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* PRODUCTS */}

          <div className="manage-products-list">
            {productdata.map((p) => (
              <div key={p._id} className="manage-product-card">
                {/* IMAGE */}

                <div className="manage-product-card-image">
                  <img src={`${API}/uploads/${p.picname}`} alt="" />
                </div>

                {/* CONTENT */}

                <div className="manage-product-card-content">
                  <h3>{p.prodname}</h3>

                  <div className="manage-product-price">₹{p.rate}</div>

                  <p className="manage-product-description">
                    {p.description?.length > 90
                      ? p.description.slice(0, 90) + "..."
                      : p.description}
                  </p>

                  <span
                    className={`manage-stock ${p.stock > 0 ? "in" : "out"}`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>

                  {/* BUTTONS */}

                  <div className="manage-product-card-actions">
                    <button
                      className="manage-card-btn edit"
                      onClick={() => updateproduct(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="manage-card-btn delete"
                      onClick={() => deleteproduct(p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manageproduct;
