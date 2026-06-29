import { Boxes, Shield, Zap, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Boxes className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-white">SBC</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavItem icon={<Zap className="w-4 h-4" />} label="Projects" active />
        <NavItem icon={<Shield className="w-4 h-4" />} label="Templates" />
        <NavItem icon={<Settings className="w-4 h-4" />} label="Settings" />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400">Version</p>
          <p className="text-sm font-medium text-white">1.0.0 Mega-Tech</p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        active ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
