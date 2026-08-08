import React, { useState } from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { FiPhoneCall } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const res = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(data.message || 'Subscribed successfully')
        toast.success(data.message || 'Subscribed successfully')
        setEmail('')
      } else {
        setMessage(data.message || 'Subscription failed')
        toast.error(data.message || 'Subscription failed')
      }
    } catch (error) {
      console.error(error)
      setMessage('Network error')
      toast.error('Network error')
    }
  }

  return (
    <footer className="border-t py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6'>
            Sign up and get 10% off your first order.
          </p>

          <form className="flex" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-6 text-sm py-3 rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>

     
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
          <ul className='space-y-2 text-gray-600'>
            <li><Link to="MensSection" className='hover:text-gray-500 transition-colors'>Men's Product</Link></li>
            <li><Link to="WomensSection" className='hover:text-gray-500 transition-colors'>Womens's Product</Link></li>
            <li><Link to="top-items" className='hover:text-gray-500 transition-colors'>Top Products</Link></li>
            <li><Link to="collection" className='hover:text-gray-500 transition-colors'>All Collection</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
          <ul className='space-y-2 text-gray-600'>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>Support</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>Contact Us</Link></li>
            <li><Link to="/about" className='hover:text-gray-500 transition-colors'>About Us</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>FAQs</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>Features</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
          <div className='flex items-center space-x-4 mb-6'>
            <a href="https://www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
              <TbBrandMeta className='h-5 w-5' />
            </a>
            <a href="https://www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
              <IoLogoInstagram className='h-5 w-5' />
            </a>
            <a href="https://www.x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
              <RiTwitterXLine className='h-4 w-4' />
            </a>
          </div>
          <p className='text-gray-900'>
            <FiPhoneCall className='inline-block mr-2' />
            0123-456-789
          </p>
        </div>
      </div>

      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          © {new Date().getFullYear()} M N M A General Trading - L.L.C- S.P.C, All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer