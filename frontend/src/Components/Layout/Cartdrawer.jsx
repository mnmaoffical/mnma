import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from '../Cart/CartContents';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cartdrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className={`fixed top-0 ${isRtl ? 'left-0' : 'right-0'} w-3/4 sm:w-1/2 md:w-[30em] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
            drawerOpen 
                ? "translate-x-0" 
                : isRtl ? "-translate-x-full" : "translate-x-full"
        }`}>
            {/* close button */}
            <div className='flex justify-between items-center p-4 border-b'>
                <h2 className='text-xl font-semibold'>{t('cart.title')}</h2>
                <button onClick={toggleCartDrawer} aria-label="Close cart">
                    <IoMdClose className='h-6 w-6 text-gray-600' />
                </button>
            </div>

            {/* cart content with scrollable area */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <CartContents />
            </div>

            {/* checkout button fixed at the bottom */}
            <div className='p-4 bg-white border-t sticky bottom-0'>
                <Link 
                    to={user ? "/CheckoutPage" : "/SigninPage"}
                    onClick={toggleCartDrawer}
                >
                    <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                        {t('cart.checkout')}
                    </button>
                </Link>
                <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                    {t('cart.shippingNote')}
                </p>
            </div>
        </div>
    );
};

export default Cartdrawer;