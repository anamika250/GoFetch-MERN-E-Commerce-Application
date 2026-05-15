import axios from "../utils/axiosConfig";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCategories from "../hooks/useFetchCategories";

function ManageCategory() {
  const [cname, setcname] = useState("");
  const [picfile, setpicfile] = useState(null);
  const [picname, setpicname] = useState("");
  const [editmode, seteditmode] = useState(false);
  const [catid, setcatid] = useState("");
  const fileref = useRef();
  const API = process.env.REACT_APP_APIURL;
  const { allcat, fetchCategories } = useFetchCategories();

  useEffect(() => {
    document.title = "Manage Category";
  }, []);

  /* ======================================================
     ADD / UPDATE
  ====================================================== */

  async function handlesubmit(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("catname", cname);

      if (picfile) {
        formData.append("pic", picfile);
      }

      // UPDATE

      if (editmode) {
        formData.append("oldpicname", picname);

        formData.append("cid", catid);

        const res = await axios.put("/api/category/update", formData);

        if (res.data.code === 1) {
          toast.success("Category updated");

          fetchCategories();

          handlecancel();
        } else {
          toast.error(res.data.msg);
        }
      } else {
        // ADD

        const res = await axios.post("/api/category/add", formData);

        if (res.data.code === 1) {
          toast.success("Category added");

          fetchCategories();

          setcname("");

          setpicfile(null);

          fileref.current.value = "";
        } else {
          toast.error(res.data.msg);
        }
      }
    } catch (err) {
      toast.error("Error: " + err.message);
    }
  }

  /* ======================================================
     EDIT
  ====================================================== */

  function updateCategory(data) {
    seteditmode(true);

    setcname(data.catname);

    setpicname(data.picname);

    setcatid(data._id);
  }

  /* ======================================================
     CANCEL
  ====================================================== */

  function handlecancel() {
    seteditmode(false);

    setcname("");

    setpicname("");

    setcatid("");

    setpicfile(null);

    fileref.current.value = "";
  }

  /* ======================================================
     DELETE
  ====================================================== */

  async function deleteCategory(cid) {
    try {
      if (!window.confirm("Delete this category?")) return;

      const res = await axios.delete(`/api/category/delete/${cid}`);

      if (res.data.code === 1) {
        toast.success("Deleted successfully");

        fetchCategories();
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
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

            <li className="active">Manage Category</li>
          </ol>
        </div>
      </div>

      {/* PAGE */}

      <div className="manage-category-page">
        <div className="manage-category-container">
          {/* HEADER */}

          <div className="manage-category-header">
            <h2>Manage Categories</h2>

            <p>Create, update and organize grocery categories.</p>
          </div>

          {/* FORM */}

          <form onSubmit={handlesubmit} className="manage-category-form">
            <div className="manage-category-fields">
              {/* CATEGORY NAME */}

              <input
                type="text"
                value={cname}
                placeholder="Category Name"
                onChange={(e) => setcname(e.target.value)}
              />

              {/* FILE */}

              <input
                type="file"
                ref={fileref}
                onChange={(e) => setpicfile(e.target.files[0])}
              />

              {/* PREVIEW */}

              {editmode && (
                <div className="manage-category-preview">
                  <img src={`${API}/uploads/${picname}`} alt="" />
                </div>
              )}
            </div>

            {/* BUTTONS */}

            <div className="manage-category-actions">
              <button type="submit" className="manage-category-btn primary">
                {editmode ? "Update Category" : "Add Category"}
              </button>

              {editmode && (
                <button
                  type="button"
                  onClick={handlecancel}
                  className="manage-category-btn secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* TABLE */}

          {allcat.length > 0 ? (
            <div className="manage-category-table-wrap">
              <table className="manage-category-table">
                <thead>
                  <tr>
                    <th>Image</th>

                    <th>Category</th>

                    <th>Edit</th>

                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {allcat.map((d) => (
                    <tr key={d._id}>
                      {/* IMAGE */}

                      <td>
                        <img src={`${API}/uploads/${d.picname}`} alt="" />
                      </td>

                      {/* NAME */}

                      <td className="manage-category-name">{d.catname}</td>

                      {/* EDIT */}

                      <td>
                        <button
                          onClick={() => updateCategory(d)}
                          className="manage-table-btn edit"
                        >
                          Edit
                        </button>
                      </td>

                      {/* DELETE */}

                      <td>
                        <button
                          onClick={() => deleteCategory(d._id)}
                          className="manage-table-btn delete"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="manage-category-empty">
              <h3>No categories found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ManageCategory;
