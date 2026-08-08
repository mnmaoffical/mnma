import React from 'react';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import {
  removefromcart,
  updatecartitemquantity,
  clearcart,
  fetchcart
} from '../../redux/slices/cartslice';

function CartContents() {
  const dispatch = useDispatch();
  
  // Read data from Redux slice (your slice structure: cart.cart.products)
  const { cart, loading, error } = useSelector((state) => state.cart);
  
  // Access products from the slice
  const cartproducts = cart?.products || [];
   

  // Fetch cart on component mount
  React.useEffect(() => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const userId = user?._id || null;
    const guestId = localStorage.getItem("guestId");
    if (userId || guestId) {
      dispatch(fetchcart({ userId, guestId }));
    }
  }, [dispatch]);

  // Handle increment
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

  // Handle decrement
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

  // Handle remove
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

  // Handle clear entire cart
  const handleClearCart = () => {
    dispatch(clearcart());
  };

  return (
    <div>
      {cartproducts.length === 0 ? (
        <p className="text-center text-gray-600 py-8">Your cart is empty</p>
      ) : (
        <div>
          {cartproducts.map((product, index) => (
            <div className="flex items-start justify-between py-4 border-b" key={index}>
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4 rounded"
                />
                <div>
                  <h3>
                    {product.name}
                   
                  </h3>
                  <p className="text-sm text-gray-600">
                    size: {product.size} | color: {product.color}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(product)}
                      className="border rounded px-2 py-1 text-xl font-medium"
                    >
                      -
                    </button>
                    <span className="mx-4">{product.quantity}</span>
                    <button
                      onClick={() => handleIncrement(product)}
                      className="border rounded px-2 py-1 text-xl font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p>AED {product.price.toLocaleString()}</p>
                <button onClick={() => handleRemove(product)}>
                  <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
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