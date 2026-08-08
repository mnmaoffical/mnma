import React from 'react'
import Hero from '../Components/Layout/Hero'
import GenderCollection from '../Components/Products/GenderCollection'
import NewArrivals from '../Components/Products/NewArrivals'
import ProductDetail from '../Components/Products/ProductDetail'
import BestSeller from './BestSeller'

function Home() {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />
      {/* bestseller is comming from productDetail.jsx page */}
    
      <BestSeller/>





    </div>
  )
}

export default Home