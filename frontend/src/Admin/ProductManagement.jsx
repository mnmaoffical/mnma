import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import {
  fetchadminproduct,
  createproduct,
  updateproduct,
  deleteproduct,
} from "../redux/slices/adminproductslice";
import { useTranslation } from "react-i18next";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  discountprice: "",
  countinstock: "",
  category: "",
  brand: "",
  collections: "",
  material: "",
  gender: "",
  sku: "",
  sizes: "",
  colors: "",
  tags: "",
  dimensions: "",
  weight: "",
  image: null,
  imagePreview: "",
  isfeatured: false,
  ispublised: true,
};

export default function ProductManagement() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const dispatch = useDispatch();

  const { products = [], loading = false, error = null } = useSelector(
    (state) => state.adminproduct || {}
  );

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    dispatch(fetchadminproduct());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({
      ...prev,
      image: file,
      imagePreview: file ? URL.createObjectURL(file) : "",
    }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setSubmitError("");
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setSubmitError("");
    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price ?? "",
      discountprice: item.discountprice ?? "",
      countinstock: item.countinstock ?? "",
      category: item.category || "",
      brand: item.brand || "",
      collections: item.collections || "",
      material: item.material || "",
      gender: item.gender || "",
      sku: item.sku || "",
      sizes: Array.isArray(item.sizes) ? item.sizes.join(", ") : "",
      colors: Array.isArray(item.colors) ? item.colors.join(", ") : "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      dimensions: item.dimensions || "",
      weight: item.weight ?? "",
      image: null,
      imagePreview: Array.isArray(item.images) && item.images[0] ? item.images[0].url : "",
      isfeatured: !!item.isfeatured,
      ispublised: item.ispublised !== undefined ? item.ispublised : true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('admin.products.deleteConfirm'))) return;
    try {
      await dispatch(deleteproduct(id)).unwrap();
    } catch (err) {
      alert(err || t('admin.products.deleteFailed'));
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.imageurl;
  };

  const parseList = (str) =>
    str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const buildPayload = async () => {
    let imageUrl = ""; 

    if (form.image) {
      imageUrl = await uploadImage(form.image);
    } else if (form.imagePreview) {
      imageUrl = form.imagePreview;
    }

    return {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      discountprice: form.discountprice === "" ? 0 : Number(form.discountprice),
      countinstock: Number(form.countinstock),
      category: form.category.trim(),
      brand: form.brand.trim(),
      collections: form.collections.trim(),
      material: form.material.trim(),
      gender: form.gender.trim(),
      sku: form.sku.trim(),
      sizes: parseList(form.sizes),
      colors: parseList(form.colors),
      tags: parseList(form.tags),
      dimensions: form.dimensions.trim(),
      weight: form.weight === "" ? 0 : Number(form.weight),
      images: imageUrl ? [{ url: imageUrl, alttext: form.name.trim() }] : [],
      isfeatured: form.isfeatured,
      ispublised: form.ispublised,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    try {
      const payload = await buildPayload();

      if (editingId) {
        await dispatch(updateproduct({ id: editingId, productdata: payload })).unwrap();
        toast.success(t('admin.products.updateProduct'));
      } else {
        await dispatch(createproduct(payload)).unwrap();
        toast.success(t('admin.products.addProduct'));
      }

      resetForm();
      dispatch(fetchadminproduct());
    } catch (err) {
      const msg = typeof err === "string" ? err : err?.message || t('admin.products.failedToSave');
      setSubmitError(msg);
    }
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t('admin.products.title')}</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow mb-10"
      >
        <h2 className="text-xl font-semibold">
          {editingId ? t('admin.products.editProduct') : t('admin.products.addNew')}
        </h2>

        {submitError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {submitError}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.productName')}</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.description')}</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
            rows="4"
            required
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.price')}</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.discountPrice')}</label>
            <input
              type="number"
              name="discountprice"
              value={form.discountprice}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Stock & SKU */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.countInStock')}</label>
            <input
              type="number"
              name="countinstock"
              value={form.countinstock}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.sku')}</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.category')}</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.brand')}</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
        </div>

        {/* Collections & Material */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.collections')}</label>
            <input
              type="text"
              name="collections"
              value={form.collections}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.material')}</label>
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.gender')}</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="border p-2 rounded w-full text-sm"
          >
            <option value="">{t('admin.products.labels.selectGender')}</option>
            <option value="Men">{t('admin.products.labels.men')}</option>
            <option value="Women">{t('admin.products.labels.women')}</option>
            <option value="Unisex">{t('admin.products.labels.unisex')}</option>
          </select>
        </div>

        {/* Sizes, Colors, Tags */}
        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.sizes')}</label>
          <input
            type="text"
            name="sizes"
            value={form.sizes}
            onChange={handleChange}
            placeholder={t('admin.products.labels.sizesPlaceholder')}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.colors')}</label>
          <input
            type="text"
            name="colors"
            value={form.colors}
            onChange={handleChange}
            placeholder={t('admin.products.labels.colorsPlaceholder')}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.tags')}</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder={t('admin.products.labels.tagsPlaceholder')}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {/* Dimensions & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.dimensions')}</label>
            <input
              type="text"
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">{t('admin.products.labels.weight')}</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="border p-2 rounded w-full text-sm"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">{t('admin.products.labels.productImage')}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full text-sm"
          />
        </div>

        {form.imagePreview && (
          <img
            src={form.imagePreview}
            alt="preview"
            className="w-24 h-24 object-cover rounded border"
          />
        )}

        {/* Checkboxes */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input
              type="checkbox"
              name="isfeatured"
              checked={form.isfeatured}
              onChange={handleChange}
            />
            {t('admin.products.labels.isFeatured')}
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
            <input
              type="checkbox"
              name="ispublised"
              checked={form.ispublised}
              onChange={handleChange}
            />
            {t('admin.products.labels.isPublished')}
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded disabled:bg-gray-400 font-medium transition"
          >
            {loading ? t('admin.products.saving') : editingId ? t('admin.products.updateProduct') : t('admin.products.addProduct')}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-6 rounded font-medium transition"
            >
              {t('admin.products.cancel')}
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <h2 className="text-2xl font-semibold mb-4">
        {t('admin.products.productCount', { count: products.length })}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && products.length === 0 && (
        <p className="text-gray-500 text-center py-8">{t('admin.products.loading')}</p>
      )}

      <div className="grid gap-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 shadow bg-white flex gap-4"
          >
            {Array.isArray(item.images) && item.images[0]?.url && (
              <img
                src={item.images[0].url}
                alt={item.images[0].alttext || item.name}
                className="w-24 h-24 object-cover rounded border flex-shrink-0"
              />
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <div className="grid grid-cols-2 gap-x-4 text-sm">
                <p><strong>{t('admin.products.labels.price_lbl')}</strong> {formatPrice(item.price)}</p>
                <p><strong>{t('admin.products.labels.discount_lbl')}</strong> {formatPrice(item.discountprice || 0)}</p>
                <p><strong>{t('admin.products.labels.stock_lbl')}</strong> {item.countinstock}</p>
                <p><strong>{t('admin.products.labels.sku_lbl')}</strong> {item.sku}</p>
                <p><strong>{t('admin.products.labels.category_lbl')}</strong> {item.category}</p>
                <p><strong>{t('admin.products.labels.brand_lbl')}</strong> {item.brand}</p>
                <p><strong>{t('admin.products.labels.gender_lbl')}</strong> {item.gender}</p>
                <p><strong>{t('admin.products.labels.collections_lbl')}</strong> {item.collections}</p>
                <p>
                  <strong>{t('admin.products.labels.sizes_lbl')}</strong>{" "}
                  {Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes}
                </p>
                <p>
                  <strong>{t('admin.products.labels.colors_lbl')}</strong>{" "}
                  {Array.isArray(item.colors) ? item.colors.join(", ") : item.colors}
                </p>
              </div>

              <div className="flex gap-2 mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.ispublised
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {item.ispublised ? t('admin.products.published') : t('admin.products.draft')}
                </span>
                {item.isfeatured && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                    {t('admin.products.featured')}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition"
              >
                {t('admin.products.edit')}
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition disabled:bg-gray-400"
              >
                {t('admin.products.delete')}
              </button>
            </div>
          </div>
        ))}

        {products.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-8">{t('admin.products.noProducts')}</p>
        )}
      </div>
    </div>
  );
}