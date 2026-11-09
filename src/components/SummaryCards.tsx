import React from 'react';
import { SocietySummary } from '../types';
import { formatTaka } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import { Users, Landmark, AlertCircle, TrendingUp } from 'lucide-react';

interface SummaryCardsProps {
  summary: SocietySummary;
  onFilterOverdue?: () => void;
  onFilterAll?: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  summary,
  onFilterOverdue,
  onFilterAll,
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
      {/* 1. Total Active Shares */}
      <div
        onClick={onFilterAll}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFilterAll?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Filter all active shares"
        className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden transition-colors duration-200 relative overflow-hidden group cursor-pointer flex flex-col justify-between"
      >
        {/* Full Card Background Illustration with 25% (normal) / 30% (hover) Opacity */}
        <img
          src="/images/card-shares.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-25 transition-opacity duration-300 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/50 pointer-events-none" />

        <div>
          <div className="relative z-10 flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('totalActiveShares')}
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center shadow-2xs">
              <Users className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="relative z-10 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-mono">
              {summary.totalActiveShares}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{t('sharesEnrolled')}</span>
          </div>
        </div>

        <div className="relative z-10 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {summary.totalMembers} {t('members')}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100/90 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold font-mono">
            32 {t('totalAllottedIds')}
          </span>
        </div>
      </div>

      {/* 2. Total Bank Deposit */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-3.5 sm:p-4 shadow-xs hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200 relative overflow-hidden group flex flex-col justify-between">
        {/* Full Card Background Illustration with 25% (normal) / 30% (hover) Opacity */}
        <img
          src="/images/card-deposit.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-25 transition-opacity duration-300 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/50 pointer-events-none" />

        <div>
          <div className="relative z-10 flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('totalFundDeposited')}
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center shadow-2xs">
              <Landmark className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="relative z-10 flex items-baseline gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight font-mono">
              {formatTaka(summary.totalBankDeposit)}
            </span>
            <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
              <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> {t('verified')}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-500 dark:text-slate-400">{t('admissionFee')}:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{formatTaka(summary.totalAdmissionCollected)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-500 dark:text-slate-400">{t('monthlyInstallments')}:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{formatTaka(summary.totalMonthlyCollected)}</span>
          </div>
        </div>
      </div>

      {/* 3. Total Outstanding Due */}
      <div
        onClick={onFilterOverdue}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onFilterOverdue?.();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Filter overdue shares"
        className={`bg-white dark:bg-slate-900 rounded-xl border p-3.5 sm:p-4 shadow-xs hover:shadow-md transition-colors duration-200 relative overflow-hidden group cursor-pointer flex flex-col justify-between focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-hidden ${
          summary.totalOutstandingDue > 0
            ? 'border-amber-300 dark:border-amber-500/50 ring-1 ring-amber-300/40 dark:ring-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400'
            : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        {/* Full Card Background Illustration with 25% (normal) / 30% (hover) Opacity */}
        <img
          src="/images/card-dues.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 group-hover:opacity-30 dark:opacity-20 dark:group-hover:opacity-25 transition-opacity duration-300 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/50 pointer-events-none" />

        <div>
          <div className="relative z-10 flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t('totalOutstandingDues')}
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 flex items-center justify-center shadow-2xs">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="relative z-10 flex items-baseline gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 tracking-tight font-mono whitespace-nowrap">
              {formatTaka(summary.totalOutstandingDue)}
            </span>
            {summary.totalDueMonths > 0 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 whitespace-nowrap">
                {summary.totalDueMonths} {t('monthsOverdue')}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-500 dark:text-slate-400">{t('principalDue')}:</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{formatTaka(summary.totalDuePrincipal)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-slate-500 dark:text-slate-400">{t('lateFeeFine')}:</span>
            <span className="font-bold text-rose-700 dark:text-rose-400 font-mono">+{formatTaka(summary.totalLateFeeDue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
