"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function FeedbackList({ feedbacks }: { feedbacks: any[] }) {
  const [search, setSearch] = useState("");
  const [editingFeedback, setEditingFeedback] = useState<any>(null);

  const exportToCSV = () => {
    const headers = ["Customer,Category,Feedback,Sentiment,Rating,Date"];
    const rows = feedbacks.map((f) => `"${f.customerName}","${f.category}","${f.feedback}","${f.sentiment}","${f.rating}","${f.createdAt}"`);
    const blob = new Blob([[headers, ...rows].join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback_export.csv";
    a.click();
  };

  const deleteFeedback = async (id: number) => {
    if (!window.confirm("Are you sure?")) return;
    const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    if (res.ok) { window.location.reload(); } else { toast.error("Delete failed"); }
  };

  const updateFeedback = async () => {
    const res = await fetch(`/api/feedback/${editingFeedback.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingFeedback),
    });
    if (res.ok) {
      toast.success("Feedback updated successfully!");
      setEditingFeedback(null);
      window.location.reload();
    } else {
      toast.error("Update failed.");
    }
  };

  const filtered = useMemo(() => {
    return feedbacks.filter((i) => i.customerName.toLowerCase().includes(search.toLowerCase()));
  }, [feedbacks, search]);

  return (
    <>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search entries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950/60 px-5 py-3 text-sm font-mono text-zinc-200 outline-none focus:border-zinc-700"
        />
        <button onClick={exportToCSV} className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-mono uppercase tracking-wider transition">
          Export CSV
        </button>
      </div>

      <ul className="space-y-3.5">
        {filtered.map((item) => (
          <li key={item.id} className="group relative border border-zinc-800/50 rounded-xl p-5 bg-zinc-950/20 hover:bg-zinc-950/70 hover:border-zinc-700/50 transition-all duration-200 shadow-md">
            
            {/* Buttons ka wahi look */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 flex items-center gap-1.5">
              <button onClick={() => setEditingFeedback(item)} className="p-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-400 hover:text-zinc-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>
              <button onClick={() => deleteFeedback(item.id)} className="p-2 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 hover:text-rose-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:pr-20">
              <div>
                <h3 className="font-medium text-zinc-200 text-[15px]">{item.customerName}</h3>
                <div className="flex gap-3 flex-wrap mt-1 text-xs font-mono">
                  <span className="text-zinc-500">Scope: <span className="text-zinc-400">{item.category}</span></span>
                </div>
              </div>
              <div className="text-[11px] font-mono"><span className="px-2.5 py-1 bg-zinc-800 rounded-lg text-zinc-400">{item.sentiment}</span></div>
            </div>
            <p className="mt-4 text-sm text-zinc-400 leading-relaxed pl-0.5">{item.feedback}</p>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {editingFeedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 w-96">
            <h2 className="text-white mb-4">Edit Feedback</h2>
            <input value={editingFeedback.customerName} onChange={(e) => setEditingFeedback({...editingFeedback, customerName: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-white rounded mb-4" />
            <textarea value={editingFeedback.feedback} onChange={(e) => setEditingFeedback({...editingFeedback, feedback: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 p-2 text-white rounded mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setEditingFeedback(null)} className="px-4 py-2 bg-zinc-800 text-white rounded">Cancel</button>
              <button onClick={updateFeedback} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}