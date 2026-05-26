export function SkillBar({
  name,
  level,
  variant = 'blue',
  note,
}: {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  variant?: 'blue' | 'indigo';
  note?: string;
}) {
  const filled = variant === 'blue' ? 'bg-sky-400' : 'bg-indigo-400';
  return (
    <div className="flex items-start gap-3">
      <span className="text-slate-300 text-sm w-48 shrink-0">{name}</span>
      <div className="flex gap-1 mt-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${i < level ? filled : 'bg-[#1e3a5f]'}`} />
        ))}
      </div>
      {note && <span className="text-slate-500 text-xs mt-0.5">{note}</span>}
    </div>
  );
}
