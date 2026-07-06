import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-8 md:p-16 font-sans antialiased relative">
      {/* HIGH-CONTRAST TECH BACKGROUND MESH GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.05] mix-blend-screen pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="border-b border-zinc-800 pb-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse" />
            <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">// LEGAL_COMPLIANCE_NODE</p>
          </div>
          <h1 className="text-3xl font-bold text-white font-mono tracking-tight">Terms & Conditions</h1>
          <p className="text-xs text-zinc-400 font-mono mt-2">System Version: v1.0.4 // Last Updated: July 2026</p>
        </div>

        {/* CONTENT */}
        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed font-mono">
          <section className="space-y-2 bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">// 1. ACCEPTANCE OF TERMS</h2>
            <p className="text-xs text-zinc-400 mt-1">
              By accessing or interfacing with this portal, you agree to be bound by these core operating guidelines and legal telemetry conditions.
            </p>
          </section>

          <section className="space-y-2 bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">// 2. DATA UTILITY & CLUSTERING</h2>
            <p className="text-xs text-zinc-400 mt-1">
              All feedback inputs, analytical telemetry, and system log data streams are processed securely via our encrypted database nodes.
            </p>
          </section>

          <section className="space-y-2 bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider text-blue-400">// 3. AUTHENTICATION BOUNDARIES</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Users are strictly responsible for maintaining the privacy of active sessions, OTP streams, and administrative console access keys.
            </p>
          </section>
        </div>

        {/* ACTION BUTTON */}
        <div className="pt-4 flex items-center justify-between">
          <Link 
            href="/dashboard" 
            className="text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-5 py-2.5 rounded-xl transition duration-150 shadow-md inline-flex items-center gap-2"
          >
            <span>←</span> Return to Terminal
          </Link>
          <span className="text-[10px] font-mono text-zinc-600">STATUS // VERIFIED</span>
        </div>
      </div>
    </div>
  );
}