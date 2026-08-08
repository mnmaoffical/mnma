import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronsRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals } from "../../redux/slices/productslice";

export default function NewArrivals() {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  // Slider interaction UI states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // FIX 1: Accessing 'state.product' (matching your exact Redux store state shape)
  // FIX 2: Removed '|| []' inside the selector to stop infinite re-render loops
  const rawNewArrivals = useSelector((state) => state.product?.newArrivals);
  const loading = useSelector((state) => state.product?.loading || false);

  // Safely default to an array reference outside the selector lifecycle
  const newArrivals = rawNewArrivals || [];

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  // Utility to determine if slider controls should be active/inactive
  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const leftScroll = container.scrollLeft;
    const rightScrollable =
      container.scrollWidth > leftScroll + container.clientWidth + 1;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  };

  
  useEffect(() => {
    const id = requestAnimationFrame(checkScrollButtons);
    return () => cancelAnimationFrame(id);
  }, [newArrivals.length]);

  // Mouse Drag Handling Methods
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setInitialScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = initialScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    checkScrollButtons();
  };

  // Click handler for left/right manual buttons
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    setTimeout(checkScrollButtons, 150);
  };

  return (
    <section className="py-16 px-4 lg:px-0 select-none">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles freshly added to keep your look on trend.
        </p>

        {/* Carousel Slide Action Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll Left"
            className={`p-2 rounded border transition-colors ${
              canScrollLeft
                ? "bg-white text-black hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll Right"
            className={`p-2 rounded border transition-colors ${
              canScrollRight
                ? "bg-white text-black hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronsRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Horizontal Drag-To-Scroll Wrapper */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`container mx-auto overflow-x-auto no-scrollbar flex space-x-6 pb-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {loading ? (
          <div className="py-20 text-gray-500 w-full text-center font-medium animate-pulse">
            Loading new arrivals...
          </div>
        ) : newArrivals.length > 0 ? (
          newArrivals.map((product) => {
            const imageUrl = product.images?.[0]?.url;
            
            // FIX 4: Explicitly guarding against empty strings ("") or missing fields
            const hasValidImage = imageUrl && imageUrl.trim() !== "";

            return (
              <div
                key={product._id}
                className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative group overflow-hidden rounded-lg shadow-sm bg-gray-50"
              >
                {hasValidImage ? (
                  <img
                    src={imageUrl}
                    alt={product.images?.[0]?.altText || product.name}
                    className="w-full h-[500px] object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-[500px] bg-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2">
                    <span className="text-sm">No Image Available</span>
                  </div>
                )}

                {/* Info Display Overlay Card */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md text-white p-5 transition-opacity duration-200">
                  <Link to={`/product/${product._id}`} className="block group">
                    <h4 className="font-medium text-lg truncate group-hover:underline">
                      {product.name}
                    </h4>
                    <p className="mt-1 font-semibold text-gray-200">
                      AED {Number(product.price).toFixed(2)}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-gray-500 w-full text-center border-2 border-dashed border-gray-200 rounded-xl">
            No new arrivals found at the moment.
          </div>
        )}
      </div>
    </section>
  );
}