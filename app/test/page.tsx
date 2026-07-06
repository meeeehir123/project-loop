"use client";

export default function TestPage() {
  async function testAPI() {
    const res = await fetch("/api/login", {
      method: "POST",
    });

    const data = await res.json();
    alert(data.message);
    console.log(data);
  }

  return (
    <div className="p-10">
      <button
        onClick={testAPI}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Test Login API
      </button>
    </div>
  );
}