import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="Hospital Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR HOSPITAL</p>
          <p className='text-gray-500'>1234 Health St. <br /> Suite 100, Cityville, USA</p>
          <p className='text-gray-500'>Tel: (555) 123-4567 <br /> Email: contact@ourhospital.com</p>
          <p className='font-semibold text-lg text-gray-600'>CAREERS AT OUR HOSPITAL</p>
          <p className='text-gray-500'>Join our dedicated team of healthcare professionals. We’re always looking for passionate individuals.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Careers</button>
        </div>
      </div>

    </div>
  )
}

export default Contact
