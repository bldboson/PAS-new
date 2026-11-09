import { ALL_MONTHS } from '../types.ts';
import type { MonthKey, ShareRecord, SocietySummary } from '../types.ts';

export const MONTHLY_INSTALLMENT_AMOUNT = 2800;
export const ADMISSION_FEE_AMOUNT = 5000;
export const STAGE_2_FINE = 150; // Tk. 150 from 16th to 20th
export const STAGE_3_PERCENTAGE = 0.15; // 15% surcharge from 21st to month end

export interface PenaltyStageInfo {
  stage: 1 | 2 | 3;
  name: string;
  badge: string;
  colorClass: string;
  description: string;
  nextDeadline: string;
}

/**
 * Returns current penalty stage details based on day of the month (1-31)
 */
export function getPenaltyStage(day: number = new Date().getDate()): PenaltyStageInfo {
  const safeDay = Math.max(1, Math.min(31, Math.round(day)));
  if (safeDay <= 15) {
    return {
      stage: 1,
      name: 'Stage 1: Regular Due (No Fine)',
      badge: '1–15th: Regular (No Fine)',
      colorClass: 'emerald',
      description: 'Monthly installment applies without penalty fine.',
      nextDeadline: '15th of the month (before Tk. 150 fine applies)',
    };
  }
  if (safeDay <= 20) {
    return {
      stage: 2,
      name: 'Stage 2: Fixed Fine (+Tk 150)',
      badge: '16–20th: +Tk 150 Fine',
      colorClass: 'amber',
      description: 'Fixed Tk. 150 late fine added to the running due balance.',
      nextDeadline: '20th of the month (before 15% surcharge applies)',
    };
  }
  return {
    stage: 3,
    name: 'Stage 3: Surcharge (+15%)',
    badge: '21st–End: +15% Surcharge',
    colorClass: 'rose',
    description: '15% compound surcharge applied on total running balance.',
    nextDeadline: 'Month end (balance will carry forward into next month)',
  };
}

export interface MonthCompoundingStep {
  monthIndex: number;
  monthName?: string;
  isPastMonth: boolean;
  openingBalance: number;
  installment: number;
  subtotal: number;
  stage2Fine: number;
  subtotalAfterStage2: number;
  stage3Percentage: number;
  stage3Surcharge: number;
  closingBalance: number;
}

export interface CompoundDueDetails {
  totalDue: number;
  principalDue: number;
  penaltyDue: number;
  dueMonths: number;
  effectiveDay: number;
  stage: PenaltyStageInfo;
  steps: MonthCompoundingStep[];
}

/**
 * Compares two month keys chronologically (e.g., 'Oct-26' < 'Nov-26').
 * Returns true if monthKey is strictly in the past relative to currentMonthKey.
 */
export function isMonthPast(monthKey: string, currentMonthKey: string = getCurrentSystemMonthKey()): boolean {
  if (!monthKey || !currentMonthKey) return false;
  const [m1, y1] = monthKey.split('-');
  const [m2, y2] = currentMonthKey.split('-');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year1 = 2000 + parseInt(y1 || '26', 10);
  const year2 = 2000 + parseInt(y2 || '26', 10);
  const monthIdx1 = MONTHS.indexOf(m1);
  const monthIdx2 = MONTHS.indexOf(m2);

  if (monthIdx1 === -1 || monthIdx2 === -1) return false;
  if (year1 < year2) return true;
  if (year1 > year2) return false;
  return monthIdx1 < monthIdx2;
}

/**
 * Computes compound overdue balance across chronological months:
 * Month 1:
 *   - Day 1-15: Tk. 2,800
 *   - Day 16-20: Tk. 2,800 + Tk. 150 = Tk. 2,950
 *   - Day 21-End: Tk. 2,950 + 15% (Tk. 442.50) = Tk. 3,392.50
 * Month 2:
 *   - Day 1-15: Tk. 3,392.50 + Tk. 2,800 = Tk. 6,192.50
 *   - Day 16-20: Tk. 6,192.50 + Tk. 150 = Tk. 6,342.50
 *   - Day 21-End: Tk. 6,342.50 + 15% (Tk. 951.375) = Tk. 7,293.875
 * ... and so on iteratively.
 */
