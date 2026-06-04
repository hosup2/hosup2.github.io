import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Intro', end: true },
  { to: '/synapse', label: 'Synapse', end: false },
  { to: '/airadar', label: 'AiRadar', end: false },
  { to: '/butterfly', label: 'Butterfly', end: false },
];

export function TopNav() {
  return (
    <header className="shrink-0 bg-[var(--bg-sub)] border-b border-[var(--bd)] flex items-center px-8 h-14">
      <div className="flex items-center gap-3">
        <span className="text-indigo-600 font-bold text-lg tracking-tight">김동현</span>
        <span className="text-slate-300 text-xs">|</span>
        <span className="text-slate-400 text-sm">Backend Developer</span>
      </div>

      <nav className="ml-auto flex items-center">
        {navItems.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
                isActive
                  ? 'text-indigo-600 border-indigo-500'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
