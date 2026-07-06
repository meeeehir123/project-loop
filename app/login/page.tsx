"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<"credentials" | "otp">("credentials"); // Mode control
  
  // Credentials states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // OTP states
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpStep, setOtpStep] = useState(1); // 1: Enter Phone, 2: Enter OTP

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // 1. Username + Password Login Handler via Unified NextAuth Framework
  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return setError("Username aur password dono daalo bhai!");

    setLoading(true);
    setError("");

    try {
      const cleanEmail = username.trim().toLowerCase();
      
      // Executing native NextAuth runtime verification layer
      const res = await signIn("credentials", {
        email: cleanEmail,
        password: password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error(res.error || "Invalid security credentials");
      }

      // Sync local context indicators safely for custom layouts
      const userName = cleanEmail.split("@")[0];
      localStorage.setItem("loop_user", JSON.stringify({ name: userName, email: cleanEmail }));
      window.dispatchEvent(new Event("local-auth-update"));
      
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid security credentials!");
    } finally {
      setLoading(false);
    }
  };

  // 2. OTP Send Handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 10) return setError("Sahi phone number enter karo!");

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to route OTP");

      setOtpStep(2);
    } catch (err: any) {
      setError(err.message || "OTP route failure!");
    } finally {
      setLoading(false);
    }
  };

  // 3. OTP Verify Handler via NextAuth Framework
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return setError("OTP input code missing!");

    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        phone: phone.trim(),
        otp: otp.trim(),
        redirect: false,
      });

      if (res?.error) throw new Error("Invalid Access Code! (Use dummy code 123456)");

      // Sync local storage context indicators safely for OTP nodes
      localStorage.setItem("loop_user", JSON.stringify({ name: "Secure Node Operator", email: `${phone.trim()}@loop.os` }));
      window.dispatchEvent(new Event("local-auth-update"));
      
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Authentication error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4 antialiased overflow-hidden selection:bg-zinc-800 selection:text-white">
      
      {/* TECH BACKGROUND ELEMENTS */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] mix-blend-screen pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)'
        }}
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* LOGIN CARD */}
      <div className="relative z-10 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] rounded-2xl p-8 w-full max-w-[400px]">
        
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 text-center mb-1.5">
            Welcome back
          </h1>
          <p className="text-xs font-mono tracking-widest text-zinc-500 text-center uppercase">
            // AUTH_REQ: Project LOOP
          </p>
        </div>

        {/* MODE CONTROLLER TABS */}
        <div className="grid grid-cols-2 p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl mb-6 font-mono text-xs">
          <button
            onClick={() => { setAuthMode("credentials"); setError(""); }}
            className={`py-2 px-3 rounded-lg text-center transition ${authMode === "credentials" ? "bg-zinc-800 text-zinc-100 border border-zinc-700" : "text-zinc-500 hover:text-zinc-400"}`}
          >
            Access Keys
          </button>
          <button
            onClick={() => { setAuthMode("otp"); setError(""); }}
            className={`py-2 px-3 rounded-lg text-center transition ${authMode === "otp" ? "bg-zinc-800 text-zinc-100 border border-zinc-700" : "text-zinc-500 hover:text-zinc-400"}`}
          >
            Secure OTP
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-mono text-center">
            {error}
          </div>
        )}

        {/* CONDITIONAL SUB-SYSTEM BLOCKS */}
        {authMode === "credentials" ? (
          /* SECTION A: USERNAME & PASSWORD FORM */
          <form onSubmit={handleCredentialsLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
                User Identity
              </label>
              <input
                type="email"
                placeholder="name@domain.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
                Access Code
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Execute Login"}
            </button>
          </form>
        ) : (
          /* SECTION B: PHONE + OTP SUB-SYSTEM */
          <div className="space-y-5">
            {otpStep === 1 ? (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
                    Secure Phone Identity
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={loading}
                    className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Access OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
                    Verification OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                    className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Verify & Sign In"}
                </button>

                <button
                  type="button"
                  onClick={() => { setOtpStep(1); setOtp(""); setError(""); }}
                  className="w-full text-[10px] font-mono text-zinc-500 hover:text-zinc-400 text-center block mt-1 uppercase tracking-wider transition"
                >
                  ← Edit Identity Target
                </button>
              </form>
            )}
          </div>
        )}
        
      </div>
    </main>
  );
}