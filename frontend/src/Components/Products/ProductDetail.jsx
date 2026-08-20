import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addtocart } from "../../redux/slices/cartslice";
import { useTranslation } from "react-i18next";
 import { getEuSize } from "./sizeConversion";

function ProductDetail() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
        );

        setProduct(response.data);

        if (response.data.images?.length > 0) {
          const firstImage =
            typeof response.data.images[0] === "string"
              ? response.data.images[0]
              : response.data.images[0].url;

          setMainImage(firstImage);
        }
      } catch (error) {
        console.log(error);
        toast.error(t('productDetail.failedToLoad'));
      }
    };

    fetchProduct();
  }, [id, t]);

  const handleQuantityChange = (type) => {
    if (type === "Plus") {
      setQuantity((prev) => prev + 1);
    }

    if (type === "Minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedColor) {
      toast.error(t('productDetail.selectColor'));
      return;
    }

    if (!selectedSize) {
      toast.error(t('productDetail.selectSize'));
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

      toast.success(t('productDetail.addedToCart'));
    } catch (error) {
      toast.error(t('productDetail.failedToAdd'));
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (isRtl) {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount.toLocaleString()}`;
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen font-medium text-gray-500">
        {t('productDetail.loading')}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-4 sm:p-8 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">

          {/* thumbnails */}
          <div className="hidden md:flex flex-col space-y-4">
            {product.images?.map((image, index) => {
              const imageUrl =
                typeof image === "string" ? image : image.url;

              return (
                <img
                  key={index}
                  src={imageUrl}
                  alt=""
                  onClick={() => setMainImage(imageUrl)}
                  className="w-20 h-20 object-cover cursor-pointer border rounded"
                />
              );
            })}
          </div>

          {/* main image */}
          <div className="w-full md:w-1/2">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* details */}
          <div className="w-full md:w-1/2">
             <div className="mb-3">
              <span className="text-sm text-[#8b7355] uppercase tracking-wider font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-3">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold mb-4 text-gray-900">
              {formatPrice(product.price)}
            </p>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
             {product.rating && (
              <div className="mb-4">
                <span className="text-yellow-500 font-medium">
                  ⭐ {product.rating}
                </span>
              </div>
            )}

            {/* colors */}
            <div className="mb-5">
              <h3 className="font-medium mb-2">{t('productDetail.color')}</h3>

              <div className="flex gap-2">
                {product.colors?.map((color) => (
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

            {/* sizes */}
  {/* sizes */}
<div className="mb-5">
  <h3 className="font-medium mb-2">{t('productDetail.size')}</h3>

  <div className="flex flex-wrap gap-2">
    {product.sizes?.map((size) => {
      const euSize = getEuSize(size, product.category);
      return (
        <button
          key={size}
          onClick={() => setSelectedSize(size)}
          className={`px-4 py-2 border rounded font-medium transition flex flex-col items-center leading-tight min-w-[64px] ${
            selectedSize === size
              ? "bg-black text-white border-black"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <span>IN {size}</span>
          <span
            className={`text-[10px] mt-0.5 ${
              selectedSize === size ? "text-gray-300" : "text-gray-500"
            }`}
          >
            EU {euSize}
          </span>
        </button>
      );
    })}
  </div>
</div>

            {/* quantity */}
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => handleQuantityChange("Minus")}
                className="w-10 h-10 border rounded text-lg font-medium hover:bg-gray-100"
              >
                -
              </button>

              <span className="text-lg font-medium px-2">{quantity}</span>

              <button 
                onClick={() => handleQuantityChange("Plus")}
                className="w-10 h-10 border rounded text-lg font-medium hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* add cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {isButtonDisabled ? t('productDetail.adding') : t('productDetail.addToCart')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;