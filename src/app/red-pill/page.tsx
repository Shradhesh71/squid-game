'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  const handleRedClick = () => {
    setMessage("💀 So, you choose death? It's over now.");
  };

  const handleBlueClick = () => {
    setMessage("🔥 iiitsCTF{you_found_it_champ}");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-400 p-4">
      <div className="text-2xl font-bold mb-6">Choose your pill wisely</div>

      <div className="flex w-96 h-24 rounded-full overflow-hidden shadow-lg cursor-pointer select-none">
        <div
          className="w-1/2 bg-red-600 hover:bg-red-700 flex items-center justify-center text-white font-semibold text-xl transition-all duration-200"
          onClick={handleRedClick}
        >
          Red Pill
        </div>
        <div
          className="w-1/2 bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white font-semibold text-xl transition-all duration-200"
          onClick={handleBlueClick}
        >
          Blue Pill
        </div>
      </div>

      {message && (
        <div className="mt-8 text-center text-lg text-gray-800 max-w-md">
          {message}
        </div>
      )}
    </main>
  );
}