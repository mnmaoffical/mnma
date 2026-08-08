import React from 'react'
import HeroImage from '..//..//assets/HeroImage.png'
import { Link } from 'react-router-dom'
import { BsArrowRightCircle } from "react-icons/bs";

function Hero() {
    return (
        <section className='relative w-full object-cover '>
            {/* 1. Responsive Image with slightly longer height for impact */}
            <img
                src={HeroImage}
                alt='The 2026 Collection'
                className='w-full h-[400px] sm:h-[500px] md:h-[650px] lg:h-[800px] object-cover '
            />
 
            {/* 2. Stronger Black Overlay for Readability (Using Modern bg-black/40) */}
            <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>

                {/* 3. Centered, Max-Width Text Container (Essential for large screens) */}
                <div className='text-center text-white p-6 sm:p-10 md:p-12 lg:p-16 max-w-4xl w-full'>

                    {/* 4. Luxury Typography: Lightweight, Widest Tracking, All Uppercase */}
                    <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.3em] uppercase mb-4'>
                        BEYOND ELEGANCE
                    </h1>

                    {/* 5. Readability: White text, limited width, Relaxed leading */}
                    <p className='text-xs sm:text-sm md:text-base lg:text-lg text-white/90 font-light leading-relaxed mb-10 max-w-2xl mx-auto'>
                        Discover elegance through premium leather, signature scents, luxury perfumes and contemporary garments.

                    </p>

                    {/* 6. Polished Button: Consistent casing, wider padding, hover state */}
                    <Link to="collection" className='inline-flex items-center gap-2 px-10 py-3 sm:py-4 bg-white text-gray-950 text-xs sm:text-sm tracking-widest uppercase rounded-sm hover:bg-gray-200 transition-all duration-300 ease-in-out'>
                        Shop Now
                        <BsArrowRightCircle size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Hero