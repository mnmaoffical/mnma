import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2";
import SearchBar from '../Common/SearchBar';
import Cartdrawer from './Cartdrawer';
import LanguageSwitcher from '../Common/LanguageSwitcher';
import { IoMdClose } from 'react-icons/io';
import logo from "../../assets/mnma_logo.png";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function Navbar() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const { cart } = useSelector((state) => state.cart); 
    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0; 
    
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    };

    return (
        <>
            <nav className='relative container flex mx-auto items-center justify-between px-4 sm:px-6 py-4 gap-2'>
                {/* Brand Logo & Name */}
                <div className='flex-shrink-0'>
                    <Link to="/" className="flex items-center gap-2 sm:gap-3">
                        <img
                            src={logo}
                            alt="MNMA Logo"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-black">
                            MNMA
                        </h1>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <div className='hidden md:flex items-center gap-6'>
                    <Link to="/" className='text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors'>
                        {t('nav.home')}
                    </Link>
                    <Link to="/MensSection" className='text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors'>
                        {t('nav.men')}
                    </Link>
                    <Link to="/WomensSection" className='text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors'>
                        {t('nav.women')}
                    </Link>
                    <Link to="/top-items" className='text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors'>
                        {t('nav.topItems')}
                    </Link>
                    <Link to="/about" className='text-gray-700 hover:text-black text-sm font-medium uppercase transition-colors'>
                        {t('nav.aboutUs')}
                    </Link>
                </div>
       
                {/* Nav Actions */}
                <div className='flex items-center gap-2 sm:gap-4 flex-shrink-0'>
                    {/* Hide language switcher from mobile main navbar header to prevent logo overlap */}
                    <div className='hidden sm:inline-flex'>
                        <LanguageSwitcher />
                    </div>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="hidden md:block bg-black text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300 text-sm"
                    >
                        {t('nav.admin')}
                    </button>
                    
                    <Link to="/profile" className='hidden md:block hover:text-black' aria-label="Profile">
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>

                    {/* Cart button */}
                    <button onClick={toggleCartDrawer} className='relative hover:text-black p-1' aria-label="Shopping Cart">
                        <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-1 bg-[#ea2e0e] text-white text-xs rounded-full px-1.5 py-0.2 end-0 transform translate-x-1/3 -translate-y-1/4 font-semibold'>
                                {cartItemCount}
                            </span>
                        )} 
                    </button>
                    
                    <SearchBar />

                    {/* Nav drawer toggle button for smaller screens */}
                    <button onClick={toggleNavDrawer} className='md:hidden p-1' aria-label="Open Menu">
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
                    </button>
                </div>
            </nav>

            <Cartdrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

            {/* Backdrop overlay */}
            {navDrawerOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                    onClick={toggleNavDrawer}
                />
            )}

            {/* Mobile navigation drawer (smaller screens) */}
            <div className={`fixed top-0 ${isRtl ? 'right-0' : 'left-0'} w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
                navDrawerOpen 
                    ? "translate-x-0" 
                    : isRtl ? "translate-x-full" : "-translate-x-full"
            }`}>
                <div className='flex justify-between items-center p-4 border-b bg-gray-50'>
                    <div className='flex items-center gap-2'>
                        <LanguageSwitcher />
                    </div>
                    <button onClick={toggleNavDrawer} aria-label="Close menu">
                        <IoMdClose className='h-6 w-6 text-gray-600' />
                    </button>
                </div>

                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>{t('nav.menu')}</h2>
                    <nav className='space-y-4'>
                        <Link
                            to="/"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.home')}
                        </Link>

                        <Link
                            to="/MensSection"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.men')}
                        </Link>

                        <Link
                            to="/WomensSection"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.women')}
                        </Link>

                        <Link
                            to="/top-items"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.topItems')}
                        </Link>

                        <Link
                            to="/about"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.aboutUs')}
                        </Link>

                        <Link
                            to="/profile"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.profile')}
                        </Link>

                        <Link
                            to="/admin/dashboard"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium transition-colors'>
                            {t('nav.admin')}
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;