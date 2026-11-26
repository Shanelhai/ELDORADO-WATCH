import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./category.css";
import Footer from "../footer/footer";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [form, setForm] = useState({ name: "" });
  const [formError, setFormError] = useState({ name: "" });

  const API_URL = "https://eldorado-watch.onrender.com/api/categories";

  const getCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (error) {
      alert("Unable to fetch categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveCategory = async () => {
    try {
      await axios.post(API_URL, { name: form.name });
      alert("Category created successfully");
      getCategories();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error creating category");
    }
  };

  const updateCategory = async () => {
    try {
      await axios.put(`${API_URL}/${categoryId}`, { name: form.name });
      alert("Category updated successfully");
      getCategories();
      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error updating category");
    }
  };

  const deleteCategory = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b48a1e",
      cancelButtonColor: "#111111",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}/${_id}`)
          .then((response) => {
            alert(response.data.message);
            getCategories();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  };

  const onSubmit = () => {
    if (!form.name.trim()) {
      setFormError({ name: "Category name is required!" });
    } else {
      setFormError({ name: "" });
      categoryId ? updateCategory() : saveCategory();
    }
  };

  const resetForm = () => {
    setForm({ name: "" });
    setCategoryId(null);
    setFormError({ name: "" });
  };

  const renderCategories = () =>
    categories.map((cat, idx) => (
      <tr key={cat._id}>
        <td data-label="Index">
          <span className="cat-index">{String(idx + 1).padStart(2, "0")}</span>
        </td>
        <td data-label="Category Name">
          <span className="cat-name">{cat.name}</span>
        </td>
        <td data-label="Actions" className="cat-actions-cell">
          <button
            type="button"
            className="cat-btn-edit"
            onClick={() => {
              setCategoryId(cat._id);
              setForm({ name: cat.name });
              setFormError({ name: "" });
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="cat-btn-delete"
            onClick={() => deleteCategory(cat._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="page-wrapper">
        <div className="category-top-banner">
          <span className="category-eyebrow">ELDORADO WATCH · ADMIN</span>
          <h1 className="category-page-title">Category Management</h1>
          <p className="category-page-subtitle">
            Organize and refine timepiece categories across your collection.
          </p>
        </div>

        <div className="custom-card">
          <div className="custom-card-header">
            <span className="header-dot" />
            <span>{categoryId ? "Edit Category" : "Add Category"}</span>
          </div>

          <div className="custom-card-body">
            <div className="form-group">
              <label className="form-label" htmlFor="category-name-input">
                Category Name
              </label>
              <input
                id="category-name-input"
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g., Chronograph, Automatic, Dress"
                value={form.name}
                onChange={changeHandler}
              />
              {formError.name && (
                <p className="text-danger">{formError.name}</p>
              )}
            </div>
          </div>

          <div className="custom-card-footer">
            {categoryId && (
              <button
                type="button"
                className="Cbtn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              className="Cbtn-primary"
              onClick={onSubmit}
            >
              {categoryId ? "Update" : "Save"}
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-topbar">
            <span className="table-title">All Categories</span>
            <span className="table-count">
              {String(categories.length).padStart(2, "0")} TOTAL
            </span>
          </div>

          <table className="customs-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderCategories()}</tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Category;