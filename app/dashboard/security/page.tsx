import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans antialiased overflow-x-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl relative z-20 hidden md:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="h-5 w-5 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-zinc-200">Loop // OS</span>
          </div>
          <nav className="space-y-1 font-mono text-xs tracking-wide">
            <span className="block px-2 text-[10px] uppercase text-zinc-500 font-bold mb-2 tracking-widest">// Core Modules</span>
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition">
              <span>⚡</span>
              <span>Telemetry Hub</span>
            </Link>
            <Link href="/dashboard/clusters" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition">
              <span>📊</span>
              <span>Data Clusters</span>
            </Link>
            <Link href="/dashboard/security" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 transition shadow-inner">
              <span>🔒</span>
              <span>Security Audits</span>
            </Link>
          </nav>
        </div>
        <div className="border-t border-zinc-800/80 pt-4 font-mono text-xs">
          <Link href="/login" className="w-full text-center block py-2 bg-zinc-900 hover:bg-red-950/30 border border-zinc-800 text-zinc-400 hover:text-red-400 font-medium rounded-xl transition duration-150">
            Exit Terminal
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 relative p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto w-full z-10">
        <div className="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        
        <div className="relative z-10 space-y-8 w-full max-w-7xl mx-auto">
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <p className="text-xs font-mono tracking-widest text-rose-500 uppercase">SEC_INTEGRITY // GATE</p>
            </div>
            <h1 className="text-3xl font-bold text-white font-mono">Security Audits Console</h1>
          </div>

          {/* AUDIT MONITOR PANEL */}
          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl font-mono space-y-5">
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
              <span className="text-xs text-zinc-400">Database Proxy Core Handshake</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">SECURE</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
              <span className="text-xs text-zinc-400">Environment Credentials Protection Matrix</span>
              <span className="text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">AES_256_ACTIVE</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-3">
              <span className="text-xs text-zinc-400">Prisma SQL Injection Vector Shield</span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">GUARD_ON</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-zinc-400">NextAuth Verification Token Expiry Lock</span>
              <span className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded font-bold uppercase tracking-wider">MONITORING</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}