import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <div>
      <Link href={"/"} className='flex items-center gap-2'>
        <Image 
          src={"/images/finance-euro.png"}
          alt='logo'
          width={55}
          height={55}
        />
        <p className='text-3xl font-bold text-blue-400'>
          My Finance
        </p>
      </Link>
    </div>
  )
}

export default Logo
