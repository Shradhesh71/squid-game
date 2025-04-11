"use client";

import { useState, useEffect } from "react";
import {
  Terminal,
  Lock,
  UnlockKeyhole,
  RefreshCw,
  Eye,
  EyeOff,
  Zap,
  Code,
  FileDigit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";

export default function BinaryTransmissionChallenge() {
  const [stage, setStage] = useState(0);
  const [binarySequence, setBinarySequence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [transmission, setTransmission] = useState<
    { frequency: number; strength: number }[]
  >([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [frequencyTuning, setFrequencyTuning] = useState(50);
  const [isTransmissionLocked, setIsTransmissionLocked] = useState(true);
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);
  const [showFlag, setShowFlag] = useState(false);

  const hiddenKey = 42;

  const encodedFlag =
    "01000011 01010100 01000110 01111011 01110011 00110001 01100111 01101110 01100001 01101100 01011111 01100100 00110011 01100011 00110000 01100100 01100101 01110010 01011111 01101101 01100001 01110011 01110100 01100101 01110010 01111101";

  useEffect(() => {
    if (stage === 1 && isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            generateRandomTransmission();
            return 0;
          }
          return prev + 5;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [stage, isScanning]);

  const generateRandomTransmission = () => {
    // Generate random signal data with a pattern at the hidden frequency
    const newTransmission = [];

    for (let i = 0; i < 100; i++) {
      // Random noise
      const strength = Math.random() * 0.5 + 0.1;

      // Add a spike at the hidden frequency and nearby
      if (Math.abs(i - hiddenKey) <= 2) {
        const proximity = 1 - Math.abs(i - hiddenKey) * 0.3;
        newTransmission.push({
          frequency: i,
          strength: strength + proximity * 0.5,
        });
      } else {
        newTransmission.push({
          frequency: i,
          strength: strength,
        });
      }
    }

    setTransmission(newTransmission);
  };

  const startChallenge = () => {
    setStage(1);
    setIsScanning(true);
    setError("");
    setSuccess("Initializing signal scanner...");
  };

  const checkFrequency = () => {
    setActiveFrequency(frequencyTuning);

    if (Math.abs(frequencyTuning - hiddenKey) <= 1) {
      // Very close or exact match
      setIsTransmissionLocked(false);
      setBinarySequence(encodedFlag);
      setSuccess("Frequency locked! Encrypted transmission acquired.");
      setError("");
    } else if (Math.abs(frequencyTuning - hiddenKey) <= 5) {
      // Getting close
      setError(
        "Signal detected but weak. Adjust frequency for optimal reception."
      );
      setSuccess("");
    } else {
      // Far off
      setError("No signal detected at this frequency.");
      setSuccess("");
      setBinarySequence("");
      setIsTransmissionLocked(true);
    }
  };

  const attemptDecryption = () => {
    try {
      // Convert binary sequence to text
      const binaryArray = binarySequence.split(" ");
      const textOutput = binaryArray
        .map((binary) => String.fromCharCode(parseInt(binary, 2)))
        .join("");

      if (textOutput.startsWith("CTF{")) {
        setStage(2);
        setSuccess("Decryption successful!");
        setError("");
        setUserInput(textOutput);
      } else {
        setError("Decryption failed. Check your binary input.");
        setSuccess("");
      }
    } catch (err) {
      setError("Invalid binary format.");
      setSuccess("");
    }
  };

  const revealFlag = () => {
    setShowFlag(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl mb-2 text-center text-cyan-400 font-bold tracking-wider">
          SIGNAL INTERCEPTOR
        </h1>
        <div className="text-sm opacity-70 text-center mb-6">
          {stage === 0 &&
            "Locate and decode the hidden transmission to capture the flag"}
          {stage === 1 &&
            "Tuning frequency... Looking for encrypted binary transmission"}
          {stage === 2 && "Transmission acquired. Flag decoded."}
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-cyan-400 transition-all duration-500"
            style={{ width: `${stage === 0 ? 10 : stage === 1 ? 60 : 100}%` }}
          ></div>
        </div>
      </header>

      {stage === 0 && (
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 mb-12">
          <div className="border border-cyan-800 bg-gray-800/50 rounded-md p-8 w-full">
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-cyan-400 h-6 w-6" />
              <h2 className="text-xl text-cyan-400">Mission Briefing</h2>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                We've detected an encrypted transmission on a hidden frequency
                band. Your mission is to locate the correct frequency, intercept
                the binary data, and decrypt it to reveal the hidden flag.
              </p>
              <p className="border-l-2 border-cyan-500 pl-3 italic">
                Warning: This is an advanced challenge. You'll need to scan the
                frequency spectrum, find anomalous signal patterns, and decode
                binary data.
              </p>
            </div>

            <Button
              onClick={startChallenge}
              className="bg-cyan-700 hover:bg-cyan-600 text-cyan-100 mt-6"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Signal Scan
            </Button>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="w-full max-w-3xl flex flex-col items-center gap-6 mb-12">
          {/* Signal Scanner */}
          <div className="border border-cyan-800 bg-gray-800/50 rounded-md p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileDigit className="text-cyan-400 h-5 w-5" />
                <h3 className="text-lg text-cyan-400">Signal Scanner</h3>
              </div>

              {isScanning ? (
                <div className="flex items-center gap-2 text-xs text-cyan-300">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Scanning... {scanProgress}%
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsScanning(true)}
                  className="text-xs border-cyan-700 text-cyan-400"
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Rescan
                </Button>
              )}
            </div>

            {/* Signal Visualization */}
            <div className="h-32 w-full bg-gray-900 border border-gray-700 rounded-md mb-4 relative overflow-hidden">
              <div className="absolute inset-0 flex items-end">
                {transmission.map((signal: any, index) => (
                  <div
                    key={index}
                    className={`w-1 mx-px transition-all duration-300 ${
                      activeFrequency === signal.frequency
                        ? "bg-yellow-400"
                        : index === hiddenKey
                        ? "bg-cyan-500"
                        : "bg-cyan-800"
                    }`}
                    style={{
                      height: `${signal.strength * 100}%`,
                      opacity:
                        activeFrequency === signal.frequency ? "1" : "0.7",
                    }}
                  ></div>
                ))}
              </div>

              {/* Frequency indicator line */}
              <div
                className="absolute top-0 bottom-0 w-px bg-yellow-400 z-10 transition-all duration-300"
                style={{ left: `${frequencyTuning}%` }}
              ></div>
            </div>

            {/* Frequency Tuning */}
            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>0 MHz</span>
                <span>50 MHz</span>
                <span>100 MHz</span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  value={[frequencyTuning]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value: any) => setFrequencyTuning(value[0])}
                  className="flex-1"
                />
                <div className="text-cyan-300 w-16 text-right">
                  {frequencyTuning} MHz
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={checkFrequency}
                className="bg-cyan-700 hover:bg-cyan-600 text-cyan-100"
              >
                <Lock className="mr-2 h-4 w-4" />
                Lock Frequency
              </Button>

              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                className="border-gray-700"
              >
                {showHint ? (
                  <EyeOff className="mr-2 h-4 w-4" />
                ) : (
                  <Eye className="mr-2 h-4 w-4" />
                )}
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
            </div>

            {showHint && (
              <div className="mt-4 p-3 bg-gray-800 border-l-2 border-yellow-500 text-xs">
                <p>
                  Hint: Look for unusual signal patterns in the frequency
                  spectrum. The hidden transmission will appear as a stronger
                  signal compared to the background noise.
                </p>
              </div>
            )}
          </div>

          {/* Binary Transmission */}
          <div className="border border-cyan-800 bg-gray-800/50 rounded-md p-6 w-full">
            <div className="flex items-center gap-2 mb-4">
              <Code className="text-cyan-400 h-5 w-5" />
              <h3 className="text-lg text-cyan-400">Binary Transmission</h3>
            </div>

            <div
              className={`relative mb-4 ${
                isTransmissionLocked ? "opacity-50" : "opacity-100"
              }`}
            >
              <textarea
                className="w-full h-32 bg-gray-900 border border-gray-700 rounded-md p-3 text-xs font-mono"
                value={binarySequence}
                onChange={(e) => setBinarySequence(e.target.value)}
                disabled={isTransmissionLocked}
                placeholder="No transmission detected. Lock onto the correct frequency to intercept data."
              />

              {isTransmissionLocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-gray-600" />
                </div>
              )}
            </div>

            <Button
              onClick={attemptDecryption}
              disabled={isTransmissionLocked || !binarySequence}
              className={`bg-green-700 hover:bg-green-600 text-green-100 ${
                isTransmissionLocked ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <UnlockKeyhole className="mr-2 h-4 w-4" />
              Decrypt Transmission
            </Button>
          </div>

          {/* Status Messages */}
          {(error || success) && (
            <Alert
              className={`w-full ${
                error
                  ? "bg-red-900/20 border-red-600"
                  : "bg-green-900/20 border-green-600"
              }`}
            >
              {error ? (
                <>
                  <AlertCircle className="h-4 w-4 text-red-400" size={16} />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" size={16} />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </>
              )}
            </Alert>
          )}
        </div>
      )}

      {stage === 2 && (
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 mb-12">
          <div className="border border-green-700 bg-gray-800/50 rounded-md p-8 w-full">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="text-green-400 h-6 w-6" size={16} />
              <h2 className="text-xl text-green-400">Challenge Complete</h2>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                Congratulations! You've successfully intercepted and decrypted
                the hidden transmission.
              </p>

              <div className="bg-gray-900 p-4 rounded-md border border-green-500 flex flex-col items-center">
                <p className="text-center mb-2">Decrypted Flag:</p>
                {showFlag ? (
                  <p className="text-green-400 font-bold text-center">
                    iiitsCTF{"{signal_d3c0der_master}"}
                  </p>
                ) : (
                  <Button
                    onClick={revealFlag}
                    className="bg-green-700 hover:bg-green-600 text-green-100"
                  >
                    <UnlockKeyhole className="mr-2 h-4 w-4" />
                    Reveal Flag
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-8 text-xs opacity-50 text-center">
        <p>ADVANCED SIGNALS INTELLIGENCE PLATFORM v3.5.2</p>
        <p className="text-cyan-500/50">
          Frequency analysis required. Find the anomaly.
        </p>
      </footer>
    </div>
  );
}

// Helper function to simulate missing components
const CheckCircle = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
};

const AlertCircle = ({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  );
};
