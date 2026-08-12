import React from 'react';
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Common/LanguageSwitcher';

function Topbar() {
    const { t } = useTranslation();
    return (
        <div className='bg-[#ea2e0e] text-white'>
            <div className="container mx-auto flex justify-between items-center py-2 px-4 text-xs sm:text-sm gap-2">
                <div className='hidden md:flex items-center gap-4 flex-shrink-0'>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-200' aria-label="Facebook">
                        <TbBrandMeta className='h-4 w-4 sm:h-5 sm:w-5' />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-200' aria-label="Instagram">
                        <IoLogoInstagram className='h-4 w-4 sm:h-5 sm:w-5' />
                    </a>
                    <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className='hover:text-gray-200' aria-label="X">
                        <RiTwitterXLine className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                    </a>
                </div>

                <div className='text-center flex-grow py-0.5 font-medium truncate'>
                    <span>{t('topbar.tagline')}</span>
                </div>

                <div className='flex items-center gap-3 flex-shrink-0'>
                    <div className='sm:hidden'>
                        <LanguageSwitcher className="bg-white/10 text-white border-white/30 hover:border-white hover:bg-white/20 !py-0.5 !px-2" />
                    </div>
                    <div className='hidden md:block'>
                        <a href='tel:+134918594548' className='hover:text-gray-200'>
                            +1 (34) 918594548
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;