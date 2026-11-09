import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateShareRecord,
  calculateSocietySummary,
  calculateCompoundDue,
  getPenaltyStage,
  formatTaka,
  takaInWords,
  getCurrentSystemMonthKey,
  formatMonthLabel,
} from './calculations.ts';
import { INITIAL_SHARES } from '../data/initialData.ts';
import type { ShareRecord } from '../types.ts';

test('calculateCompoundDue matches user exact timeline and compounding values', () => {
  // Month 1: 1 due month
  // Day 1-15: 2800
  const m1_s1 = calculateCompoundDue(1, 10);
  assert.equal(m1_s1.totalDue, 2800);
  assert.equal(m1_s1.penaltyDue, 0);
  assert.equal(m1_s1.principalDue, 2800);

  // Day 16-20: 2800 + 150 = 2950
  const m1_s2 = calculateCompoundDue(1, 18);
  assert.equal(m1_s2.totalDue, 2950);
  assert.equal(m1_s2.penaltyDue, 150);

  // Day 21-End: 2950 + 15% = 3392.50
  const m1_s3 = calculateCompoundDue(1, 25);
  assert.equal(m1_s3.totalDue, 3392.50);
  assert.equal(m1_s3.penaltyDue, 592.50);

  // Month 2: 2 due months
  // Day 1-15: 3392.50 + 2800 = 6192.50
  const m2_s1 = calculateCompoundDue(2, 10);
  assert.equal(m2_s1.totalDue, 6192.50);
  assert.equal(m2_s1.principalDue, 5600);
  assert.equal(m2_s1.penaltyDue, 592.50);

  // Day 16-20: 6192.50 + 150 = 6342.50
  const m2_s2 = calculateCompoundDue(2, 18);
  assert.equal(m2_s2.totalDue, 6342.50);
  assert.equal(m2_s2.penaltyDue, 742.50);

  // Day 21-End: 6342.50 + 15% = 7293.875
  const m2_s3 = calculateCompoundDue(2, 25);
  assert.equal(m2_s3.totalDue, 7293.875);
  assert.equal(m2_s3.penaltyDue, 1693.875);
});

test('calculateShareRecord calculates paid share correctly', () => {
  const share: ShareRecord = {
    id: 'PAS-01',
    memberName: 'Test Member',
    admissionFee: 5000,
    months: {
      'Aug-26': { status: 'paid', amount: 2800 },
      'Sep-26': { status: 'paid', amount: 2800 },
      'Oct-26': { status: 'paid', amount: 2800 },
      'Nov-26': { status: 'upcoming', amount: 2800 },
      'Dec-26': { status: 'upcoming', amount: 2800 },
    },
    totalDeposit: 0,
    dueMonths: 0,
    dueAmount: 0,
    lateFee: 0,
    totalDue: 0,
    lateFeePaid: 0,
  };

  const calculated = calculateShareRecord(share);
  assert.equal(calculated.totalDeposit, 13400); // 5000 + 3*2800
  assert.equal(calculated.dueMonths, 0);
  assert.equal(calculated.dueAmount, 0);
  assert.equal(calculated.lateFee, 0);
  assert.equal(calculated.totalDue, 0);
});

