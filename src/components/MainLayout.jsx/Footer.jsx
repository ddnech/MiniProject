import React from 'react'
import {FaFacebookSquare,FaGithubSquare,FaInstagram,FaTwitterSquare} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex justify-center items-center py-16 w-full mx-auto px-4 text-grey bg-gray-200'>
      <div>
        <h1 className="w-full text-4xl font-bold text-black">Word.Smith</h1>
        <p className='py-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at odio vitae velit dictum sodales.</p>
      <div  className='flex justify-between items-center md:w-[75%] my-6'> 
        <FaFacebookSquare size={30}/>
        <FaInstagram size={30}/>
        <FaTwitterSquare size={30}/>
        <FaGithubSquare size={30}/>
      </div>
    </div>
  </div>
  )
}

export default Footer