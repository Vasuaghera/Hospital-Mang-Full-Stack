import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About Hospital" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to our Hospital, where we prioritize your health and well-being. We understand the challenges of finding quality healthcare, and we're here to make the process easier and more efficient. Whether you're booking a routine checkup or need urgent medical attention, we’re committed to providing you with trusted medical professionals and a seamless experience.</p>
          <p>Our Hospital strives for excellence in patient care and healthcare technology. We're constantly evolving to integrate the latest innovations that ensure better treatment outcomes, enhanced care, and an improved patient experience. Whether you're managing ongoing health needs or scheduling your first consultation, we're here to guide you at every step.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision is to create a healthcare experience that’s convenient, accessible, and patient-centric. We aim to bridge the gap between patients and healthcare providers, offering you easy access to the best care when you need it most.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EXPERIENCED DOCTORS:</b>
          <p>Our team includes highly qualified and experienced healthcare professionals ready to provide the best care.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>COMPREHENSIVE CARE:</b>
          <p>We offer a wide range of healthcare services, from routine checkups to specialized treatments, all in one place.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ACCESSIBILITY:</b>
          <p>We ensure that healthcare is accessible to everyone, with convenient appointment scheduling and easy access to healthcare professionals.</p>
        </div>
      </div>

    </div>
  )
}

export default About
  