test('calculateShareRecord calculates due share and late fee correctly', () => {
  const share: ShareRecord = {
    id: 'PAS-19',
    memberName: 'Md Mohaiminul Islam',
    admissionFee: 5000,
    months: {
      'Aug-26': { status: 'paid', amount: 2800 },
      'Sep-26': { status: 'due', amount: 2800 },
      'Oct-26': { status: 'due', amount: 2800 },
      'Nov-26': { status: 'upcoming', amount: 2800 },
      'Dec-26': { status: 'upcoming', amount: 2800 },
    },
    totalDeposit: 0,
    dueMonths: 0,
    dueAmount: 0,
    lateFee: 0,
    totalDue: 0,
    lateFeePaid: 0,
  };

  // When evaluated in October 2026:
  // On day 10 (Stage 1: 1-15th): Month 1 compounded (3392.5) + Month 2 installment (2800) = 6192.5
  const octDay10 = calculateShareRecord(share, 10, 'Oct-26');
  assert.equal(octDay10.totalDeposit, 7800); // 5000 + 2800
  assert.equal(octDay10.dueMonths, 2);
  assert.equal(octDay10.dueAmount, 5600);
  assert.equal(octDay10.lateFee, 592.5); // 3392.5 - 2800
  assert.equal(octDay10.totalDue, 6192.5);

  // On day 18 (Stage 2: 16-20th): 6192.5 + 150 = 6342.5
  const octDay18 = calculateShareRecord(share, 18, 'Oct-26');
  assert.equal(octDay18.lateFee, 742.5);
  assert.equal(octDay18.totalDue, 6342.5);

  // On day 25 (Stage 3: 21-End): 6342.5 + 15% = 7293.875
  const octDay25 = calculateShareRecord(share, 25, 'Oct-26');
  assert.equal(octDay25.lateFee, 1693.875);
  assert.equal(octDay25.totalDue, 7293.875);

  // When evaluated on Day 9 of November (both Sep-26 and Oct-26 are completed past overdue months):
  const novDay9 = calculateShareRecord(share, 9, 'Nov-26');
  assert.equal(novDay9.dueMonths, 2);
  assert.equal(novDay9.dueAmount, 5600);
  assert.equal(novDay9.lateFee, 1693.875); // Sep (592.5) + Oct (1101.375)
  assert.equal(novDay9.totalDue, 7293.875);

  // When evaluated on Day 18 of November (after 15th: Nov automatically becomes 3rd due month with +150 fine):
  const novDay18 = calculateShareRecord(share, 18, 'Nov-26');
  assert.equal(novDay18.dueMonths, 3);
  assert.equal(novDay18.dueAmount, 8400);
  assert.equal(novDay18.lateFee, 1843.875); // Sep (592.5) + Oct (1101.375) + Nov fine (150)
  assert.equal(novDay18.totalDue, 10243.875);

  // When evaluated on Day 25 of November (Nov in Stage 3: +15% compound surcharge):
  const novDay25 = calculateShareRecord(share, 25, 'Nov-26');
  assert.equal(novDay25.dueMonths, 3);
  assert.equal(novDay25.dueAmount, 8400);
  assert.equal(novDay25.lateFee, 3380.456);
  assert.equal(novDay25.totalDue, 11780.456);
});

test('calculateSocietySummary matches the dynamic timeline metrics', () => {
  // Test when evaluated on Day 10 (Stage 1)
  const octShares = INITIAL_SHARES.map((s) => calculateShareRecord(s, 10, 'Oct-26'));
  const summaryOct = calculateSocietySummary(octShares, 10, 'Oct-26');

  assert.equal(summaryOct.totalActiveShares, 30, 'Total active shares must be 30');
  assert.equal(summaryOct.totalAdmissionCollected, 160000, 'Admission total must be 160,000');
  assert.equal(summaryOct.totalMonthlyCollected, 235200, 'Monthly total must be 235,200');
  assert.equal(summaryOct.totalBankDeposit, 395200, 'Total bank deposit must be 395,200');
  assert.equal(summaryOct.totalDueMonths, 6, 'Total due months must be 6 (3 members x 2 months)');
  assert.equal(summaryOct.totalDuePrincipal, 16800, 'Total due principal must be 16,800');
  assert.equal(summaryOct.totalLateFeeDue, 1777.5, 'Total late fee due on day 10 is 1777.5 (3 x 592.5)');
  assert.equal(summaryOct.totalOutstandingDue, 18577.5, 'Total outstanding due must be 18,577.5');
  assert.equal(summaryOct.collectionEfficiency, 95.9, 'Collection efficiency must be 95.9%');
  assert.equal(summaryOct.monthStats['Aug-26'].paidAmount, 84000, 'Aug-26 collection must be 84,000');
  assert.equal(summaryOct.monthStats['Sep-26'].paidAmount, 75600, 'Sep-26 collection must be 75,600');
  assert.equal(summaryOct.monthStats['Oct-26'].paidAmount, 75600, 'Oct-26 collection must be 75,600');

  // Test live on Day 9 (Sep and Oct completed cycles = 1,693.875 each):
  const liveShares = INITIAL_SHARES.map((s) => calculateShareRecord(s, 9, 'Nov-26'));
  const summaryNov = calculateSocietySummary(liveShares, 9);
  assert.equal(summaryNov.totalLateFeeDue, 5081.625, 'Total late fee due on day 9 is 5081.625 (3 x 1693.875)');
  assert.equal(summaryNov.totalOutstandingDue, 21881.625, 'Total outstanding due on day 9 must be 21,881.625');
});

