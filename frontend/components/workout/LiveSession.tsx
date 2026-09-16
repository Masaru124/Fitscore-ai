"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  CameraOff,
  Play,
  Square,
  Volume2,
  VolumeX,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { ScoreGauge } from "@/components/workout/ScoreGauge";
import { RepCounter } from "@/components/workout/RepCounter";
import { InjuryAlert, RiskWarning } from "@/components/workout/InjuryAlert";
import { Button } from "@/components/ui/Button";

interface LiveSessionProps {
  exerciseName?: string;
  targetReps?: number;
}

export const LiveSession: React.FC<LiveSessionProps> = ({
  exerciseName = "Barbell Back Squat",
  targetReps = 10,
}) => {
  const router = useRouter();

  // Camera & Canvas Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Session State
  const [isLive, setIsLive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [voiceCoach, setVoiceCoach] = useState(true);
  const [score, setScore] = useState(88);
  const [reps, setReps] = useState(0);
  const [phase, setPhase] = useState<"ECCENTRIC" | "CONCENTRIC" | "PEAK_HOLD" | "IDLE">("IDLE");
  const [activeWarning, setActiveWarning] = useState<RiskWarning | null>(null);
  const [kneeAngle, setKneeAngle] = useState(170);
  const [hipAngle, setHipAngle] = useState(165);
  const [spineAngle, setSpineAngle] = useState(85);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Audio speech synthesis feedback
  const speakVoice = useCallback(
    (text: string) => {
      if (!voiceCoach || typeof window === "undefined" || !("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    },
    [voiceCoach]
  );

  // Start Camera
  const startCamera = async () => {
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error("Camera API not available");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraActive(true);
        setIsDemoMode(false);
      }
    } catch (err) {
      console.warn("Webcam access unavailable, switching to Biomechanics Simulation:", err);
      setCameraActive(true);
      setIsDemoMode(true);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Start Live Evaluation
  const handleStart = async () => {
    if (!cameraActive) {
      await startCamera();
    }
    setIsLive(true);
    setPhase("ECCENTRIC");
    speakVoice("Session started. Keep chest upright and begin your first rep.");
  };

  // End Session and navigate to summary
  const handleStop = () => {
    setIsLive(false);
    stopCamera();
    speakVoice("Great workout! Compiling biomechanics report.");
    router.push("/session/sess_01");
  };

  // Synthetic Biomechanics Kinematic Loop
  useEffect(() => {
    if (!isLive) return;

    let step = 0;
    let localReps = reps;
    const interval = setInterval(() => {
      step = (step + 1) % 40; // 40-step cyclic rep cycle

      // Simulate squat knee flexion (170° stand -> 85° parallel squat -> 170° stand)
      let currentKnee: number;
      let currentPhase: "ECCENTRIC" | "CONCENTRIC" | "PEAK_HOLD" | "IDLE";

      if (step < 18) {
        // Going down (eccentric)
        currentPhase = "ECCENTRIC";
        currentKnee = Math.round(170 - (step / 18) * 85);
      } else if (step >= 18 && step <= 22) {
        // Bottom hold
        currentPhase = "PEAK_HOLD";
        currentKnee = 85;
      } else {
        // Driving up (concentric)
        currentPhase = "CONCENTRIC";
        currentKnee = Math.round(85 + ((step - 22) / 18) * 85);
      }

      setKneeAngle(currentKnee);
      setHipAngle(Math.round(currentKnee * 0.95));
      setSpineAngle(Math.round(80 + Math.sin(step / 5) * 6));
      setPhase(currentPhase);

      // Rep completed trigger
      if (step === 39) {
        localReps += 1;
        setReps(localReps);
        const repScore = Math.floor(86 + Math.random() * 12);
        setScore(repScore);

        if (localReps % 3 === 0) {
          setActiveWarning({
            id: String(Date.now()),
            type: "knee_valgus",
            title: "Knee Valgus Warning",
            message: "Inward knee collapse detected on ascent. Drive knees outwards in line with toes.",
            severity: "medium",
            timestamp: "Just now",
          });
          speakVoice("Knees out, drive through heels!");
        } else {
          setActiveWarning(null);
          speakVoice(`Rep ${localReps}! Excellent depth.`);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isLive, reps, speakVoice]);

  // Canvas Skeletal Overlay Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (cameraActive && isDemoMode) {
        // Draw cybernetic virtual biomechanics avatar
        ctx.fillStyle = "#0B0E14";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid floor
        ctx.strokeStyle = "#1A2234";
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
      }

      // Draw Joint Skeleton
      if (isLive || cameraActive) {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Kinematic joint coordinate mapping
        const squatOffset = ((170 - kneeAngle) / 85) * 60;

        const head = { x: cx, y: cy - 140 + squatOffset };
        const chest = { x: cx, y: cy - 80 + squatOffset };
        const lShoulder = { x: cx - 45, y: cy - 75 + squatOffset };
        const rShoulder = { x: cx + 45, y: cy - 75 + squatOffset };
        const lElbow = { x: cx - 70, y: cy - 30 + squatOffset };
        const rElbow = { x: cx + 70, y: cy - 30 + squatOffset };
        const lWrist = { x: cx - 60, y: cy - 70 + squatOffset };
        const rWrist = { x: cx + 60, y: cy - 70 + squatOffset };

        const lHip = { x: cx - 35, y: cy + 10 + squatOffset };
        const rHip = { x: cx + 35, y: cy + 10 + squatOffset };

        // Knees flex outward & down
        const kneeSpread = ((170 - kneeAngle) / 85) * 20;
        const lKnee = { x: cx - 50 - kneeSpread, y: cy + 90 + squatOffset * 0.3 };
        const rKnee = { x: cx + 50 + kneeSpread, y: cy + 90 + squatOffset * 0.3 };

        const lAnkle = { x: cx - 45, y: cy + 180 };
        const rAnkle = { x: cx + 45, y: cy + 180 };

        // Bone linkages
        const bones = [
          [head, chest],
          [chest, lShoulder],
          [chest, rShoulder],
          [lShoulder, lElbow],
          [rShoulder, rElbow],
          [lElbow, lWrist],
          [rElbow, rWrist],
          [chest, lHip],
          [chest, rHip],
          [lHip, rHip],
          [lHip, lKnee],
          [rHip, rKnee],
          [lKnee, lAnkle],
          [rKnee, rAnkle],
        ];

        // Draw bone lines with neon cyan glow
        ctx.lineWidth = 4;
        ctx.strokeStyle = activeWarning ? "#EF4444" : "#00F2FE";
        ctx.shadowColor = activeWarning ? "#EF4444" : "#00F2FE";
        ctx.shadowBlur = 12;

        bones.forEach(([p1, p2]) => {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw joint nodes
        const joints = [
          head, chest, lShoulder, rShoulder, lElbow, rElbow,
          lWrist, rWrist, lHip, rHip, lKnee, rKnee, lAnkle, rAnkle,
        ];

        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 10;
        joints.forEach((j) => {
          ctx.beginPath();
          ctx.arc(j.x, j.y, 5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw real-time joint angle annotation box
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(20, 25, 35, 0.85)";
        ctx.strokeStyle = "#232D42";
        ctx.lineWidth = 1;

        // Knee angle badge
        ctx.fillRect(lKnee.x - 70, lKnee.y - 12, 55, 22);
        ctx.strokeRect(lKnee.x - 70, lKnee.y - 12, 55, 22);
        ctx.fillStyle = kneeAngle < 95 ? "#10B981" : "#00F2FE";
        ctx.font = "bold 11px monospace";
        ctx.fillText(`${kneeAngle}°`, lKnee.x - 60, lKnee.y + 4);

        // Hip angle badge
        ctx.fillStyle = "rgba(20, 25, 35, 0.85)";
        ctx.fillRect(rHip.x + 15, rHip.y - 12, 55, 22);
        ctx.strokeRect(rHip.x + 15, rHip.y - 12, 55, 22);
        ctx.fillStyle = "#00F2FE";
        ctx.fillText(`${hipAngle}°`, rHip.x + 25, rHip.y + 4);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [cameraActive, isDemoMode, isLive, kneeAngle, hipAngle, activeWarning]);

  return (
    <div className="space-y-6">
      {/* Session Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141923] border border-[#232D42] p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Real-Time Biomechanics Session
            </span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">{exerciseName}</h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceCoach(!voiceCoach)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              voiceCoach
                ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-400"
                : "bg-[#0B0E14] border-[#232D42] text-slate-500"
            }`}
            title="Toggle Voice AI Coaching"
          >
            {voiceCoach ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {!isLive ? (
            <Button
              onClick={handleStart}
              size="md"
              variant="primary"
              className="font-bold shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Start Evaluation</span>
            </Button>
          ) : (
            <Button
              onClick={handleStop}
              size="md"
              variant="danger"
              className="font-bold shadow-lg shadow-red-500/25 cursor-pointer"
            >
              <Square className="w-4 h-4" />
              <span>Finish &amp; Save</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Biomechanics Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Webcam Viewport (Left 2 cols) */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-black border border-[#232D42] shadow-2xl min-h-[440px] flex items-center justify-center">
          {/* Native HTML5 Video for user camera */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 ${
              cameraActive && !isDemoMode ? "block" : "hidden"
            }`}
          />

          {/* Canvas overlay for skeletal landmarks */}
          <canvas
            ref={canvasRef}
            width={720}
            height={480}
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          />

          {/* Idle state camera activator */}
          {!cameraActive && (
            <div className="text-center z-20 space-y-4 p-8">
              <div className="w-16 h-16 rounded-2xl bg-[#141923] border border-[#232D42] flex items-center justify-center mx-auto text-slate-400 shadow-xl">
                <Camera className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Camera Standby</h3>
                <p className="text-xs text-slate-400 max-w-sm mt-1">
                  Click below to enable your camera, or launch with synthetic simulation.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button onClick={startCamera} variant="primary" size="sm">
                  <Camera className="w-4 h-4" /> Enable Webcam
                </Button>
                <Button
                  onClick={() => {
                    setCameraActive(true);
                    setIsDemoMode(true);
                  }}
                  variant="secondary"
                  size="sm"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Demo Kinematics
                </Button>
              </div>
            </div>
          )}

          {/* Top overlay metrics HUD */}
          {cameraActive && (
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-[#0B0E14]/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#232D42] text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-emerald-400 font-bold">60 FPS</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300 font-mono">LATENCY: 42ms</span>
              </div>

              {isDemoMode && (
                <div className="bg-cyan-500/20 backdrop-blur-md text-cyan-300 text-xs px-3 py-1 rounded-xl border border-cyan-500/40 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Synthetic Avatar Mode
                </div>
              )}
            </div>
          )}

          {/* Bottom HUD warning drawer */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <InjuryAlert
              activeWarning={activeWarning}
              onDismiss={() => setActiveWarning(null)}
            />
          </div>
        </div>

        {/* Real-Time Telemetry & Gauges (Right 1 col) */}
        <div className="space-y-4">
          {/* FitScore Circular Gauge */}
          <div className="bg-[#141923] border border-[#232D42] rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Instant Form Score
            </h3>
            <ScoreGauge score={score} size={150} strokeWidth={12} />
            <p className="text-xs text-slate-400 mt-3">
              {score >= 85
                ? "Optimal alignment & mechanical advantage"
                : "Minor deviations detected, check alerts"}
            </p>
          </div>

          {/* Rep Counter & Movement Phase */}
          <RepCounter reps={reps} targetReps={targetReps} phase={phase} tempoSeconds={2.4} />

          {/* Joint Kinematic Breakdown */}
          <div className="bg-[#141923] border border-[#232D42] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#232D42]">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Live Joint Telemetry
              </span>
              <span className="text-[10px] font-mono text-cyan-400">XYZ ROTATION</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Knee Flexion (Left):</span>
                <span className="font-mono font-bold text-white bg-[#0B0E14] px-2 py-0.5 rounded border border-[#232D42]">
                  {kneeAngle}°
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Hip Extension:</span>
                <span className="font-mono font-bold text-white bg-[#0B0E14] px-2 py-0.5 rounded border border-[#232D42]">
                  {hipAngle}°
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Spine Neutrality:</span>
                <span className="font-mono font-bold text-white bg-[#0B0E14] px-2 py-0.5 rounded border border-[#232D42]">
                  {spineAngle}°
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
