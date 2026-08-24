import React, { useState } from 'react';
import { ExtractedField } from '../types/inspection';
import { Check, Edit3, X, CheckCircle2, Crosshair, AlertCircle } from 'lucide-react';

interface DeclarationFieldCardProps {
  field: ExtractedField;
  isSelected: boolean;
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onUpdateField: (updatedField: ExtractedField) => void;
}

export const DeclarationFieldCard: React.FC<DeclarationFieldCardProps> = ({
  field,
  isSelected,
  onSelect,
  onHoverStart,
  onHoverEnd,
  onUpdateField
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(field.correctedValue || field.extractedValue);
  const [notes, setNotes] = useState<string>(field.fieldNotes || '');

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateField({
      ...field,
      correctedValue: editValue.trim() === field.extractedValue.trim() ? null : editValue.trim(),
      isVerified: true,
      fieldNotes: notes.trim() || undefined
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditValue(field.correctedValue || field.extractedValue);
    setIsEditing(false);
  };

  const toggleVerify = () => {
    onUpdateField({
      ...field,
      isVerified: !field.isVerified,
      isRejected: false
    });
  };

  const toggleReject = () => {
    onUpdateField({
      ...field,
      isRejected: !field.isRejected,
      isVerified: false
    });
  };

  // Confidence styling
  let confColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  if (field.confidence < 70) {
    confColor = 'bg-rose-50 text-rose-800 border-rose-300';
  } else if (field.confidence < 90) {
    confColor = 'bg-amber-50 text-amber-800 border-amber-300';
  }

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`p-3.5 border transition-all duration-150 cursor-pointer rounded-xs shadow-xs ${
        isSelected
          ? 'bg-amber-50/50 border-[#17395F] shadow-sm ring-1 ring-[#17395F]'
          : field.isRejected
          ? 'bg-rose-50/50 border-rose-300'
          : field.isVerified
          ? 'bg-emerald-50/40 border-emerald-300'
          : 'bg-white border-[#D5D5D5] hover:border-[#17395F]'
      }`}
    >
      {/* Card Header: Field Name, Rule ID, Confidence */}
      <div className="flex justify-between items-start gap-2 mb-2">
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="font-bold text-sm text-[#17395F]">{field.name}</span>
          {field.mandatoryRuleId && (
            <span className="px-1.5 py-0.2 text-[9.5px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-300 rounded-xs font-semibold">
              {field.mandatoryRuleId}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-1.5 shrink-0">
          <span
            className={`px-1.5 py-0.5 text-[9.5px] font-mono uppercase tracking-wider border rounded-xs font-bold ${confColor}`}
            title={`Optical Confidence: ${field.confidence}%`}
          >
            {field.confidence}% Conf.
          </span>

          {field.boundingBox && (
            <span className="p-0.5 text-slate-400 hover:text-[#17395F]" title="Visual Bounding Box Mapped">
              <Crosshair className="w-3.5 h-3.5 text-[#17395F]" />
            </span>
          )}
        </div>
      </div>

      {/* Extracted vs Corrected Values */}
      {!isEditing ? (
        <div className="space-y-2 text-xs">
          <div className="bg-[#F7F8FA] p-2.5 border border-[#E2E8F0] rounded-xs">
            <span className="text-[9.5px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
              Extracted Optical String:
            </span>
            <span
              className={`font-mono text-xs ${
                field.extractedValue.includes('missing') || field.extractedValue.includes('Not detected')
                  ? 'text-rose-700 font-bold'
                  : 'text-slate-800'
              }`}
            >
              {field.extractedValue || '<Not Detected>'}
            </span>
          </div>

          {field.correctedValue && (
            <div className="bg-amber-50 p-2.5 border border-amber-300 rounded-xs text-amber-900">
              <span className="text-[9.5px] uppercase font-bold tracking-wider text-amber-800 block mb-0.5">
                Officer Rectified Value:
              </span>
              <span className="font-mono text-xs font-bold text-amber-950">{field.correctedValue}</span>
            </div>
          )}

          {field.fieldNotes && (
            <p className="text-[11px] text-slate-600 italic bg-slate-50 p-1.5 border border-slate-200 rounded-xs">
              Officer Observation: {field.fieldNotes}
            </p>
          )}

          {/* Action Row for Human Inspector */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-white hover:bg-slate-100 text-[#17395F] border border-[#CBD5E1] rounded-xs flex items-center space-x-1 cursor-pointer transition shadow-xs"
              >
                <Edit3 className="w-3 h-3" />
                <span>Rectify</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-wider">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleReject();
                }}
                className={`px-2.5 py-1 transition cursor-pointer border rounded-xs font-bold ${
                  field.isRejected
                    ? 'bg-rose-100 text-rose-800 border-rose-400'
                    : 'bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border-slate-300'
                }`}
              >
                {field.isRejected ? 'Rejected' : 'Reject'}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVerify();
                }}
                className={`px-2.5 py-1 flex items-center space-x-1 transition cursor-pointer border rounded-xs font-bold ${
                  field.isVerified
                    ? 'bg-[#15803D] text-white border-[#15803D]'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>{field.isVerified ? 'Verified [✓]' : 'Verify'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode Form */
        <form onSubmit={handleSaveEdit} className="space-y-2 text-xs" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Officer Corrected / Standardized Value:
            </label>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-mono border border-[#CBD5E1] bg-white text-slate-900 rounded-xs focus:border-[#17395F] focus:outline-none"
              placeholder="Enter corrected value"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Verification Observation Note:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-2.5 py-1 text-xs border border-[#CBD5E1] bg-white text-slate-800 rounded-xs focus:border-[#17395F] focus:outline-none"
              placeholder="e.g. Verified physically against master packaging register"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-1 font-mono text-[10px] uppercase tracking-wider">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-600 cursor-pointer border border-[#CBD5E1] rounded-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-[#17395F] text-white hover:bg-[#12304F] font-bold flex items-center space-x-1 cursor-pointer rounded-xs"
            >
              <Check className="w-3 h-3" />
              <span>Apply &amp; Verify</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
