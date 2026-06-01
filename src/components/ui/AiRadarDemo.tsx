import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── 임시 키워드 데이터 (실제 AiRadar WordCloudData 타입과 동일) ──
interface WordCloudData {
  keyword: string;
  text: string;
  count: number;
  similarKeywords: { keyword: string; similarity: number }[];
}

const MOCK_DATA: WordCloudData[] = [
  { keyword: 'ChatGPT', text: 'ChatGPT', count: 980, similarKeywords: [{ keyword: 'GPT-4o', similarity: 0.92 }, { keyword: 'Claude', similarity: 0.85 }, { keyword: 'OpenAI', similarity: 0.88 }] },
  { keyword: 'LLM', text: 'LLM', count: 870, similarKeywords: [{ keyword: 'Transformer', similarity: 0.91 }, { keyword: 'BERT', similarity: 0.83 }, { keyword: 'GPT', similarity: 0.89 }] },
  { keyword: 'RAG', text: 'RAG', count: 760, similarKeywords: [{ keyword: 'Vector DB', similarity: 0.87 }, { keyword: 'Embedding', similarity: 0.82 }, { keyword: 'Retrieval', similarity: 0.94 }] },
  { keyword: 'Transformer', text: 'Transformer', count: 720, similarKeywords: [{ keyword: 'Attention', similarity: 0.95 }, { keyword: 'BERT', similarity: 0.88 }] },
  { keyword: 'OpenAI', text: 'OpenAI', count: 680, similarKeywords: [{ keyword: 'GPT-4o', similarity: 0.91 }, { keyword: 'ChatGPT', similarity: 0.89 }] },
  { keyword: 'Diffusion', text: 'Diffusion', count: 570, similarKeywords: [{ keyword: 'DALL-E', similarity: 0.86 }, { keyword: 'Stable Diffusion', similarity: 0.92 }] },
  { keyword: 'PyTorch', text: 'PyTorch', count: 540, similarKeywords: [{ keyword: 'TensorFlow', similarity: 0.88 }, { keyword: 'CUDA', similarity: 0.79 }] },
  { keyword: 'NVIDIA', text: 'NVIDIA', count: 480, similarKeywords: [{ keyword: 'CUDA', similarity: 0.91 }, { keyword: 'GPU', similarity: 0.94 }] },
];

// ── accent 색상 (다크 테마 cyan) ──
const ACCENT = '#00d4c8';

