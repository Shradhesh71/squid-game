// pages/red.tsx
import { ArrowLeft, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function RedPage() {
  return (
    <div className="min-h-screen bg-red-950 text-red-200 font-mono p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex items-center">
          <Link href="/kuber" passHref>
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/30 p-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 text-red-400">WARNING: INTRUSION DETECTED</h1>
        </div>
        
        <div className="border border-red-700 bg-red-900/30 rounded-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-400 h-6 w-6" />
            <h2 className="text-xl text-red-400">....we_don't_want--{'>'}</h2>
          </div>
          
          
        </div>
        
        <Alert className="bg-red-900/20 border-red-600">
          <XCircle className="h-4 w-4 text-red-400" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You've triggered security protocols. This is not the correct path for the CTF challenge.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
