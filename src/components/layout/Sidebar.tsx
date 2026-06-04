import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Intro', icon: '👤', sub: '김동현', end: true },
  { to: '/butterfly', label: 'Butterfly', icon: '🦋', sub: 'B2B CRM SaaS', end: false },
  { to: '/airadar', label: 'AiRadar', icon: '📡', sub: 'AI 기술 트렌드 플랫폼', end: false },
  { to: '/synapse', label: 'Synapse', icon: '🧠', sub: '코드 기반 협업 툴', end: false },
];

export function Sidebar() {
  return (
    <aside className="w-56 min-h-screen bg-[#0a1628] border-r border-[#1e3a5f] flex flex-col sticky top-0 shrink-0">
      <div className="px-6 py-7 border-b border-[#1e3a5f]">
        <p className="text-sky-400 text-xl font-bold tracking-tight">김동현</p>
        <p className="text-slate-500 text-xs mt-1">Backend Developer</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map(({ to, label, icon, sub, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? 'border-r-2 border-sky-400 bg-sky-400/5 text-sky-400'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
              }`
            }
          >
            <span className="text-base shrink-0">{icon}</span>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-xs text-slate-600">{sub}</p>
            </div>
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-5 border-t border-[#1e3a5f]">
        <a
          href="https://github.com/hosup2"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 hover:text-sky-400 text-xs block mb-2 transition-colors"
        >
          GitHub ↗
        </a>
        <p className="text-slate-600 text-xs">dosl196122@naver.com</p>
      </div>
    </aside>
  );
}
