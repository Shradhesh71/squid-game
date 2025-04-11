"use client";

import { useState } from "react";
import { AlertCircle, MessageSquare, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function InteractiveShapes() {
  const [message, setMessage] = useState("");
  const [showCircleButton, setShowCircleButton] = useState(false);

  const handleSquareClick = () => {
    setMessage("Seriously, square? You could have done better yrrrrr.");
    setShowCircleButton(false);
  };

  const handleTriangleClick = () => {
    setMessage("What a bad taste... Who likes triangle? ");
    setShowCircleButton(false);
  };

  const handleCircleClick = () => {
    setMessage("Circle breach successful! You found a potential entry point.");
    setShowCircleButton(true);
  };

  const handleExploitClick = () => {
    setMessage(
      "Exploit executed successfully! Find in Inspect Element > Console."
    );
    setShowCircleButton(false);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl mb-2 text-center glitch">
          SECURE SYSTEM ACCESS
        </h1>
        <div className="text-sm opacity-70 text-center mb-6">
          Identify the vulnerable component to gain access
        </div>
        <div className="h-2 w-full bg-green-800 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-green-400 w-1/3 animate-pulse"></div>
        </div>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-3 gap-8 mb-12 ">
        {/* Square */}
        <div
          onClick={handleSquareClick}
          className="aspect-square bg-transparent border-2 border-green-500 hover:border-green-300 
                    flex items-center justify-center cursor-pointer transition-all duration-300
                    hover:shadow-lg hover:shadow-green-500/20 p-4 relative group "
        >
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100">
            <AlertSquare size={16} />
          </div>
          <div className="text-xs absolute bottom-2 left-2 opacity-0 group-hover:opacity-70">
            Click to scan
          </div>
        </div>

        {/* Triangle */}
        <div
          onClick={handleTriangleClick}
          className="aspect-square flex items-center justify-center cursor-pointer transition-all duration-300
                    hover:shadow-lg hover:shadow-green-500/20 p-4 relative group"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-4/5 h-4/5 border-2 border-green-500 hover:border-green-300"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            ></div>
          </div>
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100">
            <AlertTriangle size={16} />
          </div>
          <div className="text-xs absolute bottom-2 left-2 opacity-0 group-hover:opacity-70">
            Click to scan
          </div>
        </div>

        {/* Circle */}
        <div
          onClick={handleCircleClick}
          className="iiitsCTF{trust_me_you_are_amazing} aspect-square flex items-center justify-center cursor-pointer transition-all duration-300
                    hover:shadow-lg hover:shadow-green-500/20 p-4 relative group"
        >
          <div className="w-4/5 h-4/5 rounded-full border-2 border-green-500 hover:border-green-300 flex items-center justify-center">
            <div className="w-1/3 h-1/3 rounded-full bg-green-500/30 animate-ping absolute"></div>
          </div>
          <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100">
            <AlertCircle size={16} />
          </div>
          <div className="text-xs absolute bottom-2 left-2 opacity-0 group-hover:opacity-70">
            Click to scan
          </div>
        </div>
      </div>

      {message && (
        <Alert className="w-full max-w-4xl bg-black border border-green-500 text-green-400 mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>System Response</AlertTitle>
          <AlertDescription className="font-mono text-sm">
            {message}
          </AlertDescription>
        </Alert>
      )}

      {showCircleButton && (
        <Button
          onClick={handleExploitClick}
          className="bg-green-800 text-green-100 hover:bg-green-700 border border-green-500 shadow-lg shadow-green-500/20 animate-pulse"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Execute Exploit
        </Button>
      )}

      <footer className="mt-auto pt-8 text-xs opacity-50 text-center">
        <p>CTF CHALLENGE SYSTEM v1.2.3</p>
        <p>WARNING: Unauthorized access attempts will be logged and reported</p>
      </footer>
    </div>
  );
}

const AlertSquare = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
};
