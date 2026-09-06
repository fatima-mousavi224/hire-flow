export default function ResumeTipsCard() {
  const tips = [
    'Keep your resume under 2 pages',
    'Tailor your resume to each job posting',
    'Use quantifiable achievements ("increased performance by 60%")',
    'Include your most relevant skills at the top',
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-2xs space-y-3">
      <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900">
        💡 Resume Tips
      </h3>
      <ul className="space-y-1.5 text-xs font-medium text-[#5243E0]">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5243E0]" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
}