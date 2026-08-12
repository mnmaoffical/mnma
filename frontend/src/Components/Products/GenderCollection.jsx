import React from 'react';
import { Link } from 'react-router-dom';
import MenCollectionHome from '../../assets/MenCollectionHome.png';
import WomenCollectionHome from '../../assets/WomenCollectionHome.png';
import { useTranslation } from 'react-i18next';

function GenderCollection() {
    const { t } = useTranslation();

    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col md:flex-row gap-8'>
                {/* mens Collection  */}
                <div className='relative flex-1'>
                    <img src={MenCollectionHome} alt={t('genderCollection.mensAlt')} className='w-full md:h-[700px] object-cover' />
                    <div className='absolute bottom-2 start-2 md:bottom-8 md:start-8 bg-white bg-opacity-90 p-4 rounded-sm'>
                        <h2 className='md:text-2xl text-md font-bold text-gray-900 md:mb-3'>
                            {t('genderCollection.mensTitle')}
                        </h2>
                        <Link to="/MensSection" className='text-gray-900 underline font-medium'>{t('genderCollection.shopNow')}</Link>
                    </div>
                </div>

                {/* Women's Collection */}
                <div className='relative flex-1'>
                    <img src={WomenCollectionHome} alt={t('genderCollection.womensAlt')} className='w-full md:h-[700px] object-cover' />
                    <div className='absolute bottom-2 start-2 md:bottom-8 md:start-8 bg-white bg-opacity-90 p-4 rounded-sm'>
                        <h2 className='md:text-2xl text-md font-bold text-gray-900 md:mb-3'>
                            {t('genderCollection.womensTitle')}
                        </h2>
                        <Link to="/WomensSection" className='text-gray-900 underline font-medium'>{t('genderCollection.shopNow')}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GenderCollection;