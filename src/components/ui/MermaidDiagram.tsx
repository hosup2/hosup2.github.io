import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;
let idCounter = 0;

function initOnce() {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#f8fafc',
      primaryTextColor: '#0f172a',
      primaryBorderColor: '#cbd5e1',
      lineColor: '#64748b',
      background: '#ffffff',
      mainBkg: '#ffffff',
      actorBkg: '#f8fafc',
      actorBorder: '#94a3b8',
      actorTextColor: '#0f172a',
      actorLineColor: '#94a3b8',
      signalColor: '#64748b',
      signalTextColor: '#0f172a',
      labelBoxBkgColor: '#f8fafc',
      labelBoxBorderColor: '#cbd5e1',
      labelTextColor: '#0f172a',
      loopTextColor: '#0f172a',
      noteBorderColor: '#cbd5e1',
      noteBkgColor: '#f1f5f9',
      noteTextColor: '#475569',
      activationBorderColor: '#94a3b8',
      activationBkgColor: '#e2e8f0',
      sequenceNumberColor: '#4f46e5',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontSize: '13px',
    },
  });
}

export function MermaidDiagram({
  chart,
  title,
  accentClass = 'text-indigo-600',
}: {
  chart: string;
  title?: string;
  accentClass?: string;
}) {
  const [svg, setSvg] = useState('');
  const id = useRef(`mermaid-${++idCounter}`);

  useEffect(() => {
    initOnce();
    let cancelled = false;
    mermaid.render(id.current, chart)
      .then(({ svg }) => { if (!cancelled) setSvg(svg); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <div className="border border-[var(--bd)] rounded-lg overflow-hidden">
      {title && (
        <div className={`bg-[var(--bg-sub)] px-4 py-2 text-xs tracking-wider border-b border-[var(--bd)] ${accentClass}`}>
          {title}
        </div>
      )}
      <div
        className="bg-[var(--bg-base)] px-4 py-6 overflow-x-auto flex justify-center [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
