interface ApplicationFunnelProps {
  funnel: Array<{ label: string; count: number; percentage: number | null }>;
}

export default function ApplicationFunnel({ funnel }: ApplicationFunnelProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
      <h2 className="text-sm font-bold text-slate-900 mb-4">Application Funnel</h2>
      <div className="space-y-4">
        {funnel.map((step, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>{step.label}</span>
              <span className="font-bold text-slate-900">{step.count}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                style={{ width: `${step.percentage || 10}%` }}
                className="h-full rounded-full bg-[#5243E0]"
              />
            </div>
            {step.percentage !== null && (
              <p className="text-[10px] text-slate-400 text-right">{step.percentage}% conversion</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}