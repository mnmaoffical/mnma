import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchproductbyfilters } from "../redux/slices/productslice";
import { useTranslation } from "react-i18next";

export default function TopItems() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const dispatch = useDispatch();

  const {
    products: bestSellers,
    loading,
    error,
    filters,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      fetchproductbyfilters({
        sortby: filters.search ? "" : "popularity",
        search: filters.search,
        limit: filters.search ? 100 : 8,
      })
    );
  }, [dispatch, filters.search]);

  const getImageUrl = (product) => {
    if (!product?.images?.length) {
      return "https://via.placeholder.com/300";
    }

    const image = product.images[0];

    if (typeof image === "string") {
      return image.startsWith("http")
        ? image
        : `http://localhost:5000/${image}`;
    }

    if (typeof image === "object" && image.url) {
      return image.url.startsWith("http")
        ? image.url
        : `http://localhost:5000/${image.url}`;
    }

    return "https://via.placeholder.com/300";
  };

  const formatPrice = (price) => {
    const val = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(val);
    }
    return `AED ${val}`;
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        {t('topItems.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 font-medium">
        {error || t('topItems.loadError')}
      </div>
    );
  }

  return (
    <section className="bg-gray-50 px-4 sm:px-6 py-10 sm:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {t('topItems.title')}
          </h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            {t('topItems.subtitle')}
          </p>
        </div>

        {bestSellers.length > 0 ? (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="group rounded-2xl bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={getImageUrl(product)}
                    alt={product.name}
                    className="h-[260px] sm:h-[300px] lg:h-[320px] w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-1 p-4 sm:p-5">
                  <p className="text-xs uppercase text-[#8b7355] tracking-wider font-semibold">
                    {product.category}
                  </p>

                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {product.name}
                  </h4>

                  <div className="flex items-center justify-between pt-1">
                    <p className="font-semibold text-base sm:text-lg">
                      {formatPrice(product.price)}
                    </p>

                    <div className="rounded-full border p-2 sm:p-3 transition hover:bg-black hover:text-white">
                      <ShoppingBag size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            {t('topItems.empty')}
          </div>
        )}
      </div>
    </section>
  );
}