"use client";
import { useState } from "react";
import {
  AlertCircle,
  Terminal,
  Shield,
  Zap,
  Key,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function CyberLights() {
  const [activeSection, setActiveSection] = useState<
    "green" | "red" | "purple" | null
  >(null);
  const [flagRevealed, setFlagRevealed] = useState(false);

  const handleGreenLightClick = () => {
    setActiveSection("green");
    setFlagRevealed(false);
  };

  const handleRedLightClick = () => {
    setActiveSection("red");
    setFlagRevealed(false);
  };

  const handlePurpleLightClick = () => {
    setActiveSection("purple");
    setFlagRevealed(false);
  };

  const renderActiveContent = () => {
    if (activeSection === "green") {
      return (
        <div className="border border-green-700 bg-green-900/30 rounded-md p-6 mb-4 w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-green-400 h-6 w-6" />
            <h2 className="text-xl text-green-400">Alpha Protocol</h2>
          </div>

          <Alert className="bg-green-900/20 border-green-600 mt-4">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertTitle>System Status</AlertTitle>
            <AlertDescription>
              You thought just by clicking the green light you would get the
              flag? haha.. it's impossible.
            </AlertDescription>
          </Alert>
        </div>
      );
    } else if (activeSection === "red") {
      return (
        <div className="border border-red-700 bg-red-900/30 rounded-md p-6 mb-4 w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-red-400 h-6 w-6" />
            <h2 className="text-xl text-red-400">Security Breach</h2>
          </div>

          <Alert className="bg-red-900/20 border-red-600 mt-4">
            <XCircle className="h-4 w-4 text-red-400" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              HUh... what a stubborn hacker. You thought you could just click
              the red light and get the flag? Not a chance. The system is locked
              down tight, and you're not getting in without the right
              credentials.
            </AlertDescription>
          </Alert>
        </div>
      );
    } else if (activeSection === "purple") {
      return (
        <div className="border border-purple-700 bg-purple-900/30 rounded-md p-6 mb-4 w-full max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-purple-400 h-6 w-6" />
            <h2 className="text-xl text-purple-400">Quantum Encryption Node</h2>
          </div>

          <Alert className="bg-purple-900/20 border-purple-600 mt-4">
            <Key className="h-4 w-4 text-purple-400" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Come on yrrr, try something new. you can glow a light by{" "}
              <i>/color_light</i>
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="text-center text-gray-400 w-full max-w-3xl p-8 border border-gray-700 rounded-md bg-gray-800/30">
        <Terminal className="mx-auto h-8 w-8 mb-4 text-cyan-400" />
        <h2 className="text-xl mb-2 text-cyan-400">System Waiting</h2>
        <p className="opacity-70">
          Select one of the colored access points above to proceed with the CTF
          challenge
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl mb-2 text-center text-cyan-400 font-bold tracking-wider">
          RED,GREEN and PURPLE LIGHTS
        </h1>
        <div className="text-sm opacity-70 text-center mb-6">
          Choose your access point to proceed with infiltration
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-cyan-400 w-1/4 animate-pulse"></div>
        </div>
      </header>

      <div className="w-full max-w-3xl grid grid-cols-3 gap-8 mb-12">
        {/* Green Light */}
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={handleGreenLightClick}
            className={`w-32 h-32 rounded-full cursor-pointer relative group ${
              activeSection === "green"
                ? "ring-2 ring-offset-4 ring-offset-gray-900 ring-green-400"
                : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-green-900 border-2 border-green-400"></div>
            <div
              className="absolute inset-2 rounded-full bg-green-500 opacity-60 group-hover:opacity-90 transition-opacity duration-300 
                          shadow-lg shadow-green-500/50 group-hover:shadow-green-500/80"
            ></div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center"></div>
            <div
              className="absolute -bottom-2 left-0 right-0 text-xs text-center opacity-0 group-hover:opacity-100 
                          transition-opacity text-green-400"
            >
              Access Point Alpha
            </div>
          </div>
        </div>

        {/* Red Light */}
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={handleRedLightClick}
            className={`w-32 h-32 rounded-full cursor-pointer relative group ${
              activeSection === "red"
                ? "ring-2 ring-offset-4 ring-offset-gray-900 ring-red-400"
                : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-red-900 border-2 border-red-400"></div>
            <div
              className="absolute inset-2 rounded-full bg-red-500 opacity-60 group-hover:opacity-90 transition-opacity duration-300 
                          shadow-lg shadow-red-500/50 group-hover:shadow-red-500/80"
            ></div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center"></div>
            <div
              className="absolute -bottom-2 left-0 right-0 text-xs text-center opacity-0 group-hover:opacity-100 
                          transition-opacity text-red-400"
            >
              Access Point Beta
            </div>
          </div>
        </div>

        {/* Purple Light */}
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={handlePurpleLightClick}
            className={`w-32 h-32 rounded-full cursor-pointer relative group ${
              activeSection === "purple"
                ? "ring-2 ring-offset-4 ring-offset-gray-900 ring-purple-400"
                : ""
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-purple-900 border-2 border-purple-400"></div>
            <div
              className="absolute inset-2 rounded-full bg-purple-500 opacity-60 group-hover:opacity-90 transition-opacity duration-300 
                          shadow-lg shadow-purple-500/50 group-hover:shadow-purple-500/80"
            ></div>
            <div className="absolute inset-0 rounded-full flex items-center justify-center"></div>
            <div
              className="absolute -bottom-2 left-0 right-0 text-xs text-center opacity-0 group-hover:opacity-100 
                          transition-opacity text-purple-400"
            >
              Access Point Gamma
            </div>
          </div>
        </div>
      </div>

      {renderActiveContent()}

      <div className="flex gap-4 mt-6">
        <div className="text-xs text-gray-500 animate-pulse">SYSTEM ACTIVE</div>
        <div className="text-xs text-gray-500">[CTF CHALLENGE NODE]</div>
      </div>

      <footer className="mt-auto pt-8 text-xs opacity-50 text-center">
        <p>CYBERSEC GATEWAY v2.1.4 | UNAUTHORIZED ACCESS PROHIBITED</p>
        <p className="text-cyan-500/50">
          Choose wisely. Only one access point leads to the flag.
        </p>
      </footer>
    </div>
  );
}
