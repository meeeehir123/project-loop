// @ts-nocheck
import SearchFilter from "@/components/searchfilter";
import FeedbackList from "@/components/feedbacklist";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// SERVER ACTION: Purge Logic
async function purgeNegativeFeedback() {
'use server'
await prisma.feedback.deleteMany({
where: {
OR: [
{ sentiment: { equals: "negative", mode: "insensitive" } },
{ category: { equals: "negative", mode: "insensitive" } }
]
}
});
revalidatePath("/dashboard");
}

export default async function DashboardPage({
searchParams,
}: {
searchParams: Promise<{
search?: string;
category?: string;
}>;
}) {
const resolvedSearchParams = await searchParams;
const currentSearch = resolvedSearchParams.search;
const currentCategory = resolvedSearchParams.category;

const feedbacks = await prisma.feedback.findMany({
where: {
...(currentSearch && {
OR: [
{ customerName: { contains: currentSearch, mode: "insensitive" } },
{ feedback: { contains: currentSearch, mode: "insensitive" } },
],
}),
...(currentCategory && {
OR: [
{ category: { equals: currentCategory, mode: "insensitive" } },
{ sentiment: { equals: currentCategory, mode: "insensitive" } }
]
}),
},
orderBy: {
id: "desc",
},
});

const normalize = (val: string) => val?.toLowerCase().trim();
const positiveCount = feedbacks.filter((item) => normalize(item.sentiment) === "positive" || normalize(item.category) === "positive").length;
const neutralCount = feedbacks.filter((item) => normalize(item.sentiment) === "neutral" || normalize(item.category) === "neutral").length;
const negativeCount = feedbacks.filter((item) => normalize(item.sentiment) === "negative" || normalize(item.category) === "negative").length;

const NEGATIVE_THRESHOLD = 5;
const isCritical = negativeCount >= NEGATIVE_THRESHOLD;

const total = feedbacks.length || 1;
const posDeg = (positiveCount / total) * 360;
const neuDeg = (neutralCount / total) * 360;
const posPct = Math.round((positiveCount / total) * 100);
const neuPct = Math.round((neutralCount / total) * 100);
const negPct = Math.round((negativeCount / total) * 100);
const maxCount = Math.max(positiveCount, neutralCount, negativeCount) || 1;
const posBarHeight = Math.round((positiveCount / maxCount) * 140);
const neuBarHeight = Math.round((neutralCount / maxCount) * 140);
const negBarHeight = Math.round((negativeCount / maxCount) * 140);

return (
<div className="min-h-screen bg-[#09090b] text-zinc-100 flex font-sans antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-white">
<aside className="w-64 border-r border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl relative z-20 hidden md:flex flex-col justify-between p-6 shrink-0">
<div className="space-y-8">
<Link href="/" className="flex items-center space-x-3 px-2 group cursor-pointer">
<div className="h-5 w-5 rounded bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-200" />
<span className="font-mono text-sm font-bold tracking-wider uppercase text-zinc-200 group-hover:text-white transition-colors">
Loop // OS
</span>
</Link>
<nav className="space-y-1 font-mono text-xs tracking-wide">
<span className="block px-2 text-[10px] uppercase text-zinc-500 font-bold mb-2 tracking-widest">// Core Modules</span>
<Link href="/dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 transition shadow-inner w-full">
<span className="text-blue-400">⚡</span>
<span>Telemetry Hub</span>
</Link>
<Link href="/dashboard/clusters" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition w-full">
<span>📊</span>
<span>Data Clusters</span>
</Link>
<Link href="/terms" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition w-full">
<span>🔒</span>
<span>Security Audits</span>
</Link>
</nav>
</div>

<div className="border-t border-zinc-800/80 pt-4 font-mono text-xs">
<div className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400 mb-3">
Admin Dashboard
</div>
<Link
href="/api/auth/signout"
className="w-full text-center block py-2 bg-zinc-900 hover:bg-red-950/30 border border-zinc-800 hover:border-red-900/40 text-zinc-400 hover:text-red-400 font-medium rounded-xl transition duration-150"
>
Exit Terminal
</Link>
</div>
</aside>

<main className="flex-1 relative p-6 md:p-10 flex flex-col space-y-8 overflow-y-auto w-full z-10">
<div className="absolute inset-0 z-0 opacity-[0.08] mix-blend-screen pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
<div className="relative z-10 space-y-8 w-full max-w-7xl mx-auto">
{/* PURGE BUTTON LINKED HERE */}
{isCritical && (
<div className="w-full bg-rose-950/20 border border-rose-900/50 rounded-xl p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-4 shadow-xl">
<div className="flex items-center gap-3 text-rose-400">
<span className="text-xl">⚠️</span>
<div>
<h3 className="font-bold text-sm">System Stability Compromised</h3>
<p className="text-[11px] opacity-70">Negative feedback frequency has exceeded safety margins.</p>
</div>
</div>
<form action={purgeNegativeFeedback}>
<button type="submit" className="text-[10px] bg-rose-600 hover:bg-rose-500 text-white px-3 py-1.5 rounded-lg font-bold uppercase transition">
Initiate Purge
</button>
</form>
</div>
)}

{/* ... Rest of your UI code remains exactly same ... */}
<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-zinc-800">
<div>
<div className="flex items-center gap-2 mb-1.5">
<span className="flex h-2 w-2 relative">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
</span>
<p className="text-xs font-mono tracking-widest text-zinc-400 uppercase">SYSTEM_LIVE // CORE_INDEX_CONSOLE</p>
</div>
<h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400">Project LOOP Analytics</h1>
</div>
<Link href="/feedback" className="group bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider px-5 py-3 rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] inline-flex items-center gap-2">
<span>+</span> Dispatch Feedback
</Link>
</div>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
<div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="group bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300">
<div className="flex justify-between items-start">
<div><span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">SYS.LOG_POOL</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Total Volumes</h2></div>
<div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400 font-mono text-xs">Σ</div>
</div>
<p className="text-5xl font-bold tracking-tight mt-6 text-blue-400 group-hover:scale-[1.02] origin-left transition-transform duration-300">{feedbacks.length}</p>
</div>
<div className="group bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300">
<div className="flex justify-between items-start">
<div><span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">METRIC.OPTIMAL</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Positive Insights</h2></div>
<div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 font-mono text-xs">{feedbacks.length > 0 ? posPct : 0}%</div>
</div>
<p className="text-5xl font-bold tracking-tight mt-6 text-emerald-400 group-hover:scale-[1.02] origin-left transition-transform duration-300">{positiveCount}</p>
</div>
<div className="group bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300">
<div className="flex justify-between items-start">
<div><span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">METRIC.STEADY</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Neutral Variance</h2></div>
<div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-400 font-mono text-xs">{feedbacks.length > 0 ? neuPct : 0}%</div>
</div>
<p className="text-5xl font-bold tracking-tight mt-6 text-amber-400 group-hover:scale-[1.02] origin-left transition-transform duration-300">{neutralCount}</p>
</div>
<div className={`group bg-zinc-900/60 backdrop-blur-md border ${isCritical ? 'border-rose-600 shadow-[0_0_20px_rgba(225,29,72,0.3)]' : 'border-zinc-800'} rounded-2xl p-6 shadow-2xl flex flex-col justify-between hover:border-rose-500/40 transition-all duration-300 relative`}>
{isCritical && (
<div className="absolute top-2 right-2 flex items-center gap-1 bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[9px] font-mono animate-pulse">
● CRITICAL_THRESHOLD
</div>
)}
<div className="flex justify-between items-start">
<div><span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">METRIC.CRIT</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Negative Deviations</h2></div>
<div className="p-1.5 bg-rose-500/10 rounded-lg border border-rose-500/20 text-rose-400 font-mono text-xs">{feedbacks.length > 0 ? negPct : 0}%</div>
</div>
<p className="text-5xl font-bold tracking-tight mt-6 text-rose-400 group-hover:scale-[1.02] origin-left transition-transform duration-300">{negativeCount}</p>
</div>
</div>

<div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-between">
<div className="w-full text-left"><span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">VISUAL.RATIO_MAPPING</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Vector Donut</h2></div>
<div className="relative flex items-center justify-center my-6">
<div className="w-44 h-44 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.6)]" style={{ background: feedbacks.length > 0 ? `conic-gradient(#10b981 0deg ${posDeg}deg, #f59e0b ${posDeg}deg ${posDeg + neuDeg}deg, #f43f5e ${posDeg + neuDeg}deg 360deg)` : `#27272a` }} />
<div className="absolute w-[122px] h-[122px] bg-[#09090b] rounded-full flex flex-col items-center justify-center border border-zinc-800 shadow-2xl">
<span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Optimal</span>
<span className="text-2xl font-bold text-zinc-100 tracking-tight mt-0.5">{feedbacks.length > 0 ? posPct : 0}%</span>
<div className="w-8 h-[2px] bg-emerald-500/40 rounded mt-1.5" />
</div>
</div>
<div className="w-full space-y-2.5 pt-3 border-t border-zinc-800">
<div className="flex items-center justify-between text-xs font-mono"><div className="flex items-center gap-2 text-zinc-300"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span>Positive</span></div><span className="text-zinc-400">{positiveCount} logs</span></div>
<div className="flex items-center justify-between text-xs font-mono"><div className="flex items-center gap-2 text-zinc-300"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /><span>Neutral</span></div><span className="text-zinc-400">{neutralCount} logs</span></div>
<div className="flex items-center justify-between text-xs font-mono"><div className="flex items-center gap-2 text-zinc-300"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /><span>Negative</span></div><span className="text-zinc-400">{negativeCount} logs</span></div>
</div>
</div>

<div className="bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
<div className="w-full text-left mb-4"><span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">VISUAL.FREQUENCY_BARS</span><h2 className="text-sm font-medium text-zinc-300 mt-0.5">Magnitude Graph</h2></div>
<div className="flex items-end justify-around h-44 w-full bg-zinc-950/60 border border-zinc-800 rounded-xl p-4 relative">
<div className="absolute inset-x-0 top-1/4 border-t border-zinc-900/40" /><div className="absolute inset-x-0 top-2/4 border-t border-zinc-900/40" /><div className="absolute inset-x-0 top-3/4 border-t border-zinc-900/40" />
<div className="flex flex-col items-center gap-2 w-full max-w-[32px] z-10"><div className="text-[10px] font-mono text-emerald-400">{positiveCount}</div><div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md" style={{ height: `${feedbacks.length > 0 ? posBarHeight : 4}px` }} /></div>
<div className="flex flex-col items-center gap-2 w-full max-w-[32px] z-10"><div className="text-[10px] font-mono text-amber-400">{neutralCount}</div><div className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md" style={{ height: `${feedbacks.length > 0 ? neuBarHeight : 4}px` }} /></div>
<div className="flex flex-col items-center gap-2 w-full max-w-[32px] z-10"><div className="text-[10px] font-mono text-rose-400">{negativeCount}</div><div className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-md" style={{ height: `${feedbacks.length > 0 ? negBarHeight : 4}px` }} /></div>
</div>
<div className="grid grid-cols-3 text-center text-[10px] font-mono text-zinc-500 pt-3 border-t border-zinc-800 mt-4"><span>POS</span><span>NEU</span><span>NEG</span></div>
</div>
</div>

<SearchFilter />
<div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl">
<div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
<div><span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">DATA_STREAM.INGEST</span><h2 className="text-xl font-medium text-white mt-0.5">Recent Telemetry Streams</h2></div>
<span className="text-xs font-mono text-zinc-400">Records: {feedbacks.length}</span>
</div>
{feedbacks.length === 0 ? <div className="border border-dashed border-zinc-800 rounded-xl p-12 text-center"><p className="text-sm font-mono text-zinc-500">No logs registered.</p></div> : <FeedbackList feedbacks={feedbacks} />}
</div>
</div>
</main>
</div>
);
}