"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Cell } from 'recharts';

export default function FeedbackChart({ data }: { data: any[] }) {
  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{fontSize: 10, fill: '#71717a'}} axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px'}} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}