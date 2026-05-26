export function InfoCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg p-4">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}
