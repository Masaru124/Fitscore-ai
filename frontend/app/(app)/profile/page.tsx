"use client";

import React, { useState } from "react";
import { User, Shield, Camera, Volume2, Save, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// ponytail: Lean user profile settings with instant local feedback and zero unnecessary state stores
export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Dr. Marcus Vance");
  const [email, setEmail] = useState("marcus.vance@fitscore.ai");
  const [height, setHeight] = useState("180");
  const [weight, setWeight] = useState("78");
  const [experience, setExperience] = useState("Advanced");
  const [cameraFlip, setCameraFlip] = useState(true);
  const [voiceAudio, setVoiceAudio] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Athlete Profile &amp; Calibration</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure physical parameters for accurate limb segment length estimation and AI camera calibration.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile configuration saved successfully. Biomechanics model updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Physical Biometric Parameters */}
        <Card hoverEffect className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm pb-2 border-b border-[#232D42]">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Biometric Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Height (cm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              helperText="Used to normalize skeletal landmark pixels to metric scale"
            />
            <Input
              label="Body Weight (kg)"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              helperText="Used for joint torque & ground reaction force approximation"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Lifting Experience
            </label>
            <div className="flex gap-2">
              {["Beginner", "Intermediate", "Advanced"].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setExperience(lvl)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    experience === lvl
                      ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20 font-bold"
                      : "bg-[#0B0E14] text-slate-400 border border-[#232D42] hover:border-[#3B4B6E]"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Vision & Audio Preferences */}
        <Card hoverEffect className="space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm pb-2 border-b border-[#232D42]">
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>Computer Vision &amp; Audio Preferences</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0E14] border border-[#232D42]">
              <div>
                <p className="text-xs font-semibold text-white">Mirror Camera Stream</p>
                <p className="text-[11px] text-slate-400">
                  Horizontally flips video stream so it acts like a mirror
                </p>
              </div>
              <input
                type="checkbox"
                checked={cameraFlip}
                onChange={(e) => setCameraFlip(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0B0E14] border border-[#232D42]">
              <div>
                <p className="text-xs font-semibold text-white">Speech Synthesis Audio Coaching</p>
                <p className="text-[11px] text-slate-400">
                  Real-time voice prompts for rep counts and form warnings
                </p>
              </div>
              <input
                type="checkbox"
                checked={voiceAudio}
                onChange={(e) => setVoiceAudio(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" className="cursor-pointer">
            <Save className="w-4 h-4" /> Save Profile Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
