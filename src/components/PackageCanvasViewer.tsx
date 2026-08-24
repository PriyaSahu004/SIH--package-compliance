import React, { useState } from 'react';
import { ExtractedField } from '../types/inspection';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Crosshair } from 'lucide-react';

interface PackageCanvasViewerProps {
  imageUrl: string;
  fields: ExtractedField[];
  selectedFieldId: string | null;
  hoveredFieldId: string | null;
  onSelectField: (fieldId: string) => void;
  productName?: string;
}

export const PackageCanvasViewer: React.FC<PackageCanvasViewerProps> = ({
  imageUrl,
  fields,
  selectedFieldId,
  hoveredFieldId,
  onSelectField,
  productName
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [showCoordinates, setShowCoordinates] = useState<boolean>(true);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden border border-[#D5D5D5] shadow-xs">
      {/* Control bar */}
      <div className="bg-[#17395F] px-3.5 py-2.5 border-b border-[#12304F] flex flex-wrap justify-between items-center text-xs text-white">
        <div className="flex items-center space-x-2 font-mono text-[11px] uppercase tracking-wider">
          <Crosshair className="w-3.5 h-3.5 text-[#E98A00]" />
          <span className="font-bold text-white">Evidence Canvas</span>
          {productName && <span className="text-slate-300 truncate max-w-[180px]">[{productName}]</span>}
        </div>

        <div className="flex items-center space-x-1.5 font-mono text-[10px]">
          <button
            onClick={() => setShowBoxes(!showBoxes)}
            className={`px-2 py-1 rounded-xs flex items-center space-x-1 transition cursor-pointer border ${
              showBoxes
                ? 'bg-[#E98A00] text-white font-semibold border-[#C67300]'
                : 'bg-[#12304F] text-slate-300 border-[#1E4875]'
            }`}
            title="Toggle OCR Bounding Boxes"
          >
            {showBoxes ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showBoxes ? 'Boxes ON' : 'Boxes OFF'}</span>
          </button>

          <button
            onClick={() => setShowCoordinates(!showCoordinates)}
            className={`px-2 py-1 rounded-xs transition cursor-pointer border ${
              showCoordinates
                ? 'bg-white text-[#17395F] font-semibold border-white'
                : 'bg-[#12304F] text-slate-300 border-[#1E4875]'
            }`}
            title="Toggle Label Tooltips"
          >
            Labels
          </button>

          <div className="h-4 w-px bg-white/20 mx-1" />

          <button
            onClick={handleZoomOut}
            className="p-1 bg-[#12304F] hover:bg-white hover:text-[#17395F] text-slate-200 rounded-xs transition cursor-pointer border border-[#1E4875]"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] text-slate-200 min-w-[32px] text-center font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-1 bg-[#12304F] hover:bg-white hover:text-[#17395F] text-slate-200 rounded-xs transition cursor-pointer border border-[#1E4875]"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 bg-[#12304F] hover:bg-white hover:text-[#17395F] text-slate-200 rounded-xs transition cursor-pointer border border-[#1E4875]"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image and SVG Overlay Stage */}
      <div className="relative flex-1 overflow-auto bg-[#1E293B] flex items-center justify-center p-4 min-h-[420px]">
        <div
          className="relative transition-transform duration-200 origin-center max-w-full"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Main Package Image */}
          <img
            src={imageUrl}
            alt="Package Commodity Evidence"
            className="max-h-[580px] w-auto object-contain shadow-2xl border border-slate-700 select-none pointer-events-none rounded-xs"
            referrerPolicy="no-referrer"
          />

          {/* Interactive Bounding Boxes Overlay */}
          {showBoxes && (
            <div className="absolute inset-0 z-10 pointer-events-auto">
              {fields.map((field) => {
                if (!field.boundingBox) return null;
                const { x, y, width, height, label } = field.boundingBox;
                const isSelected = selectedFieldId === field.id;
                const isHovered = hoveredFieldId === field.id;
                const isActive = isSelected || isHovered;

                // Color based on confidence or active state
                let boxBorderColor = 'border-white/70 bg-white/10 text-white';
                let tagBg = 'bg-[#17395F] text-white border border-white/30';

                if (field.confidence >= 90) {
                  boxBorderColor = 'border-emerald-400 bg-emerald-900/30 text-emerald-100';
                  tagBg = 'bg-[#15803D] text-white border border-emerald-300';
                } else if (field.confidence >= 70) {
                  boxBorderColor = 'border-amber-400 bg-amber-900/30 text-amber-100';
                  tagBg = 'bg-[#B45309] text-white border border-amber-300';
                } else {
                  boxBorderColor = 'border-rose-400 bg-rose-900/35 text-rose-100';
                  tagBg = 'bg-[#BE123C] text-white border border-rose-300';
                }

                if (isActive) {
                  boxBorderColor = 'border-[#E98A00] ring-2 ring-[#E98A00] bg-[#E98A00]/25 text-white z-20';
                  tagBg = 'bg-[#E98A00] text-white font-bold border-white shadow-md';
                }

                return (
                  <div
                    key={field.id}
                    onClick={() => onSelectField(field.id)}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: `${width}%`,
                      height: `${height}%`
                    }}
                    className={`absolute transition-all duration-150 cursor-pointer border ${boxBorderColor} ${
                      isActive ? 'scale-[1.02] shadow-xl' : 'hover:border-[#E98A00] hover:bg-white/20'
                    }`}
                  >
                    {/* Bounding Box Label Pill */}
                    {showCoordinates && (
                      <div
                        className={`absolute -top-4 left-0 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider truncate max-w-[140px] pointer-events-none rounded-xs ${tagBg}`}
                      >
                        {label || field.name} ({field.confidence}%)
                      </div>
                    )}

                    {/* Active highlight pulse animation */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E98A00] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E98A00]"></span>
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Info Legend */}
      <div className="bg-[#F7F8FA] px-3.5 py-2 border-t border-[#D5D5D5] flex flex-wrap justify-between items-center text-[10px] font-mono uppercase tracking-wider text-slate-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-600 inline-block rounded-xs" />
            <span className="text-slate-700 font-semibold">High Conf (&gt;90%)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-amber-600 inline-block rounded-xs" />
            <span className="text-slate-700 font-semibold">Review (70-89%)</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 bg-rose-600 inline-block rounded-xs" />
            <span className="text-slate-700 font-semibold">Low Conf (&lt;70%)</span>
          </span>
        </div>
        <div>
          <span className="text-slate-500">Crosshair inspection enabled</span>
        </div>
      </div>
    </div>
  );
};
