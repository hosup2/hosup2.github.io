export function ProjectHeader({
  no,
  name,
  description,
  period,
  team,
  role,
}: {
  no: string;
  name: string;
  description: string;
  period: string;
  team: string;
  role: string;
}) {
  return (
    <div className="mb-12">
      <p className="text-xs tracking-widest text-sky-400 uppercase mb-3">{no}</p>
      <h1 className="text-4xl font-bold text-slate-50 mb-2">{name}</h1>
      <div className="w-12 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 mb-5" />
      <p className="text-slate-400 text-base leading-relaxed mb-6 max-w-2xl">{description}</p>
      <div className="flex flex-wrap gap-6 text-sm">
        {[
          { k: '기간', v: period },
          { k: '구성원', v: team },
          { k: '역할', v: role },
        ].map(({ k, v }) => (
          <div key={k}>
            <span className="text-slate-500 text-xs block mb-1">{k}</span>
            <span className="text-slate-300">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
