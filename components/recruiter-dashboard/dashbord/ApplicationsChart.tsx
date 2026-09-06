'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useState } from 'react';

interface ApplicationsChartProps {
  weeklyApplications: Array<{ day: string; count: number }>;
}

export default function ApplicationsChart({
  weeklyApplications,
}: ApplicationsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Applications this week
          </h2>
          <p className="text-[11px] text-slate-400">
            Hover over bars to inspect daily counts
          </p>
        </div>
        <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
          +24% vs last week
        </span>
      </div>

      {/* Dynamic Recharts Bar Chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={weeklyApplications}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive && typeof state.activeTooltipIndex === 'number') {
                setActiveIndex(state.activeTooltipIndex);
              } else {
                setActiveIndex(null);
              }
            }}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.6)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-xl bg-slate-900 px-3 py-2 text-white shadow-lg border border-slate-800">
                      <p className="text-[10px] font-medium text-slate-400">
                        {data.day}
                      </p>
                      <p className="text-xs font-bold mt-0.5">
                        <span className="text-[#818cf8] font-black">
                          {data.count}
                        </span>{' '}
                        {data.count === 1 ? 'Applicant' : 'Applicants'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]}>
              {weeklyApplications.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeIndex === index ? '#4338ca' : '#5243E0'}
                  className="transition-all duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}