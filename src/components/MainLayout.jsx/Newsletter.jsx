import React from 'react'

const Newsletter = () => {
  return (
    <div className="w-full py-16 text-black p-4">
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
            <div className='lg:col-span-2 my-4'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Stay up-to-date with the latest insights and trends</h1>
                <p>Subscribe to our newsletter and never miss a blog post again!</p>
            </div>
            <div className="my-4">
                <div className='flex flex-col sm:flex-row item-center justify-between w-full'>
                    <input type="email" placeholder='Enter Email' className='bg-gray-200 flex p-3 w-full rounded-md'/>
                    <button className="bg-black w-[200px] rounded-md font-medium mx-auto my-6 py-3 text-white hover:text-red-500" >Notify Me</button>
                </div>
                <p>We care bout the protection of your data. Read our <span className='text-red-500'>Privacy Policy</span></p>
            </div>
        </div>

    </div>
  )
}

export default Newsletter