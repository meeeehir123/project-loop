"use client";
import { isValidEmail, isStrongPassword } from "@/lib/validation";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Real-time requirement checks for the UI
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const handleRegister = async () => {
    try {
      if (!isValidEmail(email)) {
        alert("Enter a valid email address");
        return;
      }

      if (!isStrongPassword(password)) {
        alert("Password must meet all security requirements.");
        return;
      }

      const cleanEmail = email.trim().toLowerCase();

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // 1. Save the newly initialized user session details
        localStorage.setItem("loop_user", JSON.stringify({ name: name, email: cleanEmail }));
        
        // 2. Dispatch event to update the Navbar component instantaneously
        window.dispatchEvent(new Event("local-auth-update"));
        
        alert("Account initialized successfully!");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Helper component for requirement items
  const RequirementItem = ({ label, met }: { label: string; met: boolean }) => (
    <div className={`flex items-center gap-1.5 transition-colors duration-300 ${met ? "text-emerald-400" : "text-zinc-600"}`}>
      <span className="text-[10px] font-mono select-none">
        {met ? "✓" : "○"}
      </span>
      <span className="text-[10px] font-mono tracking-wider uppercase">{label}</span>
    </div>
  );

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
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* REGISTER CARD */}
      <div className="relative z-10 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)] rounded-2xl p-8 w-full max-w-[400px]">
        
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 text-center mb-1.5">
            Create Account
          </h1>
          <p className="text-xs font-mono tracking-widest text-zinc-500 text-center uppercase">
            // INIT_NODE: Join Project LOOP
          </p>
        </div>

        <div className="space-y-5">
          
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-2 uppercase">
              Secure Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950/60 border border-zinc-800 text-zinc-200 placeholder-zinc-600 rounded-xl text-sm font-mono transition-all outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
            
            {/* COOL PASSWORD VALIDATION SECTION */}
            <div className="mt-3 p-3 bg-zinc-950/40 border border-zinc-800/60 rounded-xl space-y-2">
              <div className="flex justify-between items-center border-b border-zinc-800/50 pb-1.5 mb-1.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500">Security Params</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-all ${
                  password.length === 0 ? "bg-zinc-900 border-zinc-800 text-zinc-500" :
                  (hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial) 
                    ? "bg-emerald-950/50 border-emerald-500/30 text-emerald-400" 
                    : "bg-amber-950/30 border-amber-500/20 text-amber-400"
                }`}>
                  {password.length === 0 ? "EMPTY" : (hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial) ? "SECURE" : "WEAK"}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                <RequirementItem label="8+ Characters" met={hasMinLength} />
                <RequirementItem label="Uppercase (A-Z)" met={hasUppercase} />
                <RequirementItem label="Lowercase (a-z)" met={hasLowercase} />
                <RequirementItem label="Number (0-9)" met={hasNumber} />
                <div className="col-span-2">
                  <RequirementItem label="Special Symbol (!@#$)" met={hasSpecial} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full mt-2 bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm py-3 px-4 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-zinc-400"
          >
            Initialize Account
          </button>
        </div>
        
      </div>
    </main>
  );
}