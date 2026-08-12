import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  removefromcart,
  updatecartitemquantity,
  clearcart,
  fetchcart
} from '../../redux/slices/cartslice';

function CartContents() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  
  const { cart } = useSelector((state) => state.cart);
  const cartproducts = cart?.products || [];

  React.useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = user?._id || null;
    const guestId = localStorage.getItem("guestId");
    if (userId || guestId) {
      dispatch(fetchcart({ userId, guestId }));
    }
  }, [dispatch]);

  const handleIncrement = (product) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = user?._id || null;
    dispatch(updatecartitemquantity({
      productid: product.productid || product._id, 
      quantity: product.quantity + 1,
      userId,
      guestId: localStorage.getItem("guestId"),
      size: product.size,
      color: product.color
    }));
  };

  const handleDecrement = (product) => {
    if (product.quantity <= 1) return;
    
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = user?._id || null;
    dispatch(updatecartitemquantity({
      productid: product.productid || product._id, 
      quantity: product.quantity - 1,
      userId,
      guestId: localStorage.getItem("guestId"),
      size: product.size,
      color: product.color
    }));
  };

  const handleRemove = (product) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = user?._id || null;
    dispatch(
      removefromcart({
        productid: product.productid || product._id,
        userId,
        guestId: localStorage.getItem("guestId"),
        size: product.size,
        color: product.color
      })
    );
  };

  const formatPrice = (price) => {
    const amount = Number(price) || 0;
    if (i18n.language === 'ar') {
      return new Intl.NumberFormat('ar-AE', { style: 'currency', currency: 'AED' }).format(amount);
    }
    return `AED ${amount.toLocaleString()}`;
  };

  return (
    <div>
      {cartproducts.length === 0 ? (
        <p className="text-center text-gray-600 py-8">{t('cart.empty')}</p>
      ) : (
        <div>
          {cartproducts.map((product, index) => (
            <div className="flex items-start justify-between py-4 border-b gap-4" key={index}>
              <div className="flex items-start gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded flex-shrink-0"
                />
                <div>
                  <h3 className="font-medium text-sm">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('cart.size')}: {product.size} | {t('cart.color')}: {product.color}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => handleDecrement(product)}
                      className="border rounded px-2.5 py-0.5 text-lg font-medium hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-2 font-medium">{product.quantity}</span>
                    <button
                      onClick={() => handleIncrement(product)}
                      className="border rounded px-2.5 py-0.5 text-lg font-medium hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-end flex flex-col justify-between items-end">
                <p className="font-semibold text-sm">{formatPrice(product.price * product.quantity)}</p>
                <button onClick={() => handleRemove(product)} className="mt-2 text-red-600 hover:text-red-800">
                  <RiDeleteBin3Line className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartContents;