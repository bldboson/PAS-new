import React, { useState, useEffect } from 'react';
import { DeedRecord, DeedImagePage } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface DeedViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  deed: DeedRecord | null;
  initialPageIndex?: number;
}

export const DeedViewerModal: React.FC<DeedViewerModalProps> = ({
  isOpen,
  onClose,
  deed,
  initialPageIndex = 0,
}) => {
  const { t, language } = useLanguage();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(initialPageIndex);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [showMeta, setShowMeta] = useState<boolean>(true);

  useEffect(() => {
    setCurrentPageIndex(initialPageIndex);
    setZoomLevel(1);
    setRotation(0);
  }, [deed, initialPageIndex, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
      if (e.key === 'ArrowRight' && deed && currentPageIndex < deed.pages.length - 1) {
        setCurrentPageIndex((p) => p + 1);
        setZoomLevel(1);
      }
      if (e.key === 'ArrowLeft' && currentPageIndex > 0) {
        setCurrentPageIndex((p) => p - 1);
        setZoomLevel(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, deed, currentPageIndex, onClose]);

  if (!isOpen || !deed) return null;

  const activePage = deed.pages[currentPageIndex] || deed.pages[0];

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.5));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = activePage.url;
    link.download = `Deed_${deed.deedNo.replace(/[/\\?%*:|"<>]/g, '_')}_Page_${activePage.pageNumber}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Deed #${deed.deedNo} - Page ${activePage.pageNumber}</title>
          <style>
            body { margin: 0; padding: 20px; display: flex; justify-content: center; background: #fff; }
            img { max-width: 100%; height: auto; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            @media print {
              body { padding: 0; }
              img { width: 100%; height: 100%; max-height: 100vh; object-fit: contain; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <img src="${activePage.url}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-60 bg-slate-950/95 flex flex-col motion-safe:animate-in motion-safe:fade-in duration-200">
      {/* Top Action Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white truncate">
                {language === 'bn' ? 'দলিল নং' : 'Deed No.'} {deed.deedNo}
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                {deed.deedType === 'saf_kobala'
                  ? 'Saf-Kobala'
                  : deed.deedType === 'mutation'
                  ? 'Mutation / Porcha'
                  : 'Baynanama'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate">
              {deed.mouza} &bull; {language === 'bn' ? 'দাগ নং' : 'Plot #'} {deed.dagNo} &bull; {deed.landArea}
            </p>
          </div>
        </div>

        {/* Center / Right Toolbar Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 text-slate-300">
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 text-xs font-mono font-bold hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Rotate */}
          <button
            onClick={handleRotate}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Rotate 90 degrees"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Print Current Deed Page"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="p-2 text-emerald-400 hover:text-white hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
            title="Download Deed Scan Image"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Toggle Metadata Drawer */}
          <button
            onClick={() => setShowMeta(!showMeta)}
            className={`hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
              showMeta
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'তথ্য প্যানেল' : 'Details'}</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-rose-600 rounded-lg transition-colors cursor-pointer ml-1 sm:ml-2"
            title="Close Viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Document Canvas Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center relative select-none">
          <div
            className="transition-transform duration-150 ease-out origin-center flex items-center justify-center shadow-2xl rounded-sm"
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              maxWidth: zoomLevel <= 1 ? '100%' : 'none',
              maxHeight: zoomLevel <= 1 ? '100%' : 'none',
            }}
          >
            <img
              src={activePage.url}
              alt={`${deed.deedNo} - Page ${activePage.pageNumber}`}
              className="max-h-[82vh] w-auto object-contain rounded bg-white shadow-2xl border border-slate-700 pointer-events-auto"
              draggable={false}
            />
          </div>

          {/* Bottom Floating Page Navigator */}
          {deed.pages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 shadow-xl text-white text-xs">
              <button
                disabled={currentPageIndex === 0}
                onClick={() => {
                  setCurrentPageIndex((p) => Math.max(0, p - 1));
                  setZoomLevel(1);
                }}
                className="p-1 rounded-full hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono font-bold px-2">
                {language === 'bn' ? 'পাতা' : 'Page'} {currentPageIndex + 1} / {deed.pages.length}
              </span>

              <button
                disabled={currentPageIndex === deed.pages.length - 1}
                onClick={() => {
                  setCurrentPageIndex((p) => Math.min(deed.pages.length - 1, p + 1));
                  setZoomLevel(1);
                }}
                className="p-1 rounded-full hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Metadata Drawer (Collapsible) */}
        {showMeta && (
          <aside className="w-80 bg-slate-900 border-l border-slate-800 p-5 overflow-y-auto text-white shrink-0 hidden md:block">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="font-semibold text-xs text-slate-400">
                {language === 'bn' ? 'দলিলের পূর্ণ তথ্য' : 'Legal Deed Info'}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {deed.status === 'mutation_completed'
                  ? 'Mutation Verified'
                  : deed.status === 'registered'
                  ? 'Registered'
                  : 'Under Process'}
              </span>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  {language === 'bn' ? 'দলিল নম্বর' : 'Deed Number'}
                </label>
                <p className="font-mono font-bold text-emerald-400 text-sm">
                  {deed.deedNo}
                </p>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  {language === 'bn' ? 'রেজিস্ট্রি তারিখ ও অফিস' : 'Registration Date & Office'}
                </label>
                <p className="font-semibold text-slate-200">{deed.deedDate}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{deed.registryOffice}</p>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2">
                <span className="font-semibold text-emerald-300 text-[11px] block">
                  {language === 'bn' ? 'তফসিল পরিচয় (Land Schedule)' : 'Land Schedule'}
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'মৌজা' : 'Mouza'}:</span>
                    <strong className="text-slate-200">{deed.mouza}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'দাগ নং' : 'Dag / Plot'}:</span>
                    <strong className="text-emerald-400 font-mono">{deed.dagNo}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'খতিয়ান নং' : 'Khatian'}:</span>
                    <strong className="text-slate-200">
                      {deed.khatianNo.bs || deed.khatianNo.rs || deed.khatianNo.cs || '-'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'bn' ? 'জমির পরিমাণ' : 'Area'}:</span>
                    <strong className="text-amber-300">{deed.landArea}</strong>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  {language === 'bn' ? 'ক্রেতা (সমিতি)' : 'Buyer (Society)'}
                </label>
                <p className="font-medium text-slate-200">{deed.buyerName}</p>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  {language === 'bn' ? 'দাতা / বিক্রেতা' : 'Seller / Donor'}
                </label>
                <p className="font-medium text-slate-300">{deed.sellerName}</p>
              </div>

              {deed.totalValueTaka > 0 && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">
                    {language === 'bn' ? 'দলিলের রেজিস্ট্রি মূল্য' : 'Deed Valuation'}
                  </label>
                  <p className="font-mono font-bold text-emerald-400 text-sm">
                    Tk. {deed.totalValueTaka.toLocaleString('en-IN')}
                  </p>
                </div>
              )}

              {deed.mutationCaseNo && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">
                    {language === 'bn' ? 'নামজারি / মিউটেশন কেস' : 'Mutation Case Ref'}
                  </label>
                  <p className="text-slate-300 font-medium">{deed.mutationCaseNo}</p>
                </div>
              )}

              {deed.khajnaUpdatedYear && (
                <div>
                  <label className="text-[11px] text-slate-400 block mb-0.5">
                    {language === 'bn' ? 'খাজনা ও দাখিলা' : 'Tax Assessment'}
                  </label>
                  <p className="text-slate-300">{deed.khajnaUpdatedYear}</p>
                </div>
              )}

              {deed.notes && (
                <div className="pt-2 border-t border-slate-800">
                  <label className="text-[11px] text-slate-400 block mb-0.5">
                    {language === 'bn' ? 'বিশেষ মন্তব্য' : 'Remarks'}
                  </label>
                  <p className="text-slate-400 text-[11px] leading-relaxed italic">
                    "{deed.notes}"
                  </p>
                </div>
              )}

              {/* Thumbnails of All Pages */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                  {language === 'bn' ? 'সকল পাতা' : 'All Deed Pages'} ({deed.pages.length})
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {deed.pages.map((p: DeedImagePage, idx: number) => (
                    <button
                      key={p.pageNumber}
                      onClick={() => {
                        setCurrentPageIndex(idx);
                        setZoomLevel(1);
                      }}
                      className={`relative rounded-md overflow-hidden border-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer aspect-3/4 bg-white ${
                        currentPageIndex === idx
                          ? 'border-emerald-500 ring-2 ring-emerald-500/50 scale-102'
                          : 'border-slate-700 opacity-60 hover:opacity-100 hover:border-slate-500'
                      }`}
                    >
                      <img
                        src={p.url}
                        alt={`Page ${p.pageNumber}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-slate-900/90 text-white font-mono text-[9px] px-1 rounded">
                        P{p.pageNumber}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

