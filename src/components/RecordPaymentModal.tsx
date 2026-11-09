import React, { useState, useEffect, useMemo } from 'react';
import { ShareRecord, MonthKey, ALL_MONTHS } from '../types';
import {
  formatTaka,
  calculateCompoundDue,
  MONTHLY_INSTALLMENT_AMOUNT,
  getCurrentSystemMonthKey,
  isMonthPast,
} from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  CreditCard,
  Check,
  Calendar,
} from 'lucide-react';
import { TextureButton } from './ui/texture-button';

const getTodayIsoDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatIsoToLedgerDate = (val: string): string => {
  if (!val) return '';
  if (val.includes('.')) return val;
  const parts = val.split('-');
  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;
    return `${dd}.${mm}.${yyyy.slice(-2)}`;
  }
  return val;
};

const formatIsoToDisplay = (val: string): string => {
  if (!val) return '';
  const parts = val.split('-');
  if (parts.length === 3) {
    const [yyyy, mm, dd] = parts;
    return `${dd}.${mm}.${yyyy}`;
  }
  return val;
};

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  shares: ShareRecord[];
  initialShare?: ShareRecord | null;
  initialMonth?: MonthKey;
  currentMonth?: string;
  onSavePayment: (payload: {
    shareId: string;
    month?: MonthKey;
    months?: MonthKey[];
    amount: number;
    lateFeeAmount?: number;
    date: string;
    paymentMethod: string;
    includeLateFee: boolean;
    notes?: string;
  }) => void;
  onRevertPayment?: (shareId: string, month: MonthKey, targetStatus: 'due' | 'upcoming') => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  isOpen,
  onClose,
  shares,
  initialShare,
  initialMonth,
  currentMonth: propCurrentMonth,
  onSavePayment,
}) => {
  const { t, language } = useLanguage();
  const currentMonthKey = propCurrentMonth || getCurrentSystemMonthKey();
  const activeShares = shares.filter((s) => !s.isClosed);

  const [selectedShareId, setSelectedShareId] = useState<string>(activeShares[0]?.id || 'PAS-01');
  const [selectedMonths, setSelectedMonths] = useState<MonthKey[]>([]);
  const [date, setDate] = useState<string>(getTodayIsoDate);
  const [paymentMethod, setPaymentMethod] = useState<string>('Bank Deposit');
  const [includeLateFee, setIncludeLateFee] = useState<boolean>(true);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>('');

  const currentShare = activeShares.find((s) => s.id === selectedShareId) || activeShares[0];

  // List of all base months available for this share
  const baseMonths: MonthKey[] = useMemo(() => {
    if (!currentShare?.months) return ALL_MONTHS;
    const shareMonthKeys = Object.keys(currentShare.months);
    const combined = [...ALL_MONTHS];
    for (const k of shareMonthKeys) {
      if (!combined.includes(k)) combined.push(k);
    }
    return combined;
  }, [currentShare]);

  // HIDE PAID MONTHS: Only show Due, Current, and Advance (Upcoming) months!
  const payableMonthsList: MonthKey[] = useMemo(() => {
    if (!currentShare?.months) return baseMonths;
    const filtered = baseMonths.filter((m) => {
      const status = currentShare.months[m]?.status;
      return status !== 'paid'; // Automatically hide any month that is paid!
    });
    // If all configured months are paid, supply upcoming advance months
    if (filtered.length === 0) {
      return ['Jan-27', 'Feb-27'];
    }
    return filtered;
  }, [baseMonths, currentShare]);

  // Strictly ensure no paid month is ever in the cards grid
  const displayMonthsList: MonthKey[] = useMemo(() => {
    const list = [...payableMonthsList];
    for (const sm of selectedMonths) {
      if (!list.includes(sm) && currentShare?.months[sm]?.status !== 'paid') {
        list.push(sm);
      }
    }
    return list.filter((m) => currentShare?.months[m]?.status !== 'paid');
  }, [payableMonthsList, selectedMonths, currentShare]);

  // Find due months and upcoming months
  const dueMonths = useMemo(() => {
    if (!currentShare?.months) return [];
    const day = new Date().getDate();
    return baseMonths.filter((m) => {
      const monthData = currentShare.months[m];
      if (!monthData || monthData.status === 'paid') return false;
      const isPast = isMonthPast(m, currentMonthKey);
      const isCurrentPastDeadline = m === currentMonthKey && day > 15;
      return monthData.status === 'due' || isPast || isCurrentPastDeadline;
    });
  }, [currentShare, baseMonths, currentMonthKey]);

  // Check if current month is unpaid
  const isCurrentUnpaid = useMemo(() => {
    const currentStatus = currentShare?.months[currentMonthKey]?.status;
    return currentStatus !== 'paid';
  }, [currentShare, currentMonthKey]);

  // Initialize selection when modal opens or share changes
  useEffect(() => {
    if (!isOpen) return;

    setDate(getTodayIsoDate());

    const targetShare = initialShare || activeShares.find((s) => s.id === selectedShareId) || activeShares[0];
    if (targetShare) {
      setSelectedShareId(targetShare.id);

      const targetBaseMonths = targetShare?.months
        ? Array.from(new Set([...ALL_MONTHS, ...Object.keys(targetShare.months)]))
        : ALL_MONTHS;

      const shareDue = targetBaseMonths.filter((m) => targetShare.months[m]?.status === 'due');

      if (initialMonth && targetShare.months[initialMonth]?.status !== 'paid') {
        setSelectedMonths([initialMonth]);
        setIncludeLateFee(targetShare.months[initialMonth]?.status === 'due' && targetShare.lateFee > 0);
      } else if (shareDue.length > 0) {
        setSelectedMonths(shareDue);
        setIncludeLateFee(targetShare.lateFee > 0);
      } else {
        const shareUnpaids = targetBaseMonths.filter((m) => targetShare.months[m]?.status !== 'paid');
        const firstUnpaid = shareUnpaids[0] || 'Jan-27';
        setSelectedMonths([firstUnpaid]);
        setIncludeLateFee(false);
      }

      setCustomAmount(null);
    }
  }, [isOpen, initialShare, initialMonth]);

  // Calculation helpers
  const selectedCount = selectedMonths.length;
  const baseInstallmentAmount = selectedCount * MONTHLY_INSTALLMENT_AMOUNT;

  // Filter ONLY the selected months that are actually OVERDUE
  const selectedDueMonths = useMemo(() => {
    const day = new Date().getDate();
    return selectedMonths.filter((m) => {
      const monthData = currentShare?.months[m];
      if (!monthData || monthData.status === 'paid') return false;
      const isPast = isMonthPast(m, currentMonthKey);
      const isCurrentPastDeadline = m === currentMonthKey && day > 15;
      return monthData.status === 'due' || isPast || isCurrentPastDeadline;
    });
  }, [selectedMonths, currentShare, currentMonthKey]);

  const selectedDueCount = selectedDueMonths.length;
  const hasSelectedDueMonths = selectedDueCount > 0;
  const currentDayOfMonth = new Date().getDate();

  // Dynamically calculate compound due strictly for the overdue months
  // Current month (before 15th) and Advance months NEVER carry late fees!
  const dynamicCompound = useMemo(() => {
    if (!hasSelectedDueMonths || selectedDueCount === 0) {
      return {
        totalDue: baseInstallmentAmount,
        penaltyDue: 0,
        principalDue: baseInstallmentAmount,
      };
    }

    const dueResult = calculateCompoundDue(selectedDueCount, currentDayOfMonth, selectedDueMonths, currentMonthKey);
    const nonDueCount = selectedCount - selectedDueCount;
    const nonDueAmount = nonDueCount * MONTHLY_INSTALLMENT_AMOUNT;

    return {
      totalDue: dueResult.totalDue + nonDueAmount,
      penaltyDue: dueResult.penaltyDue,
      principalDue: baseInstallmentAmount,
    };
  }, [hasSelectedDueMonths, selectedDueCount, selectedCount, currentDayOfMonth, selectedDueMonths, currentMonthKey, baseInstallmentAmount]);

  const activeLateFee = hasSelectedDueMonths && includeLateFee ? dynamicCompound.penaltyDue : 0;
  const autoCalculatedTotal = hasSelectedDueMonths
    ? includeLateFee
      ? dynamicCompound.totalDue
      : baseInstallmentAmount
    : baseInstallmentAmount;
  const displayAmount = customAmount !== null ? customAmount : autoCalculatedTotal;

  // When selectedShareId changes from dropdown
  const handleShareChange = (newId: string) => {
    setSelectedShareId(newId);
    setCustomAmount(null);
    const s = activeShares.find((x) => x.id === newId);
    if (s) {
      const sBaseMonths = s?.months
        ? Array.from(new Set([...ALL_MONTHS, ...Object.keys(s.months)]))
        : ALL_MONTHS;
      const sDues = sBaseMonths.filter((m) => s.months[m]?.status === 'due');
      if (sDues.length > 0) {
        setSelectedMonths(sDues);
        setIncludeLateFee(s.lateFee > 0);
      } else {
        const unpaids = sBaseMonths.filter((m) => s.months[m]?.status !== 'paid');
        const firstUnpaid = unpaids[0] || 'Jan-27';
        setSelectedMonths([firstUnpaid]);
        setIncludeLateFee(false);
      }
    }
  };

  // Toggle single month in the tick system (cannot toggle paid months)
  const handleToggleMonth = (monthKey: MonthKey) => {
    if (currentShare?.months[monthKey]?.status === 'paid') return;
    setCustomAmount(null);
    setSelectedMonths((prev) => {
      if (prev.includes(monthKey)) {
        return prev.filter((m) => m !== monthKey);
      } else {
        return [...prev, monthKey];
      }
    });
  };

  // Quick Select Helpers
  const handleSelectAllDues = () => {
    setCustomAmount(null);
    if (dueMonths.length > 0) {
      setSelectedMonths(dueMonths);
      setIncludeLateFee(currentShare.lateFee > 0);
    }
  };

  const handleSelectCurrentMonth = () => {
    setCustomAmount(null);
    if (isCurrentUnpaid) {
      setSelectedMonths([currentMonthKey]);
      setIncludeLateFee(currentShare.months[currentMonthKey]?.status === 'due');
    }
  };

  const handleAddAdvanceMonth = () => {
    setCustomAmount(null);
    const nextPayable = payableMonthsList.find((m) => !selectedMonths.includes(m));
    if (nextPayable) {
      setSelectedMonths((prev) => [...prev, nextPayable]);
    } else {
      const futurePool: MonthKey[] = ['Jan-27', 'Feb-27', 'Mar-27', 'Apr-27', 'May-27'];
      const nextFuture = futurePool.find((m) => !selectedMonths.includes(m));
      if (nextFuture) {
        setSelectedMonths((prev) => [...prev, nextFuture]);
      }
    }
  };

  const handleClearSelection = () => {
    setCustomAmount(null);
    setSelectedMonths([]);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMonths.length === 0) return;

    const formattedDate = formatIsoToLedgerDate(date);

    onSavePayment({
      shareId: selectedShareId,
      month: selectedMonths[0],
      months: selectedMonths,
      amount: Number(displayAmount) || 0,
      lateFeeAmount: activeLateFee,
      date: formattedDate,
      paymentMethod,
      includeLateFee: hasSelectedDueMonths && includeLateFee,
      notes,
    });
    onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 animate-in fade-in duration-150 motion-reduce:animate-none"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Ultra Premium Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                {t('recordPaymentTitle')}
              </h3>
              <p className="text-[11px] text-slate-400">
                {t('recordPaymentSubtitle')}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm overflow-y-auto">
          {/* Member & Share Selection */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700 text-xs">
                {t('memberAndShare')}
              </label>
              {currentShare && (
                <span className={`px-2 py-0.2 rounded-full font-bold text-[10px] ${
                  currentShare.dueMonths > 0
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {currentShare.dueMonths > 0 ? `${currentShare.dueMonths}M Overdue` : 'Clean'}
                </span>
              )}
            </div>

            <select
              value={selectedShareId}
              onChange={(e) => handleShareChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-slate-900 bg-white font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
            >
              {activeShares.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} &bull; {s.memberName} {s.dueMonths > 0 ? `(DUE: ${formatTaka(s.totalDue)})` : ''}
                </option>
              ))}
            </select>

            {/* Quick Stats Pill */}
            {currentShare && (
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg text-xs">
                <span className="text-slate-500 text-[11px]">
                  {t('deposited')}: <strong className="text-emerald-700 font-mono">{formatTaka(currentShare.totalDeposit)}</strong>
                </span>
                <span className="text-slate-500 text-[11px]">
                  {t('outstandingDue')}:{' '}
                  <strong className={`font-mono ${currentShare.dueMonths > 0 ? 'text-rose-700 font-bold' : 'text-slate-700'}`}>
                    {formatTaka(currentShare.totalDue)}
                  </strong>
                </span>
              </div>
            )}
          </div>

          {/* Installment Months Tick System */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-800 text-xs">
                  {t('selectMonths')}
                </span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold">
                  {selectedCount}
                </span>
              </div>

              {/* Clean Presets - Only Due, Current (unpaid), and Advance */}
              <div className="flex items-center gap-1 text-[11px]">
                {dueMonths.length > 0 && (
                  <button
                    type="button"
                    onClick={handleSelectAllDues}
                    className="px-2 py-0.5 rounded-md font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
                  >
                    {t('allDues')} ({dueMonths.length})
                  </button>
                )}
                {isCurrentUnpaid && (
                  <button
                    type="button"
                    onClick={handleSelectCurrentMonth}
                    className="px-2 py-0.5 rounded-md font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    {t('current')}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleAddAdvanceMonth}
                  className="px-2 py-0.5 rounded-md font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer"
                >
                  {t('advance')}
                </button>
                {selectedMonths.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="px-1.5 py-0.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    {t('clear')}
                  </button>
                )}
              </div>
            </div>

            {/* Clean Month Cards - Hiding Paid Months, showing only Due, Current, Advance */}
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-xl bg-slate-50/40">
              {displayMonthsList.map((m) => {
                const monthData = currentShare?.months[m];
                const isPaid = monthData?.status === 'paid';
                const isPast = isMonthPast(m, currentMonthKey);
                const isCurrentPastDeadline = m === currentMonthKey && new Date().getDate() > 15;
                const isDue = !isPaid && (monthData?.status === 'due' || isPast || isCurrentPastDeadline);
                const isCurrent = m === currentMonthKey;
                const isChecked = selectedMonths.includes(m);

                return (
                  <div
                    key={m}
                    onClick={() => handleToggleMonth(m)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-colors duration-150 select-none ${
                      isChecked
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-300/60 shadow-2xs'
                        : isDue
                        ? 'bg-white border-amber-300 hover:border-amber-400'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border transition-colors duration-150 shrink-0 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate text-xs">
                          {m}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          Tk. 2,800
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isDue ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                          {t('statusDue')}
                        </span>
                      ) : isCurrent ? (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {t('current')}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
                          {t('advance')}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ultra-Clean Late Fee Toggle */}
          {hasSelectedDueMonths && dynamicCompound.penaltyDue > 0 && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/90 rounded-xl flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeLateFee}
                  onChange={(e) => {
                    setIncludeLateFee(e.target.checked);
                    setCustomAmount(null);
                  }}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-slate-800">
                  {t('includeLateFee')}
                </span>
              </label>
              <div className="text-right">
                <span className="font-mono font-bold text-rose-700 text-sm block">
                  +{formatTaka(dynamicCompound.penaltyDue)}
                </span>
                <span className="text-[10px] text-slate-400 block font-normal">
                  {t('uncheckToWaive')}
                </span>
              </div>
            </div>
          )}

          {/* Payment Details 2x2 Clean Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700 text-xs">
                  {t('amountToPay')}
                </label>
                {customAmount !== null && (
                  <button
                    type="button"
                    onClick={() => setCustomAmount(null)}
                    className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    {t('resetCalculated')} (Tk. {autoCalculatedTotal})
                  </button>
                )}
              </div>
              <input
                type="number"
                value={displayAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value))}
                min="0"
                step="any"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-base focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="flex items-center gap-1.5 font-semibold text-slate-700 text-xs">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t('paymentDate')}</span>
                </label>
                {date !== getTodayIsoDate() ? (
                  <button
                    type="button"
                    onClick={() => setDate(getTodayIsoDate())}
                    className="text-[10px] text-emerald-700 font-semibold hover:underline cursor-pointer"
                  >
                    {language === 'bn' ? 'আজকের তারিখ' : 'Today'}
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {language === 'bn' ? 'আজ' : 'Today'} ({formatIsoToDisplay(date)})
                  </span>
                )}
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => {
                  try {
                    e.currentTarget.showPicker?.();
                  } catch {
                    // Browser fallback
                  }
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs bg-white cursor-pointer"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {t('paymentMethod')}
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-medium text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
              >
                <option value="Bank Deposit">Bank Deposit</option>
                <option value="bKash">bKash</option>
                <option value="Nagad">Nagad</option>
                <option value="Cash">Cash</option>
                <option value="BEFTN / NPSB">BEFTN / NPSB</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {t('depositSlipRef')}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. TrxID #8X76 (Optional)"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Ultra-Premium Action Footer */}
          <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
            <div className="w-auto">
              <TextureButton
                variant="secondary"
                size="sm"
                onClick={onClose}
                className="w-auto"
              >
                {t('cancel')}
              </TextureButton>
            </div>

            <div className="w-auto">
              <TextureButton
                variant="emerald"
                size="default"
                type="submit"
                disabled={selectedMonths.length === 0}
                className="w-auto min-w-[200px]"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>
                  {t('confirmPayment')} &bull; {formatTaka(displayAmount)}
                </span>
              </TextureButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
