interface PipelineRow {
  prefix: string;
  prefixColor?: 'sky' | 'amber' | 'slate';
  steps: string[];
  outcome?: string;
  outcomeStatus?: 'success' | 'danger';
}

interface FlowPipelineProps {
  title?: string;
  rows: PipelineRow[];
  note?: string;
  accentClass?: string;
}

const prefixColors = {
  sky:   'text-sky-600 border-sky-300',
  amber: 'text-amber-600 border-amber-300',
  slate: 'text-slate-600 border-slate-300',
};

const outcomeStyles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  danger:  'bg-red-50 border-red-200 text-red-600',
};

export function FlowPipeline({ title, rows, note, accentClass = 'text-indigo-600' }: FlowPipelineProps) {
  return (
    <div className="border border-[var(--bd)] rounded-lg overflow-hidden">
      {title && (
        <div className={`bg-[var(--bg-sub)] px-4 py-2 text-xs tracking-wider border-b border-[var(--bd)] ${accentClass}`}>
          {title}
        </div>
      )}
      <div className="bg-[var(--bg-base)] px-5 py-5 space-y-3 overflow-x-auto">
        {rows.map((row, i) => {
          const pc = prefixColors[row.prefixColor ?? 'slate'];
          return (
            <div key={i} className="flex items-center gap-2 min-w-max">
              <span className={`text-xs font-semibold px-2 py-1 rounded border bg-[var(--bg-sub)] shrink-0 ${pc}`}>
                {row.prefix}
              </span>
              <span className="text-slate-400 text-xs">→</span>
              {row.steps.map((step, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="bg-[var(--bg-sub)] border border-[var(--bd)] text-slate-700 text-xs px-2.5 py-1 rounded whitespace-nowrap">
                    {step}
                  </span>
                  {j < row.steps.length - 1 && (
                    <span className="text-slate-400 text-xs">→</span>
                  )}
                </div>
              ))}
              {row.outcome && (
                <>
                  <span className="text-slate-400 text-xs">→</span>
                  <span className={`text-xs px-2.5 py-1 rounded border whitespace-nowrap ${outcomeStyles[row.outcomeStatus ?? 'success']}`}>
                    {row.outcome}
                  </span>
                </>
              )}
            </div>
          );
        })}
        {note && (
          <p className="text-slate-500 text-xs pt-1 pl-1">{note}</p>
        )}
      </div>
    </div>
  );
}
