import axios from "../utils/axiosConfig";

import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

function ManageSubCategory() {
  const API = process.env.REACT_APP_APIURL;

  const [scname, setscname] = useState("");
  const [picfile, setpicfile] = useState(null);
  const [allcat, setallcat] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [picname, setpicname] = useState("");
  const [editmode, seteditmode] = useState(false);
  const [catid, setcatid] = useState("");
  const [scatid, setscatid] = useState("");
  const fileref = useRef();

  useEffect(() => {
    document.title = "Manage Sub Category";

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

    fetchSubCategories();
  }, [catid]);

  async function fetchSubCategories() {
    try {
      const res = await axios.get(`/api/subcategory/by-category?cid=${catid}`);

      setsubcatdata(res.data.scdata || []);
    } catch (e) {
      toast.error(e.message);
    }
  }

  async function handlesubmit(e) {
    e.preventDefault();

    if (!catid || !scname.trim()) {
      toast.error("Category and subcategory required");

      return;
    }

    try {
      const formData = new FormData();

      formData.append("cid", catid);

      formData.append("scatname", scname);

      if (picfile) {
        formData.append("pic", picfile);
      }

      let res;

      /* UPDATE */

      if (editmode) {
        formData.append("scid", scatid);

        formData.append("oldpicname", picname);

        res = await axios.put("/api/subcategory/update", formData);
      } else {
        /* ADD */

        res = await axios.post("/api/subcategory/add", formData);
      }

      if (res.data.code === 1) {
        toast.success(editmode ? "Subcategory updated" : "Subcategory added");

        fetchSubCategories();

        handlecancel();
      } else {
        toast.error(res.data.msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  function updateSubCategory(data) {
    seteditmode(true);

    setscname(data.subcatname);

    setpicname(data.picname);

    setscatid(data._id);
  }

  async function deleteSubCategory(id) {
    if (!window.confirm("Delete this subcategory?")) return;

    try {
      const res = await axios.delete(`/api/subcategory/delete/${id}`);

      if (res.data.code === 1) {
        toast.success("Deleted successfully");

        fetchSubCategories();
      } else {
        toast.error(res.data.msg);
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  function handlecancel() {
    seteditmode(false);

    setscname("");

    setpicname("");

    setscatid("");

    setpicfile(null);

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

            <li className="active">Manage Sub Category</li>
          </ol>
        </div>
      </div>

      {/* PAGE */}

      <div className="manage-product-page">
        <div className="manage-product-container">
          {/* HEADER */}

          <div className="manage-product-header">
            <h2>Manage Sub Categories</h2>

            <p>Create and organize grocery subcategories.</p>
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

              {/* NAME */}

              <input
                type="text"
                placeholder="Sub Category Name"
                value={scname}
                onChange={(e) => setscname(e.target.value)}
              />

              {/* FILE */}

              <input
                type="file"
                ref={fileref}
                onChange={(e) => setpicfile(e.target.files[0])}
              />
            </div>

            {/* PREVIEW */}

            {editmode && (
              <div className="manage-product-preview">
                <img src={`${API}/uploads/${picname}`} alt="" />
              </div>
            )}

            {/* BUTTONS */}

            <div className="manage-product-actions">
              <button type="submit" className="manage-product-btn primary">
                {editmode ? "Update Sub Category" : "Add Sub Category"}
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

          {/* LIST */}

          <div className="manage-products-list">
            {subcatdata.map((s) => (
              <div key={s._id} className="manage-product-card">
                {/* IMAGE */}

                <div className="manage-product-card-image">
                  <img src={`${API}/uploads/${s.picname}`} alt="" />
                </div>

                {/* CONTENT */}

                <div className="manage-product-card-content">
                  <h3>{s.subcatname}</h3>

                  <p className="manage-product-description">
                    Grocery subcategory management section.
                  </p>

                  {/* ACTIONS */}

                  <div className="manage-product-card-actions">
                    <button
                      className="manage-card-btn edit"
                      onClick={() => updateSubCategory(s)}
                    >
                      Edit
                    </button>

                    <button
                      className="manage-card-btn delete"
                      onClick={() => deleteSubCategory(s._id)}
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

export default ManageSubCategory;
