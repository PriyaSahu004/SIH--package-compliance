import React from 'react';
import { InspectionRecord } from '../types/inspection';
import {
  FileCheck2,
  AlertTriangle,
  XCircle,
  ScanText,
  Clock,
  PlusCircle,
  Eye,
  FileText,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

interface DashboardViewProps {
  inspections: InspectionRecord[];
  onStartNewInspection: () => void;
  onViewInspection: (inspection: InspectionRecord) => void;
  onOpenReport: (inspection: InspectionRecord) => void;
  onQuickDemo: (demoId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  inspections,
  onStartNewInspection,
  onViewInspection,
  onOpenReport,
  onQuickDemo
}) => {
  // Compute KPI Stats dynamically
  const totalCount = inspections.length;
  const compliantCount = inspections.filter((i) => i.finalStatus === 'POTENTIALLY_COMPLIANT').length;
  const reviewCount = inspections.filter((i) => i.finalStatus === 'NEEDS_REVIEW').length;
  const nonCompliantCount = inspections.filter((i) => i.finalStatus === 'POTENTIAL_NON_COMPLIANCE').length;

  const avgConfidence =
    totalCount > 0
      ? Math.round(inspections.reduce((acc, i) => acc + (i.overallConfidence || 90), 0) / totalCount)
      : 93;

  const avgProcTime =
    totalCount > 0
      ? (inspections.reduce((acc, i) => acc + (i.processingTimeSeconds || 2.4), 0) / totalCount).toFixed(1)
      : '2.4';

  // Chart 1: Status Distribution Data
  const statusPieData = [
    { name: 'Potentially Compliant', value: compliantCount || 8, color: '#15803D' },
    { name: 'Needs Review', value: reviewCount || 3, color: '#D97706' },
    { name: 'Potential Non-Compliance', value: nonCompliantCount || 1, color: '#DC2626' }
  ];

  // Chart 2: Most Frequently Flagged Declarations
  const flaggedDeclarationsData = [
    { name: 'Unit Sale Price (R-LM-009)', count: 9 },
    { name: 'Veg / Non-Veg Symbol (R-FD-003)', count: 7 },
    { name: 'Country of Origin (R-LM-004)', count: 4 },
    { name: 'Consumer Email Domain (R-LM-006)', count: 4 },
    { name: 'Date / Batch Skew (R-LM-005)', count: 2 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'POTENTIALLY_COMPLIANT':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
            POTENTIALLY COMPLIANT
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-300">
            <AlertTriangle className="w-3 h-3 mr-1 text-amber-600" />
            NEEDS REVIEW
          </span>
        );
      case 'POTENTIAL_NON_COMPLIANCE':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-semibold uppercase tracking-wider bg-rose-50 text-rose-800 border border-rose-300">
            <XCircle className="w-3 h-3 mr-1 text-rose-600" />
            NON-COMPLIANCE
          </span>
        );
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Quick Action */}
      <div className="bg-white border border-[#D5D5D5] p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-l-[#17395F]">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#17395F] font-mono">
              National Legal Metrology Surveillance Dashboard
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Act 2011 Compliance</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#17395F]">
            Inspector Operational Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1 leading-relaxed">
            Statutory packaging label verification workstation with automated OCR extraction, Legal Metrology rule validation, and decision-support reporting.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onStartNewInspection}
            className="px-5 py-2.5 bg-[#17395F] text-white hover:bg-[#12304F] text-xs font-semibold rounded-xs border border-[#12304F] transition-colors flex items-center space-x-2 shadow-xs cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>+ Start Inspection</span>
          </button>
        </div>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">Total Inspections</span>
            <div className="w-6 h-6 bg-slate-100 text-[#17395F] rounded flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#17395F] mt-2">{totalCount}</div>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mt-1">Active Records</div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between border-t-2 border-t-[#15803D]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#15803D]">Compliant</span>
            <div className="w-6 h-6 bg-emerald-50 text-[#15803D] rounded flex items-center justify-center">
              <FileCheck2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#15803D] mt-2">{compliantCount}</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider mt-1">
            {totalCount > 0 ? `${Math.round((compliantCount / totalCount) * 100)}% Pass Rate` : '—'}
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between border-t-2 border-t-[#D97706]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#B45309]">Needs Review</span>
            <div className="w-6 h-6 bg-amber-50 text-[#D97706] rounded flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#B45309] mt-2">{reviewCount}</div>
          <div className="text-[10px] text-amber-700 font-mono tracking-wider mt-1">Officer Check Advised</div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between border-t-2 border-t-[#DC2626]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#DC2626]">Violations</span>
            <div className="w-6 h-6 bg-rose-50 text-[#DC2626] rounded flex items-center justify-center">
              <XCircle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#DC2626] mt-2">{nonCompliantCount}</div>
          <div className="text-[10px] text-rose-700 font-mono tracking-wider mt-1">Statutory Non-Compliance</div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">Avg Confidence</span>
            <div className="w-6 h-6 bg-slate-100 text-[#17395F] rounded flex items-center justify-center">
              <ScanText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#17395F] mt-2">{avgConfidence}%</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider mt-1">OCR Accuracy Score</div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-4 border border-[#D5D5D5] shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600">Avg Latency</span>
            <div className="w-6 h-6 bg-slate-100 text-[#17395F] rounded flex items-center justify-center">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#17395F] mt-2">{avgProcTime}s</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-wider mt-1">Pipeline Speed</div>
        </div>
      </div>

      {/* Demonstration Scenarios Card */}
      <div className="bg-white border border-[#D5D5D5] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#17395F]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17395F]">
              Demonstration Scenarios // 1-Click Evaluation Matrix
            </h3>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">Pre-calibrated test cases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Demo 1 */}
          <div
            onClick={() => onQuickDemo('demo-juice')}
            className="p-4 border border-[#D5D5D5] bg-[#F7F8FA] hover:border-[#17395F] hover:bg-white transition cursor-pointer flex flex-col justify-between rounded-xs"
          >
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-sm text-[#17395F]">Scenario 1: FreshFarm Juice 1 L</span>
                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                  Compliant (93%)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Official reference package (INSP-2026-1012). Full declarations detected; unit price &amp; veg logo flagged for review.
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#15803D]">
              <span>Run Pipeline Demo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Demo 2 */}
          <div
            onClick={() => onQuickDemo('demo-biscuits')}
            className="p-4 border border-[#D5D5D5] bg-[#F7F8FA] hover:border-[#17395F] hover:bg-white transition cursor-pointer flex flex-col justify-between rounded-xs"
          >
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-sm text-[#17395F]">Scenario 2: NutriBake Biscuits 200g</span>
                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                  Review (84%)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Missing Unit Sale Price (₹/g) for packaged good &gt; 100g; optical defect in consumer email address.
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#B45309]">
              <span>Run Pipeline Demo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>

          {/* Demo 3 */}
          <div
            onClick={() => onQuickDemo('demo-rice')}
            className="p-4 border border-[#D5D5D5] bg-[#F7F8FA] hover:border-[#17395F] hover:bg-white transition cursor-pointer flex flex-col justify-between rounded-xs"
          >
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-bold text-sm text-[#17395F]">Scenario 3: Sona Masoori Rice 5kg</span>
                <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-rose-100 text-rose-800 border border-rose-300 uppercase">
                  Violation (74%)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Critical statutory omission: Missing mandatory Country of Origin statement (Rule 6(1)(n)) and consumer helpline.
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#DC2626]">
              <span>Run Pipeline Demo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart 1: Status Distribution */}
        <div className="bg-white p-5 border border-[#D5D5D5] shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17395F]">
              Compliance Status Breakdown
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">{totalCount} total records</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} inspections`, 'Count']}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D5D5D5', borderRadius: '2px', color: '#17395F', fontSize: '11px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={32}
                  iconType="circle"
                  formatter={(val) => <span className="text-xs text-slate-700">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Most Frequently Flagged Declarations */}
        <div className="bg-white p-5 border border-[#D5D5D5] shadow-xs lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#17395F]">
              Frequently Flagged Declarations
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Rule Infractions Matrix</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={flaggedDeclarationsData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748B' }} axisLine={{ stroke: '#CBD5E1' }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#334155' }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  width={190}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#D5D5D5', borderRadius: '2px', color: '#17395F', fontSize: '11px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' }}
                />
                <Bar dataKey="count" fill="#17395F" radius={[0, 2, 2, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Inspections Table */}
      <div className="bg-white border border-[#D5D5D5] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex justify-between items-center flex-wrap gap-2 bg-[#F7F8FA]">
          <div>
            <h3 className="text-sm font-bold text-[#17395F]">Recent Zonal Inspections</h3>
            <p className="text-xs text-slate-500">Live statutory registry of packaged commodity evaluations</p>
          </div>

          <button
            onClick={onStartNewInspection}
            className="text-xs font-semibold text-[#17395F] hover:text-[#12304F] flex items-center space-x-1 cursor-pointer"
          >
            <span>Run New Verification</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#EDF2F7] border-b border-[#D5D5D5] text-[#17395F] text-[10.5px] uppercase font-bold tracking-wider">
              <tr>
                <th className="p-3">Inspection ID</th>
                <th className="p-3">Commodity &amp; Brand</th>
                <th className="p-3">Inspector</th>
                <th className="p-3">Date</th>
                <th className="p-3">Compliance Status</th>
                <th className="p-3 text-center">Confidence</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {inspections.slice(0, 7).map((insp) => (
                <tr key={insp.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-mono font-bold text-[#17395F]">{insp.id}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{insp.productName}</div>
                    <div className="text-[10.5px] text-slate-500">{insp.category}</div>
                  </td>
                  <td className="p-3 text-slate-700">{insp.inspectorDecision.inspectorName}</td>
                  <td className="p-3 text-slate-600 font-mono text-[11px]">
                    {new Date(insp.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="p-3">{getStatusBadge(insp.finalStatus)}</td>
                  <td className="p-3 text-center font-mono font-bold text-slate-800">{insp.overallConfidence}%</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onViewInspection(insp)}
                        className="px-2.5 py-1 bg-white hover:bg-slate-100 text-[#17395F] border border-[#CBD5E1] rounded-xs text-[10px] uppercase font-semibold flex items-center space-x-1 cursor-pointer transition shadow-xs"
                        title="View Workspace"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => onOpenReport(insp)}
                        className="px-2.5 py-1 bg-[#17395F] hover:bg-[#12304F] text-white rounded-xs text-[10px] uppercase font-semibold flex items-center space-x-1 cursor-pointer transition shadow-xs"
                        title="Generate / View Report"
                      >
                        <FileText className="w-3 h-3" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
