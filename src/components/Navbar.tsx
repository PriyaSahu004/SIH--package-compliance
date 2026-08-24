import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FileText,
  SlidersHorizontal,
  Settings as SettingsIcon,
  ShieldCheck
} from 'lucide-react';

export type NavTab = 'dashboard' | 'new-inspection' | 'history' | 'reports' | 'rules' | 'settings';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingInspectionCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab, pendingInspectionCount = 0 }) => {
  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'history', label: 'Inspection History', icon: <History className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports Archive', icon: <FileText className="w-4 h-4" /> },
    { id: 'rules', label: 'Rules Matrix', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: 'settings', label: 'Inspector Settings', icon: <SettingsIcon className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-white border-b border-[#D5D5D5] sticky top-[103px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Main Navigation links */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-3 text-xs uppercase tracking-wider font-semibold transition-colors duration-150 relative cursor-pointer ${
                    isActive
                      ? 'text-[#17395F]'
                      : 'text-slate-600 hover:text-[#17395F] hover:bg-slate-50'
                  }`}
                >
                  <span className={isActive ? 'text-[#17395F]' : 'text-slate-500'}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-100 text-amber-800 border border-amber-300 font-bold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#E98A00]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Primary CTA: + New Inspection */}
          <div>
            <button
              onClick={() => onSelectTab('new-inspection')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xs text-xs font-semibold tracking-wide transition shadow-xs cursor-pointer ${
                activeTab === 'new-inspection'
                  ? 'bg-[#17395F] text-white border border-[#12304F]'
                  : 'bg-[#E98A00] hover:bg-[#D47C00] text-white border border-[#C67300]'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ New Inspection</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
