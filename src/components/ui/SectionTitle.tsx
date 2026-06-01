export function SectionTitle({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="block w-0.5 h-4 bg-indigo-400 rounded-full shrink-0" />
      <p className="text-xs tracking-widest text-slate-500 uppercase font-semibold">{label}</p>
    </div>
  );
}
