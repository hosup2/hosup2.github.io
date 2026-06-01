export function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--bg-sub)] border border-[var(--bd)] rounded-lg p-4">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <div className="text-sm text-slate-700 leading-relaxed">{children}</div>
    </div>
  );
}
