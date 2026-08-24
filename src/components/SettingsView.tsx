import React, { useState } from 'react';
import { InspectorDecision } from '../types/inspection';
import { StorageService } from '../services/storage';
import {
  UserCheck,
  Building,
  Sliders,
  Shield,
  Check,
  AlertTriangle,
  RotateCcw,
  Cpu
} from 'lucide-react';

interface SettingsViewProps {
  inspector: InspectorDecision;
  onUpdateInspector: (updated: InspectorDecision) => void;
  onResetAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  inspector,
  onUpdateInspector,
  onResetAllData
}) => {
  const [form, setForm] = useState<InspectorDecision>(inspector);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveActiveInspector(form);
    onUpdateInspector(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 border border-[#D5D5D5] shadow-xs rounded-xs">
        <div className="flex items-center space-x-2 text-[#17395F] mb-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
          <UserCheck className="w-3.5 h-3.5 text-[#E98A00]" />
          <span>Department Profile // Officer Registry</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[#17395F]">Inspector Credentials &amp; Registry</h2>
        <p className="text-xs text-slate-600 mt-0.5">
          Configure inspecting officer identity, controlling authority, and Legal Metrology zonal office metadata embedded into official PDF reports.
        </p>
      </div>

      {/* Inspector Profile Form */}
      <form onSubmit={handleSave} className="bg-white p-6 border border-[#D5D5D5] space-y-5 shadow-xs rounded-xs">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17395F] flex items-center gap-1.5 pb-2 border-b border-[#E2E8F0]">
          <Shield className="w-4 h-4 text-[#17395F]" />
          01 // Inspecting Officer Digital Signature Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Inspecting Officer Full Name:</label>
            <input
              type="text"
              value={form.inspectorName}
              onChange={(e) => setForm({ ...form, inspectorName: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-medium text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Official Inspector ID / Badge No.:</label>
            <input
              type="text"
              value={form.inspectorId}
              onChange={(e) => setForm({ ...form, inspectorId: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-mono text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Official Designation:</label>
            <input
              type="text"
              value={form.inspectorDesignation}
              onChange={(e) => setForm({ ...form, inspectorDesignation: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-medium text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Zonal Directorate / Jurisdiction:</label>
            <input
              type="text"
              value={form.zonalOffice}
              onChange={(e) => setForm({ ...form, zonalOffice: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-medium text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
              required
            />
          </div>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17395F] flex items-center gap-1.5 pt-4 pb-2 border-b border-[#E2E8F0]">
          <Building className="w-4 h-4 text-[#17395F]" />
          02 // Controlling Authority Countersignature
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Controlling Authority Name:</label>
            <input
              type="text"
              value={form.controllingAuthorityName || ''}
              onChange={(e) => setForm({ ...form, controllingAuthorityName: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-medium text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 text-[10px] font-bold uppercase mb-1">Controlling Authority Designation:</label>
            <input
              type="text"
              value={form.controllingAuthorityDesignation || ''}
              onChange={(e) => setForm({ ...form, controllingAuthorityDesignation: e.target.value })}
              className="w-full px-3 py-2 border border-[#CBD5E1] bg-white text-slate-800 font-medium text-xs rounded-xs focus:border-[#17395F] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#17395F] text-white hover:bg-[#12304F] font-bold text-xs flex items-center space-x-2 transition cursor-pointer shadow-xs rounded-xs"
          >
            {saveSuccess ? <Check className="w-4 h-4 text-[#E98A00]" /> : <UserCheck className="w-4 h-4 text-[#E98A00]" />}
            <span>{saveSuccess ? 'Profile Updated!' : 'Save Inspector Profile'}</span>
          </button>
        </div>
      </form>

      {/* System Diagnostics & Storage Management */}
      <div className="bg-white p-6 border border-[#D5D5D5] space-y-4 shadow-xs rounded-xs">
        <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17395F] flex items-center gap-1.5 pb-2 border-b border-[#E2E8F0]">
          <Cpu className="w-4 h-4 text-[#17395F]" />
          03 // System Diagnostics &amp; Compliance Storage
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#F7F8FA] p-4 border border-[#E2E8F0] space-y-1 rounded-xs">
            <span className="text-slate-500 font-mono text-[10px] font-bold uppercase tracking-wider">Vision OCR Pipeline:</span>
            <div className="font-bold text-sm text-[#17395F] flex items-center justify-between">
              <span>Gemini 2.5 Flash &amp; Local CV Engine</span>
              <span className="px-2 py-0.5 text-[9.5px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold rounded-xs">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-600 pt-1">Multilingual East/CRAFT text box localizer &amp; Legal Metrology Rule parser.</p>
          </div>

          <div className="bg-[#F7F8FA] p-4 border border-[#E2E8F0] space-y-1 rounded-xs">
            <span className="text-slate-500 font-mono text-[10px] font-bold uppercase tracking-wider">Local Storage Persistence:</span>
            <div className="font-bold text-sm text-[#17395F]">Synchronized &amp; Cached</div>
            <p className="text-[11px] text-slate-600 pt-1">Inspection records, custom rules, and inspector decisions persisted locally.</p>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap justify-between items-center gap-3">
          <div className="text-xs text-slate-500">
            Reset test inspections, custom rules, and profile back to initial factory demo seed state:
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all inspections, rule customizations, and reload initial demo records?')) {
                onResetAllData();
              }
            }}
            className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-300 font-bold flex items-center space-x-1.5 transition cursor-pointer rounded-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