test('formatTaka formats correctly', () => {
  assert.equal(formatTaka(395200), 'Tk. 3,95,200');
  assert.equal(formatTaka(17640), 'Tk. 17,640');
});

test('takaInWords produces proper English words', () => {
  assert.equal(takaInWords(2800), 'Two Thousand Eight Hundred Taka Only');
  assert.equal(takaInWords(5000), 'Five Thousand Taka Only');
});

test('formatSharesForSheet generates exact Image 2 layout with 38 rows and perfect member groupings', async () => {
  const { formatSharesForSheet } = await import('../services/googleSheets.ts');
  const summary = calculateSocietySummary(INITIAL_SHARES);
  const rows = formatSharesForSheet(INITIAL_SHARES, summary);

  // Exactly 6 header rows + 31 data rows + 1 grand total = 38 rows
  assert.equal(rows.length, 38);

  // Row 1 & 2: Title Banners
  assert.equal(rows[0][0], 'PROGRESSIVE ASSOCIATION SOCIETY');
  assert.equal(rows[1][0], 'MEMBER PAYMENT & INSTALLMENT DASHBOARD');

  // Row 3: KPI Headers
  assert.equal(rows[2][0], 'TOTAL ACTIVE SHARES');
  assert.equal(rows[2][2], 'TOTAL BANK DEPOSIT');
  assert.equal(rows[2][7], 'TOTAL OUTSTANDING DUE');
  assert.equal(rows[2][13], 'COLLECTION EFFICIENCY');

  // Row 5 & 6: 2-tier column headers
  assert.equal(rows[4][0], 'SL');
  assert.equal(rows[4][1], 'Member Name');
  assert.equal(rows[4][2], 'Share ID');
  assert.equal(rows[4][3], 'Admission Fee');
  assert.equal(rows[4][4], 'Month of Aug-26');
  assert.equal(rows[5][4], 'Date');
  assert.equal(rows[5][5], 'Amount');

  // Row 7 (First data row): Md Fuad Bin Rahman (PAS-01)
  assert.equal(rows[6][0], '01');
  assert.equal(rows[6][1], 'Md Fuad Bin Rahman');
  assert.equal(rows[6][2], 'PAS-01');

  // Row 8 & 9: PAS-02 & PAS-03 have blank SL and blank member name for merged grouping in Image 2
  assert.equal(rows[7][0], '');
  assert.equal(rows[7][1], '');
  assert.equal(rows[7][2], 'PAS-02');

  assert.equal(rows[8][0], '');
  assert.equal(rows[8][1], '');
  assert.equal(rows[8][2], 'PAS-03');

  // Row 10: Md Asaduzzaman Nahid (PAS-04)
  assert.equal(rows[9][0], '02');
  assert.equal(rows[9][1], 'Md Asaduzzaman Nahid');
  assert.equal(rows[9][2], 'PAS-04');

  // Row 37: Closed Id
  assert.equal(rows[36][1], 'Closed Id');
  assert.equal(rows[36][2], 'PAS-12,13');
  assert.equal(rows[36][3], 10000);

  // Row 38: GRAND TOTAL
  assert.equal(rows[37][1], 'GRAND TOTAL');
  assert.equal(rows[37][2], '32 IDs');
  assert.equal(rows[37][3], 160000);
  assert.equal(rows[37][14], 395200);
  assert.equal(rows[37][18], summary.totalOutstandingDue);
});

test('getCurrentSystemMonthKey and formatMonthLabel handle dynamic calendar dates correctly', () => {
  // Test November 2026
  const nov2026 = new Date(2026, 10, 9); // Month 10 is November
  assert.equal(getCurrentSystemMonthKey(nov2026), 'Nov-26');
  assert.equal(formatMonthLabel('Nov-26', true), 'নভেম্বর ২০২৬');
  assert.equal(formatMonthLabel('Nov-26', false), 'November 2026');

  // Test December 2026 rollover
  const dec2026 = new Date(2026, 11, 1); // Month 11 is December
  assert.equal(getCurrentSystemMonthKey(dec2026), 'Dec-26');
  assert.equal(formatMonthLabel('Dec-26', true), 'ডিসেম্বর ২০২৬');

  // Test January 2027 rollover
  const jan2027 = new Date(2027, 0, 1); // Month 0 is January
  assert.equal(getCurrentSystemMonthKey(jan2027), 'Jan-27');
  assert.equal(formatMonthLabel('Jan-27', true), 'জানুয়ারি ২০২৭');
});
