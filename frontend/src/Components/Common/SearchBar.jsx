import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { setfilters } from "../../redux/slices/productslice"; // adjust path if needed

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchToggle = () => setIsOpen(!isOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update search filter in Redux
    dispatch(setfilters({ search: searchTerm }));
    // Optionally close search on submit
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm("");
    dispatch(setfilters({ search: "" }));
  };

  return (
    <div
      className={`flex items-center justify-center transition-all duration-300 ${
        isOpen
          ? "absolute top-0 left-0 w-full bg-white h-full z-50 p-6"
          : "w-auto"
      }`}
    >
      {isOpen ? (
        <form onSubmit={handleSubmit} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2 max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              autoFocus
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                title="Clear search"
              >
                <HiMiniXMark className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className="p-2">
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;