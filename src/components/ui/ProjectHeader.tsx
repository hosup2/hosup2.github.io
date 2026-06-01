export function ProjectHeader({
  no, name, description, period, team, role,
  accentClass = 'text-indigo-600',
  gradientFrom = 'from-indigo-500',
  gradientTo = 'to-sky-500',
}: {
  no: string; name: string; description: string;
  period: string; team: string; role: string;
  accentClass?: string; gradientFrom?: string; gradientTo?: string;
}) {
  return (
    <div className="mb-8">
      <p className={`text-xs tracking-widest uppercase mb-3 ${accentClass}`}>{no}</p>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">{name}</h1>
      <div className={`w-12 h-0.5 bg-gradient-to-r ${gradientFrom} ${gradientTo} mb-5`} />
      <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-2xl">{description}</p>
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex gap-10">
          <div>
            <span className="text-slate-500 text-xs block mb-1">기간</span>
            <span className="text-slate-700 whitespace-nowrap">{period}</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs block mb-1">구성원</span>
            <span className="text-slate-700 whitespace-nowrap">{team}</span>
          </div>
        </div>
        <div>
          <span className="text-slate-500 text-xs block mb-1">역할</span>
          <span className="text-slate-700">{role}</span>
        </div>
      </div>
    </div>
  );
}
