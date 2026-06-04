import {
  SiReact, SiTypescript, SiVite, SiElectron,
  SiNextdotjs, SiTailwindcss, SiFramer,
  SiSpringboot, SiSpring, SiMysql, SiRedis, SiOpenjdk,
  SiPostgresql, SiMongodb,
  SiDocker, SiKubernetes, SiArgo, SiGitlab,
  SiPrometheus, SiGrafana,
  SiApachekafka, SiApachespark, SiApacheairflow, SiClickhouse,
  SiFastapi,
  SiReactquery, SiAnthropic,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

const ICON_MAP: Record<string, { icon: IconType; color: string }> = {
  // React / JS
  'React':                   { icon: SiReact,        color: '#61DAFB' },
  'React 18':                { icon: SiReact,        color: '#61DAFB' },
  'React 19':                { icon: SiReact,        color: '#61DAFB' },
  'TypeScript':              { icon: SiTypescript,   color: '#3178C6' },
  'TypeScript 5.6':          { icon: SiTypescript,   color: '#3178C6' },
  'Vite':                    { icon: SiVite,         color: '#646CFF' },
  'Vite 5':                  { icon: SiVite,         color: '#646CFF' },
  'Electron':                { icon: SiElectron,     color: '#47848F' },
  'Next.js':                 { icon: SiNextdotjs,    color: '#000000' },
  'Next.js 16 (App Router)': { icon: SiNextdotjs,    color: '#000000' },
  'Tailwind CSS v4':         { icon: SiTailwindcss,  color: '#06B6D4' },
  'Framer Motion':           { icon: SiFramer,       color: '#0055FF' },
  'TanStack Query v5':       { icon: SiReactquery,   color: '#FF4154' },
  'React Query':             { icon: SiReactquery,   color: '#FF4154' },
  // Java / Spring
  'Java 17':                 { icon: SiOpenjdk,      color: '#ED8B00' },
  'Java 21':                 { icon: SiOpenjdk,      color: '#ED8B00' },
  'Java':                    { icon: SiOpenjdk,      color: '#ED8B00' },
  'Spring Boot':             { icon: SiSpringboot,   color: '#6DB33F' },
  'Spring Boot 3.3.5':       { icon: SiSpringboot,   color: '#6DB33F' },
  'Spring Boot 3.5':         { icon: SiSpringboot,   color: '#6DB33F' },
  'Spring Security':         { icon: SiSpring,       color: '#6DB33F' },
  'JPA':                     { icon: SiSpring,       color: '#6DB33F' },
  // Python
  'Python FastAPI':          { icon: SiFastapi,      color: '#009688' },
  // DB / Cache
  'MySQL':                   { icon: SiMysql,        color: '#4479A1' },
  'MySQL 8.0':               { icon: SiMysql,        color: '#4479A1' },
  'Redis':                   { icon: SiRedis,        color: '#DC382D' },
  'Redis 7':                 { icon: SiRedis,        color: '#DC382D' },
  'PostgreSQL':              { icon: SiPostgresql,   color: '#4169E1' },
  'PostgreSQL 16':           { icon: SiPostgresql,   color: '#4169E1' },
  'pgvector':                { icon: SiPostgresql,   color: '#4169E1' },
  'MongoDB':                 { icon: SiMongodb,      color: '#47A248' },
  'ClickHouse 24.8':         { icon: SiClickhouse,   color: '#FFCC01' },
  // Data / Infra
  'Apache Kafka':            { icon: SiApachekafka,  color: '#231F20' },
  'Apache Kafka 3.7':        { icon: SiApachekafka,  color: '#231F20' },
  'Apache Spark 3.5.0':      { icon: SiApachespark,  color: '#E25A1C' },
  'Apache Airflow 2.8.3':    { icon: SiApacheairflow,color: '#017CEE' },
  'Docker':                  { icon: SiDocker,       color: '#2496ED' },
  'Docker Compose':          { icon: SiDocker,       color: '#2496ED' },
  'Kubernetes (K3s)':        { icon: SiKubernetes,   color: '#326CE5' },
  'ArgoCD':                  { icon: SiArgo,         color: '#EF7B4D' },
  'GitLab CI/CD':            { icon: SiGitlab,       color: '#FC6D26' },
  'Prometheus':              { icon: SiPrometheus,   color: '#E6522C' },
  'Grafana':                 { icon: SiGrafana,      color: '#F46800' },
  // AI
  'Claude Haiku':            { icon: SiAnthropic,    color: '#D4A574' },
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
