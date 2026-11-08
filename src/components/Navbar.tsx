import { Plus, Download, Printer, RotateCcw, CreditCard, FileSpreadsheet, RefreshCw, Lock, LogOut, ShieldCheck, Languages, Palette, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenRecordPayment: () => void;
  onOpenAddShare: () => void;
  onExportCSV: () => void;
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
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors duration-150 cursor-pointer ${
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
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-colors duration-150 cursor-pointer ${
                  language === 'bn'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="বাংলা ভাষায় পরিবর্তন করুন"
              >
                বাংলা
              </button>
            </div>

            {/* 3-Theme Switcher (Classic | White | Dark) */}
            <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setTheme('classic')}
                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors duration-150 cursor-pointer ${
                  theme === 'classic'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'মূল ক্ল্যাসিক থিম' : 'Classic Slate Theme'}
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'ক্ল্যাসিক' : 'Classic'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('forest-light')}
                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors duration-150 cursor-pointer ${
                  theme === 'forest-light'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'হোয়াইট ফরেস্ট থিম' : 'White Forest Theme'}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'হোয়াইট' : 'White'}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('forest-dark')}
                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors duration-150 cursor-pointer ${
                  theme === 'forest-dark'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={language === 'bn' ? 'ডার্ক ফরেস্ট থিম' : 'Dark Forest Theme'}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'bn' ? 'ডার্ক' : 'Dark'}</span>
              </button>
            </div>

            {/* Google Sheet Sync Button */}
            <button
              onClick={onOpenSyncModal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-150 cursor-pointer ${
                isSheetConnected
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-900/60 shadow-xs'
                  : 'bg-emerald-600/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/25'
              }`}
              title={
                isSheetConnected
                  ? `Connected to Google Sheet: ${sheetTitle || 'Live'}. Click to manage sync.`
                  : 'Connect Google Sheet for two-way synchronization'
              }
            >
              {isSyncing ? (
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
              ) : (
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{isSheetConnected ? t('sheetSynced') : t('syncSheet')}</span>
              {isSheetConnected && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none ml-0.5" />
              )}
            </button>

            <button
              onClick={onOpenRecordPayment}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-950/30 transition-colors duration-150 cursor-pointer"
              title="Record member installment or admission fee"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>{t('recordPayment')}</span>
            </button>

            <button
              onClick={onOpenAddShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors duration-150 hover:text-white cursor-pointer"
              title="Add a new share or member"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('addShare')}</span>
            </button>

            <button
              onClick={onExportCSV}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors duration-150 hover:text-white cursor-pointer"
              title="Export current ledger to CSV / Excel spreadsheet"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{t('export')}</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/80 transition-colors duration-150 hover:text-white cursor-pointer"
              title="Print dashboard summary and ledger report"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{t('print')}</span>
            </button>

            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs font-medium border border-slate-700/80 hover:border-rose-800/60 transition-colors duration-150 cursor-pointer"
              title="Reset data back to original Excel sheet state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Admin Login / Logout Indicator */}
            {isAdmin ? (
              <div className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('admin')}</span>
                </span>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 text-xs font-medium transition-colors duration-150 cursor-pointer"
                  title="Logout from Admin Mode"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openLoginModal()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-colors duration-150 cursor-pointer"
                title="Log in with admin credentials to edit, delete, sync, add share, or print"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('adminLogin')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
