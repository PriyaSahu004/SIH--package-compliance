import React, { useState } from 'react';
import { ComplianceRule, RuleSeverity } from '../types/inspection';
import { StorageService } from '../services/storage';
import {
  SlidersHorizontal,
  RotateCcw,
  Check,
  ShieldAlert,
  Scale,
  UtensilsCrossed,
  Info
} from 'lucide-react';

interface RulesManagementViewProps {
  rules: ComplianceRule[];
  onRulesUpdated: (updatedRules: ComplianceRule[]) => void;
}

export const RulesManagementView: React.FC<RulesManagementViewProps> = ({ rules, onRulesUpdated }) => {
  const [activeRules, setActiveRules] = useState<ComplianceRule[]>(rules);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleRuleEnabled = (ruleId: string) => {
    const updated = activeRules.map((r) => (r.id === ruleId ? { ...r, isEnabled: !r.isEnabled } : r));
    setActiveRules(updated);
  };

  const handleSeverityChange = (ruleId: string, newSeverity: RuleSeverity) => {
    const updated = activeRules.map((r) => (r.id === ruleId ? { ...r, severity: newSeverity } : r));
    setActiveRules(updated);
  };

  const handleSaveAll = () => {
    StorageService.saveRules(activeRules);
    onRulesUpdated(activeRules);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all rules to official Legal Metrology & FSSAI gazette defaults?')) {
      const reset = StorageService.resetRulesToDefault();
      setActiveRules(reset);
      onRulesUpdated(reset);
    }
  };

  const lmRules = activeRules.filter((r) => r.category === 'LEGAL_METROLOGY');
  const fssaiRules = activeRules.filter((r) => r.category === 'FSSAI');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-white p-6 border border-[#D5D5D5] flex flex-wrap justify-between items-center gap-4 shadow-xs rounded-xs">
        <div>
          <div className="flex items-center space-x-2 text-[#17395F] mb-1 font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#E98A00]" />
            <span>Statutory Rule Matrix // Engine Config</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#17395F]">Compliance Standard Rules Engine</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Configure mandatory packaging declarations, severity classifications, and threshold constraints under Act 2011 &amp; FSSAI
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-wider">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-[#17395F] border border-[#CBD5E1] flex items-center space-x-1.5 transition cursor-pointer rounded-xs font-bold shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-4 py-2 bg-[#17395F] text-white hover:bg-[#12304F] font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shadow-xs rounded-xs"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-[#E98A00]" /> : <SlidersHorizontal className="w-3.5 h-3.5 text-[#E98A00]" />}
            <span>{savedSuccess ? 'Rules Saved!' : 'Save Rule Matrix'}</span>
          </button>
        </div>
      </div>

      {/* Info notice */}
      <div className="bg-amber-50/70 border border-amber-200 p-3.5 text-xs text-amber-900 flex items-start space-x-2.5 rounded-xs">
        <Info className="w-4 h-4 text-[#E98A00] shrink-0 mt-0.5" />
        <span>
          <strong className="font-bold text-[#17395F]">Automated Rule Evaluation:</strong> NIRIKSHAK dynamically applies these rules to OCR entities during inspection. Disabling a rule removes it from automated non-compliance scoring.
        </span>
      </div>

      {/* Section 1: Legal Metrology (Packaged Commodities) Rules */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-[#17395F] font-mono text-xs uppercase tracking-wider font-bold">
          <Scale className="w-4 h-4 text-[#17395F]" />
          <h3>Legal Metrology (Packaged Commodities) Rules, 2011 ({lmRules.length} Rules)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lmRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 border transition rounded-xs ${
                rule.isEnabled ? 'bg-white border-[#D5D5D5] shadow-2xs' : 'bg-[#F7F8FA] border-[#E2E8F0] opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#17395F] text-white rounded-xs">
                    {rule.id}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-slate-500">{rule.actReference}</span>
                </div>

                {/* Enable toggle */}
                <button
                  onClick={() => toggleRuleEnabled(rule.id)}
                  className={`px-2.5 py-0.5 text-[9.5px] font-mono uppercase tracking-wider transition cursor-pointer border rounded-xs font-bold ${
                    rule.isEnabled
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-500 border-slate-300'
                  }`}
                >
                  {rule.isEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <h4 className="font-bold text-sm text-slate-800 mb-1">{rule.name}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{rule.description}</p>

              {/* Severity selector */}
              <div className="flex justify-between items-center pt-2.5 border-t border-[#E2E8F0] text-xs font-mono">
                <span className="text-[10px] uppercase text-slate-500 font-semibold">Violation Severity:</span>
                <select
                  value={rule.severity}
                  onChange={(e) => handleSeverityChange(rule.id, e.target.value as RuleSeverity)}
                  className="px-2 py-1 text-xs border border-[#CBD5E1] bg-white text-slate-800 focus:border-[#17395F] focus:outline-none uppercase rounded-xs font-medium"
                >
                  <option value="critical">Critical (Mandatory Non-Compliance)</option>
                  <option value="major">Major (Review Required)</option>
                  <option value="minor">Minor (Advisory Warning)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: FSSAI Food Safety Regulations */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center space-x-2 text-[#17395F] font-mono text-xs uppercase tracking-wider font-bold">
          <UtensilsCrossed className="w-4 h-4 text-[#17395F]" />
          <h3>Food Safety &amp; Standards Authority of India (FSSAI) Standards ({fssaiRules.length} Rules)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fssaiRules.map((rule) => (
            <div
              key={rule.id}
              className={`p-4 border transition rounded-xs ${
                rule.isEnabled ? 'bg-white border-[#D5D5D5] shadow-2xs' : 'bg-[#F7F8FA] border-[#E2E8F0] opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[#17395F] text-white rounded-xs">
                    {rule.id}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-slate-500">{rule.actReference}</span>
                </div>

                <button
                  onClick={() => toggleRuleEnabled(rule.id)}
                  className={`px-2.5 py-0.5 text-[9.5px] font-mono uppercase tracking-wider transition cursor-pointer border rounded-xs font-bold ${
                    rule.isEnabled
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-500 border-slate-300'
                  }`}
                >
                  {rule.isEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <h4 className="font-bold text-sm text-slate-800 mb-1">{rule.name}</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">{rule.description}</p>

              <div className="flex justify-between items-center pt-2.5 border-t border-[#E2E8F0] text-xs font-mono">
                <span className="text-[10px] uppercase text-slate-500 font-semibold">Violation Severity:</span>
                <select
                  value={rule.severity}
                  onChange={(e) => handleSeverityChange(rule.id, e.target.value as RuleSeverity)}
                  className="px-2 py-1 text-xs border border-[#CBD5E1] bg-white text-slate-800 focus:border-[#17395F] focus:outline-none uppercase rounded-xs font-medium"
                >
                  <option value="critical">Critical (Mandatory Non-Compliance)</option>
                  <option value="major">Major (Review Required)</option>
                  <option value="minor">Minor (Advisory Warning)</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
