import React from "react";
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const About = () => {
  const services = [
    {
      icon: <ShoppingBag size={34} />,
      title: "Premium Products",
      desc: "Carefully selected products with quality, style and customer satisfaction in mind.",
    },
    {
      icon: <Truck size={34} />,
      title: "Fast Delivery",
      desc: "Quick and reliable shipping experience designed to deliver products on time.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Secure Shopping",
      desc: "Safe payments and trusted transactions to ensure a worry-free shopping experience.",
    },
    {
      icon: <Headphones size={34} />,
      title: "24/7 Support",
      desc: "Friendly customer support always ready to help you with your orders and queries.",
    },
  ];

  return (
    <div className="bg-[#f8f5f0] text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl text-center"
        >
          <p className="uppercase tracking-[5px] text-orange-500 font-semibold mb-5">
            Welcome To Our Store
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Redefining Your
            <span className="text-orange-500"> Shopping </span>
            Experience
          </h1>

          <p className="mt-8 text-lg md:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
            We believe shopping should be simple, elegant and enjoyable.
            Our platform brings together quality products, modern design
            and seamless customer experience — all in one place.
          </p>

          <div className="mt-10 flex justify-center gap-5 flex-wrap">
         <Link
          to="/collection"
      className="px-8 py-4 bg-orange-500 hover:bg-orange-600 transition text-white rounded-full text-lg font-semibold shadow-lg inline-block"
     >
  Shop Now
</Link>

            <Link to='/collection'  className="px-8 py-4 border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition rounded-full text-lg font-medium">
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Brand */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
              alt="shopping"
              className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-orange-500 font-semibold tracking-[4px] uppercase mb-4">
              About Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              More Than Just An E-Commerce Store
            </h2>

            <p className="text-gray-600 text-lg leading-9 mb-6">
              Our mission is to create a shopping platform where customers
              can discover high-quality products with confidence and ease.
              We focus on delivering value, trust and an exceptional online
              shopping journey.
            </p>

            <p className="text-gray-600 text-lg leading-9">
              From premium collections to reliable service, every detail is
              designed to provide a modern and satisfying customer experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange-500 uppercase tracking-[4px] font-semibold mb-4">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold">
              Designed For Modern Shopping
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-8">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Premium Products"],
            ["99%", "Positive Reviews"],
            ["24/7", "Customer Support"],
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-3xl p-10"
            >
              <h2 className="text-5xl font-bold text-orange-500 mb-4">
                {item[0]}
              </h2>

              <p className="text-gray-600 text-lg">
                {item[1]}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Discover A Better Way To Shop
          </h2>

          <p className="text-lg md:text-xl leading-9 opacity-90">
            Experience premium products, trusted quality and a seamless
            online shopping journey designed for modern customers.
          </p>
           <Link to="/collection">
  <button className="mt-10 px-10 py-4 bg-white text-orange-500 rounded-full text-lg font-semibold hover:scale-105 transition shadow-xl">
    Start Shopping
  </button>
</Link>  
        </motion.div>
      </section>
    </div>
  );
};

export default About;