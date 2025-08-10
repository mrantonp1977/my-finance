import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <div>
      <Link href={'/'} className="flex items-center gap-2">
        <Image
          src={'/images/finance-euro.png'}
          alt="logo"
          width={55}
          height={55}
        />
        <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-amber-300 bg-clip-text text-transparent">
          My Finance
        </p>
      </Link>
    </div>
  );
};

export default Logo;