export function calculateCompoundDue(
  dueMonthsCount: number,
  dayOfMonth: number = new Date().getDate(),
  monthNames?: string[],
  currentMonthKey: string = getCurrentSystemMonthKey()
): CompoundDueDetails {
  const safeDay = Math.max(1, Math.min(31, Math.round(dayOfMonth)));
  const stage = getPenaltyStage(safeDay);

  if (dueMonthsCount <= 0) {
    return {
      totalDue: 0,
      principalDue: 0,
      penaltyDue: 0,
      dueMonths: 0,
      effectiveDay: safeDay,
      stage,
      steps: [],
    };
  }

  const steps: MonthCompoundingStep[] = [];
  let runningBalance = 0;
  const principalDue = dueMonthsCount * MONTHLY_INSTALLMENT_AMOUNT;

  for (let i = 1; i <= dueMonthsCount; i++) {
    const monthName = monthNames && monthNames[i - 1] ? monthNames[i - 1] : undefined;

    // In sequential compounding:
    // A month is a completed past cycle if:
    // 1. monthName is provided and is strictly before currentMonthKey (isMonthPast)
    // 2. OR no monthName is provided and i < dueMonthsCount (prior cycle in overdue chain)
    const isPastMonth = monthName
      ? isMonthPast(monthName, currentMonthKey)
      : i < dueMonthsCount;

    const openingBalance = runningBalance;
    const installment = MONTHLY_INSTALLMENT_AMOUNT;
    const subtotal = openingBalance + installment;

    let stage2Fine = 0;
    let stage3Surcharge = 0;

    if (isPastMonth) {
      // Past overdue months passed through both 16-20th (+150) and 21-end (+15%)
      stage2Fine = STAGE_2_FINE; // 150
      const subtotalAfterStage2 = subtotal + stage2Fine;
      stage3Surcharge = Math.round(subtotalAfterStage2 * STAGE_3_PERCENTAGE * 1000) / 1000;
      runningBalance = subtotalAfterStage2 + stage3Surcharge;

      steps.push({
        monthIndex: i,
        monthName: monthName || `Overdue Month ${i}`,
        isPastMonth: true,
        openingBalance,
        installment,
        subtotal,
        stage2Fine,
        subtotalAfterStage2,
        stage3Percentage: 0.15,
        stage3Surcharge,
        closingBalance: runningBalance,
      });
    } else {
      // Current active month - fine depends on safeDay
      if (safeDay >= 16) {
        stage2Fine = STAGE_2_FINE;
      }
      const subtotalAfterStage2 = subtotal + stage2Fine;
      if (safeDay >= 21) {
        stage3Surcharge = Math.round(subtotalAfterStage2 * STAGE_3_PERCENTAGE * 1000) / 1000;
      }
      runningBalance = subtotalAfterStage2 + stage3Surcharge;

      steps.push({
        monthIndex: i,
        monthName: monthName || `Current Month`,
        isPastMonth: false,
        openingBalance,
        installment,
        subtotal,
        stage2Fine,
        subtotalAfterStage2,
        stage3Percentage: safeDay >= 21 ? 0.15 : 0,
        stage3Surcharge,
        closingBalance: runningBalance,
      });
    }
  }

  const penaltyDue = Math.max(0, runningBalance - principalDue);

  return {
    totalDue: runningBalance,
    principalDue,
    penaltyDue,
    dueMonths: dueMonthsCount,
    effectiveDay: safeDay,
    stage,
    steps,
  };
}

/**
 * Calculates deposit, due, and late fee for a single share record
 */
export function calculateShareRecord(
  share: ShareRecord,
  dayOfMonth: number = new Date().getDate(),
  currentMonthKey: string = getCurrentSystemMonthKey()
): ShareRecord {
  if (share.isClosed) {
    return {
      ...share,
      totalDeposit: share.admissionFee,
      dueMonths: 0,
      dueAmount: 0,
      lateFee: 0,
      totalDue: 0,
      lateFeePaid: 0,
    };
  }

  let totalMonthlyPaid = 0;
  let dueMonths = 0;
  const dueMonthKeys: string[] = [];

  // Evaluate across all months configured on the share record
  const monthKeys = Object.keys(share.months || {});
  for (const m of monthKeys) {
    const payment = share.months[m];
    if (!payment) continue;

    if (payment.status === 'paid') {
      totalMonthlyPaid += payment.amount || 0;
    } else {
      // Auto-due logic: any past month that ended without payment,
      // or current month whose 15th deadline has passed, is automatically due.
      const isPastMonth = isMonthPast(m, currentMonthKey);
      const isCurrentPastDeadline = m === currentMonthKey && dayOfMonth > 15;
      const isDue = payment.status === 'due' || isPastMonth || isCurrentPastDeadline;

      if (isDue) {
        dueMonths += 1;
        dueMonthKeys.push(m);
      }
    }
  }

  const compound = calculateCompoundDue(dueMonths, dayOfMonth, dueMonthKeys, currentMonthKey);
  const lateFeePaid = share.lateFeePaid || 0;
  const lateFee = Math.max(0, compound.penaltyDue);
  const dueAmount = compound.principalDue;
  const totalDeposit = share.admissionFee + totalMonthlyPaid + lateFeePaid;
  const totalDue = Math.max(0, compound.totalDue - lateFeePaid);

  return {
    ...share,
    totalDeposit,
    dueMonths,
    dueAmount,
    lateFee,
    totalDue,
    lateFeePaid,
  };
}

