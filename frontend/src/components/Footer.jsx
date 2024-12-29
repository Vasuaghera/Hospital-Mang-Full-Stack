import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40 ' src={assets.logo} alt="Hospital Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            At Hospital, we provide exceptional healthcare services with a focus on patient care and well-being.
          </p>
        </div>
    
        <div>
          <p className='text-xl font-medium mb-5'>OUR HOSPITAL</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>CONTACT US</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+1-800-123-4567</li>
            <li>contact@hospital.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © 2024 Hospital.com - All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer
