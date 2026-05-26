type Variant = 'blue' | 'indigo' | 'default';

const styles: Record<Variant, string> = {
  blue: 'bg-sky-400/10 text-sky-400 border border-sky-400/30',
  indigo: 'bg-indigo-400/10 text-indigo-400 border border-indigo-400/30',
  default: 'bg-slate-700/40 text-slate-300 border border-slate-600/50',
};

export function TechBadge({ label, variant = 'default' }: { label: string; variant?: Variant }) {
  return (
    <span className={`inline-block text-xs px-2 py-1 rounded font-mono ${styles[variant]}`}>
      {label}
    </span>
  );
}
