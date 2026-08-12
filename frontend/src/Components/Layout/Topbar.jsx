import React from 'react';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

function Topbar() {
    const { t } = useTranslation();
    return (
        <div className='bg-[#ea2e0e] text-white'>
            <div className="container mx-auto flex justify-between items-center py-3 px-3">
                <div className='hidden md:flex items-center gap-4'>
                    <a href="##" className='hover:text-gray-300'>
                        <TbBrandMeta className='h-5 w-5' />
                    </a>
                    <a href="##" className='hover:text-gray-300'>
                        <IoLogoInstagram className='h-5 w-5' />
                    </a>
                    <a href="##" className='hover:text-gray-300'>
                        <RiTwitterXLine className='h-4 w-4' />
                    </a>
                </div>
                <div className='text-sm text-center flex-grow'>
                    <span>{t('topbar.tagline')}</span>
                </div>
                <div className='text-sm hidden md:block'>
                    <a href='tel:+134918594548' className='hover:text-gray-300'>
                        +1 (34) 918594548
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Topbar;