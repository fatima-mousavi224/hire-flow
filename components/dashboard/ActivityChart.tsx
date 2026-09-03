'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ActivityDataPoint {
  date: string;
  applications: number;
  profileViews: number;
}

const defaultData: ActivityDataPoint[] = [
  { date: 'Dec 1', applications: 1, profileViews: 4 },
  { date: 'Dec 8', applications: 2, profileViews: 7 },
  { date: 'Dec 15', applications: 1, profileViews: 5 },
  { date: 'Dec 22', applications: 0, profileViews: 3 },
  { date: 'Dec 29', applications: 3, profileViews: 9 },
  { date: 'Jan 5', applications: 2, profileViews: 8 },
  { date: 'Jan 12', applications: 3, profileViews: 12 },
];

export default function ActivityChart({ data = defaultData }: { data?: ActivityDataPoint[] }) {
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [timeRange, setTimeRange] = useState('7-weeks');

  if (!isMounted) {
    return (
      <div className="h-48 sm:h-56 md:h-64 w-full flex items-center justify-center bg-slate-50/50 rounded-xl text-xs text-slate-400 font-medium">
        Loading activity chart...
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Top Header with Select Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">Application Activity</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="w-full sm:w-auto rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs cursor-pointer"
        >
          <option value="7-weeks">Last 7 weeks</option>
          <option value="30-days">Last 30 days</option>
          <option value="3-months">Last 3 months</option>
        </select>
      </div>

      {/* Chart Canvas Wrapper */}
      <div className="h-48 sm:h-56 md:h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorProfileViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#F1F5F9" />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 10 }} 
              dy={8}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94A3B8', fontSize: 10 }} 
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E293B', 
                borderRadius: '8px', 
                color: '#FFF', 
                fontSize: '11px', 
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            />

            <Area
              type="monotone"
              dataKey="profileViews"
              name="Profile views"
              stroke="#10B981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfileViews)"
            />

            <Area
              type="monotone"
              dataKey="applications"
              name="Applications"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorApplications)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Responsive Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1">
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-3.5 sm:w-4 rounded-full bg-indigo-500 inline-block" />
          <span className="text-xs font-medium text-slate-600">Applications</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-3.5 sm:w-4 rounded-full bg-emerald-500 inline-block" />
          <span className="text-xs font-medium text-slate-600">Profile views</span>
        </div>
      </div>
    </div>
  );
}