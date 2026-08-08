import React from 'react'
import { Link } from 'react-router-dom'
import { HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi2"
import SearchBar from '../Common/SearchBar'
import Cartdrawer from './Cartdrawer'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import logo from "../../assets/mnma_logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

function Navbar() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const  {cart} = useSelector((state)=>state.cart); 
    const cartItemCount = cart?.products?.reduce((total, product) => total + product   .quantity, 0) || 0; 
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen);
    }

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen);
    }
    return (
        <>
            <nav className='relative container flex  mx-auto  items-center justify-between  px-6 py-4 '>
                <div>
                 <div>
    <Link
        to="/"
        className="flex items-center gap-3"
    >
        <img
            src={logo}
            alt="MNMA Logo"
            className="h-10 w-auto object-contain"
        />

        <h1 className="text-2xl font-bold tracking-wide text-black">
            MNMA
        </h1>
    </Link>
</div>
                </div>
                <div className='hidden md:flex  space-x-6 '>
                     <Link to="/" className='text-gray-700 hover:text-black text-sm font-medium uppercase '>
                        Home
                    </Link>
                    <Link to="/MensSection" className='text-gray-700 hover:text-black text-sm font-medium uppercase '>
                        Men
                    </Link>
                    <Link to="/WomensSection" className='text-gray-700 hover:text-black text-sm font-medium uppercase '>
                        Women
                    </Link>
                    <Link to="/top-items" className='text-gray-700 hover:text-black text-sm font-medium uppercase '>
                        Top items
                    </Link>
                    <Link to="/about" className='text-gray-700 hover:text-black text-sm font-medium uppercase '>
                        about us
                    </Link>
                </div>
       
          
                <div className='flex items-center space-x-4'>
                         
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="hidden md:block bg-black text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
                    >
                        Admin
                    </button>
                    <Link to="/profile" className='hidden md:block hover:text-black'>
                        <HiOutlineUser className='h-6 w-6 text-gray-700' />
                    </Link>

                    {/* cart */}
                    <button onClick={toggleCartDrawer} className='relative hover:text-black'>
                        <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-1   bg-[#ea2e0e] text-white text-xs rounded-full px-2 py-0.5  '>{cartItemCount}</span>
                        )} 
                    </button>
                    <SearchBar />

                    {/* navdrawer for smaller screen  */}
                    <button onClick={toggleNavDrawer} className='md:hidden '>
                        <HiBars3BottomRight className='h-6 w-6 text-gray-700 translate-x-1 ' />
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

            {/* mobile navigation (smaller screen) */}
            <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 
            ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className='flex justify-end p-4'>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className='h-6 w-6 text-gray-600 ' />
                    </button>

                </div>

                <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-4'>Menu</h2>
                    <nav className='space-y-4'>
                        <Link
                            to="/"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Home
                        </Link>

                        <Link
                            to="/MensSection"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Men
                        </Link>

                        <Link
                            to="/WomensSection"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Women
                        </Link>

                        <Link
                            to="/top-items"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Top Items
                        </Link>

                        <Link
                            to="/about"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            About Us
                        </Link>

                        <Link
                            to="/profile"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Profile
                        </Link>

                        <Link
                            to="/admin/dashboard"
                            onClick={toggleNavDrawer}
                            className='block text-gray-600 hover:text-black font-medium'>
                            Admin
                        </Link>
                    </nav>
                </div>


            </div>
        </>
    )
}

export default Navbar