import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./product.css";
import Footer from "../footer/footer";

const Product = () => {
  const [watches, setWatches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [watchId, setWatchId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    color: "",
    strap: "",
    dial: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
    stock: 0,
    rating: 0,
    isActive: true,
    image: null,
  });

  const [formError, setFormError] = useState({});

  const WATCH_API = "https://eldorado-watch.onrender.com/api/watches";
  const CATEGORY_API = "https://eldorado-watch.onrender.com/api/categories";

  const getWatches = async () => {
    try {
      const res = await axios.get(WATCH_API);
      if (res.data.success) setWatches(res.data.watches);
    } catch {
      alert("Failed to fetch watches");
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } catch {
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getWatches();
    getCategories();
  }, []);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files });
  };

  const resetForm = () => {
    setForm({
      title: "",
      brand: "",
      model: "",
      color: "",
      strap: "",
      dial: "",
      description: "",
      price: "",
      discount: 0,
      category: "",
      stock: 0,
      rating: 0,
      isActive: true,
      image: null,
    });
    setWatchId(null);
    setFormError({});
  };

  const onSubmit = async () => {
    let errors = {};
    if (!form.title.trim()) errors.title = "Title required";
    if (!form.brand.trim()) errors.brand = "Brand required";
    if (!form.description.trim()) errors.description = "Description required";
    if (!form.price) errors.price = "Price required";
    if (!form.category) errors.category = "Category required";
    if (!form.image && !watchId) errors.image = "Image required";

    if (Object.keys(errors).length) {
      setFormError(errors);
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (key !== "image") formData.append(key, form[key]);
    });

    if (form.image) {
      for (let i = 0; i < form.image.length; i++) {
        formData.append("images", form.image[i]);
      }
    }

    try {
      if (watchId) {
        await axios.put(`${WATCH_API}/${watchId}`, formData);
        Swal.fire({
          title: "Updated!",
          text: "Watch updated successfully",
          icon: "success",
          confirmButtonColor: "#111111",
        });
      } else {
        await axios.post(WATCH_API, formData);
        Swal.fire({
          title: "Created!",
          text: "Watch added successfully",
          icon: "success",
          confirmButtonColor: "#111111",
        });
      }
      resetForm();
      getWatches();
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Failed",
        icon: "error",
        confirmButtonColor: "#111111",
      });
    }
  };

  const deleteWatch = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b48a1e",
      cancelButtonColor: "#111111",
      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        axios.delete(`${WATCH_API}/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Watch removed",
            icon: "success",
            confirmButtonColor: "#111111",
          });
          getWatches();
        });
      }
    });
  };

  const renderWatches = () =>
    watches.map((w) => (
      <tr key={w._id}>
        <td>
          <img
            src={`https://eldorado-watch.onrender.com/uploadPro/${w.image[0]}`}
            alt={w.title || "Watch"}
            onError={(e) => (e.target.src = "/no-image.png")}
          />
        </td>
        <td className="prod-title-cell">{w.title}</td>
        <td>{w.brand}</td>
        <td>{w.model}</td>
        <td>{w.color}</td>
        <td>{w.strap}</td>
        <td>{w.dial}</td>
        <td className="prod-price-cell">₹{w.price}</td>
        <td>{w.discount}%</td>
        <td>{w.category?.name}</td>
        <td>{w.stock}</td>
        <td>★ {w.rating}</td>
        <td>
          <span className={`status-pill ${w.isActive ? "active" : "inactive"}`}>
            {w.isActive ? "Yes" : "No"}
          </span>
        </td>
        <td className="prod-actions-cell">
          <button
            type="button"
            className="prod-btn-edit"
            onClick={() => {
              setWatchId(w._id);
              setForm({
                title: w.title,
                brand: w.brand,
                model: w.model,
                color: w.color,
                strap: w.strap,
                dial: w.dial,
                description: w.description,
                price: w.price,
                discount: w.discount,
                category: w.category?._id,
                stock: w.stock,
                rating: w.rating,
                isActive: w.isActive,
                image: null,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Edit
          </button>
          <button
            type="button"
            className="prod-btn-delete"
            onClick={() => deleteWatch(w._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <div className="watch-page">
        <div className="prod-top-header">
          <span className="prod-eyebrow">ELDORADO WATCH · ADMIN</span>
          <h1 className="prod-page-title">Timepiece Inventory</h1>
          <p className="prod-page-subtitle">
            Add, update, and manage watch editions, specifications, pricing, and stock.
          </p>
        </div>

        <div className="watch-card">
          <div className="watch-card-header">
            <span className="prod-header-dot" />
            <span>{watchId ? "Edit Watch" : "Add Watch"}</span>
          </div>

          <div className="watch-card-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-title">Title</label>
                <input
                  id="prod-title"
                  name="title"
                  value={form.title}
                  onChange={changeHandler}
                  placeholder="Enter timepiece title"
                />
                {formError.title && <small className="error">{formError.title}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="prod-brand">Brand</label>
                <input
                  id="prod-brand"
                  name="brand"
                  value={form.brand}
                  onChange={changeHandler}
                  placeholder="Enter brand name"
                />
                {formError.brand && <small className="error">{formError.brand}</small>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-model">Model</label>
                <input
                  id="prod-model"
                  name="model"
                  value={form.model}
                  onChange={changeHandler}
                  placeholder="Model number / edition"
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-color">Color</label>
                <input
                  id="prod-color"
                  name="color"
                  value={form.color}
                  onChange={changeHandler}
                  placeholder="Case / finish color"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-strap">Strap</label>
                <input
                  id="prod-strap"
                  name="strap"
                  value={form.strap}
                  onChange={changeHandler}
                  placeholder="Leather, steel, ceramic..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-dial">Dial</label>
                <input
                  id="prod-dial"
                  name="dial"
                  value={form.dial}
                  onChange={changeHandler}
                  placeholder="Sunburst gold, chronograph..."
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="prod-desc">Description</label>
              <input
                id="prod-desc"
                name="description"
                value={form.description}
                onChange={changeHandler}
                placeholder="Brief editorial description of the watch"
              />
              {formError.description && <small className="error">{formError.description}</small>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-price">Price</label>
                <input
                  id="prod-price"
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={changeHandler}
                />
                {formError.price && <small className="error">{formError.price}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="prod-discount">Discount %</label>
                <input
                  id="prod-discount"
                  type="number"
                  name="discount"
                  value={form.discount}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-rating">Rating (0–5)</label>
                <input
                  id="prod-rating"
                  type="number"
                  name="rating"
                  value={form.rating}
                  onChange={changeHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="prod-stock">Stock</label>
                <input
                  id="prod-stock"
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prod-category">Category</label>
                <select
                  id="prod-category"
                  name="category"
                  value={form.category}
                  onChange={changeHandler}
                >
                  <option value="">-- Select Category --</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                {formError.category && <small className="error">{formError.category}</small>}
              </div>

              <div className="form-group">
                <label htmlFor="prod-images">Images</label>
                <input
                  id="prod-images"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                {formError.image && <small className="error">{formError.image}</small>}
              </div>
            </div>

            <div className="prod-checkbox-row">
              <label className="prod-checkbox-label" htmlFor="prod-active">
                <input
                  id="prod-active"
                  type="checkbox"
                  name="isActive"
                  checked={Boolean(form.isActive)}
                  onChange={changeHandler}
                />
                <span>Active in storefront catalog</span>
              </label>
            </div>

            <div className="prod-form-actions">
              {watchId && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                className="primary-btn"
                onClick={onSubmit}
              >
                {watchId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="prod-table-topbar">
            <span className="prod-table-title">Catalog Inventory</span>
            <span className="prod-table-count">
              {String(watches.length).padStart(2, "0")} ITEMS
            </span>
          </div>

          <div className="prod-table-scroll">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Color</th>
                  <th>Strap</th>
                  <th>Dial</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Rating</th>
                  <th>Active</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{renderWatches()}</tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;