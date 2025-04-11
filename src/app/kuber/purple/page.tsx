// pages/purple.tsx
"use client";
import { ArrowLeft, Terminal, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { useState } from 'react';

export default function PurplePage() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  return (
    <div className="min-h-screen bg-purple-950 text-purple-200 font-mono p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex items-center">
          <Link href="/kuber" passHref>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/30 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 text-purple-400">QUANTUM ENCRYPTION NODE</h1>
        </div>
        
        <div className="border border-purple-700 bg-purple-900/30 rounded-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-purple-400 h-6 w-6" />
            <h2 className="text-xl text-purple-400">{'....to_loose_you}'}</h2>
          </div>
          
          
        </div>
        
        <Alert className="bg-purple-900/20 border-purple-600">
          <Key className="h-4 w-4 text-purple-400" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            You've discovered the correct path to complete the CTF challenge!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}