/**
 * Automatically syncs a share record's months with real-world calendar deadlines:
 * 1. Any past month (before currentMonthKey) that is NOT 'paid' automatically becomes 'due'.
 * 2. Current month (currentMonthKey) automatically becomes 'due' as soon as its deadline (15th of month) passes.
 * 3. Then calculates exact principal, late fees, deposits, and total outstanding due.
 */
export function syncShareRecordWithCalendar(
  share: ShareRecord,
  dayOfMonth: number = new Date().getDate(),
  currentMonthKey: string = getCurrentSystemMonthKey()
): ShareRecord {
  if (share.isClosed) {
    return calculateShareRecord(share, dayOfMonth, currentMonthKey);
  }

  const updatedMonths = { ...(share.months || {}) };
  let hasChanges = false;
  const isPastDeadline = dayOfMonth > 15;

  for (const m of Object.keys(updatedMonths)) {
    const payment = updatedMonths[m];
    if (!payment || payment.status === 'paid') continue;

    if (isMonthPast(m, currentMonthKey)) {
      if (payment.status !== 'due') {
        updatedMonths[m] = { ...payment, status: 'due', amount: payment.amount || MONTHLY_INSTALLMENT_AMOUNT };
        hasChanges = true;
      }
    } else if (m === currentMonthKey) {
      if (isPastDeadline && payment.status !== 'due') {
        updatedMonths[m] = { ...payment, status: 'due', amount: payment.amount || MONTHLY_INSTALLMENT_AMOUNT };
        hasChanges = true;
      }
    }
  }

  const baseShare = hasChanges ? { ...share, months: updatedMonths } : share;
  return calculateShareRecord(baseShare, dayOfMonth, currentMonthKey);
}

/**
 * Summarizes the entire society dataset matching the Excel dashboard
 */
export function calculateSocietySummary(
  shares: ShareRecord[],
  dayOfMonth: number = new Date().getDate(),
  currentMonthKey: string = getCurrentSystemMonthKey()
): SocietySummary {
  let totalActiveShares = 0;
  let totalShareIds = 0;
  let totalAdmissionCollected = 0;
  let totalMonthlyCollected = 0;
  let totalLateFeeCollected = 0;
  let totalDueMonths = 0;
  let totalDuePrincipal = 0;
  let totalLateFeeDue = 0;

  const monthStats: SocietySummary['monthStats'] = {};
  const uniqueMemberNames = new Set<string>();

  for (const rawShare of shares) {
    const share = calculateShareRecord(rawShare, dayOfMonth, currentMonthKey);

    // Count IDs
    if (share.id.includes(',')) {
      const parts = share.id.split(',').length;
      totalShareIds += parts;
    } else {
      totalShareIds += 1;
    }

    if (!share.isClosed) {
      totalActiveShares += 1;
      if (share.memberName && share.memberName.trim() !== '') {
        uniqueMemberNames.add(share.memberName.trim());
      }
    }

    totalAdmissionCollected += share.admissionFee;
    totalLateFeeCollected += share.lateFeePaid || 0;

    const allRecordMonths = Object.keys(share.months || {});
    for (const m of allRecordMonths) {
      if (!monthStats[m]) {
        monthStats[m] = { paidShares: 0, paidAmount: 0, dueShares: 0, dueAmount: 0, upcomingShares: 0 };
      }
      const p = share.months[m];
      if (!p) continue;
      if (p.status === 'paid') {
        if (!share.isClosed) {
          totalMonthlyCollected += p.amount || 0;
        }
        monthStats[m].paidShares += 1;
        monthStats[m].paidAmount += p.amount || 0;
      } else if (p.status === 'due') {
        monthStats[m].dueShares += 1;
        monthStats[m].dueAmount += p.amount || MONTHLY_INSTALLMENT_AMOUNT;
      } else {
        monthStats[m].upcomingShares += 1;
      }
    }

    if (!share.isClosed) {
      totalDueMonths += share.dueMonths;
      totalDuePrincipal += share.dueAmount;
      totalLateFeeDue += share.lateFee;
    }
  }

  const totalBankDeposit = totalAdmissionCollected + totalMonthlyCollected + totalLateFeeCollected;
  const totalOutstandingDue = totalDuePrincipal + totalLateFeeDue;

  // Collection efficiency: Total Deposited / (Total Deposited + Principal Due) * 100
  const totalPotential = totalBankDeposit + totalDuePrincipal;
  const collectionEfficiency = totalPotential > 0
    ? Math.round((totalBankDeposit / totalPotential) * 1000) / 10
    : 100;

  return {
    totalActiveShares,
    totalMembers: uniqueMemberNames.size,
    totalShareIds,
    totalAdmissionCollected,
    totalMonthlyCollected,
    totalLateFeeCollected,
    totalBankDeposit,
    totalDueMonths,
    totalDuePrincipal,
    totalLateFeeDue,
    totalOutstandingDue,
    collectionEfficiency,
    monthStats,
  };
}

