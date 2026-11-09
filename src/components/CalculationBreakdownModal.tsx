import React, { useState } from 'react';
import { ShareRecord } from '../types';
import {
  calculateCompoundDue,
  formatTaka,
  MONTHLY_INSTALLMENT_AMOUNT,
  STAGE_2_FINE,
  STAGE_3_PERCENTAGE,
  getCurrentSystemMonthKey,
  isMonthPast,
} from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Calculator,
  Calendar,
  AlertCircle,
  ArrowRight,
  Copy,
  Check,
  CreditCard,
  Info,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { TextureButton } from './ui/texture-button';

interface CalculationBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  share: ShareRecord | null;
  currentMonth?: string;
  onOpenPaymentForShare?: (share: ShareRecord) => void;
}

export const CalculationBreakdownModal: React.FC<CalculationBreakdownModalProps> = ({
  isOpen,
  onClose,
  share,
  currentMonth: propCurrentMonth,
  onOpenPaymentForShare,
}) => {
  const { t } = useLanguage();
  const currentMonth = propCurrentMonth || getCurrentSystemMonthKey();
  const todayRealDay = new Date().getDate();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !share) return null;

  const dueMonthKeys = Object.keys(share.months || {}).filter((m) => {
    const payment = share.months[m];
    if (!payment || payment.status === 'paid') return false;
    const isPast = isMonthPast(m, currentMonth);
    const isCurrentPastDeadline = m === currentMonth && todayRealDay > 15;
    return payment.status === 'due' || isPast || isCurrentPastDeadline;
  });
  const dueMonthsCount = dueMonthKeys.length || share.dueMonths || 0;

  // Compute live due for today
  const compound = calculateCompoundDue(dueMonthsCount, todayRealDay, dueMonthKeys, currentMonth);
  const currentStage = compound.stage;

  const handleCopyNotice = () => {
    const text = `*Progressive Association Society — Due & Late Fee Notice*
Member: ${share.memberName} (${share.id})
Status as of: Day ${todayRealDay} of month (${currentStage.name})

• Overdue Months: ${dueMonthsCount} month(s) [${dueMonthKeys.join(', ') || 'N/A'}]
• Base Principal: ${formatTaka(compound.principalDue)}
• Late Fee / Fine: ${formatTaka(compound.penaltyDue)}
• *Total Payable Due: ${formatTaka(compound.totalDue)}*

Timeline Rules:
1. 1st–15th: Regular Installment (Tk. 2,800/month)
2. 16th–20th: +Tk. 150 Fine added
3. 21st–End: +15% Compound Surcharge added

Please clear your dues promptly via Bank Deposit or bKash.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 motion-safe:animate-in motion-safe:fade-in duration-150"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                  {t('breakdownTitle')}
                </h3>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500 text-slate-950">
                  {share.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {t('member')}: <strong className="text-slate-200">{share.memberName}</strong>
              </p>
            </div>
          </div>
          <div className="w-auto">
            <TextureButton
              variant="icon"
              size="icon"
              onClick={onClose}
              aria-label="Close dialog"
              className="w-8 h-8"
            >
              <X className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </TextureButton>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-slate-800">
          {/* Hero Due Summary Card */}
          <div className="p-4 bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200/90 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-amber-900/70 block">
                  {t('totalPayable')}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-slate-900 tracking-tight">
                    {formatTaka(compound.totalDue)}
                  </span>
                  {compound.penaltyDue > 0 && (
                    <span className="text-xs font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full border border-rose-200">
                      +{formatTaka(compound.penaltyDue)} {t('fine')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1.5 flex-wrap">
                  <span>
                    {t('principal')}: <strong>{formatTaka(compound.principalDue)}</strong>
                  </span>
                  <span>&bull;</span>
                  <span>
                    {t('filterDue')}: <strong>{dueMonthsCount} {dueMonthsCount === 1 ? 'Month' : 'Months'}</strong>{' '}
                    ({dueMonthKeys.join(', ') || 'N/A'})
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="sm:text-right shrink-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${
                    currentStage.stage === 1
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                      : currentStage.stage === 2
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-rose-100 border-rose-300 text-rose-900'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      currentStage.stage === 1
                        ? 'bg-emerald-500'
                        : currentStage.stage === 2
                        ? 'bg-amber-500'
                        : 'bg-rose-500 animate-pulse'
                    }`}
                  />
                  <span>{currentStage.badge}</span>
                </span>
                <span className="block text-[11px] text-slate-500 mt-1">
                  {t('evaluatingDay')} <strong>{todayRealDay}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Ledger Calculation Flow */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-semibold text-slate-800 text-xs">
                {t('calculationSteps')}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {compound.steps.length} {compound.steps.length === 1 ? 'Cycle' : 'Cycles'}
              </span>
            </div>

            {compound.steps.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                <Check className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                <p className="font-bold text-slate-800 text-sm">No Dues Pending</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  All installments for this share are paid.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 p-2 space-y-2">
                {compound.steps.map((step) => (
                  <div
                    key={step.monthIndex}
                    className="p-3 rounded-lg bg-slate-50/70 border border-slate-200/80 text-xs"
                  >
                    {/* Month Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/80">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center">
                          {step.monthIndex}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          {step.monthName}
                        </span>
                        {step.isPastMonth ? (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                            Completed Cycle
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                            Active Cycle (Day {todayRealDay})
                          </span>
                        )}
                      </div>
                      <span className="font-bold font-mono text-slate-900 text-sm">
                        {formatTaka(step.closingBalance)}
                      </span>
                    </div>

                    {/* Clean Calculation Lines */}
                    <div className="space-y-1.5 text-slate-600 font-mono text-[11px]">
                      {step.openingBalance > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-slate-500">
                            Carried Over from Previous Month:
                          </span>
                          <span className="font-bold text-slate-700">
                            {formatTaka(step.openingBalance)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="font-sans text-slate-500">
                          + Regular Installment:
                        </span>
                        <span className="font-bold text-slate-900">
                          +{formatTaka(step.installment)}
                        </span>
                      </div>

                      {step.stage2Fine > 0 ? (
                        <div className="flex items-center justify-between text-amber-800">
                          <span className="font-sans">
                            + 16th to 20th Fixed Late Fine:
                          </span>
                          <span className="font-bold">
                            +{formatTaka(step.stage2Fine)}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between text-slate-400">
                          <span className="font-sans">
                            Late Fine (1st to 15th):
                          </span>
                          <span>Tk. 0 (No fine)</span>
                        </div>
                      )}

                      {step.stage3Surcharge > 0 && (
                        <div className="flex items-center justify-between text-rose-700">
                          <span className="font-sans">
                            + 21st–End Surcharge (15%):
                          </span>
                          <span className="font-bold">
                            +{formatTaka(step.stage3Surcharge)}
                          </span>
                        </div>
                      )}

                      <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between font-bold text-slate-900 text-xs">
                        <span className="font-sans">
                          Closing Balance for {step.monthName}:
                        </span>
                        <span className="font-mono text-emerald-800">
                          {formatTaka(step.closingBalance)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="w-auto">
            <TextureButton
              variant="minimal"
              size="sm"
              onClick={handleCopyNotice}
              className="w-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t('copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{t('copyNotice')}</span>
                </>
              )}
            </TextureButton>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-auto">
              <TextureButton
                variant="secondary"
                size="sm"
                onClick={onClose}
                className="w-auto"
              >
                {t('close')}
              </TextureButton>
            </div>
            {onOpenPaymentForShare && dueMonthsCount > 0 && (
              <div className="w-auto">
                <TextureButton
                  variant="emerald"
                  size="sm"
                  onClick={() => {
                    onClose();
                    onOpenPaymentForShare(share);
                  }}
                  className="w-auto"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{t('collectPayment')}</span>
                </TextureButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