export function WordCloudMini({ isFullPage = false }: { isFullPage?: boolean }) {
  const [data] = useState<WordCloudData[]>(MOCK_DATA);

  const pageSize = 8;
  const [activeIndices, setActiveIndices] = useState<(number | null)[]>(
    Array.from({ length: pageSize }, (_, i) => i % MOCK_DATA.length)
  );
  const nextIdxRef = useRef(pageSize % MOCK_DATA.length);

  const [beamAngle, setBeamAngle] = useState(0);

  // 슬롯 위치 계산 (원본과 동일, 미니 컨테이너 맞게 SCALE 적용)
  const slotPositions = useMemo(() => {
    const slots: any[] = [];
    const xMult = 1.3;
    const yMult = 0.6;
    const minVerticalGap = 4;
    const SCALE = isFullPage ? 1.0 : 0.55; // 미니 컨테이너 맞게 축소

    for (let i = 0; i < pageSize; i++) {
      let currentAngle = (i * 137.5 - 85) * (Math.PI / 180);
      let currentRadius = (80 + i * (isFullPage ? 20 : 16)) * SCALE;

      let x = Math.cos(currentAngle) * currentRadius * xMult;
      let y = Math.sin(currentAngle) * currentRadius * yMult;

      const widthGuess = 120 * SCALE;
      const heightGuess = 40;

      for (let attempt = 0; attempt < 10; attempt++) {
        let hasCollision = false;
        for (const prev of slots) {
          const dx = Math.abs(x - prev.x);
          const dy = Math.abs(y - prev.y);
          if (dx < (widthGuess + prev.widthGuess) / 2 + 10 && dy < minVerticalGap + 2) {
            hasCollision = true;
            break;
          }
        }
        if (!hasCollision) break;
        currentRadius += 10 * SCALE;
        x = Math.cos(currentAngle) * currentRadius * xMult;
        y = Math.sin(currentAngle) * currentRadius * yMult;
      }

      slots.push({
        x, y, widthGuess, heightGuess, slotIdx: i,
        angle: (currentAngle * 180 / Math.PI + 360) % 360,
        sizeCategory: (i < 2 ? 'hero' : i < 6 ? 'large' : i < 11 ? 'medium' : 'small') as any,
      });
    }
    return slots;
  }, [isFullPage]);

  const lastDetectedRef = useRef<boolean[]>(new Array(pageSize).fill(false));
  const hasBeenDetectedRef = useRef<boolean[]>(new Array(pageSize).fill(false));
  const lastSwapTimeRef = useRef<number[]>(new Array(pageSize).fill(0));
  const swapStartTimeRef = useRef<number[]>(new Array(pageSize).fill(0));
  const activeIndicesRef = useRef<(number | null)[]>([]);
  const dataRef = useRef<WordCloudData[]>([]);

  useEffect(() => { activeIndicesRef.current = activeIndices; }, [activeIndices]);
  useEffect(() => { dataRef.current = data; }, [data]);

  // 빔 + 슬롯 교체 애니메이션 (원본과 동일)
  useEffect(() => {
    let requestRef: number;
    const animate = (time: number) => {
      const angle = (time / 12000 * 360) % 360;
      setBeamAngle(angle);

      let needsUpdate = false;
      const nextActiveIndices = [...activeIndicesRef.current];
      const currentData = dataRef.current;

      if (nextActiveIndices.length > 0 && currentData.length > 0) {
        slotPositions.forEach((slot, i) => {
          const now = Date.now();
          const dataIdx = nextActiveIndices[i];

          if (dataIdx === null) {
            if (now - swapStartTimeRef.current[i] > 2000) {
              const nextIdx = nextIdxRef.current;
              nextIdxRef.current = (nextIdx + 1) % currentData.length;
              nextActiveIndices[i] = nextIdx;
              needsUpdate = true;
            }
            return;
          }

          const dx = slot.x;
          const dy = slot.y;
          const charWidth = slot.sizeCategory === 'hero' ? 12 : slot.sizeCategory === 'large' ? 10 : 8;
          const textLength = currentData[dataIdx]?.text.length || 5;
          const halfWidthPx = (textLength * charWidth) / 2;

          const entryX = dy > 0 ? dx + halfWidthPx : dx - halfWidthPx;
          const startAngleFull = (Math.atan2(dy, entryX) * 180 / Math.PI + 90 + 360) % 360;
          const radius = Math.sqrt(dx * dx + dy * dy) || 100;
          const wordAngularWidth = (halfWidthPx * 2 * 180) / (Math.PI * radius);

          const diff = (angle - startAngleFull + 360) % 360;
          const isDetected = diff < (30 + wordAngularWidth);

          if (isDetected && !hasBeenDetectedRef.current[i]) {
            hasBeenDetectedRef.current[i] = true;
          }
          if (lastDetectedRef.current[i] && !isDetected && hasBeenDetectedRef.current[i]) {
            if (now - lastSwapTimeRef.current[i] > 8000) {
              nextActiveIndices[i] = null;
              swapStartTimeRef.current[i] = now;
              needsUpdate = true;
              lastSwapTimeRef.current[i] = now;
            }
            hasBeenDetectedRef.current[i] = false;
          }
          lastDetectedRef.current[i] = isDetected;
        });

        if (needsUpdate) {
          activeIndicesRef.current = nextActiveIndices;
          setActiveIndices(nextActiveIndices);
        }
      }

      requestRef = requestAnimationFrame(animate);
    };
    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [slotPositions]);

  // 표시될 키워드 목록 (원본과 동일)
  const positionedKeywords = useMemo(() => {
    if (activeIndices.length === 0 || data.length === 0) return [];
    return activeIndices.map((dataIdx, slotIdx) => {
      if (dataIdx === null) return null;
      const word = data[dataIdx];
      const slot = slotPositions[slotIdx];
      if (!word || !slot) return null;
      return { ...word, ...slot, rank: slotIdx };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }, [activeIndices, data, slotPositions]);

  return (
    <div className="bg-[#05060b] text-white flex flex-col overflow-hidden relative h-full rounded-xl border border-gray-800">

      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 right-0 p-3 flex items-center gap-2 z-30 pointer-events-none">
        <div className="w-1 h-5 animate-pulse" style={{ background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
        <h3 className="text-sm font-black tracking-tighter uppercase italic" style={{ color: 'white' }}>
          주간 기술 키워드
        </h3>
      </div>

      {/* 메인 레이더 영역 */}
      <div className="flex-1 flex items-center justify-center relative select-none overflow-hidden">

        {/* 배경 그리드 & 동심원 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
          {[100, 200, 300, 400, 500, 600, 700, 800].map(size => (
            <div key={size} className="absolute rounded-full border"
              style={{ width: size, height: size, borderColor: `${ACCENT}33` }} />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
            <div key={deg} className="absolute w-[1800px] h-px"
              style={{ transform: `rotate(${deg}deg)`, background: `${ACCENT}1a` }} />
          ))}
        </div>

        {/* 회전 빔 (conic-gradient - framer-motion x/y 로 센터링 + rotate 분리) */}
        <motion.div
          className="absolute w-[4000px] h-[4000px] pointer-events-none z-10"
          style={{
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            rotate: beamAngle,
          }}
        >
          <div className="absolute inset-0 rounded-full" style={{
            background: `conic-gradient(from 315deg, transparent 0%, ${ACCENT} 12.5%, transparent 12.51%)`,
            opacity: 0.6,
            maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
          }} />
        </motion.div>

        {/* 키워드 (원본 로직 동일) */}
        <div className="relative w-full h-full flex items-center justify-center z-0">
          <AnimatePresence mode="popLayout">
            {positionedKeywords.map((word) => {
              const dx = word.x;
              const dy = word.y;
              const halfWidthPx = word.text.length * (word.rank < 5 ? 7 : word.rank < 18 ? 6 : 5);
              const entryX = dy > 0 ? dx + halfWidthPx : dx - halfWidthPx;
              const startAngleFull = (Math.atan2(dy, entryX) * 180 / Math.PI + 90 + 360) % 360;
              const radius = Math.sqrt(dx * dx + dy * dy) || 100;
              const wordAngularWidth = (halfWidthPx * 2 * 180) / (Math.PI * radius);

              const diff = (beamAngle - startAngleFull + 360) % 360;
              const isDetected = diff < (30 + wordAngularWidth);
              const rawLevel = isDetected ? 1 - diff / (30 + wordAngularWidth) : 0;
              const detectionLevel = Math.pow(rawLevel, 1.4);

              const sizeCategory = (word as any).sizeCategory || 'small';
              const baseScale = sizeCategory === 'hero' ? 1.15 : sizeCategory === 'large' ? 1.05 : sizeCategory === 'medium' ? 1.0 : 0.95;
              const detectedScale = baseScale + (isDetected ? 0.08 * detectionLevel : 0);
              const opacity = isDetected ? 0.5 + 0.5 * detectionLevel : 0.45;

              return (
                <motion.div
                  key={`${word.keyword}-${word.rank}`}
                  initial={{ x: dx, y: dy, opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                  animate={{
                    x: dx, y: dy,
                    scale: detectedScale,
                    opacity,
                    filter: 'blur(0px)',
                    color: isDetected ? ACCENT : 'rgba(148,163,184,0.7)',
                    textShadow: isDetected
                      ? `0 0 1px ${ACCENT}, 0 0 ${2 * detectionLevel}px ${ACCENT}, 0 0 ${8 * detectionLevel}px rgba(0,212,200,${0.4 * detectionLevel})`
                      : '0 0 0px transparent',
                    zIndex: isDetected ? 20 : 1,
                  }}
                  exit={{ opacity: 0, scale: 1.2, filter: 'blur(8px)', transition: { duration: 0.3 } }}
                  className="absolute cursor-default flex items-center justify-center"
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  whileHover={{ scale: baseScale + 0.3, color: ACCENT, opacity: 1, zIndex: 100 }}
                >
                  <span className={`whitespace-nowrap font-black tracking-tighter italic ${
                    sizeCategory === 'hero' ? 'text-sm' :
                    sizeCategory === 'large' ? 'text-xs' :
                    sizeCategory === 'medium' ? 'text-[11px]' : 'text-[10px]'
                  }`}>
                    {word.text}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 하단 상태 바 */}
      <div className="px-4 py-2 border-t flex justify-between items-center text-[9px] font-black uppercase tracking-widest"
        style={{ background: '#0a0b14', borderColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.35)' }}>
        <div className="flex items-center gap-3">
          <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>스트림 연결 상태: 안정</span>
          <span className="border-x px-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            AZ: {beamAngle.toFixed(1)}°
          </span>
        </div>
        <span style={{ color: ACCENT }}>AI 피드 활성화됨</span>
      </div>

    </div>
  );
}

// ──────────────────────────────────────────────
// IntroSplash Mini — 원본 코드 그대로, 루프 버전
// ──────────────────────────────────────────────
const STATUS_MSGS = [
  '시스템 초기화 중...', '신호 수신 중...',
  'ML 엔진 로딩...', '데이터 스트림 연결 중...', '준비 완료',
];

export function IntroSplashMini() {
  const [resetKey, setResetKey] = useState(0);
  const [pct, setPct] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let cur = 0;
    let mi = 0;
    setPct(0); setMsgIdx(0); setExiting(false);

    const msgT = setInterval(() => {
      if (cancelled) return;
      mi = Math.min(mi + 1, STATUS_MSGS.length - 1);
      setMsgIdx(mi);
    }, 550);

    const loadT = setInterval(() => {
      if (cancelled) return;
      const inc = cur < 60 ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5;
      cur = Math.min(cur + inc, 100);
      setPct(Math.floor(cur));
      if (cur >= 100) {
        clearInterval(loadT); clearInterval(msgT);
        setTimeout(() => {
          if (!cancelled) {
            setExiting(true);
            setTimeout(() => { if (!cancelled) setResetKey(k => k + 1); }, 900);
          }
        }, 500);
      }
    }, 40);

    return () => { cancelled = true; clearInterval(msgT); clearInterval(loadT); };
  }, [resetKey]);

  return (
    // position:relative 래퍼 — ispm-wrap의 absolute 탈출 방지
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* 원본 IntroSplash 스타일 그대로 — 컨테이너에 맞게 fixed → absolute */}
      <style>{`
        .ispm-wrap {
          position:absolute; inset:0; display:flex; align-items:center;
          justify-content:center; overflow:hidden;
          background:#f8fafc;
          transition:${exiting ? 'opacity 0.9s ease, transform 0.9s ease' : 'none'};
          opacity:${exiting ? 0 : 1};
          transform:${exiting ? 'scale(1.03) translateY(-10px)' : 'none'};
        }
        .ispm-bg { position:absolute; inset:0;
          background: radial-gradient(ellipse 100% 70% at 50% 0%, rgba(255,255,255,1) 0%, transparent 60%),
            radial-gradient(ellipse 80% 80% at 50% 100%, rgba(255,255,255,0.8) 0%, transparent 50%),
            linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
        }
        .ispm-grain { position:absolute; inset:0; opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size:256px;
        }
        .ispm-glow { position:absolute; width:400px; height:400px; top:50%; left:50%;
          transform:translate(-50%,-50%); border-radius:50%;
          background:radial-gradient(circle, rgba(229,62,62,0.1) 0%, rgba(229,62,62,0.05) 40%, transparent 70%);
          animation:ispm-breathe 4s ease-in-out infinite;
        }
        @keyframes ispm-breathe {
          0%,100%{transform:translate(-50%,-50%) scale(1); opacity:0.7;}
          50%{transform:translate(-50%,-50%) scale(1.15); opacity:1;}
        }
        .ispm-line { position:absolute; left:0; right:0; height:1px;
          background:linear-gradient(90deg,transparent,rgba(229,62,62,0.18) 50%,transparent);
          animation:ispm-sweep 5s ease-in-out infinite;
        }
        .ispm-line:nth-child(1){top:28%;animation-delay:0s;animation-duration:5s;}
        .ispm-line:nth-child(2){top:44%;animation-delay:0.9s;animation-duration:6s;}
        .ispm-line:nth-child(3){top:57%;animation-delay:1.8s;animation-duration:4.5s;}
        .ispm-line:nth-child(4){top:70%;animation-delay:2.7s;animation-duration:5.5s;}
        @keyframes ispm-sweep{0%,100%{opacity:0;transform:scaleX(0.1) translateX(-30%);}40%,60%{opacity:1;transform:scaleX(1) translateX(0);}}
        .ispm-vline{position:absolute;top:0;bottom:0;width:1px;
          background:linear-gradient(to bottom,transparent,rgba(229,62,62,0.08),transparent);
          animation:ispm-vfade 6s ease-in-out infinite;
        }
        .ispm-vline:nth-child(1){left:20%;animation-delay:0s;}
        .ispm-vline:nth-child(2){left:40%;animation-delay:1.5s;}
        .ispm-vline:nth-child(3){left:60%;animation-delay:3s;}
        .ispm-vline:nth-child(4){left:80%;animation-delay:4.5s;}
        @keyframes ispm-vfade{0%,100%{opacity:0;}30%,70%{opacity:1;}}
        .ispm-dot{position:absolute;border-radius:50%;background:rgba(229,62,62,0.5);
          animation:ispm-float 8s ease-in-out infinite;
        }
        .ispm-dot:nth-child(1){width:3px;height:3px;top:22%;left:18%;animation-delay:0s;}
        .ispm-dot:nth-child(2){width:2px;height:2px;top:35%;left:72%;animation-delay:1.2s;}
        .ispm-dot:nth-child(3){width:4px;height:4px;top:60%;left:30%;animation-delay:2.4s;}
        .ispm-dot:nth-child(4){width:2px;height:2px;top:75%;left:65%;animation-delay:3.6s;}
        .ispm-dot:nth-child(5){width:3px;height:3px;top:45%;left:85%;animation-delay:0.6s;}
        .ispm-dot:nth-child(6){width:2px;height:2px;top:15%;left:55%;animation-delay:1.8s;}
        @keyframes ispm-float{0%,100%{opacity:0;transform:translateY(0);}20%,80%{opacity:0.7;}50%{opacity:1;transform:translateY(-12px);}}
        .ispm-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;}
        .ispm-eyebrow{font-size:9px;letter-spacing:0.22em;text-transform:uppercase;color:#c53030;font-weight:600;margin-bottom:16px;}
        .ispm-logo{font-weight:700;font-size:clamp(18px,3vw,28px);letter-spacing:-0.01em;line-height:1.1;margin-bottom:20px;text-align:center;color:#0c202a;}
        .ispm-logo span{color:#e53e3e;}
        .ispm-accent{height:2px;border-radius:2px;background:linear-gradient(90deg,#e53e3e,rgba(229,62,62,0.2));margin-bottom:20px;animation:ispm-lgrow 1.2s 0.4s cubic-bezier(0.4,0,0.2,1) both;}
        @keyframes ispm-lgrow{from{width:0;opacity:0;}to{width:100px;opacity:1;}}
        .ispm-tagline{font-size:10px;letter-spacing:0.14em;color:#2d4a58;font-weight:600;margin-bottom:28px;}
        .ispm-bar{width:200px;height:1px;background:rgba(0,0,0,0.06);border-radius:1px;overflow:hidden;margin-bottom:10px;position:relative;}
        .ispm-bar-fill{height:100%;border-radius:1px;background:linear-gradient(90deg,rgba(229,62,62,0.5),#ef4444);transition:width 0.06s linear;position:relative;z-index:1;}
        .ispm-bar-fill::after{content:'';position:absolute;right:0;top:-3px;width:3px;height:7px;border-radius:1px;background:#ff4d4d;}
        .ispm-meta{display:flex;align-items:center;gap:14px;}
        .ispm-pct{font-size:12px;letter-spacing:0.08em;color:#b91c1c;font-weight:600;min-width:34px;}
        .ispm-status{font-size:11px;letter-spacing:0.06em;color:#2d4a58;font-weight:600;}
      `}</style>

      <div className="ispm-wrap">
        <div className="ispm-bg" />
        <div className="ispm-grain" />
        <div className="ispm-glow" />
        <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
          <div className="ispm-line" /><div className="ispm-line" />
          <div className="ispm-line" /><div className="ispm-line" />
        </div>
        <div style={{ position:'absolute', inset:0 }}>
          <div className="ispm-vline" /><div className="ispm-vline" />
          <div className="ispm-vline" /><div className="ispm-vline" />
        </div>
        <div style={{ position:'absolute', inset:0 }}>
          <div className="ispm-dot" /><div className="ispm-dot" />
          <div className="ispm-dot" /><div className="ispm-dot" />
          <div className="ispm-dot" /><div className="ispm-dot" />
        </div>
        <div className="ispm-content">
          <div className="ispm-eyebrow">Live AI Intelligence System</div>
          <div className="ispm-logo">SEE BEFORE <span>IT HAPPENS</span></div>
          <div className="ispm-accent" />
          <div className="ispm-tagline">SENSING · ENGINE · FORECAST</div>
          <div className="ispm-bar">
            <div className="ispm-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="ispm-meta">
            <div className="ispm-pct">{pct}%</div>
            <div className="ispm-status">{STATUS_MSGS[msgIdx]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
