import React from 'react'

const Header = () => {
  return (
    <div className=" pt-5 px-6  ">
      <div className="max-w-5xl  mx-auto text-center">
        
        {/* Title */}
        <h1 className="text-3xl text-[#22446C]  md:text-4xl font-semibold ">
          Send Bulk Emails
        </h1>

        {/* Subtitle */}
        <p className="mt-0 text-[#677891] text-sm md:text-base">
          Easily send HR or educational emails in bulk.
        </p>

        {/* Divider */}
        <div className="mt-4 border-t border-gray-300"></div>

      </div>
    </div>
  )
}

export default Header
