import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, X, Filter } from "lucide-react";
import FilterSidebar from "../Components/Layout/FilterSidebar";
import { fetchproductbyfilters } from "../redux/slices/productslice";
import { Link } from "react-router-dom";

export default function AllCollection() {
  const dispatch = useDispatch();
  const { products, loading, error, filters } = useSelector((state) => state.product);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGender, setSelectedGender] = useState(""); // no gender filter by default
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  // Image helper (same as MensSection)
  const getImageUrl = (product) => {
    const img = product.images?.[0];

    if (!img) return "https://via.placeholder.com/300";

    if (typeof img === "string") {
      return img.startsWith("http") ? img : `http://localhost:5000/${img}`;
    }

    if (typeof img === "object" && img.url) {
      return img.url.startsWith("http")
        ? img.url
        : `http://localhost:5000/${img.url}`;
    }

    return "https://via.placeholder.com/300";
  };


  useEffect(() => {
   dispatch(
  fetchproductbyfilters({
    collection: "",
    size: selectedSizes.join(","),
    color: selectedColor,
    gender: selectedGender,
    minprice: "",
    maxprice: "",
    sortby: "",
    search: filters.search,
    category: selectedCategory,
    material: selectedMaterial,
    brand: "",
    limit: 100,
  })
);
  }, [
    dispatch,
    selectedCategory,
    selectedGender,
    selectedColor,
    selectedSizes,
    selectedMaterial,
    filters.search,
  
  ]);

  // Header section (same as MensSection)
  const Header = () => (
    <div className="px-4 sm:px-6 py-4 sm:py-5 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <p className="mb-2 sm:mb-3 text-xs sm:text-sm font-medium uppercase tracking-[3px] sm:tracking-[4px] text-[#8b7355]">
            ALL COLLECTION
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-[#1a1a1a]">
            Complete Fashion Catalog
            <span className="block text-[#8b7355]">
              For Every Style Preference
            </span>
          </h2>
        </div>

        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 bg-white border-2 border-[#8b7355] rounded-full text-[#8b7355] font-semibold hover:bg-[#8b7355] hover:text-white transition duration-300 shadow-sm hover:shadow-md"
        >
          <Filter size={12} className="sm:size-12" />
          <span className="text-sm sm:text-base">Filters</span>
        </button>
      </div>
    </div>
  );

  // Filter modal (same structure as MensSection)
  const FilterModal = () =>
    showFilters && (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => setShowFilters(false)}
        />

        {/* Modal Content */}
        <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
          <div className="w-full h-full bg-white shadow-xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200">
              <h3 className="text-sm sm:text-xl font-semibold text-[#1a1a1a]">
                Filter Products
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 sm:p-2 rounded-full hover:bg-gray-100 transition duration-200"
              >
                <X size={24} className="text-[#1a1a1a]" />
              </button>
            </div>

            {/* Filter Sidebar Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5">
              <FilterSidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                selectedMaterial={selectedMaterial}
                setSelectedMaterial={setSelectedMaterial}
              />
            </div>

            {/* Apply Button */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-200">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-[#8b7355] text-white font-semibold rounded-full hover:bg-[#7a6345] transition duration-300 shadow-md hover:shadow-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  // Products section (same grid as MensSection)
  const ProductsSection = () => (
    <section className="px-4 sm:px-6 py-6 sm:py-8 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500 text-sm sm:text-base">
              Loading Products...
            </p>
          </div>
        ) : error ? (
          <div className="flex justify-center py-20">
            <p className="text-red-500 text-sm sm:text-base">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-gray-500 text-sm sm:text-base">
              No Products Found
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg block"
              >
                <div className="overflow-hidden">
                  <img
                    src={getImageUrl(product)}
                    alt={product.name}
                    className="h-[260px] sm:h-[300px] lg:h-[320px] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1 p-4 sm:p-5">
                  <p className="text-xs uppercase text-[#8b7355] tracking-wider">
                    {product.category}
                  </p>

                  <h4 className="text-sm font-semibold sm:text-base truncate">
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between gap-3 pt-1">
                    <p className="font-semibold text-base sm:text-lg">
                      AED {product.price}
                    </p>

                    <button className="rounded-full border p-2 sm:p-3 transition hover:bg-black hover:text-white">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FilterModal />
      <ProductsSection />
    </div>
  );
}