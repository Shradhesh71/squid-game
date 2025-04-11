// pages/green.tsx
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

export default function GreenPage() {
  return (
    <div className="min-h-screen bg-green-950 text-green-200 font-mono p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8 flex items-center">
          <Link href="/kuber" passHref>
            <Button
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-green-900/30 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold ml-2 text-green-400">
            SECURE CHANNEL
          </h1>
        </div>

        <div className="border border-green-700 bg-green-900/30 rounded-md p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-green-400 h-6 w-6" />
            <h2 className="text-xl text-green-400">
              iiitsCTF{"{keep_going-->"}
            </h2>
          </div>
        </div>

        <Alert className="bg-green-900/20 border-green-600">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertTitle>System Status</AlertTitle>
          <AlertDescription>
            No security breaches detected. This path is a dead end for your CTF
            challenge.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
