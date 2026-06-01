import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export function Layout() {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg-base)] dot-grid">
      <TopNav />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
