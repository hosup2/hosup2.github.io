import { useEffect, useState } from 'react';

export interface Slide {
  label: string;
  content: React.ReactNode;
  image?: string;
  imagePlaceholder?: string;
  imageContain?: boolean;
  fullWidth?: boolean;
  wide?: boolean;
}

function ImagePanel({ image, placeholder, contain }: { image?: string; placeholder?: string; contain?: boolean }) {
  if (image) {
    if (contain) {
      return (
        <div className="rounded-lg border border-[var(--bd)] bg-[var(--bg-sub)] h-52 flex items-center justify-center p-6">
          <img src={image} alt="" className="max-h-full max-w-full object-contain" />
        </div>
      );
    }
    return <img src={image} alt="" className="rounded-lg border border-[var(--bd)] w-full" />;
  }
  return (
    <div className="rounded-lg border border-dashed border-[var(--bd)] h-52 flex flex-col items-center justify-center text-slate-400 text-xs text-center px-6 gap-2">
      <div className="text-slate-300 font-mono">[ img ]</div>
      <div className="leading-relaxed">{placeholder || '이미지 준비 중'}</div>
    </div>
  );
}

export function SlideShow({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(0, c - 1));
      if (e.key === 'ArrowRight') setCurrent((c) => Math.min(slides.length - 1, c + 1));
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () => window.removeEventListener('keydown', handler, { capture: true });
  }, [slides.length]);

  return (
    <div className="flex flex-col h-full">
      {/* main area — relative so arrows can be absolutely positioned */}
      <div className="flex-1 overflow-hidden relative">

        {/* prev button — overlaid inside content, not at viewport edge */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* next button — overlaid inside content */}
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-400 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-0 disabled:pointer-events-none transition-all shadow-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* slides strip */}
        <div className="w-full h-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{
              width: `${slides.length * 100}%`,
              transform: `translateX(-${(current * 100) / slides.length}%)`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="h-full overflow-hidden flex flex-col"
                style={{ width: `${100 / slides.length}%` }}
              >
                {/* Slide content — header lives inside so it shares the same left anchor */}
                {slide.fullWidth ? (
                  <div className="flex-1 overflow-y-auto">
                    <div className={`px-8 mx-auto ${slide.wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
                      <div className="pt-5 pb-4 mb-6 border-b border-[var(--bd)]">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1">
                          {String(i + 1).padStart(2, '0')} / {slides.length}
                        </p>
                        <h2 className="text-base font-semibold text-slate-800">{slide.label}</h2>
                      </div>
                      <div className="pb-6">{slide.content}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto">
                    <div className="px-8 mx-auto max-w-6xl">
                      <div className="pt-5 pb-4 mb-6 border-b border-[var(--bd)]">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1">
                          {String(i + 1).padStart(2, '0')} / {slides.length}
                        </p>
                        <h2 className="text-base font-semibold text-slate-800">{slide.label}</h2>
                      </div>
                      <div className="flex gap-8 pb-6">
                        <div className="flex-1 min-w-0">{slide.content}</div>
                        <div className="w-64 shrink-0 self-start">
                          <ImagePanel image={slide.image} placeholder={slide.imagePlaceholder} contain={slide.imageContain} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom dot nav */}
      <div className="shrink-0 flex items-center justify-center py-3 border-t border-[var(--bd)]">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 bg-indigo-500'
                  : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
