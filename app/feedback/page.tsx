"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function FeedbackPage() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Product");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          email,
          category,
          feedback,
          rating,
          workspaceId:"abc1234"
        }),
      });

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // 🔔 REAL-TIME NOTIFICATION SYSTEM ENGINES ADDED HERE
      const existingLogs = localStorage.getItem("loop_notifications") || "[]";
      const parsedLogs = JSON.parse(existingLogs);

      const newLog = {
        id: Math.random().toString(36).substring(2, 9),
        message: `New [${category}] feedback from ${customerName || "Anonymous Node"}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      localStorage.setItem("loop_notifications", JSON.stringify([newLog, ...parsedLogs]));
      localStorage.setItem("loop_has_unread", "true"); // Direct trigger dot to blink

      // Dispatch global window tracking system broadcast event
      window.dispatchEvent(new Event("new-feedback-received"));

      toast.success("Feedback submitted successfully!", {
        description: "Your feedback has been saved to the database.",
      });

      // Clear input fields logs data
      setCustomerName("");
      setEmail("");
      setCategory("Product");
      setFeedback("");
      setRating(5);
    } catch (error) {
      console.error(error);

      toast.error("Submission failed!", {
        description: "Please try again in a few seconds.",
      });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 md:p-12 antialiased overflow-hidden selection:bg-zinc-800 selection:text-white">
      
      {/* TECH BACKGROUND ELEMENTS */}
      {/* 1. Subtle Cyber Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.12] mix-blend-screen pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 60%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 60% at 50% 50%, #000 60%, transparent 100%)'
        }}
      />
      
      {/* 2. Soft Technical Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* HEADER SECTION (Aligned nicely above the wide layout) */}
      <div className="relative z-10 w-full max-w-2xl mb-8 flex flex-col items-start px-2">
        <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
          // TELEMETRY_FEEDBACK_MODULE
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
          Submit System Feedback
        </h1>
      </div>

      {/* FEEDBACK CONTAINER (Glassmorphic & Polished) */}
      <div className="relative z-10 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] rounded-2xl p-8 w-full max-w-2xl transition-all">

        <div className="space-y-6">
          {/* Customer Name Input */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Telemetry Origin / Customer Name
            </label>
            <input
              type="text"
              placeholder="Enter name or identity"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Routing Address / Email
            </label>
            <input
              type="email"
              placeholder="routing@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {/* Category Dropdown Selector */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Classification Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 rounded-xl text-sm font-mono transition-all outline-none appearance-none cursor-pointer focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="Product" className="bg-zinc-950 text-zinc-200">Product</option>
                <option value="Service" className="bg-zinc-950 text-zinc-200">Service</option>
                <option value="Support" className="bg-zinc-950 text-zinc-200">Support</option>
                <option value="Website" className="bg-zinc-950 text-zinc-200">Website</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500 text-xs font-mono">
                ↓
              </div>
            </div>
          </div>

          {/* Feedback Textarea */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Logs Payload / Feedback Details
            </label>
            <textarea
              rows={5}
              placeholder="Provide constructive analytics or feedback data lines..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>
          {/* Rating Selector */}
<div>
  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
    Customer Rating
  </label>

  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        className={`text-3xl transition-all duration-200 hover:scale-110 ${
          star <= rating
            ? "text-yellow-400"
            : "text-zinc-600"
        }`}
      >
        ★
      </button>
    ))}
  </div>

  <p className="mt-2 text-xs text-zinc-500 font-mono">
    Selected Rating: {rating}/5
  </p>
</div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              Dispatch Feedback
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}