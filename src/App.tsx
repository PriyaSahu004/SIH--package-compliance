/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { InspectionRecord, ComplianceRule, InspectorDecision } from './types/inspection';
import { StorageService, DEFAULT_INSPECTOR } from './services/storage';
import { DEMO_PRESETS, REFERENCE_INSPECTION } from './data/demoData';

import { Header } from './components/Header';
import { Navbar, NavTab } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { NewInspectionView } from './components/NewInspectionView';
import { InspectionHistoryView } from './components/InspectionHistoryView';
import { ReportsView } from './components/ReportsView';
import { RulesManagementView } from './components/RulesManagementView';
import { SettingsView } from './components/SettingsView';
import { ReportPreviewModal } from './components/ReportPreviewModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Persistence State
  const [inspections, setInspections] = useState<InspectionRecord[]>([]);
  const [rules, setRules] = useState<ComplianceRule[]>([]);
  const [inspector, setInspector] = useState<InspectorDecision>(DEFAULT_INSPECTOR);

  // Active workspace inspection (for editing / viewing in NewInspectionView)
  const [activeWorkspaceInspection, setActiveWorkspaceInspection] = useState<InspectionRecord | null>(null);

  // Active inspection modal for 3-page PDF Report preview
  const [reportModalInspection, setReportModalInspection] = useState<InspectionRecord | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Load initial data from StorageService
  useEffect(() => {
    const loadedInspections = StorageService.getInspections();
    const loadedRules = StorageService.getRules();
    const loadedInspector = StorageService.getActiveInspector();

    setInspections(loadedInspections);
    setRules(loadedRules);
    setInspector(loadedInspector);
  }, []);

  // Quick Demo Trigger (Scenario 1, 2, 3)
  const handleQuickDemo = (demoId: string) => {
    const preset = DEMO_PRESETS.find((p) => p.scenarioId === demoId);
    if (preset) {
      setActiveWorkspaceInspection(preset.record);
      setActiveTab('new-inspection');
    }
  };

  // View an existing inspection in Workspace
  const handleViewInspectionInWorkspace = (inspection: InspectionRecord) => {
    setActiveWorkspaceInspection(inspection);
    setActiveTab('new-inspection');
  };

  // Open 3-page Report Modal
  const handleOpenReportModal = (inspection: InspectionRecord) => {
    setReportModalInspection(inspection);
    setIsReportModalOpen(true);
  };

  // Inspection Finalized Callback
  const handleInspectionFinalized = (finalized: InspectionRecord) => {
    const updated = StorageService.getInspections();
    setInspections(updated);
  };

  // Delete an inspection
  const handleDeleteInspection = (id: string) => {
    if (window.confirm(`Delete inspection record ${id}?`)) {
      StorageService.deleteInspection(id);
      setInspections(StorageService.getInspections());
    }
  };

  // Rules updated
  const handleRulesUpdated = (updatedRules: ComplianceRule[]) => {
    setRules(updatedRules);
  };

  // Inspector profile updated
  const handleInspectorUpdated = (updatedInspector: InspectorDecision) => {
    setInspector(updatedInspector);
  };

  // Reset all data
  const handleResetAllData = () => {
    StorageService.resetAllData();
    const freshInspections = StorageService.getInspections();
    const freshRules = StorageService.getRules();
    const freshInspector = StorageService.getActiveInspector();
    setInspections(freshInspections);
    setRules(freshRules);
    setInspector(freshInspector);
    setActiveWorkspaceInspection(REFERENCE_INSPECTION);
    setActiveTab('dashboard');
  };

  return (
    <div id="nirikshak-root" className="min-h-screen bg-[#F5F6F8] text-[#2D3748] flex flex-col font-sans antialiased selection:bg-[#17395F] selection:text-white">
      {/* 1. Government Legal Metrology Institutional Header */}
      <Header
        inspector={inspector}
        onOpenSettings={() => setActiveTab('settings')}
        onQuickDemo={handleQuickDemo}
      />

      {/* 2. Top Application Navbar with Quick CTA */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'new-inspection' && activeTab !== 'new-inspection') {
            setActiveWorkspaceInspection(null);
          }
          setActiveTab(tab);
        }}
        pendingInspectionCount={inspections.filter((i) => i.finalStatus === 'NEEDS_REVIEW').length}
      />

      {/* 3. Main Dynamic Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            inspections={inspections}
            onStartNewInspection={() => {
              setActiveWorkspaceInspection(null);
              setActiveTab('new-inspection');
            }}
            onViewInspection={handleViewInspectionInWorkspace}
            onOpenReport={handleOpenReportModal}
            onQuickDemo={handleQuickDemo}
          />
        )}

        {activeTab === 'new-inspection' && (
          <NewInspectionView
            initialInspection={activeWorkspaceInspection}
            activeInspector={inspector}
            onInspectionFinalized={handleInspectionFinalized}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {activeTab === 'history' && (
          <InspectionHistoryView
            inspections={inspections}
            onViewInspection={handleViewInspectionInWorkspace}
            onOpenReportModal={handleOpenReportModal}
            onDeleteInspection={handleDeleteInspection}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsView
            inspections={inspections}
            onOpenReportModal={handleOpenReportModal}
          />
        )}

        {activeTab === 'rules' && (
          <RulesManagementView
            rules={rules}
            onRulesUpdated={handleRulesUpdated}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            inspector={inspector}
            onUpdateInspector={handleInspectorUpdated}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* 4. 3-Page Official Inspection Report Modal */}
      {reportModalInspection && (
        <ReportPreviewModal
          inspection={reportModalInspection}
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
        />
      )}

      {/* 5. Government Inspection Workstation Institutional Footer */}
      <footer className="bg-[#12304F] text-slate-300 text-[11px] py-6 border-t-2 border-[#E98A00] mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="font-bold text-white text-sm tracking-wide">NIRIKSHAK (निरीक्षक)</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="text-[11px] text-slate-300">
              National Legal Metrology &amp; Packaged Commodity Compliance Portal
            </span>
          </div>
          <div className="text-slate-300 text-xs">
            Legal Metrology (Packaged Commodities) Rules, 2011 &amp; FSSAI Standards Enforcement Matrix
          </div>
          <div className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">
            Department of Consumer Affairs · Ministry of Consumer Affairs, Food &amp; Public Distribution, GOI
          </div>
        </div>
      </footer>
    </div>
  );
}
