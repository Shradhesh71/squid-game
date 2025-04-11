"use client"

import { useState } from 'react';

export default function Home() {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    if (clickCount < 6) setClickCount(clickCount + 1);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-violet-400 p-4'>
      <div className="div text-4xl text-center">
      Indian Institute of Information Technology Surat
      </div>
      <div className='container text-3xl text-center mt-5 mb-5'>Squid Game</div>
      <div
        onClick={handleClick}
        style={{
          display: 'inline-block',
          transform: `translateY(-${clickCount * 5}px)`,
          transition: 'transform 0.2s ease',
        }}
        className=' cursor-progress'
      >
        <img
          src="/image.png" // Place your image in public/my-image.jpg
          alt="Click me"
          width={600}
        />
      </div>

      <div
        style={{
          marginTop: '-30px',
          opacity: clickCount >= 5 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <p style={{ fontSize: '18px', color: '#333' }}>
          iiitsCTF{'{'}Da1gona_c4ndy{'}'}
        </p>
      </div>
    </div>
  );
}