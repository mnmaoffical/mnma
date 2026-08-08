import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addtocart } from "../../redux/slices/cartslice";

function ProductDetail() {
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
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

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
      toast.error("Select a color");
      return;
    }

    if (!selectedSize) {
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

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading Product...
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
              className="w-full rounded-lg"
            />
          </div>

          {/* details */}
          <div className="w-full md:w-1/2">
             <div className="mb-3">
              <span className="text-sm text-[#8b7355] uppercase tracking-wider">
                {product.category}
              </span>
            </div>


            <h1 className="text-3xl font-bold mb-3">
              {product.name}
            </h1>

            <p className="text-2xl font-semibold mb-4">
              AED {product.price}
            </p>

            <p className="text-gray-600 mb-6">
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
              <h3 className="font-medium mb-2">Color</h3>

              <div className="flex gap-2">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
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
            <div className="mb-5">
              <h3 className="font-medium mb-2">Size</h3>

              <div className="flex gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* quantity */}
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => handleQuantityChange("Minus")}>
                -
              </button>

              <span>{quantity}</span>

              <button onClick={() => handleQuantityChange("Plus")}>
                +
              </button>
            </div>

            {/* add cart */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;