import React, { useEffect, useState } from 'react';
import { ShieldCheck, UserCheck, Scale, AlertCircle, Building2 } from 'lucide-react';
import { InspectorDecision } from '../types/inspection';

interface HeaderProps {
  inspector: InspectorDecision;
  onOpenSettings: () => void;
  onQuickDemo: (demoId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ inspector, onOpenSettings, onQuickDemo }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-[#17395F] text-white border-b border-[#12304F] sticky top-0 z-40 shadow-sm">
      {/* Top micro-bar for Government Identity */}
      <div className="bg-[#12304F] px-4 sm:px-8 py-1.5 border-b border-[#1E4875] text-[11px] text-slate-300 flex flex-wrap justify-between items-center font-sans tracking-wide">
        <div className="flex items-center space-x-2.5">
          <Scale className="w-3.5 h-3.5 text-[#E98A00]" />
          <span className="font-semibold uppercase tracking-wider text-white">GOVERNMENT OF INDIA</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 hidden md:inline">Ministry of Consumer Affairs · Legal Metrology Division</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-slate-300 font-mono text-[10.5px]">{currentTime || 'National Legal Metrology Portal'}</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[9.5px] font-semibold uppercase tracking-wide bg-[#2E7D57]/30 text-[#4ADE80] border border-[#2E7D57]/60">
            ● AI Decision-Support Active
          </span>
        </div>
      </div>

      {/* Main App Title & Inspector Profile Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 bg-white text-[#17395F] flex items-center justify-center rounded-sm border-2 border-[#E98A00] shadow-sm font-bold text-xl tracking-tight">
            N
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-300">
                Official Regulatory Workstation · SIH-26034
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              NIRIKSHAK <span className="text-sm font-normal text-slate-300 hidden sm:inline">(निरीक्षक)</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E98A00] text-white uppercase tracking-wider">
                Govt. Edition
              </span>
            </h1>
            <p className="text-xs text-slate-200">
              Packaged Commodity Statutory Compliance &amp; Label Verification Engine · <span className="text-[#FDBA74]">Act 2011 &amp; FSSAI</span>
            </p>
          </div>
        </div>

        {/* Quick Demo Selector & Inspector Profile */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center bg-[#12304F] border border-[#1E4875] rounded p-1 space-x-1 text-xs">
            <span className="px-2 py-0.5 text-slate-300 text-[10px] font-semibold uppercase tracking-wider">Demo Scenarios:</span>
            <button
              onClick={() => onQuickDemo('demo-juice')}
              className="px-2.5 py-1 text-xs text-white hover:bg-[#17395F] rounded font-medium cursor-pointer transition"
              title="FreshFarm Mixed Fruit Juice (Compliant Reference)"
            >
              1. Juice <span className="text-emerald-400 font-semibold">[✓]</span>
            </button>
            <button
              onClick={() => onQuickDemo('demo-biscuits')}
              className="px-2.5 py-1 text-xs text-white hover:bg-[#17395F] rounded font-medium cursor-pointer transition"
              title="NutriBake Biscuits (Review on Unit Sale Price)"
            >
              2. Biscuits <span className="text-amber-400 font-semibold">[!]</span>
            </button>
            <button
              onClick={() => onQuickDemo('demo-rice')}
              className="px-2.5 py-1 text-xs text-white hover:bg-[#17395F] rounded font-medium cursor-pointer transition"
              title="Golden Harvest Rice (Missing Origin & Helpline)"
            >
              3. Rice <span className="text-rose-400 font-semibold">[✗]</span>
            </button>
          </div>

          {/* Inspector Badge Trigger */}
          <button
            onClick={onOpenSettings}
            className="flex items-center space-x-2.5 bg-[#12304F] hover:bg-[#0F2842] border border-[#235385] rounded px-3 py-1.5 transition text-left cursor-pointer shadow-xs"
          >
            <div className="w-7 h-7 bg-white text-[#17395F] rounded-xs flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-white flex items-center gap-1">
                {inspector.inspectorName}
                <span className="text-[10px] text-slate-300 font-mono">({inspector.inspectorId})</span>
              </div>
              <div className="text-[10px] text-slate-300 truncate max-w-[170px]">
                {inspector.inspectorDesignation}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-[#FFFBEB] border-t border-[#FCD34D] px-4 py-1.5 text-[11.5px] text-[#92400E] flex items-center justify-center space-x-2 font-medium">
        <AlertCircle className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
        <span>
          <strong className="text-[#78350F] uppercase tracking-wider text-[10px]">Statutory Decision-Support:</strong> AI detections assist automated verification. Final legal determinations are issued exclusively by authorised inspecting officers.
        </span>
      </div>
    </header>
  );
};
