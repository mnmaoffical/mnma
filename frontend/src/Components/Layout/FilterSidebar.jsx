import React from "react";
import { useTranslation } from "react-i18next";

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedColor,
  setSelectedColor,
  selectedSizes,
  setSelectedSizes,
  selectedMaterial,
  setSelectedMaterial,
}) {
  const { t } = useTranslation();
  const colors = ["red", "blue", "black", "green", "yellow", "gray", "white", "pink"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Wool", "Denim", "Polyester"];

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-e pb-6 md:pb-0 md:pe-6">
      <h2 className="mb-6 text-xl font-bold">{t('filter.title')}</h2>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">{t('filter.category')}</h3>

        <label className="mb-2 flex items-center cursor-pointer">
          <input
            type="radio"
            name="category"
            value="Top Wear"
            checked={selectedCategory === "Top Wear"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <span className="ms-2">{t('filter.topWear')}</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="category"
            value="Bottom Wear"
            checked={selectedCategory === "Bottom Wear"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <span className="ms-2">{t('filter.bottomWear')}</span>
        </label>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">{t('filter.gender')}</h3>

        <label className="mb-2 flex items-center cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Men"
            checked={selectedGender === "Men"}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <span className="ms-2">{t('filter.men')}</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="radio"
            name="gender"
            value="Women"
            checked={selectedGender === "Women"}
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <span className="ms-2">{t('filter.women')}</span>
        </label>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">{t('filter.color')}</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`h-8 w-8 rounded-full border-2 ${
                selectedColor === color ? "border-black scale-110" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">{t('filter.size')}</h3>
        {sizes.map((size) => (
          <label key={size} className="mb-2 flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedSizes.includes(size)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedSizes([...selectedSizes, size]);
                } else {
                  setSelectedSizes(selectedSizes.filter((s) => s !== size));
                }
              }}
            />
            <span className="ms-2">{size}</span>
          </label>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="mb-3 font-semibold">{t('filter.material')}</h3>
        {materials.map((material) => (
          <label key={material} className="mb-2 flex items-center cursor-pointer">
            <input
              type="radio"
              name="material"
              value={material}
              checked={selectedMaterial === material}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            />
            <span className="ms-2">{material}</span>
          </label>
        ))}
      </div>

      <button
        className="w-full rounded-lg bg-black py-2 text-white font-medium hover:bg-gray-800 transition"
        onClick={() => {
          setSelectedCategory("");
          setSelectedGender("");
          setSelectedColor("");
          setSelectedSizes([]);
          setSelectedMaterial("");
        }}
      >
        {t('filter.clearFilters')}
      </button>
    </aside>
  );
}