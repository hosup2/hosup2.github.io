import {
  SiReact, SiTypescript, SiVite, SiElectron,
  SiNextdotjs, SiTailwindcss, SiFramer,
  SiSpringboot, SiMysql, SiRedis, SiOpenjdk,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const ICON_MAP: Record<string, { icon: IconType; color: string }> = {
  'React':                   { icon: SiReact,       color: '#61DAFB' },
  'React 18':                { icon: SiReact,       color: '#61DAFB' },
  'React 19':                { icon: SiReact,       color: '#61DAFB' },
  'TypeScript':              { icon: SiTypescript,  color: '#3178C6' },
  'TypeScript 5.6':          { icon: SiTypescript,  color: '#3178C6' },
  'Vite':                    { icon: SiVite,        color: '#646CFF' },
  'Vite 5':                  { icon: SiVite,        color: '#646CFF' },
  'Electron':                { icon: SiElectron,    color: '#47848F' },
  'Next.js':                 { icon: SiNextdotjs,   color: '#000000' },
  'Next.js 16 (App Router)': { icon: SiNextdotjs,   color: '#000000' },
  'Tailwind CSS v4':         { icon: SiTailwindcss, color: '#06B6D4' },
  'Framer Motion':           { icon: SiFramer,      color: '#0055FF' },
  'Spring Boot 3.5':         { icon: SiSpringboot,  color: '#6DB33F' },
  'Spring Boot':             { icon: SiSpringboot,  color: '#6DB33F' },
  'MySQL 8.0':               { icon: SiMysql,       color: '#4479A1' },
  'MySQL':                   { icon: SiMysql,       color: '#4479A1' },
  'Redis 7':                 { icon: SiRedis,       color: '#DC382D' },
  'Redis':                   { icon: SiRedis,       color: '#DC382D' },
  'Java 21':                 { icon: SiOpenjdk,     color: '#ED8B00' },
  'Java':                    { icon: SiOpenjdk,     color: '#ED8B00' },
};

export function TechBadge({ label }: { label: string }) {
  const entry = ICON_MAP[label];
  const Icon = entry?.icon;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-700 font-mono">
      {Icon && <Icon size={12} color={entry.color} style={{ flexShrink: 0 }} />}
      {label}
    </span>
  );
}
