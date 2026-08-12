import React from 'react';
import HeroImage from '../../assets/HeroImage.png';
import { Link } from 'react-router-dom';
import { BsArrowRightCircle } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

function Hero() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    return (
        <section className='relative w-full object-cover'>
            {/* 1. Responsive Image with slightly longer height for impact */}
            <img
                src={HeroImage}
                alt={t('hero.imageAlt')}
                className='w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[800px] object-cover'
            />
 
            {/* 2. Black Overlay */}
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                {/* 3. Centered Text Container */}
                <div className='text-center text-white p-6 sm:p-10 md:p-12 lg:p-16 max-w-4xl w-full'>
                    {/* 4. Luxury Typography */}
                    <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] uppercase mb-4'>
                        {t('hero.title')}
                    </h1>

                    {/* 5. Subtitle */}
                    <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light leading-relaxed mb-10 max-w-2xl mx-auto'>
                        {t('hero.subtitle')}
                    </p>

                    {/* 6. Button */}
                    <Link to="collection" className='inline-flex items-center gap-2 px-10 py-3 sm:py-4 bg-white text-gray-950 text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:bg-gray-200 transition-all duration-300 ease-in-out'>
                        {t('hero.shopNow')}
                        <BsArrowRightCircle size={16} className={isRtl ? 'rotate-180' : ''} />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Hero;