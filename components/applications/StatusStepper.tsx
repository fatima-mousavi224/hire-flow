import { ApplicationStatus } from '@/types/application';

const STAGES: ApplicationStatus[] = [
  'Applied',
  'Reviewing',
  'Shortlisted',
  'Interview',
  'Accepted',
];

export default function StatusStepper({ status }: { status: ApplicationStatus }) {
  const isRejected = status === 'Rejected';
  const activeIndex = isRejected ? 0 : STAGES.indexOf(status);

  return (
    <div className="flex items-center gap-2 pt-1">
      <div className="flex items-center gap-1">
        {STAGES.map((stage, idx) => {
          const isPassedOrCurrent = !isRejected && idx <= activeIndex;
          const isLast = idx === STAGES.length - 1;

          return (
            <div key={stage} className="flex items-center gap-1">
              {/* Status Circle Dot */}
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  isRejected && idx === 0
                    ? 'bg-rose-500'
                    : isPassedOrCurrent
                    ? 'bg-[#5243E0]'
                    : 'bg-slate-200'
                }`}
              />

              {/* Connecting Line Segment */}
              {!isLast && (
                <span
                  className={`h-0.5 w-6 transition-colors ${
                    !isRejected && idx < activeIndex ? 'bg-[#5243E0]' : 'bg-slate-100'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Inline Active Status Label */}
      <span
        className={`text-xs font-medium ml-1 ${
          isRejected ? 'text-rose-600' : 'text-slate-400'
        }`}
      >
        {status}
      </span>
    </div>
  );
}