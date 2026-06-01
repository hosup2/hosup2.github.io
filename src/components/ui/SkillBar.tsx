const LEVEL_LABEL: Record<number, { label: string; color: string }> = {
  1: { label: '입문', color: 'text-slate-400' },
  2: { label: '하',   color: 'text-sky-600'   },
  3: { label: '중',   color: 'text-indigo-600' },
  4: { label: '상',   color: 'text-violet-600' },
  5: { label: '숙련', color: 'text-emerald-600' },
};

export function SkillBar({
  name, level, variant = 'blue', note, capabilities,
}: {
  name: string; level: 1 | 2 | 3 | 4 | 5;
  variant?: 'blue' | 'indigo'; note?: string; capabilities?: string[];
}) {
  const filled = variant === 'blue' ? 'bg-sky-500' : 'bg-indigo-500';
  const { label, color } = LEVEL_LABEL[level];
  return (
    <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-slate-800 text-sm font-semibold w-44 shrink-0">{name}</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={`w-3 h-3 rounded-sm ${i < level ? filled : 'bg-[var(--bd)]'}`} />
          ))}
        </div>
        <span className={`text-xs font-semibold ${color}`}>{label}</span>
      </div>
      {note && <p className="text-slate-500 text-xs mb-2 pl-0.5">{note}</p>}
      {capabilities && (
        <ul className="space-y-0.5 pl-0.5">
          {capabilities.map((c, i) => (
            <li key={i} className="text-slate-600 text-xs leading-relaxed">• {c}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
