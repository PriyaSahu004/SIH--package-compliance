import React, { useState } from 'react';
import { InspectionRecord, ComplianceStatus } from '../types/inspection';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles
} from 'lucide-react';

interface InspectionHistoryViewProps {
  inspections: InspectionRecord[];
  onViewInspection: (inspection: InspectionRecord) => void;
  onOpenReportModal: (inspection: InspectionRecord) => void;
  onDeleteInspection: (id: string) => void;
}

export const InspectionHistoryView: React.FC<InspectionHistoryViewProps> = ({
  inspections,
  onViewInspection,
  onOpenReportModal,
  onDeleteInspection
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Filter inspections
  const filtered = inspections.filter((i) => {
    const matchesSearch =
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.inspectorDecision.inspectorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || i.finalStatus === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || i.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Export CSV
  const handleExportCsv = () => {
    const headers = [
      'Inspection ID',
      'Product Name',
      'Brand',
      'Category',
      'Date',
      'Final Status',
      'Overall Confidence (%)',
      'OCR Confidence (%)',
      'Inspector Name',
      'Inspector ID',
      'Processing Time (s)'
    ];

    const rows = filtered.map((i) => [
      i.id,
      `"${i.productName.replace(/"/g, '""')}"`,
      `"${i.brandName.replace(/"/g, '""')}"`,
      `"${i.category}"`,
      new Date(i.createdAt).toISOString(),
      i.finalStatus,
      i.overallConfidence,
      i.ocrConfidence,
      `"${i.inspectorDecision.inspectorName}"`,
      i.inspectorDecision.inspectorId,
      i.processingTimeSeconds
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NIRIKSHAK_Inspections_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: ComplianceStatus) => {
    switch (status) {
      case 'POTENTIALLY_COMPLIANT':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xs font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-700" />
            POTENTIALLY COMPLIANT
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300 rounded-xs font-bold">
            <AlertTriangle className="w-3 h-3 mr-1 text-amber-700" />
            NEEDS REVIEW
          </span>
        );
      case 'POTENTIAL_NON_COMPLIANCE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-300 rounded-xs font-bold">
            <XCircle className="w-3 h-3 mr-1 text-rose-700" />
            NON-COMPLIANCE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300 rounded-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  const categories = Array.from(new Set(inspections.map((i) => i.category)));

  return (
    <div className="space-y-4 pb-12">
      {/* Header and filters */}
      <div className="bg-white p-6 border border-[#D5D5D5] space-y-4 shadow-xs rounded-xs">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#17395F] font-bold mb-1">
              Audit Trail // National Registry
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#17395F]">Legal Metrology Inspection Archive</h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Verified record repository for all statutory packaging compliance assessments ({filtered.length} records)
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider bg-[#17395F] hover:bg-[#12304F] text-white rounded-xs flex items-center space-x-1.5 cursor-pointer transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-[#E98A00]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search and Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, Product Name, Brand, or Inspector..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-[#CBD5E1] bg-white text-slate-800 rounded-xs focus:border-[#17395F] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-[#CBD5E1] bg-white text-slate-700 rounded-xs focus:border-[#17395F] focus:outline-none font-medium"
            >
              <option value="ALL">All Compliance Statuses</option>
              <option value="POTENTIALLY_COMPLIANT">Potentially Compliant</option>
              <option value="NEEDS_REVIEW">Needs Review</option>
              <option value="POTENTIAL_NON_COMPLIANCE">Potential Non-Compliance</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-[#CBD5E1] bg-white text-slate-700 rounded-xs focus:border-[#17395F] focus:outline-none font-medium"
            >
              <option value="ALL">All Product Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="bg-white border border-[#D5D5D5] overflow-hidden shadow-xs rounded-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#17395F] border-b border-[#12304F] text-white text-[10px] font-mono uppercase tracking-wider">
              <tr>
                <th className="p-3.5 font-bold">Inspection ID</th>
                <th className="p-3.5 font-bold">Commodity &amp; Brand</th>
                <th className="p-3.5 font-bold">Category</th>
                <th className="p-3.5 font-bold">Inspector</th>
                <th className="p-3.5 font-bold">Date &amp; Time</th>
                <th className="p-3.5 font-bold">Compliance Status</th>
                <th className="p-3.5 font-bold text-center">Confidence</th>
                <th className="p-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                    No matching inspection records found for the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((insp) => (
                  <tr key={insp.id} className="hover:bg-[#F7F8FA] transition">
                    <td className="p-3.5 font-mono text-xs font-bold text-[#17395F]">
                      {insp.id}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-sm text-slate-800">{insp.productName}</div>
                      <div className="text-[10.5px] text-slate-500">{insp.brandName}</div>
                    </td>
                    <td className="p-3.5 text-slate-600 text-xs font-medium">{insp.category}</td>
                    <td className="p-3.5 text-slate-700">
                      <div className="font-semibold text-xs text-[#17395F]">{insp.inspectorDecision.inspectorName}</div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {insp.inspectorDecision.inspectorId}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-600 text-[11px] font-mono">
                      {new Date(insp.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-3.5">{getStatusBadge(insp.finalStatus)}</td>
                    <td className="p-3.5 text-center font-mono font-bold text-[#17395F]">
                      {insp.overallConfidence}%
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => onViewInspection(insp)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#17395F] text-[10px] font-mono uppercase tracking-wider flex items-center space-x-1 cursor-pointer transition border border-[#CBD5E1] rounded-xs font-semibold shadow-2xs"
                          title="Open Interactive Workspace"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                        <button
                          onClick={() => onOpenReportModal(insp)}
                          className="px-2.5 py-1 bg-[#17395F] text-white hover:bg-[#12304F] text-[10px] font-bold flex items-center space-x-1 cursor-pointer transition shadow-xs rounded-xs"
                          title="Preview Official 3-Page PDF Report"
                        >
                          <FileText className="w-3 h-3 text-[#E98A00]" />
                          <span>Report</span>
                        </button>
                        <button
                          onClick={() => onDeleteInspection(insp.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer rounded-xs"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