/**
 * Format currency in Bangladeshi Taka (৳)
 */
export function formatTaka(amount: number, showDecimalsIfAny: boolean = true): string {
  if (amount === undefined || amount === null || isNaN(amount)) return 'Tk. 0';
  const hasDecimals = amount % 1 !== 0;
  if (hasDecimals && showDecimalsIfAny) {
    return 'Tk. ' + Number(amount.toFixed(2)).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return 'Tk. ' + Math.round(amount).toLocaleString('en-IN');
}

/**
 * Number to words in BDT format (for Money Receipts)
 */
export function takaInWords(amount: number): string {
  if (amount === 0) return 'Zero Taka Only';
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertGroup(n: number): string {
    let out = '';
    if (n >= 100) {
      out += units[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      out += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      out += teens[n - 10] + ' ';
      return out;
    }
    if (n > 0) {
      out += units[n] + ' ';
    }
    return out;
  }

  const rounded = Math.round(amount);
  let crore = Math.floor(rounded / 10000000);
  let remainder = rounded % 10000000;
  let lakh = Math.floor(remainder / 100000);
  remainder %= 100000;
  let thousand = Math.floor(remainder / 1000);
  let hundred = remainder % 1000;

  let words = '';
  if (crore > 0) words += convertGroup(crore) + 'Crore ';
  if (lakh > 0) words += convertGroup(lakh) + 'Lakh ';
  if (thousand > 0) words += convertGroup(thousand) + 'Thousand ';
  if (hundred > 0) words += convertGroup(hundred);

  return (words.trim() + ' Taka Only').replace(/\s+/g, ' ');
}

/**
 * Dynamic Chronological Month Key:
 * Determines the live calendar month key (e.g. 'Nov-26', 'Dec-26', 'Jan-27').
 */
export function getCurrentSystemMonthKey(date: Date = new Date()): string {
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const m = MONTH_NAMES[date.getMonth()];
  const y = String(date.getFullYear()).slice(-2);
  return `${m}-${y}`;
}

/**
 * Format month key to full localized display label (e.g., 'Nov-26' => 'নভেম্বর ২০২৬' or 'November 2026').
 */
export function formatMonthLabel(monthKey: string, isBn: boolean = false): string {
  if (!monthKey) return '';
  const [shortMonth, shortYear] = monthKey.split('-');
  const fullYear = shortYear ? `20${shortYear}` : '';

  const BN_MONTH_MAP: Record<string, string> = {
    Jan: 'জানুয়ারি',
    Feb: 'ফেব্রুয়ারি',
    Mar: 'মার্চ',
    Apr: 'এপ্রিল',
    May: 'মে',
    Jun: 'জুন',
    Jul: 'জুলাই',
    Aug: 'আগস্ট',
    Sep: 'সেপ্টেম্বর',
    Oct: 'অক্টোবর',
    Nov: 'নভেম্বর',
    Dec: 'ডিসেম্বর',
  };

  const EN_MONTH_MAP: Record<string, string> = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  if (isBn) {
    const bnMonth = BN_MONTH_MAP[shortMonth] || shortMonth;
    const bnYear = fullYear.replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[parseInt(d, 10)]);
    return `${bnMonth} ${bnYear}`;
  }

  const enMonth = EN_MONTH_MAP[shortMonth] || shortMonth;
  return `${enMonth} ${fullYear}`;
}
