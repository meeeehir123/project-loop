"use client";

// Pehle interface define karo
interface Feedback {
  customerName: string;
  category: string;
  feedback: string;
  sentiment: string;
  rating: number;
  createdAt: string | Date;
}

// Ab props mein type batado
export default function ExportButton({ feedbacks }: { feedbacks: Feedback[] }) {
  const exportToCSV = () => {
    const headers = ["Customer,Category,Feedback,Sentiment,Rating,Date"];
    const rows = feedbacks.map((f) => 
      `"${f.customerName}","${f.category}","${f.feedback}","${f.sentiment}","${f.rating}","${f.createdAt}"`
    );
    
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `telemetry_export_${new Date().toISOString()}.csv`;
    a.click();
  };

  return (
    <button 
      onClick={exportToCSV}
      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition"
    >
      Export CSV
    </button>
  );
}