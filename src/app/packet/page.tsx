"use client";
import { useState, useEffect } from "react";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Code,
  Eye,
  EyeOff,
  Filter,
  Lock,
  Play,
  RotateCw,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function NetworkPacketChallenge() {
  const [stage, setStage] = useState(0);
  const [packets, setPackets] = useState<
    {
      id: number;
      timestamp: string;
      source: string;
      destination: string;
      protocol: string;
      size: number;
      payload: string;
      suspicious: boolean;
    }[]
  >([]);
  const [filteredPackets, setFilteredPackets] = useState<
    {
      id: number;
      timestamp: string;
      source: string;
      destination: string;
      protocol: string;
      size: number;
      payload: string;
      suspicious: boolean;
    }[]
  >([]);
  const [filterValue, setFilterValue] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<{
    id: number;
    timestamp: string;
    source: string;
    destination: string;
    protocol: string;
    size: number;
    payload: string;
    suspicious: boolean;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showFlag, setShowFlag] = useState(false);

  // Generate network packets data
  useEffect(() => {
    if (stage === 1 && packets.length === 0) {
      generatePackets();
    }
  }, [stage, packets]);

  const generatePackets = () => {
    // Create a mix of normal and suspicious packets
    const packetTypes = ["TCP", "UDP", "ICMP", "HTTP", "DNS"];
    const sources = [
      "192.168.1.10",
      "10.0.0.25",
      "172.16.0.5",
      "192.168.1.101",
      "8.8.8.8",
    ];
    const destinations = [
      "192.168.1.1",
      "8.8.8.8",
      "172.16.0.1",
      "104.16.85.20",
      "192.168.1.254",
    ];

    const newPackets = [];

    // Generate 20 regular packets
    for (let i = 0; i < 20; i++) {
      const sourceIP = sources[Math.floor(Math.random() * sources.length)];
      const destIP =
        destinations[Math.floor(Math.random() * destinations.length)];
      const type = packetTypes[Math.floor(Math.random() * packetTypes.length)];

      newPackets.push({
        id: i + 1,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000))
          .toISOString()
          .substring(11, 19),
        source: sourceIP,
        destination: destIP,
        protocol: type,
        size: Math.floor(Math.random() * 1000) + 64,
        payload: generateRandomPayload(),
        suspicious: false,
      });
    }

    // Add 3 suspicious packets with the hidden data
    // The flag is split across these packets to avoid detection
    newPackets.push({ 
      id: 21,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000))
        .toISOString()
        .substring(11, 19),
      source: "192.168.1.101",
      destination: "45.33.32.156",
      protocol: "TCP",
      size: 528,
      payload:
        "GET /index.html HTTP/1.1\r\nHost: www.target-server.com\r\nUser-Agent: Mozilla/5.0\r\nCookie: session=iiitsCTF{p4ck",
      suspicious: true,
    });

    newPackets.push({
      id: 22,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000))
        .toISOString()
        .substring(11, 19),
      source: "192.168.1.101",
      destination: "45.33.32.156",
      protocol: "TCP",
      size: 492,
      payload:
        "POST /api/data HTTP/1.1\r\nHost: www.target-server.com\r\nContent-Type: application/json\r\nX-Custom-Header: 3t_4n4ly",
      suspicious: true,
    });

    newPackets.push({
      id: 23,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 3600000))
        .toISOString()
        .substring(11, 19),
      source: "192.168.1.101",
      destination: "45.33.32.156",
      protocol: "TCP",
      size: 476,
      payload:
        "PUT /update HTTP/1.1\r\nHost: www.target-server.com\r\nAuthorization: Bearer sis_ftw}\r\nContent-Length: 256",
      suspicious: true,
    });

    // Shuffle the packets
    for (let i = newPackets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPackets[i], newPackets[j]] = [newPackets[j], newPackets[i]];
    }

    setPackets(newPackets);
    setFilteredPackets(newPackets);
  };

  const generateRandomPayload = () => {
    const payloads = [
      "GET /index.html HTTP/1.1\r\nHost: www.example.com",
      "DNS Query: example.com Type: A",
      "ICMP Echo Request seq=1",
      "TCP SYN seq=12345 win=8192",
      "HTTP/1.1 200 OK\r\nContent-Type: text/html",
      "UDP datagram to port 53",
    ];

    return payloads[Math.floor(Math.random() * payloads.length)];
  };

  const startChallenge = () => {
    setStage(1);
    setSuccess("Network capture loaded. Begin packet analysis.");
    setError("");
  };

  const applyFilter = () => {
    if (!filterValue) {
      setFilteredPackets(packets);
      return;
    }

    const filtered = packets.filter((packet) => {
      const searchValue = filterValue.toLowerCase();
      return (
        packet.source.includes(searchValue) ||
        packet.destination.includes(searchValue) ||
        packet.protocol.toLowerCase().includes(searchValue) ||
        packet.payload.toLowerCase().includes(searchValue)
      );
    });

    setFilteredPackets(filtered);

    if (filtered.length === 0) {
      setError("No packets match your filter criteria.");
    } else {
      setError("");
    }
  };

  const selectPacket = (packet: any) => {
    setSelectedPacket(packet);
  };

  const analyzeTraffic = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setSuccess(
        "Analysis complete! Suspicious packets detected to IP 45.33.32.156"
      );
    }, 1500);
  };

  const submitFlag = () => {
    const correctFlag = "iiitsCTF{p4ck3t_4n4lysis_ftw}";

    if (answer.trim() === correctFlag) {
      setStage(2);
      setSuccess(
        "Congratulations! You've successfully identified the hidden flag."
      );
      setError("");
    } else {
      setError("Incorrect flag. Check your work and try again.");
      setSuccess("");
    }
  };

  const revealFlag = () => {
    setShowFlag(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono p-6 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-8">
        <h1 className="text-3xl mb-2 text-center text-blue-400 font-bold tracking-wider">
          NETWORK PACKET ANALYZER
        </h1>
        <div className="text-sm opacity-70 text-center mb-6">
          {stage === 0 &&
            "Inspect network traffic to find hidden data exfiltration"}
          {stage === 1 &&
            "Analyze packet captures and identify suspicious patterns"}
          {stage === 2 && "Investigation complete - Flag recovered"}
        </div>
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-400 transition-all duration-500"
            style={{ width: `${stage === 0 ? 10 : stage === 1 ? 60 : 100}%` }}
          ></div>
        </div>
      </header>

      {stage === 0 && (
        <div className="w-full max-w-3xl flex flex-col items-center gap-8 mb-12">
          <div className="border border-blue-800 bg-gray-800/50 rounded-md p-8 w-full">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="text-blue-400 h-6 w-6" />
              <h2 className="text-xl text-blue-400">Security Brief</h2>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                We've detected suspicious network traffic from one of our
                internal systems. We believe an attacker may be exfiltrating
                sensitive data to an external server.
              </p>
              <p>
                Your mission is to analyze the network packet capture, identify
                the suspicious traffic pattern, and recover the hidden data
                being leaked.
              </p>
              <p className="border-l-2 border-blue-500 pl-3 italic">
                Look for unusual destinations or patterns in the packet payload.
                The flag is likely split across multiple packets to avoid
                detection.
              </p>
            </div>

            <Button
              onClick={startChallenge}
              className="bg-blue-700 hover:bg-blue-600 text-blue-100 mt-6"
            >
              <Zap className="mr-2 h-4 w-4" />
              Load Network Capture
            </Button>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="w-full max-w-4xl flex flex-col gap-6 mb-12">
          {/* Filter and Control Panel */}
          <div className="border border-blue-800 bg-gray-800/50 rounded-md p-4 w-full">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="text-blue-400 h-5 w-5" />
                <h3 className="text-lg text-blue-400">Packet Filter</h3>
              </div>

              <div className="flex gap-2 flex-1 max-w-md">
                <Input
                  placeholder="Filter by IP, protocol, or content"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="flex-1 bg-gray-900 border-gray-700 text-sm"
                />
                <Button
                  onClick={applyFilter}
                  className="bg-blue-700 hover:bg-blue-600 text-blue-100"
                >
                  Apply
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={analyzeTraffic}
                  className="border-blue-700 text-blue-400"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Auto-Analyze
                    </>
                  )}
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
                  {showHint ? "Hide Hint" : "Hint"}
                </Button>
              </div>
            </div>

            {showHint && (
              <div className="mt-4 p-3 bg-gray-800 border-l-2 border-yellow-500 text-xs">
                <p>
                  Hint: Look for packets with an unusual destination IP address.
                  Once you find suspicious packets, examine their payloads
                  carefully. The flag parts may be hidden in HTTP headers.
                </p>
              </div>
            )}
          </div>

          {/* Packet List and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Packet List */}
            <div className="lg:col-span-2 border border-blue-800 bg-gray-800/50 rounded-md p-4 max-h-96 overflow-y-auto">
              <div className="mb-3 flex justify-between items-center">
                <h3 className="text-sm text-blue-400">
                  Packets ({filteredPackets.length})
                </h3>
                <Badge variant="outline" className="text-xs">
                  Showing {filteredPackets.length} of {packets.length}
                </Badge>
              </div>

              <div className="space-y-2">
                {filteredPackets.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm py-8">
                    No packets match your filter criteria
                  </div>
                ) : (
                  filteredPackets.map((packet) => (
                    <div
                      key={packet.id}
                      onClick={() => selectPacket(packet)}
                      className={`p-2 rounded-md cursor-pointer text-xs border ${
                        selectedPacket?.id === packet.id
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-gray-700 hover:border-blue-700 bg-gray-900"
                      }`}
                    >
                      <div className="flex justify-between mb-1">
                        <span>
                          #{packet.id} • {packet.timestamp}
                        </span>
                        <span
                          className={`${
                            packet.protocol === "TCP"
                              ? "text-green-400"
                              : packet.protocol === "UDP"
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {packet.protocol}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span title="Source">{packet.source}</span>
                        <span>→</span>
                        <span title="Destination">{packet.destination}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Packet Details */}
            <div className="lg:col-span-3 border border-blue-800 bg-gray-800/50 rounded-md p-4 h-96 flex flex-col">
              {selectedPacket ? (
                <>
                  <div className="mb-3">
                    <h3 className="text-sm text-blue-400">
                      Packet #{selectedPacket.id} Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div>
                      <div className="text-gray-400">Protocol:</div>
                      <div>{selectedPacket.protocol}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Size:</div>
                      <div>{selectedPacket.size} bytes</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Source:</div>
                      <div>{selectedPacket.source}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Destination:</div>
                      <div>{selectedPacket.destination}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Time:</div>
                      <div>{selectedPacket.timestamp}</div>
                    </div>
                  </div>

                  <div className="text-xs mb-2 text-gray-400">Payload:</div>
                  <div className="flex-1 bg-gray-900 p-3 rounded-md overflow-auto text-xs font-mono border border-gray-700">
                    {selectedPacket.payload}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Code className="mx-auto h-8 w-8 mb-2 opacity-30" />
                    <p>Select a packet to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Flag Submission */}
          <div className="border border-blue-800 bg-gray-800/50 rounded-md p-4 w-full">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="text-blue-400 h-5 w-5" />
              <h3 className="text-lg text-blue-400">Submit Flag</h3>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Enter the flag (format: iiitsCTF{...})"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-1 bg-gray-900 border-gray-700"
              />
              <Button
                onClick={submitFlag}
                className="bg-blue-700 hover:bg-blue-600 text-blue-100"
              >
                Submit
              </Button>
            </div>
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
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
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
              <CheckCircle className="text-green-400 h-6 w-6" />
              <h2 className="text-xl text-green-400">Investigation Complete</h2>
            </div>

            <div className="space-y-4 text-sm">
              <p>
                Great work! You've successfully identified the data exfiltration
                attempt and recovered the hidden flag being leaked to the
                attacker's server.
              </p>

              <div className="bg-gray-900 p-4 rounded-md border border-green-500 flex flex-col items-center">
                <p className="text-center mb-2">Recovered Flag:</p>
                {showFlag ? (
                  <p className="text-green-400 font-bold text-center">
                    CTF{"{p4ck3t_4n4lysis_ftw}"}
                  </p>
                ) : (
                  <Button
                    onClick={revealFlag}
                    className="bg-green-700 hover:bg-green-600 text-green-100"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Flag
                  </Button>
                )}
              </div>

              <p className="border-l-2 border-green-500 pl-3 italic">
                The attacker was exfiltrating data by hiding flag fragments
                within HTTP headers across multiple packets. This technique is
                called fragmentation and is used to evade security monitoring
                systems.
              </p>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-auto pt-8 text-xs opacity-50 text-center">
        <p>NETWORK FORENSICS PLATFORM v2.4.3</p>
        <p className="text-blue-500/50">
          Packet analysis is key to uncovering hidden threats.
        </p>
      </footer>
    </div>
  );
}
