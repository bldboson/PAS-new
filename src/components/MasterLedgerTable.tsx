import React, { useState } from 'react';
import { ShareRecord, MonthKey, ALL_MONTHS, SocietySummary } from '../types';
import { formatTaka, getPenaltyStage } from '../utils/calculations';
import { CalculationBreakdownModal } from './CalculationBreakdownModal';
import {
  Receipt,
  CreditCard,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  SlidersHorizontal,
  ChevronLeft,
  Calendar,
  Layers,
  Calculator,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface MasterLedgerTableProps {
  shares: ShareRecord[];
  summary: SocietySummary;
  onOpenPaymentForShare: (share: ShareRecord, month?: MonthKey) => void;
  onOpenReceiptForShare: (share: ShareRecord, month?: MonthKey) => void;
  onSelectMember: (memberName: string) => void;
  onDeleteShare?: (shareId: string) => void;
  // Month Configuration & Display Props
  allConfiguredMonths: string[];
  activeMonths: string[];
  currentMonth: string;
  onOpenMonthSettings: () => void;
}

export const MasterLedgerTable: React.FC<MasterLedgerTableProps> = ({
  shares,
  summary,
  onOpenPaymentForShare,
  onOpenReceiptForShare,
  onSelectMember,
  onDeleteShare,
  allConfiguredMonths,
  activeMonths,
  currentMonth,
  onOpenMonthSettings,
}) => {
  const { requireAdmin } = useAuth();
  const { t } = useLanguage();
  const [shareToDelete, setShareToDelete] = useState<ShareRecord | null>(null);
  const [breakdownShare, setBreakdownShare] = useState<ShareRecord | null>(null);

  const currentPenaltyStage = getPenaltyStage();

  // Determine if months exceed 4 to apply horizontal scrolling specifically to the months section
  const isMonthScrollActive = activeMonths.length > 4;
  const isCurrentMonthOnly = activeMonths.length === 1 && activeMonths[0] === currentMonth;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table toolbar / header info */}
      <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>{t('ledgerTitle')}</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                {shares.length} {t('records')}
              </span>
            </h2>
          </div>
        </div>

        {/* Setting Button & Month Visibility Status */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Active Penalty Stage Badge */}
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border cursor-pointer hover:opacity-90 shadow-2xs ${
              currentPenaltyStage.stage === 1
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : currentPenaltyStage.stage === 2
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
            title={`${currentPenaltyStage.description} — Click on any Due/Fee cell in the table to see the full calculation breakdown.`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                currentPenaltyStage.stage === 1
                  ? 'bg-emerald-500'
                  : currentPenaltyStage.stage === 2
                  ? 'bg-amber-500'
                  : 'bg-rose-500 animate-pulse motion-reduce:animate-none'
              }`}
            />
            <span>{currentPenaltyStage.badge}</span>
          </div>

          {isCurrentMonthOnly ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse motion-reduce:animate-none" />
              <span>{t('currentMonth')}: <strong>{currentMonth}</strong></span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Active: {activeMonths.join(', ')}</span>
            </div>
          )}

          {/* Month Configuration Button */}
          <button
            type="button"
            onClick={() => {
              requireAdmin(() => {
                onOpenMonthSettings();
              }, 'configure ledger months and display settings');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 hover:border-slate-400 text-xs font-bold shadow-2xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
            title="Configure billing months: Add, remove, hide, or focus on current month"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('monthSettings')}</span>
            {isMonthScrollActive && (
              <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px]">
                Scroll
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Multi-tier Table Head */}
          <thead className="bg-slate-100 text-slate-700 border-b border-slate-300 font-semibold select-none">
            {/* Top row */}
            <tr>
              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 w-10 text-center bg-slate-100 sticky left-0 z-10">
                {t('colSl')}
              </th>
              <th rowSpan={2} className="px-2.5 py-2.5 border-r border-slate-300 min-w-[130px] lg:min-w-[160px] sticky left-10 z-10 bg-slate-100">
                {t('colMemberName')}
              </th>
              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 text-center min-w-[70px]">
                {t('colShareId')}
              </th>
              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 text-right min-w-[75px] bg-slate-50">
                {t('colAdmissionFee')}
              </th>

              {/* Month Columns Groups - Only displays activeMonths */}
              {activeMonths.map((m) => {
                const isCurrent = m === currentMonth;
                return (
                  <th
                    key={m}
                    colSpan={2}
                    className={`px-1.5 py-1.5 border-r border-slate-300 text-center font-bold transition-colors ${
                      isCurrent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200/70 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>{m}</span>
                      {isCurrent && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 text-white font-semibold">
                          {t('currentMonth')}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}

              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 text-right min-w-[80px] bg-emerald-50/70 text-emerald-900 font-bold">
                {t('colTotalDeposit')}
              </th>
              <th rowSpan={2} className="px-1.5 py-2.5 border-r border-slate-300 text-center min-w-[50px] bg-amber-50/40">
                {t('colDueMths')}
              </th>
              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 text-right min-w-[75px] bg-amber-50/70 text-amber-900">
                {t('colDueAmount')}
              </th>
              <th rowSpan={2} className="px-1.5 py-2.5 border-r border-slate-300 text-right min-w-[65px] bg-rose-50/50 text-rose-900">
                {t('colLateFeeFine')}
              </th>
              <th rowSpan={2} className="px-2 py-2.5 border-r border-slate-300 text-right min-w-[75px] bg-rose-100/70 text-rose-950 font-bold">
                {t('colTotalDue')}
              </th>
              <th rowSpan={2} className="px-1.5 py-2.5 border-r border-slate-300 text-center min-w-[60px]">
                {t('colLateFeePaid')}
              </th>
              <th rowSpan={2} className="px-2 py-2.5 text-center min-w-[80px]">
                {t('colActions')}
              </th>
            </tr>

            {/* Sub-row for Date & Amount */}
            <tr className="border-t border-slate-200 text-xs text-slate-600 bg-slate-50">
              {activeMonths.map((m) => (
                <React.Fragment key={`${m}-sub`}>
                  <th className="px-2 py-1.5 border-r border-slate-200 text-center font-medium w-16">
                    {t('colDate')}
                  </th>
                  <th className="px-2 py-1.5 border-r border-slate-300 text-right font-medium w-16">
                    {t('colAmount')}
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 text-slate-800 font-mono">
            {shares.map((share, idx) => {
              const hasDue = share.dueMonths > 0;
              const isClosed = share.isClosed;

              return (
                <tr
                  key={`${share.id}-${idx}`}
                  className={`hover:bg-blue-50/40 transition-colors ${
                    isClosed
                      ? 'bg-slate-100/60 text-slate-500'
                      : hasDue
                      ? 'bg-amber-50/30'
                      : idx % 2 === 1
                      ? 'bg-slate-50/30'
                      : 'bg-white'
                  }`}
                >
                  {/* SL */}
                  <td
                    className={`px-2 py-2 border-r border-slate-200 text-center font-sans text-slate-500 sticky left-0 z-10 ${
                      isClosed
                        ? 'bg-slate-100'
                        : hasDue
                        ? 'bg-amber-50'
                        : idx % 2 === 1
                        ? 'bg-slate-50'
                        : 'bg-white'
                    }`}
                  >
                    {share.sl || '-'}
                  </td>

                  {/* Member Name */}
                  <td
                    className={`px-3 py-2 border-r border-slate-200 font-sans font-bold text-sm text-slate-900 sticky left-10 z-10 ${
                      isClosed
                        ? 'bg-slate-100'
                        : hasDue
                        ? 'bg-amber-50'
                        : idx % 2 === 1
                        ? 'bg-slate-50'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 group">
                      <button
                        onClick={() => !isClosed && onSelectMember(share.memberName)}
                        className={`text-left hover:text-emerald-700 transition-colors truncate max-w-[170px] ${
                          isClosed ? 'text-slate-400 italic font-normal' : 'text-slate-900 font-bold'
                        }`}
                        title={share.memberName}
                      >
                        {share.memberName || '—'}
                      </button>
                      {!isClosed && (
                        <button
                          onClick={() => onSelectMember(share.memberName)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-emerald-600 p-0.5"
                          title="View member profile"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>

                  {/* Share ID */}
                  <td className="px-3 py-2.5 border-r border-slate-200 text-center">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        isClosed
                          ? 'bg-slate-200 text-slate-600'
                          : hasDue
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {share.id}
                    </span>
                  </td>

                  {/* Admission Fee */}
                  <td className="px-3 py-2.5 border-r border-slate-200 text-right font-medium">
                    {share.admissionFee.toLocaleString('en-IN')}
                  </td>

                  {/* Monthly Payments (Dynamically rendered based on activeMonths) */}
                  {activeMonths.map((m) => {
                    const pay = share.months?.[m] || { status: 'upcoming', amount: 2800 };
                    if (isClosed) {
                      return (
                        <React.Fragment key={m}>
                          <td className="px-2 py-2 border-r border-slate-200 text-center text-slate-400">-</td>
                          <td className="px-2 py-2 border-r border-slate-300 text-right text-slate-400">-</td>
                        </React.Fragment>
                      );
                    }

                    if (pay.status === 'paid') {
                      return (
                        <React.Fragment key={m}>
                          <td className="px-2 py-2 border-r border-slate-200 text-center text-slate-600 text-xs font-mono">
                            {pay.date || '-'}
                          </td>
                          <td className="px-2 py-2 border-r border-slate-300 text-right font-medium text-emerald-800 bg-emerald-50/20">
                            <button
                              onClick={() => onOpenReceiptForShare(share, m)}
                              className="hover:underline hover:text-emerald-600 cursor-pointer font-semibold"
                              title={`Click to View Receipt or Edit / Void Payment for ${share.id} (${m})`}
                            >
                              {pay.amount.toLocaleString('en-IN')}
                            </button>
                          </td>
                        </React.Fragment>
                      );
                    } else if (pay.status === 'due') {
                      return (
                        <React.Fragment key={m}>
                          <td className="px-2 py-2 border-r border-slate-200 text-center text-rose-600 font-semibold bg-rose-50/60 font-sans text-xs">
                            Due
                          </td>
                          <td className="px-2 py-2 border-r border-slate-300 text-right bg-rose-50/60 font-semibold text-rose-700">
                            <button
                              onClick={() => onOpenPaymentForShare(share, m)}
                              className="px-2 py-0.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-sans font-bold inline-flex items-center gap-0.5 cursor-pointer"
                              title={`Record payment for ${share.id} (${m})`}
                            >
                              <span>{pay.amount ? pay.amount.toLocaleString('en-IN') : '2,800'}</span>
                            </button>
                          </td>
                        </React.Fragment>
                      );
                    } else {
                      // Upcoming
                      return (
                        <React.Fragment key={m}>
                          <td className="px-2 py-2 border-r border-slate-200 text-center text-slate-400">-</td>
                          <td className="px-2 py-2 border-r border-slate-300 text-right text-slate-400">
                            <button
                              onClick={() => onOpenPaymentForShare(share, m)}
                              className="text-slate-400 hover:text-slate-700 hover:underline cursor-pointer"
                              title={`Advance payment for ${share.id} (${m})`}
                            >
                              -
                            </button>
                          </td>
                        </React.Fragment>
                      );
                    }
                  })}

                  {/* Total Deposit */}
                  <td className="px-2.5 py-2 border-r border-slate-200 text-right font-bold text-emerald-700 bg-emerald-50/30">
                    {share.totalDeposit.toLocaleString('en-IN')}
                  </td>

                  {/* Due Months */}
                  <td className="px-2 py-2 border-r border-slate-200 text-center">
                    {share.dueMonths > 0 ? (
                      <span className="inline-block px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                        {share.dueMonths}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  {/* Due Amount */}
                  <td className="px-2.5 py-2 border-r border-slate-200 text-right font-medium text-amber-900 bg-amber-50/30">
                    {share.dueAmount > 0 ? (
                      <button
                        type="button"
                        onClick={() => setBreakdownShare(share)}
                        className="hover:underline font-mono font-bold text-amber-900 inline-flex items-center gap-1 cursor-pointer group"
                        title="Click to view total due & late fee breakdown"
                      >
                        <span>{share.dueAmount.toLocaleString('en-IN')}</span>
                        <Calculator className="w-3 h-3 text-amber-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>

                  {/* Late Fee */}
                  <td className="px-2 py-2 border-r border-slate-200 text-right text-rose-700">
                    {share.lateFee > 0 ? (
                      <button
                        type="button"
                        onClick={() => setBreakdownShare(share)}
                        className="hover:underline font-mono font-bold text-rose-700 inline-flex items-center gap-1 cursor-pointer group"
                        title="Click to view total due & late fee breakdown"
                      >
                        <span>
                          {Number(share.lateFee.toFixed(2)).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <Calculator className="w-3 h-3 text-rose-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>

                  {/* Total Due */}
                  <td className="px-2.5 py-2 border-r border-slate-200 text-right font-bold text-rose-800 bg-rose-50/40">
                    {share.totalDue > 0 ? (
                      <button
                        type="button"
                        onClick={() => setBreakdownShare(share)}
                        className="hover:underline font-mono font-extrabold text-rose-700 inline-flex items-center gap-1 cursor-pointer group"
                        title="Click to view total due & late fee breakdown"
                      >
                        <span>
                          {Number(share.totalDue.toFixed(2)).toLocaleString('en-IN', {
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <Calculator className="w-3 h-3 text-rose-600 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  {/* Late Fee Paid */}
                  <td className="px-2 py-2 border-r border-slate-200 text-center text-slate-600">
                    {share.lateFeePaid > 0 ? share.lateFeePaid.toLocaleString('en-IN') : '-'}
                  </td>

                  {/* Actions */}
                  <td className="px-2 py-2 text-center font-sans">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onOpenPaymentForShare(share)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-2xs transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                        title="Record payment or dues"
                      >
                        {t('payBtn')}
                      </button>
                      <button
                        onClick={() => onOpenReceiptForShare(share, activeMonths[0] as MonthKey || 'Oct-26')}
                        className="p-1 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                        title="View Official Money Receipt"
                      >
                        <Receipt className="w-4 h-4" />
                      </button>
                      {onDeleteShare && !isClosed && (
                        <button
                          onClick={() => setShareToDelete(share)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete share from register"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Grand Total Row matching the original Excel spreadsheet - Frozen at Bottom */}
          <tfoot className="sticky bottom-0 z-20 bg-slate-900 text-white font-mono font-bold shadow-md border-t-2 border-slate-700">
            <tr className="bg-slate-900">
              <td colSpan={2} className="px-3 py-3 border-r border-slate-800 text-left font-sans font-bold text-amber-400 text-xs sticky left-0 z-30 bg-slate-900">
                {t('grandTotal')}
              </td>
              <td className="px-3 py-3 border-r border-slate-800 text-center font-sans text-xs text-slate-300 bg-slate-900">
                {summary.totalShareIds} IDs
              </td>
              <td className="px-3 py-3 border-r border-slate-800 text-right text-emerald-300 bg-slate-900">
                {summary.totalAdmissionCollected.toLocaleString('en-IN')}
              </td>

              {/* Monthly totals for visible activeMonths */}
              {activeMonths.map((m) => {
                const stat = summary.monthStats?.[m] || { paidShares: 0, paidAmount: 0 };
                return (
                  <React.Fragment key={`${m}-total`}>
                    <td className="px-2 py-2 border-r border-slate-800 text-center text-slate-400 text-xs">
                      {stat.paidShares > 0 ? `${stat.paidShares} Paid` : '-'}
                    </td>
                    <td className="px-2 py-2 border-r border-slate-800 text-right text-emerald-300 text-xs">
                      {stat.paidAmount > 0 ? stat.paidAmount.toLocaleString('en-IN') : '-'}
                    </td>
                  </React.Fragment>
                );
              })}

              {/* Grand Total Deposit (All months & admission combined exact calculation) */}
              <td className="px-3 py-3 border-r border-slate-800 text-right text-sm text-emerald-400 font-extrabold bg-emerald-950/40">
                {summary.totalBankDeposit.toLocaleString('en-IN')}
              </td>

              {/* Total Due Months */}
              <td className="px-2 py-3 border-r border-slate-800 text-center text-amber-400 text-xs">
                {summary.totalDueMonths}
              </td>

              {/* Total Due Amount */}
              <td className="px-3 py-3 border-r border-slate-800 text-right text-amber-300 text-xs">
                {summary.totalDuePrincipal.toLocaleString('en-IN')}
              </td>

              {/* Total Late Fee */}
              <td className="px-2 py-3 border-r border-slate-800 text-right text-rose-300 text-xs">
                {summary.totalLateFeeDue.toLocaleString('en-IN')}
              </td>

              {/* Total Due with Late Fee */}
              <td className="px-3 py-3 border-r border-slate-800 text-right text-rose-400 font-extrabold bg-rose-950/40 text-sm">
                {summary.totalOutstandingDue.toLocaleString('en-IN')}
              </td>

              {/* Late Fee Paid */}
              <td className="px-2 py-3 border-r border-slate-800 text-center text-slate-400 text-xs">
                {summary.totalLateFeeCollected > 0 ? summary.totalLateFeeCollected.toLocaleString('en-IN') : '-'}
              </td>

              <td className="px-3 py-3 text-center text-slate-400 font-sans text-xs">
                Active {summary.totalActiveShares}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Delete Share Confirmation Dialog */}
      {shareToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/75">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Delete Share from Register?</h4>
                <p className="text-xs text-slate-500">
                  {shareToDelete.id} &bull; {shareToDelete.memberName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Are you sure you want to delete share <strong>{shareToDelete.id}</strong> ({shareToDelete.memberName})? This will permanently remove the share from the society register.
              <span className="block text-slate-500 mt-1">
                আপনি কি নিশ্চিত যে এই শেয়ার এন্ট্রিটি পুরোপুরি মুছে ফেলতে চান?
              </span>
            </p>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShareToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel (বাতিল)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (onDeleteShare && shareToDelete) {
                    onDeleteShare(shareToDelete.id);
                  }
                  setShareToDelete(null);
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Yes, Delete Share (হ্যাঁ, মুছুন)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Due & Late Fee Calculation Breakdown Modal */}
      <CalculationBreakdownModal
        isOpen={!!breakdownShare}
        onClose={() => setBreakdownShare(null)}
        share={breakdownShare}
        onOpenPaymentForShare={onOpenPaymentForShare}
      />
    </div>
  );
};
