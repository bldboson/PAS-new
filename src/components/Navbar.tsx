import React, { useRef } from 'react';
import { Plus, Download, Printer, RotateCcw, FileSpreadsheet, RefreshCw, Lock, LogOut, ShieldCheck, Sun, Moon, Database, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { TextureButton } from './ui/texture-button';

interface NavbarProps {
  onOpenRecordPayment?: () => void;
  onOpenAddShare: () => void;
  onExportCSV: () => void;
  onExportJSON?: () => void;
  onImportJSON?: (file: File) => void;
  onPrint: () => void;
  onResetData: () => void;
  isSheetConnected: boolean;
  isSyncing: boolean;
  sheetTitle?: string;
  onOpenSyncModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRecordPayment,
  onOpenAddShare,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onPrint,
  onResetData,
  isSheetConnected,
  isSyncing,
  sheetTitle,
  onOpenSyncModal,
}) => {
  const { isAdmin, logout, openLoginModal } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const jsonInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white sticky top-0 z-30 shadow-lg shadow-slate-950/20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          {/* Logo & Society Title */}
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shadow-md shadow-emerald-950/50 ring-2 ring-emerald-500/30 overflow-hidden shrink-0">
              <img
                src="/logo.png"
                alt="Progressive Association Society Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg tracking-tight text-white">
                  {t('societyName')}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                  {t('fundPortal')}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium tracking-wide">
                {t('portalSubtitle')}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            {/* Fast Language Toggle (EN | বাংলা) */}
            <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-95 disabled:opacity-50 ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-95 disabled:opacity-50 ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="বাংলা ভাষায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>

            {/* Theme Toggle (Light | Dark) - Icons Only */}
            <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setTheme('forest-light')}
                className={`p-1.5 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-95 disabled:opacity-50 ${
                  theme === 'forest-light'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'লাইট থিম' : 'Light Theme'}
                aria-label={language === 'bn' ? 'লাইট থিম' : 'Light Theme'}
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTheme('forest-dark')}
                className={`p-1.5 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none active:scale-95 disabled:opacity-50 ${
                  theme === 'forest-dark'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'ডার্ক থিম' : 'Dark Theme'}
                aria-label={language === 'bn' ? 'ডার্ক থিম' : 'Dark Theme'}
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Google Sheet Sync Button */}
            <div className="w-auto">
              <TextureButton
                variant={isSheetConnected ? "emerald" : "minimal"}
                size="sm"
                onClick={onOpenSyncModal}
                className="w-auto"
                title={
                  isSheetConnected
                    ? `Connected to Google Sheet: ${sheetTitle || 'Live'}. Click to manage sync.`
                    : 'Connect Google Sheet for two-way synchronization'
                }
              >
                {isSyncing ? (
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                ) : (
                  <FileSpreadsheet className={`w-3.5 h-3.5 ${isSheetConnected ? 'text-white' : 'text-emerald-500'}`} />
                )}
                <span>{isSheetConnected ? t('sheetSynced') : t('syncSheet')}</span>
                {isSheetConnected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse motion-reduce:animate-none ml-0.5" />
                )}
              </TextureButton>
            </div>

            <div className="w-auto">
              <TextureButton
                variant="primary"
                size="sm"
                onClick={onOpenAddShare}
                className="w-auto"
                title="Add a new share or member"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('addShare')}</span>
              </TextureButton>
            </div>

            <div className="w-auto">
              <TextureButton
                variant="minimal"
                size="sm"
                onClick={onExportCSV}
                className="w-auto"
                title="Export current ledger to CSV / Excel spreadsheet"
              >
                <Download className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">{t('export')}</span>
              </TextureButton>
            </div>

            <div className="w-auto">
              <TextureButton
                variant="minimal"
                size="sm"
                onClick={onPrint}
                className="w-auto"
                title="Print dashboard summary and ledger report"
              >
                <Printer className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">{t('print')}</span>
              </TextureButton>
            </div>

            {/* Offline JSON Backup */}
            {onExportJSON && (
              <div className="w-auto">
                <TextureButton
                  variant="minimal"
                  size="sm"
                  onClick={onExportJSON}
                  className="w-auto"
                  title="Download offline JSON backup file (অফলাইন ব্যাকআপ)"
                >
                  <Database className="w-3.5 h-3.5 text-teal-500" />
                  <span className="hidden sm:inline">Backup</span>
                </TextureButton>
              </div>
            )}

            {/* Offline JSON Restore */}
            {onImportJSON && (
              <>
                <input
                  type="file"
                  ref={jsonInputRef}
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImportJSON(file);
                      e.target.value = '';
                    }
                  }}
                />
                <div className="w-auto">
                  <TextureButton
                    variant="minimal"
                    size="sm"
                    onClick={() => jsonInputRef.current?.click()}
                    className="w-auto"
                    title="Restore data from offline JSON backup (ব্যাকআপ রিস্টোর)"
                  >
                    <Upload className="w-3.5 h-3.5 text-teal-500" />
                    <span className="hidden sm:inline">Restore</span>
                  </TextureButton>
                </div>
              </>
            )}

            <div className="w-auto">
              <TextureButton
                variant="icon"
                size="icon"
                onClick={onResetData}
                className="w-7 h-7"
                title="Reset data back to original Excel sheet state"
              >
                <RotateCcw className="w-3 h-3 text-slate-400 group-hover:text-rose-400" />
              </TextureButton>
            </div>

            {/* Admin Login / Logout Indicator */}
            {isAdmin ? (
              <div className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('admin')}</span>
                </span>
                <TextureButton
                  variant="icon"
                  size="icon"
                  onClick={logout}
                  className="w-6 h-6"
                  title="Logout from Admin Mode"
                >
                  <LogOut className="w-3 h-3 text-slate-300 group-hover:text-rose-300" />
                </TextureButton>
              </div>
            ) : (
              <div className="w-auto">
                <TextureButton
                  variant="secondary"
                  size="sm"
                  onClick={() => openLoginModal()}
                  className="w-auto"
                  title="Log in with admin credentials to edit, delete, sync, add share, or print"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('adminLogin')}</span>
                </TextureButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
