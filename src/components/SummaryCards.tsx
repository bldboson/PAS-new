import React from 'react';
import { SocietySummary } from '../types';
import { formatTaka, getPenaltyStage } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import { Users, Landmark, AlertCircle, TrendingUp, Clock } from 'lucide-react';

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
  const penaltyStage = getPenaltyStage();
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {/* 1. Total Active Shares */}
      <div
        onClick={onFilterAll}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-colors duration-200 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:opacity-80 transition-opacity motion-reduce:transition-none" />
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-500">
            {t('totalActiveShares')}
          </span>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
            {summary.totalActiveShares}
          </span>
          <span className="text-xs font-bold text-slate-500">{t('sharesEnrolled')}</span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <span className="font-semibold text-slate-700">
            {summary.totalMembers} {t('members')}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold font-mono">
            32 {t('totalAllottedIds')}
          </span>
        </div>
      </div>

      {/* 2. Total Bank Deposit */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-colors duration-200 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:opacity-80 transition-opacity motion-reduce:transition-none" />
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-500">
            {t('totalFundDeposited')}
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight font-mono">
            {formatTaka(summary.totalBankDeposit)}
          </span>
          <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
            <TrendingUp className="w-3 h-3 mr-0.5" /> {t('verified')}
          </span>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t('admissionFee')}:</span>
            <span className="font-bold text-slate-800 font-mono">{formatTaka(summary.totalAdmissionCollected)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t('monthlyInstallments')}:</span>
            <span className="font-bold text-slate-800 font-mono">{formatTaka(summary.totalMonthlyCollected)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>{t('lateFeeRealized')}:</span>
            <span className="font-medium font-mono">{formatTaka(summary.totalLateFeeCollected)}</span>
          </div>
        </div>
      </div>

      {/* 3. Total Outstanding Due */}
      <div
        onClick={onFilterOverdue}
        className={`bg-white rounded-2xl border p-5 shadow-xs hover:shadow-md transition-colors duration-200 relative overflow-hidden group cursor-pointer ${
          summary.totalOutstandingDue > 0
            ? 'border-amber-300 ring-1 ring-amber-300/40 hover:border-amber-400'
            : 'border-slate-200/90 hover:border-slate-300'
        }`}
      >
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:opacity-80 transition-opacity motion-reduce:transition-none" />
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-500">
            {t('totalOutstandingDues')}
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-2xl sm:text-3xl font-black text-amber-700 tracking-tight font-mono whitespace-nowrap">
            {formatTaka(summary.totalOutstandingDue)}
          </span>
          {summary.totalDueMonths > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              {summary.totalDueMonths} {t('monthsOverdue')}
            </span>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t('principalDue')}:</span>
            <span className="font-bold text-slate-800 font-mono">{formatTaka(summary.totalDuePrincipal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">{t('lateFeeFine')}:</span>
            <span className="font-bold text-rose-700 font-mono">+{formatTaka(summary.totalLateFeeDue)}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{t('policyStage')}:</span>
            </span>
            <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
              penaltyStage.stage === 1
                ? 'bg-emerald-100 text-emerald-800'
                : penaltyStage.stage === 2
                ? 'bg-amber-100 text-amber-900'
                : 'bg-rose-100 text-rose-900'
            }`}>
              {penaltyStage.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
