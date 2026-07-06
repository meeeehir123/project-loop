import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ClustersPage() {
  // 1. Fetching all feedbacks sorted by latest logs first
  const feedbacks = await prisma.feedback.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const totalFeedbacks = feedbacks.length || 1;

  // 2. Normalizer & Clustering Map with strict telemetry checks
  const normalize = (val: string) => val?.toLowerCase().trim() || "unassigned";

  // Pre-defining our core AI Nodes structure
  const clusterNodeDetails: Record<string, { title: string; colorClass: string; barClass: string; tag: string }> = {
    positive: {
      title: "Optimal Clusters (Positive)",
      colorClass: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      barClass: "from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      tag: "METRIC.OPTIMAL",
    },
    negative: {
      title: "Critical Deviations (Negative)",
      colorClass: "text-rose-400 border-rose-500/20 bg-rose-500/5",
      barClass: "from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]",
      tag: "METRIC.CRIT_FAULT",
    },
    neutral: {
      title: "Steady-State Logs (Neutral)",
      colorClass: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      barClass: "from-amber-600 to-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
      tag: "METRIC.STEADY_VAR",
    },
    unassigned: {
      title: "Unassigned Packets",
      colorClass: "text-zinc-400 border-zinc-800 bg-zinc-900/50",
      barClass: "from-zinc-600 to-zinc-400",
      tag: "SYS.LOG_POOL",
    },
  };

  // Grouping data entries and appending recent text strings dynamically
  const clusteredData = feedbacks.reduce((acc: Record<string, { count: number; items: typeof feedbacks }>, item) => {
    let key = normalize(item.sentiment);
    if (!clusterNodeDetails[key]) {
      key = normalize(item.category);
      if (!clusterNodeDetails[key]) key = "unassigned";
    }
    
    if (!acc[key]) acc[key] = { count: 0, items: [] };
    acc[key].count += 1;
    if (acc[key].items.length < 3) {
      acc[key].items.push(item); // Keep latest 3 preview logs for workspace insight
    }
    return acc;
  }, {});

  return (
    // ✅ ULTRA HIGH-CONTRAST MATTE DARK LAYOUT (NO LIGHT-MODE CLASHING)
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-white">
      
      {/* 1. HIGH-TECH SIDEBAR CONTAINER */}
      <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl relative z-20 hidden md:flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 px-2 group cursor-pointer">
            <div className="h-5 w-5 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-200" />
            <span className="font-mono text-sm font-bold tracking-wider uppercase text-zinc-200 group-hover:text-white transition-colors">
              Loop // OS
            </span>
          </Link>

          {/* Navigation Sub-Links */}
          <nav className="space-y-1 font-mono text-xs tracking-wide">
            <span className="block px-2 text-[10px] uppercase text-zinc-500 font-bold mb-2 tracking-widest">// Core Modules</span>
            <Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition w-full">
              <span>⚡</span>
              <span>Telemetry Hub</span>
            </Link>
            <Link href="/dashboard/clusters" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 transition shadow-inner w-full">
              <span className="text-blue-400">📊</span>
              <span>Data Clusters</span>
            </Link>
            <Link href="/terms" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition w-full">
              <span>🔒</span>
              <span>Security Audits</span>
            </Link>
          </nav>
        </div>

        {/* System Node Status */}
        <div className="border-t border-zinc-800/80 pt-4 font-mono text-xs">
          <div className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 mb-3">
            👤 node_operator: <span className="text-emerald-400 font-bold animate-pulse">active</span>
          </div>
          <Link 
            href="/"
            className="w-full text-center block py-2 bg-zinc-900 hover:bg-red-950/30 border border-zinc-800 hover:border-red-900/40 text-zinc-400 hover:text-red-400 font-medium rounded-xl transition duration-150"
          >
            Exit Terminal
          </Link>
        </div>
      </aside>

      {/* 2. MAIN HUB WORKSPACE */}
      <main className="flex-1 relative p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto w-full z-10">
        
        {/* TECH BACKGROUND MESH GRID */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen pointer-events-none" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        <div className="relative z-10 space-y-8 w-full max-w-7xl mx-auto">
          {/* TOP COMMAND HEADER */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <p className="text-xs font-mono tracking-widest text-zinc-500 uppercase">CLUSTER_ROUTING // NEURAL_INDEX_ENGINE</p>
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">AI Data Clusters Monitor</h1>
            </div>
            
            <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              Total Managed Nodes: <span className="text-blue-400 font-bold">{feedbacks.length}</span>
            </div>
          </div>

          {/* DYNAMIC CLUSTER CARDS LAYER */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {feedbacks.length === 0 ? (
              <div className="xl:col-span-3 border border-dashed border-zinc-800 rounded-2xl p-16 text-center">
                <p className="text-sm font-mono text-zinc-500">No telemetry matrix packets registered in database pipeline.</p>
              </div>
            ) : (
              Object.entries(clusteredData).map(([name, data]) => {
                const config = clusterNodeDetails[name] || clusterNodeDetails.unassigned;
                const percentage = Math.round((data.count / totalFeedbacks) * 100);

                return (
                  <div 
                    key={name} 
                    className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 p-6 rounded-2xl shadow-2xl flex flex-col justify-between hover:border-zinc-700/60 transition-all duration-300 relative group"
                  >
                    <div>
                      {/* Top Meta Indicator */}
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">{config.tag}</span>
                        <span className={`text-[10px] font-mono border rounded-lg px-2 py-0.5 font-bold ${config.colorClass}`}>
                          {percentage}% VOL
                        </span>
                      </div>

                      {/* Volumetric Count */}
                      <h2 className="text-xl font-medium text-zinc-100 font-mono mb-1">{config.title}</h2>
                      <p className="text-4xl font-bold tracking-tight text-white mt-2">{data.count} <span className="text-xs font-mono font-normal text-zinc-500">logs ingested</span></p>

                      {/* Relative Progress Magnitude Indicator */}
                      <div className="w-full bg-zinc-950 h-1.5 rounded-full mt-4 overflow-hidden border border-zinc-900">
                        <div 
                          className={`bg-gradient-to-r ${config.barClass} h-full rounded-full transition-all duration-1000 ease-out`} 
                          style={{ width: `${percentage}%` }} 
                        />
                      </div>

                      {/* Recent Telemetry Stream Log Pipeline Previews */}
                      <div className="mt-6 pt-4 border-t border-zinc-800/60 space-y-2.5">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">// Real-time Node Stream</p>
                        {data.items.map((log) => (
                          <div key={log.id} className="text-xs bg-zinc-950/40 border border-zinc-800/50 p-2.5 rounded-xl font-mono text-zinc-400 overflow-hidden text-ellipsis whitespace-nowrap group-hover:border-zinc-800 transition-colors">
                            <span className="text-zinc-600 text-[11px] mr-1">[{new Date(log.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                            {log.feedback}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
}