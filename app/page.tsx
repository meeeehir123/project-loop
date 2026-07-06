import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col items-center justify-between px-6 overflow-hidden">
      
      {/* GRID MESH OVERLAY */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.12] mix-blend-screen pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #3f3f46 1px, transparent 1px), linear-gradient(to bottom, #3f3f46 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 40%, transparent 100%)'
        }}
      />
      
      {/* GLOWING AMBIENT RADIALS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-[100px] pointer-events-none z-0" />

      {/* LANDING CONTENT */}
      <div className="relative z-10 max-w-4xl text-center space-y-6 mt-12 w-full flex-1 flex flex-col justify-center items-center">
        
        {/* Micro System Release Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span>ENGINE STABLE RELEASE // V1.0</span>
        </div>

        {/* Cinematic Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-500 max-w-3xl mx-auto leading-[1.15]">
          AI Customer-Feedback Intelligence Platform
        </h1>
        
        <p className="text-base sm:text-lg text-zinc-400 font-mono tracking-normal max-w-xl mx-auto leading-relaxed">
          The elite analysis engine mapping user sentiment datasets into actionable, real-time insights.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-150 shadow-[0_4px_20px_rgba(255,255,255,0.05)] active:scale-[0.98]"
          >
            Launch Console
          </Link>
          <Link
            href="/feedback"
            className="border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-zinc-100 font-medium text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
          >
            Submit Signal
          </Link>
        </div>

        {/* PREMIUM IMAGE / INTERFACE PREVIEW ANCHOR */}
        <div className="pt-16 max-w-5xl mx-auto group w-full">
          <div className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-2 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:border-zinc-700/50 transition-all duration-300">
            {/* Ambient edge flare */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent rounded-2xl pointer-events-none" />
            
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" 
              alt="Project LOOP Matrix Terminal Preview" 
              className="w-full h-auto rounded-xl object-cover opacity-80 mix-blend-luminosity group-hover:opacity-95 group-hover:mix-blend-normal transition-all duration-500 border border-zinc-900 shadow-inner"
            />
          </div>
        </div>

        {/* --- HIGH CONTRAST LIGHT / DARK UNIVERSAL SOCIAL HUB --- */}
        <div className="pt-20 pb-4 flex justify-center items-center w-full">
          <div className="flex justify-center items-center gap-3 p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-900/80 backdrop-blur-md shadow-xl transition-all duration-300">
            
            {/* GitHub Secure Node */}
            <a 
              href="https://github.com/meeeehir123" 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub Environment"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-300 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>

            {/* LinkedIn Network Node */}
            <a 
              href="https://www.linkedin.com/in/meehir-tripathi-5104a6350?utm_source=share_via&utm_content=profile&utm_medium=member_ios" 
              target="_blank" 
              rel="noopener noreferrer"
              title="LinkedIn Matrix"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-300 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Instagram Grid Node */}
            <a 
              href="https://www.instagram.com/meeeehirr?igsh=MXdrem1rOHQwOHpwdQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Instagram Signal"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-300 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Mail Mainline Node */}
            <a 
              href="mailto:tripathimeehir@gmail.com" 
              title="Secure Mail Feed"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-300 dark:border-zinc-900 bg-white dark:bg-zinc-900/20 text-zinc-700 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200 active:scale-95 shadow-sm"
            >
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>

          </div>
        </div>

      </div>

      {/* 📄 LEGAL & NAVIGATION FOOTER */}
      <footer className="w-full max-w-4xl mx-auto mt-12 pt-6 border-t border-zinc-800/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-500 pb-8 relative z-10">
        <div>
          © 2026 Loop // OS. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link 
            href="/terms" 
            className="hover:text-zinc-300 transition-colors duration-150 relative group"
          >
            <span>Terms & Conditions</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-200" />
          </Link>
          <span className="opacity-40 cursor-not-allowed">Privacy Policy (Soon)</span>
        </div>
      </footer>

    </div>
  );
}