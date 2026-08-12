import React, { useState } from 'react';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { TbBrandMeta } from 'react-icons/tb';
import { FiPhoneCall } from 'react-icons/fi';
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
    <footer className="border-t py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">{t('footer.newsletter.title')}</h3>
          <p className="text-gray-500 mb-4">
            {t('footer.newsletter.description')}
          </p>
          <p className='font-medium text-sm text-gray-600 mb-6'>
            {t('footer.newsletter.incentive')}
          </p>

          <form className="flex" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={t('footer.newsletter.placeholder')}
              className="p-3 w-full text-sm border-t border-b border-gray-300 rounded-s-md ltr:border-l rtl:border-r focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-black text-white px-6 text-sm py-3 rounded-e-md hover:bg-gray-800 transition-all"
            >
              {t('footer.newsletter.subscribe')}
            </button>
          </form>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>{t('footer.shop.title')}</h3>
          <ul className='space-y-2 text-gray-600'>
            <li><Link to="/MensSection" className='hover:text-gray-500 transition-colors'>{t('footer.shop.mens')}</Link></li>
            <li><Link to="/WomensSection" className='hover:text-gray-500 transition-colors'>{t('footer.shop.womens')}</Link></li>
            <li><Link to="/top-items" className='hover:text-gray-500 transition-colors'>{t('footer.shop.top')}</Link></li>
            <li><Link to="/collection" className='hover:text-gray-500 transition-colors'>{t('footer.shop.all')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>{t('footer.support.title')}</h3>
          <ul className='space-y-2 text-gray-600'>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>{t('footer.support.support')}</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>{t('footer.support.contact')}</Link></li>
            <li><Link to="/about" className='hover:text-gray-500 transition-colors'>{t('footer.support.about')}</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>{t('footer.support.faq')}</Link></li>
            <li><Link to="##" className='hover:text-gray-500 transition-colors'>{t('footer.support.features')}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg text-gray-800 mb-4'>{t('footer.followUs.title')}</h3>
          <div className='flex items-center gap-4 mb-6'>
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
          <p className='text-gray-900 flex items-center gap-2'>
            <FiPhoneCall className='inline-block' />
            <span>0123-456-789</span>
          </p>
        </div>
      </div>

      <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'>
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;