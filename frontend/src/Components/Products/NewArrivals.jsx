import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronsRight, FiChevronRight, FiChevronsLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArrivals } from "../../redux/slices/productslice";
import { useTranslation } from "react-i18next";

export default function NewArrivals() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [initialScrollLeft, setInitialScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const rawNewArrivals = useSelector((state) => state.product?.newArrivals);
  const loading = useSelector((state) => state.product?.loading || false);
  const newArrivals = rawNewArrivals || [];

  useEffect(() => {
    dispatch(fetchNewArrivals());
  }, [dispatch]);

  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const leftScroll = Math.abs(container.scrollLeft);
    const rightScrollable =
      container.scrollWidth > leftScroll + container.clientWidth + 1;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  };

  useEffect(() => {
    const id = requestAnimationFrame(checkScrollButtons);
    return () => cancelAnimationFrame(id);
  }, [newArrivals.length]);

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

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    const actualAmount = isRtl ? -scrollAmount : scrollAmount;
    scrollRef.current.scrollBy({ left: actualAmount, behavior: "smooth" });
    setTimeout(checkScrollButtons, 150);
  };

  const formatPrice = (price) => {
    const val = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(val);
    }
    return `AED ${val.toFixed(2)}`;
  };

  return (
    <section className="py-16 px-4 lg:px-0 select-none">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">{t('newArrivals.title')}</h2>
        <p className="text-lg text-gray-600 mb-8">
          {t('newArrivals.subtitle')}
        </p>

        {/* Carousel Slide Action Buttons */}
        <div className="absolute end-0 bottom-[-30px] flex gap-2 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label={t('newArrivals.scrollLeft')}
            className={`p-2 rounded border transition-colors ${
              canScrollLeft
                ? "bg-white text-black hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isRtl ? <FiChevronRight className="text-2xl" /> : <FiChevronLeft className="text-2xl" />}
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label={t('newArrivals.scrollRight')}
            className={`p-2 rounded border transition-colors ${
              canScrollRight
                ? "bg-white text-black hover:bg-gray-50 cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isRtl ? <FiChevronsLeft className="text-2xl" /> : <FiChevronsRight className="text-2xl" />}
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
        className={`container mx-auto overflow-x-auto no-scrollbar flex gap-6 pb-6 relative ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {loading ? (
          <div className="py-20 text-gray-500 w-full text-center font-medium animate-pulse">
            {t('newArrivals.loading')}
          </div>
        ) : newArrivals.length > 0 ? (
          newArrivals.map((product) => {
            const imageUrl = product.images?.[0]?.url;
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
                    <span className="text-sm">{t('newArrivals.noImage')}</span>
                  </div>
                )}

                {/* Info Display Overlay Card */}
                <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur-md text-white p-5 transition-opacity duration-200">
                  <Link to={`/product/${product._id}`} className="block group">
                    <h4 className="font-medium text-lg truncate group-hover:underline">
                      {product.name}
                    </h4>
                    <p className="mt-1 font-semibold text-gray-200">
                      {formatPrice(product.price)}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-gray-500 w-full text-center border-2 border-dashed border-gray-200 rounded-xl">
            {t('newArrivals.empty')}
          </div>
        )}
      </div>
    </section>
  );
}