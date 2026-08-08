
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
 import { fetchproductbyfilters } from "../redux/slices/productslice";
 import { addtocart } from "../redux/slices/cartslice";

function BestSeller() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.product
  );

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    dispatch(
      fetchproductbyfilters({
        sortby: "popularity",
        limit: 1,
      })
    );
  }, [dispatch]);

  const product = products?.[0];

  useEffect(() => {
    if (product?.images?.length > 0) {
      const firstImage =
        typeof product.images[0] === "string"
          ? product.images[0]
          : product.images[0].url;

      setMainImage(firstImage);
    }
  }, [product]);

  const handleQuantityChange = (type) => {
    if (type === "Plus") {
      setQuantity((prev) => prev + 1);
    }

    if (type === "Minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedColor && product?.colors?.length > 0) {
      toast.error("Select a color");
      return;
    }

    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error("Select a size");
      return;
    }

    setIsButtonDisabled(true);

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    try {
      await dispatch(
        addtocart({
          productid: product._id,
          quantity,
          size: selectedSize,
          color: selectedColor,
          guestId: localStorage.getItem("guestId"),
          userId: user?._id || null,
        })
      );

      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add cart");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    return image.url;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Best Seller Product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No bestseller product found.
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-widest text-[#8b7355]">
            Most Popular Product
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold mt-2">
            Best Seller
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4">
            {product.images?.map((image, index) => {
              const imageUrl = getImageUrl(image);

              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`thumbnail-${index}`}
                  onClick={() => setMainImage(imageUrl)}
                  className={`w-20 h-20 object-cover cursor-pointer border rounded transition ${
                    mainImage === imageUrl
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                />
              );
            })}
          </div>

          {/* Main Image */}
          <div className="w-full md:w-1/2">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-lg object-cover"
            />

            {/* Mobile thumbnails */}
            <div className="flex md:hidden gap-2 mt-4 overflow-x-auto">
              {product.images?.map((image, index) => {
                const imageUrl = getImageUrl(image);

                return (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`mobile-thumb-${index}`}
                    onClick={() => setMainImage(imageUrl)}
                    className={`w-16 h-16 object-cover cursor-pointer border rounded ${
                      mainImage === imageUrl
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">

            <div className="mb-3">
              <span className="text-sm text-[#8b7355] uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <p className="text-2xl font-semibold">
                AED {product.price}
              </p>

              {product.discountprice && (
                <p className="text-lg text-gray-400 line-through">
                  AED {product.discountprice}
                </p>
              )}
            </div>

            {product.rating && (
              <div className="mb-4">
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.rating}
                </span>
              </div>
            )}

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <h3 className="font-medium mb-2">Color</h3>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-5">
                <h3 className="font-medium mb-2">Size</h3>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded transition ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
           
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange("Minus")}
                  className="w-10 h-10 border rounded hover:bg-gray-100"
                >
                  -
                </button>

                <span className="text-lg font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange("Plus")}
                  className="w-10 h-10 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

          
         

            {/* Add To Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSeller;
