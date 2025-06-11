import React from 'react'
import FooterBackground from "@/public/FooterBackground.png"
import Image from 'next/image'

function Footer2() {
  return (
    <div>
        <Image className='w-full h-full object-cover blur-xs ' src={FooterBackground} alt="Footer Background" />
    </div>
  )
}

export default Footer2