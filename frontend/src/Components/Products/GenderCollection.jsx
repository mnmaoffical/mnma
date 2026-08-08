import React from 'react';
import { Link } from 'react-router-dom'; // Issue 1: Missing import

import MenCollectionHome from '../../assets/MenCollectionHome.png';
import WomenCollectionHome from '../../assets/WomenCollectionHome.png';

function GenderCollection() {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                {/* mens Collection  */}
                <div className='relative flex-1'>
                    <img src={MenCollectionHome} alt="men's collection" className='w-full md:h-[700px]  object-cover' />
                    <div className='absolute bottom-2 left-2 md:bottom-8 md:left-8 bg-white bg-opacity-90 p-4 '>
                        <h2 className='md:text-2xl text:md font-bold text-gray-900 md:mb-3'>
                            Men's Collection
                        </h2>
                        <Link to="/MensSection" className='text-gray-900 underline '>Shop Now</Link>
                    </div>
                </div>


                {/* Women's Collection */}
                <div className='relative flex-1'>
                    <img src={WomenCollectionHome} alt="women's collection" className='w-full md:h-[700px]  object-cover' />
                    <div className='absolute bottom-2 left-2 md:bottom-8 md:left-8 bg-white bg-opacity-90 p-4 '>
                        <h2 className='md:text-2xl text:md font-bold text-gray-900 md:mb-3'>
                            Women's Collection
                        </h2>
                        <Link to="/WomensSection" className='text-gray-900 underline '>Shop Now</Link>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default GenderCollection;