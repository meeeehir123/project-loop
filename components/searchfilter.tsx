"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SearchFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const search = params.get("search") || "";
  const category = params.get("category") || "";

  function update(key: string, value: string) {
    const query = new URLSearchParams(params.toString());

    if (value) query.set(key, value);
    else query.delete(key);

    router.push(`/dashboard?${query.toString()}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <input
        value={search}
        onChange={(e) => update("search", e.target.value)}
        placeholder="Search customer or feedback..."
        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 flex-1 outline-none text-white"
      />

      <select
        value={category}
        onChange={(e) => update("category", e.target.value)}
        className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3"
      >
        <option value="">All Categories</option>
        <option value="Bug">Bug</option>
        <option value="Complaint">Complaint</option>
        <option value="Feature Request">Feature Request</option>
      </select>
    </div>
  );
}