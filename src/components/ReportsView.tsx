import React, { useState } from 'react';
import { InspectionRecord } from '../types/inspection';
import { PdfReportGenerator } from '../services/pdfGenerator';
import {
  FileText,
  Download,
  Eye,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  Calendar
} from 'lucide-react';

interface ReportsViewProps {
  inspections: InspectionRecord[];
  onOpenReportModal: (inspection: InspectionRecord) => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ inspections, onOpenReportModal }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const filtered = inspections.filter(
    (i) =>
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.inspectorDecision.inspectorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = async (inspection: InspectionRecord) => {
    setDownloadingId(inspection.id);
    try {
      await PdfReportGenerator.downloadReportPdf(inspection);
    } catch (err) {
      console.error('PDF error', err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Header */}
      <div className="bg-white p-6 border border-[#D5D5D5] flex flex-wrap justify-between items-center gap-3 shadow-xs rounded-xs">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#17395F] font-bold mb-1">
            Documents // Official Archive
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#17395F]">Statutory Compliance Reports</h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Exportable 3-page government-standard compliance reports with visual evidence and digital inspector seals
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report by ID or product..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#CBD5E1] bg-white text-slate-800 rounded-xs focus:border-[#17395F] focus:outline-none"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((inspection) => {
          let statusBadge = (
            <span className="px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-xs font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              <span>POTENTIALLY COMPLIANT</span>
            </span>
          );
          if (inspection.finalStatus === 'NEEDS_REVIEW') {
            statusBadge = (
              <span className="px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300 rounded-xs font-bold flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-amber-700" />
                <span>NEEDS REVIEW</span>
              </span>
            );
          } else if (inspection.finalStatus === 'POTENTIAL_NON_COMPLIANCE') {
            statusBadge = (
              <span className="px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-300 rounded-xs font-bold flex items-center space-x-1">
                <XCircle className="w-3 h-3 text-rose-700" />
                <span>NON-COMPLIANCE</span>
              </span>
            );
          }

          return (
            <div
              key={inspection.id}
              className="bg-white border border-[#D5D5D5] hover:border-[#17395F] transition p-5 flex flex-col justify-between shadow-xs rounded-xs"
            >
              <div>
                {/* Top bar with ID & status */}
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div className="font-mono text-[10px] font-bold text-white bg-[#17395F] px-2 py-0.5 rounded-xs">
                    {inspection.id}
                  </div>
                  {statusBadge}
                </div>

                {/* Product Title */}
                <h3 className="font-bold text-base text-[#17395F] line-clamp-1 mb-0.5">
                  {inspection.productName}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-3.5">{inspection.category}</p>

                {/* Metadata */}
                <div className="bg-[#F7F8FA] p-3 border border-[#E2E8F0] text-xs space-y-1.5 text-slate-700 mb-4 rounded-xs">
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{inspection.inspectorDecision.zonalOffice}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>
                      {new Date(inspection.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}{' '}
                      · {inspection.inspectorDecision.inspectorName}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-700 pt-2 flex justify-between border-t border-[#E2E8F0] font-mono">
                    <span className="text-slate-500 font-semibold uppercase">Confidence Score:</span>
                    <span className="font-bold text-[#17395F]">{inspection.overallConfidence}%</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E2E8F0] font-mono text-[10px] uppercase tracking-wider">
                <button
                  onClick={() => onOpenReportModal(inspection)}
                  className="px-3 py-2 bg-white hover:bg-slate-100 text-[#17395F] border border-[#CBD5E1] flex items-center justify-center space-x-1.5 transition cursor-pointer rounded-xs font-bold shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3-Page Preview</span>
                </button>

                <button
                  onClick={() => handleDownload(inspection)}
                  disabled={downloadingId === inspection.id}
                  className="px-3 py-2 bg-[#17395F] text-white hover:bg-[#12304F] font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer disabled:opacity-50 rounded-xs shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#E98A00]" />
                  <span>{downloadingId === inspection.id ? 'Exporting…' : 'PDF Export'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
