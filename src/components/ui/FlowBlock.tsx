export function FlowBlock({ title, children }: { title?: string; children: string }) {
  return (
    <div className="border border-[#1e3a5f] rounded-lg overflow-hidden">
      {title && (
        <div className="bg-[#0a1628] px-4 py-2 text-xs text-sky-400 tracking-wider border-b border-[#1e3a5f]">
          {title}
        </div>
      )}
      <pre className="bg-[#0f172a] px-4 py-4 text-xs text-slate-400 font-mono leading-relaxed overflow-x-auto whitespace-pre">
        {children}
      </pre>
    </div>
  );
}
