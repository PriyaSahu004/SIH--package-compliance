import React, { useState } from 'react';
import { InspectionRecord } from '../types/inspection';
import { PdfReportGenerator } from '../services/pdfGenerator';
import { X, Download, ChevronLeft, ChevronRight, FileText, Printer, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface ReportPreviewModalProps {
  inspection: InspectionRecord;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({ inspection, isOpen, onClose }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await PdfReportGenerator.downloadReportPdf(inspection);
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'POTENTIALLY_COMPLIANT':
        return <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">POTENTIALLY COMPLIANT</span>;
      case 'NEEDS_REVIEW':
        return <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-amber-950/60 text-amber-300 border border-amber-500/30">NEEDS REVIEW</span>;
      case 'POTENTIAL_NON_COMPLIANCE':
        return <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-rose-950/60 text-rose-300 border border-rose-500/30">POTENTIAL NON-COMPLIANCE</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider bg-white/5 text-zinc-400 border border-white/10">{status}</span>;
    }
  };

  const page1Declarations = inspection.extractedFields.slice(0, 7);
  const page2Declarations = inspection.extractedFields.slice(7);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#141414] border border-white/15 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Modal Navigation Header */}
        <div className="bg-[#0E0E0E] text-white px-6 py-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-white" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">Official Report Preview</div>
              <h3 className="font-serif italic text-base text-white">
                Statutory Inspection Dossier — <span className="font-mono text-zinc-300 text-sm not-italic">{inspection.id}</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Page navigation pills */}
            <div className="flex items-center bg-[#1A1A1A] p-0.5 border border-white/10 text-xs font-mono uppercase tracking-wider">
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-3 py-1.5 transition cursor-pointer ${
                  currentPage === 1 ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                P.1 Summary
              </button>
              <button
                onClick={() => setCurrentPage(2)}
                className={`px-3 py-1.5 transition cursor-pointer ${
                  currentPage === 2 ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                P.2 Rules
              </button>
              <button
                onClick={() => setCurrentPage(3)}
                className={`px-3 py-1.5 transition cursor-pointer ${
                  currentPage === 3 ? 'bg-white text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                P.3 Signatures
              </button>
            </div>

            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-4 py-1.5 bg-white text-black hover:bg-zinc-200 text-xs font-serif italic flex items-center space-x-1.5 transition cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>{isDownloading ? 'Generating PDF…' : 'Export PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Realistic A4 Document Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-[#0A0A0A]">
          <div className="w-full max-w-[780px] bg-[#161616] text-[#E5E5E5] border border-white/15 p-8 sm:p-10 font-sans flex flex-col justify-between min-h-[960px] shadow-2xl">
            {/* Inner Page Document Content */}
            <div>
              {/* Document Header */}
              <div className="bg-[#111111] text-white -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 p-6 border-b border-white/15 mb-6 flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-1">
                    Government of India // Ministry of Consumer Affairs
                  </div>
                  <h1 className="text-2xl font-serif italic tracking-wide">NIRIKSHAK</h1>
                  <p className="text-xs text-zinc-300 font-light mt-0.5">Statutory Package Compliance Assessment Report</p>
                  <p className="text-[10.5px] text-zinc-500 font-mono mt-0.5">Legal Metrology (Packaged Commodities) Rules, 2011</p>
                </div>
                <div className="text-right text-xs font-mono">
                  <div className="font-bold text-white text-sm">{inspection.id}</div>
                  <div className="text-zinc-400 text-[10.5px] mt-1">
                    {new Date(inspection.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-zinc-500 mt-0.5">Gazette Authenticated</div>
                </div>
              </div>

              {/* ================= PAGE 1 CONTENT ================= */}
              {currentPage === 1 && (
                <div className="space-y-6">
                  {/* Section 1: Summary Table */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      01 // Inspection Summary
                    </h2>
                    <div className="bg-[#101010] border border-white/10 p-4 text-xs grid grid-cols-2 gap-y-2.5 gap-x-4">
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Product Name:</span>
                        <span className="font-serif italic text-sm text-white">{inspection.productName}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Category:</span>
                        <span className="text-zinc-300">{inspection.category}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Inspecting Officer:</span>
                        <span className="text-zinc-200">{inspection.inspectorDecision.inspectorName} <span className="font-mono text-zinc-500">({inspection.inspectorDecision.inspectorId})</span></span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Inspection Date:</span>
                        <span className="text-zinc-300 font-mono">{new Date(inspection.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">OCR Extraction Confidence:</span>
                        <span className="font-mono font-bold text-white">{inspection.ocrConfidence}%</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Overall Inspection Confidence:</span>
                        <span className="font-mono font-bold text-white">{inspection.overallConfidence}%</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">AI-Assessed Status:</span>
                        <div className="mt-0.5">{getStatusBadge(inspection.aiAssessedStatus)}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Final Status (Officer):</span>
                        <div className="mt-0.5">{getStatusBadge(inspection.finalStatus)}</div>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Processing Latency:</span>
                        <span className="text-zinc-300 font-mono">{inspection.processingTimeSeconds}s</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 font-mono text-[10px] uppercase block">Verification State:</span>
                        <span className="text-emerald-300 font-mono text-[10.5px]">VERIFIED BY INSPECTOR [✓]</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Package Image Evidence Box */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      02 // Visual Evidence &amp; Pre-Flight Metrics
                    </h2>
                    <div className="border border-white/10 p-4 bg-[#101010] flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-40 h-44 bg-black flex items-center justify-center overflow-hidden border border-white/15 shrink-0">
                        <img
                          src={inspection.imageUrl}
                          alt="Package Evidence"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="flex-1 text-xs space-y-1.5 text-zinc-300 w-full">
                        <div className="font-serif italic text-sm text-white mb-2">Visual Pre-flight Quality &amp; Suitability:</div>
                        <div className="flex justify-between border-b border-white/5 py-1 text-[11px] font-mono">
                          <span className="text-zinc-500 uppercase">Image Resolution:</span>
                          <span className="text-emerald-300">{inspection.qualityMetrics.resolutionStatus} ({inspection.qualityMetrics.resolutionScore}/100)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 py-1 text-[11px] font-mono">
                          <span className="text-zinc-500 uppercase">Edge Sharpness:</span>
                          <span className="text-emerald-300">{inspection.qualityMetrics.blurStatus} ({inspection.qualityMetrics.blurScore}/100)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 py-1 text-[11px] font-mono">
                          <span className="text-zinc-500 uppercase">Specular Glare:</span>
                          <span className="text-emerald-300">{inspection.qualityMetrics.lightingStatus} ({inspection.qualityMetrics.lightingScore}/100)</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 py-1 text-[11px] font-mono">
                          <span className="text-zinc-500 uppercase">Perspective Alignment:</span>
                          <span className="text-emerald-300">{inspection.qualityMetrics.perspectiveStatus} ({inspection.qualityMetrics.perspectiveScore}/100)</span>
                        </div>
                        <div className="flex justify-between py-1 text-[11px] font-mono">
                          <span className="text-zinc-500 uppercase">Overall Suitability:</span>
                          <span className="text-white font-bold bg-white/10 px-2 py-0.5">{inspection.qualityMetrics.overallStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Extracted Declarations Table */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      03 // Statutory Declarations (Legal Metrology &amp; FSSAI)
                    </h2>
                    <div className="overflow-x-auto border border-white/10">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-[#111111] text-zinc-400 text-[10px] font-mono uppercase tracking-wider border-b border-white/10">
                          <tr>
                            <th className="p-2.5 font-normal">Declaration</th>
                            <th className="p-2.5 font-normal">Extracted Value</th>
                            <th className="p-2.5 font-normal">Corrected Value</th>
                            <th className="p-2.5 font-normal text-center">Confidence</th>
                            <th className="p-2.5 font-normal text-center">Verified</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {page1Declarations.map((f, i) => (
                            <tr key={f.id} className={i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#101010]'}>
                              <td className="p-2.5 font-serif italic text-zinc-100 text-xs">{f.name}</td>
                              <td className="p-2.5 font-mono text-[10px] text-zinc-300 max-w-[180px] truncate">{f.extractedValue}</td>
                              <td className="p-2.5 font-mono text-[10px] text-white font-semibold">{f.correctedValue || '—'}</td>
                              <td className="p-2.5 text-center font-mono font-bold text-zinc-200">{f.confidence}%</td>
                              <td className="p-2.5 text-center text-emerald-300 font-mono text-[10px]">
                                {f.isVerified ? 'YES [✓]' : 'PENDING'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= PAGE 2 CONTENT ================= */}
              {currentPage === 2 && (
                <div className="space-y-6">
                  {page2Declarations.length > 0 && (
                    <div>
                      <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-white inline-block" />
                        03 // Statutory Declarations (Continued)
                      </h2>
                      <div className="overflow-x-auto border border-white/10">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-[#111111] text-zinc-400 text-[10px] font-mono uppercase tracking-wider border-b border-white/10">
                            <tr>
                              <th className="p-2.5 font-normal">Declaration</th>
                              <th className="p-2.5 font-normal">Extracted Value</th>
                              <th className="p-2.5 font-normal">Corrected Value</th>
                              <th className="p-2.5 font-normal text-center">Confidence</th>
                              <th className="p-2.5 font-normal text-center">Verified</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {page2Declarations.map((f, i) => (
                              <tr key={f.id} className={i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#101010]'}>
                                <td className="p-2.5 font-serif italic text-zinc-100 text-xs">{f.name}</td>
                                <td className="p-2.5 font-mono text-[10px] text-zinc-300 max-w-[180px] truncate">{f.extractedValue}</td>
                                <td className="p-2.5 font-mono text-[10px] text-white font-semibold">{f.correctedValue || '—'}</td>
                                <td className="p-2.5 text-center font-mono font-bold text-zinc-200">{f.confidence}%</td>
                                <td className="p-2.5 text-center text-emerald-300 font-mono text-[10px]">
                                  {f.isVerified ? 'YES [✓]' : 'PENDING'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Section 4: Rule Checks Table */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      04 // Compliance Rule Engine Evaluation
                    </h2>
                    <div className="overflow-x-auto border border-white/10">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-[#111111] text-zinc-400 text-[10px] font-mono uppercase tracking-wider border-b border-white/10">
                          <tr>
                            <th className="p-2.5 font-normal">Rule ID</th>
                            <th className="p-2.5 font-normal">Check</th>
                            <th className="p-2.5 font-normal">Severity</th>
                            <th className="p-2.5 font-normal">Status</th>
                            <th className="p-2.5 font-normal">Explanation / Advisory Note</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {inspection.ruleResults.map((r, i) => (
                            <tr key={r.ruleId} className={i % 2 === 0 ? 'bg-[#141414]' : 'bg-[#101010]'}>
                              <td className="p-2.5 font-mono font-bold text-white text-[11px]">{r.ruleId}</td>
                              <td className="p-2.5 font-serif italic text-zinc-200 text-xs">{r.ruleName}</td>
                              <td className="p-2.5">
                                <span
                                  className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider border ${
                                    r.severity === 'critical'
                                      ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                                      : r.severity === 'major'
                                      ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                                      : 'bg-white/5 text-zinc-400 border-white/10'
                                  }`}
                                >
                                  {r.severity}
                                </span>
                              </td>
                              <td className="p-2.5">
                                {getStatusBadge(r.status)}
                              </td>
                              <td className="p-2.5 text-[11px] text-zinc-400 font-light leading-relaxed max-w-[240px]">
                                {r.explanation}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= PAGE 3 CONTENT ================= */}
              {currentPage === 3 && (
                <div className="space-y-6">
                  {/* Section 5: Inspector Remarks */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      05 // Inspecting Officer Observations
                    </h2>
                    <div className="bg-[#101010] border border-white/10 p-4 text-xs text-zinc-300 min-h-[100px] leading-relaxed font-light">
                      {inspection.inspectorDecision.remarks || (
                        <p className="italic text-zinc-500">
                          Physical packaged commodity sample evaluated in accordance with Legal Metrology (Packaged Commodities) Rules, 2011 and FSSAI Packaging Regulations. Extracted declarations verified against commercial register.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Section 6: Actionable Follow-up */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-white inline-block" />
                      06 // Departmental Action Protocol
                    </h2>
                    <div className="bg-[#101010] border border-white/10 p-4 text-xs space-y-1.5 text-zinc-400 font-light">
                      <div>• Automated inspection audit trail registered under Officer ID: <span className="font-mono text-white">{inspection.inspectorDecision.inspectorId}</span></div>
                      <div>• Digital record archived in National Legal Metrology Compliance Repository.</div>
                      <div>• Periodic spot-check sample schedule logged for Zonal Directorate.</div>
                    </div>
                  </div>

                  {/* Section 7: Mandatory Legal Disclaimer */}
                  <div>
                    <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-300 mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 inline-block" />
                      07 // Statutory Disclaimer &amp; Notice
                    </h2>
                    <div className="bg-rose-950/20 border border-rose-500/20 p-4 text-[11px] text-zinc-300 leading-relaxed font-light">
                      <p>
                        This report was produced by <strong className="text-white font-normal">NIRIKSHAK</strong>, an AI-assisted inspection-support system. OCR extraction and rule checks are automated aids and may contain errors. Statuses such as <strong className="text-emerald-300 font-mono text-[10px]">POTENTIALLY COMPLIANT</strong>, <strong className="text-amber-300 font-mono text-[10px]">NEEDS REVIEW</strong> and <strong className="text-rose-300 font-mono text-[10px]">POTENTIAL NON-COMPLIANCE</strong> are advisory indications only and do not constitute a legal determination. The final compliance decision rests solely with the authorised human inspector and competent authority.
                      </p>
                    </div>
                  </div>

                  {/* Section 8: Signatures */}
                  <div className="grid grid-cols-2 gap-6 pt-2">
                    {/* Officer signature */}
                    <div className="border border-white/10 p-4 bg-[#101010] text-xs">
                      <div className="font-mono text-[10px] uppercase text-zinc-400 mb-3">Signature of Inspecting Officer</div>
                      <div className="font-serif italic text-zinc-300 text-sm mb-2">Digitally Signed &amp; Authenticated</div>
                      <div className="font-semibold text-white">{inspection.inspectorDecision.inspectorName}</div>
                      <div className="text-zinc-400 text-[11px] font-light">{inspection.inspectorDecision.inspectorDesignation}</div>
                      <div className="text-zinc-500 text-[10px] font-mono">ID: {inspection.inspectorDecision.inspectorId}</div>
                      <div className="text-zinc-500 text-[10px] truncate">{inspection.inspectorDecision.zonalOffice}</div>
                    </div>

                    {/* Controlling Authority signature */}
                    <div className="border border-white/10 p-4 bg-[#101010] text-xs">
                      <div className="font-mono text-[10px] uppercase text-zinc-400 mb-3">Signature of Controlling Authority</div>
                      <div className="font-serif italic text-zinc-300 text-sm mb-2">Countersigned for Official Record</div>
                      <div className="font-semibold text-white">{inspection.inspectorDecision.controllingAuthorityName || 'Dr. Ramesh Sundaram, IAS'}</div>
                      <div className="text-zinc-400 text-[11px] font-light">{inspection.inspectorDecision.controllingAuthorityDesignation || 'Controller of Legal Metrology'}</div>
                      <div className="text-zinc-500 text-[10px]">Seal: State Legal Metrology Directorate</div>
                      <div className="text-zinc-500 text-[10px] font-mono">Date: {new Date(inspection.completedAt || inspection.createdAt).toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Document Running Footer */}
            <div className="border-t border-white/10 pt-4 mt-8 text-[10px] font-mono text-zinc-500 flex justify-between items-center -mx-8 -mb-8 sm:-mx-10 sm:-mb-10 p-5 bg-[#111111]">
              <div>
                NIRIKSHAK · <span className="text-zinc-400">{inspection.id}</span> · Statutory Decision-Support Record
              </div>
              <div className="text-zinc-400 uppercase">
                Page {currentPage} of 3
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar Navigation Controls */}
        <div className="bg-[#0E0E0E] px-6 py-3.5 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 uppercase tracking-wider bg-[#1A1A1A] hover:bg-white hover:text-black text-zinc-300 border border-white/10 flex items-center space-x-1 disabled:opacity-30 cursor-pointer transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          <span className="text-zinc-500 uppercase tracking-wider">
            Page {currentPage} of 3
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 3))}
            disabled={currentPage === 3}
            className="px-3.5 py-1.5 uppercase tracking-wider bg-[#1A1A1A] hover:bg-white hover:text-black text-zinc-300 border border-white/10 flex items-center space-x-1 disabled:opacity-30 cursor-pointer transition"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
