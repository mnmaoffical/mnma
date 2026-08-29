import React, { useState } from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { RiSnapchatLine } from "react-icons/ri";
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('https://mnma-backend.onrender.com/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        const successMsg = data.message || t('footer.newsletter.subscribedSuccess');
        setMessage(successMsg);
        toast.success(successMsg);
        setEmail('');
      } else {
        const failMsg = data.message || t('footer.newsletter.subscribedFail');
        setMessage(failMsg);
        toast.error(failMsg);
      }
    } catch (error) {
      console.error(error);
      const networkMsg = t('footer.newsletter.networkError');
      setMessage(networkMsg);
      toast.error(networkMsg);
    }
  };

  return (
    <footer className="border-t border-gray-800 bg-black py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-sm uppercase tracking-wide text-white mb-4">{t('footer.newsletter.title')}</h3>
          <p className="text-gray-400 text-xs mb-3">
            {t('footer.newsletter.description')}
          </p>
          <p className='font-medium text-xs text-gray-400 mb-5'>
            {t('footer.newsletter.incentive')}
          </p>

          <form className="flex" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              className="p-2.5 w-full text-xs bg-black border-t border-b border-gray-700 rounded-s-md ltr:border-l rtl:border-r text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-white text-black px-5 text-xs py-2.5 rounded-e-md hover:bg-gray-200 transition-all"
            >
              {t('footer.newsletter.subscribe')}
            </button>
          </form>
        </div>

        <div>
          <h3 className='text-sm uppercase tracking-wide text-white mb-4'>{t('footer.shop.title')}</h3>
          <ul className='space-y-2 text-xs text-gray-400'>
            <li><Link to="/MensSection" className='hover:text-white transition-colors'>{t('footer.shop.mens')}</Link></li>
            <li><Link to="/WomensSection" className='hover:text-white transition-colors'>{t('footer.shop.womens')}</Link></li>
            <li><Link to="/top-items" className='hover:text-white transition-colors'>{t('footer.shop.top')}</Link></li>
            <li><Link to="/collection" className='hover:text-white transition-colors'>{t('footer.shop.all')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm uppercase tracking-wide text-white mb-4'>{t('footer.support.title')}</h3>
          <ul className='space-y-2 text-xs text-gray-400'>
            <li>
              <Link to="/about" className='hover:text-white transition-colors'>
                {t('footer.support.about')}
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className='hover:text-white transition-colors'>
                {t('footer.support.privacy')}
              </Link>
            </li>
            <li>
              <Link to="/delivery-and-returns" className='hover:text-white transition-colors'>
                {t('footer.support.delivery')}
              </Link>
            </li>
            <li>
              <a
                href="/profile"
                className="hover:text-white transition-colors"
              >
                {t('footer.support.trackOrder')}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm uppercase tracking-wide text-white mb-4'>{t('footer.company.title')}</h3>
          <ul className='space-y-2 text-xs text-gray-400'>
            <li>
              <Link to="/partner-with-us" className='hover:text-white transition-colors'>
                {t('footer.support.franchise')}
              </Link>
            </li>
            <li>
              <Link to="/careers" className='hover:text-white transition-colors'>
                {t('footer.support.careers')}
              </Link>
            </li>
            <li>
              <Link to="/blog" className='hover:text-white transition-colors'>
                {t('footer.support.blog')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className='text-sm uppercase tracking-wide text-white mb-4'>{t('footer.followUs.title')}</h3>
          <div className='flex items-center gap-3 mb-6 text-gray-400'>
            <a href="https://www.facebook.com/share/1CCGCbUVQy/" target='_blank' rel='noopener noreferrer' className='hover:text-white'>
              <TbBrandMeta className='h-4 w-4' />
            </a>
            <a href="https://www.instagram.com/padora_by_mnma?utm_source=qr&igsh=MW8wNml6bTk5d3BzOQ==" target='_blank' rel='noopener noreferrer' className='hover:text-white'>
              <IoLogoInstagram className='h-4 w-4' />
            </a>
            <a href="https://www.x.com" target='_blank' rel='noopener noreferrer' className='hover:text-white'>
              <RiTwitterXLine className='h-3.5 w-3.5' />
            </a>
            <a
              href="https://www.snapchat.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-500"
            >
              <RiSnapchatLine className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/+971529205556"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-500"
            >
              <FaWhatsapp className="inline-block" />
            </a>
            <a
              href="tel:+971529205556"
              className="flex items-center gap-2 hover:text-white"
            >
              <FiPhoneCall className="inline-block" />
            </a>
          </div>
        </div>
      </div>

      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-800 pt-6'>
        <p className='text-gray-500 text-[11px] tracking-tighter text-center'>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;