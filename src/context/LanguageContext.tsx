import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export type Language = 'en' | 'bn';

export const translations = {
  en: {
    // Navbar
    societyName: 'PROGRESSIVE ASSOCIATION SOCIETY',
    fundPortal: 'FY 26-27',
    portalSubtitle: 'Member Fund & Installment Management System',
    syncSheet: 'Sync Sheet',
    sheetSynced: 'Sheet Synced',
    recordPayment: 'Record Payment',
    addShare: 'Add Share',
    export: 'Export',
    print: 'Print',
    reset: 'Reset',
    admin: 'Admin',
    adminLogin: 'Admin Login',
    logout: 'Logout',

    // Summary Cards
    totalActiveShares: 'Total Active Shares',
    sharesEnrolled: 'Shares Enrolled',
    members: 'Members',
    totalAllottedIds: 'Total Allotted IDs',
    totalFundDeposited: 'Total Fund Deposited',
    verified: 'Verified',
    admissionFee: 'Admission Fee',
    monthlyInstallments: 'Monthly Installments',
    lateFeeRealized: 'Late Fee Realized',
    totalOutstandingDues: 'Total Outstanding Dues',
    monthsOverdue: 'Months Overdue',
    principalDue: 'Principal Due',
    lateFeeFine: 'Late Fee / Fine',
    policyStage: 'Policy Stage',

    // Tabs & Filters
    tabMasterLedger: 'Master Ledger',
    tabMemberCards: 'Member Cards',
    tabMonthBreakdown: 'Month Breakdown',
    tabOverdue: 'Overdue',
    tabMembersDirectory: 'Members Directory',
    tabLandDeeds: 'Trust Deed & Rules',
    filterAll: 'All',
    filterDue: 'Due',
    filterPaid: 'Paid',
    filterClosed: 'Closed',
    searchPlaceholder: 'Search name, PAS-ID...',
    records: 'Records',

    // Master Ledger
    ledgerTitle: 'Comprehensive Share & Installment Ledger',
    currentMonth: 'Current Month',
    monthSettings: 'Month Settings',
    colSl: 'SL',
    colMemberName: 'Member Name',
    colShareId: 'Share ID',
    colAdmissionFee: 'Admission Fee',
    colTotalDeposit: 'Total Deposit',
    colDueMths: 'Due Mths',
    colDueAmount: 'Due Amount',
    colLateFeeFine: 'Late Fee / Fine',
    colTotalDue: 'Total Due',
    colLateFeePaid: 'Late Fee Paid',
    colActions: 'Actions',
    colDate: 'Date',
    colAmount: 'Amount',
    statusPaid: 'Paid',
    statusDue: 'Due',
    grandTotal: 'GRAND TOTAL',
    payBtn: 'Pay',

    // Record Payment Modal
    recordPaymentTitle: 'Record Payment',
    recordPaymentSubtitle: 'Post installment collection to society ledger',
    memberAndShare: 'Member & Share',
    deposited: 'Deposited',
    outstandingDue: 'Outstanding Due',
    selectMonths: 'Select Months',
    allDues: 'All Dues',
    current: 'Current',
    advance: '+ Advance',
    clear: 'Clear',
    alreadyPaid: 'Already Paid',
    revert: 'Revert',
    includeLateFee: 'Include Overdue Late Fee',
    uncheckToWaive: 'Uncheck to waive',
    amountToPay: 'Amount to Pay (Tk.)',
    resetCalculated: 'Reset',
    paymentDate: 'Payment Date',
    paymentMethod: 'Payment Method',
    depositSlipRef: 'Deposit Slip / Ref #',
    confirmPayment: 'Confirm Payment',
    cancel: 'Cancel',

    // Calculation Breakdown Modal
    breakdownTitle: 'Due & Late Fee Breakdown',
    member: 'Member',
    totalPayable: 'Total Outstanding Payable',
    fine: 'Fine',
    evaluatingDay: 'Evaluating Day',
    policyTimeline: 'Monthly Fine Policy Timeline',
    resetToToday: 'Reset to Today',
    stage1Name: 'Regular Due',
    stage1Desc: 'No fine added',
    stage2Name: '+150 Fine',
    stage2Desc: 'Fixed penalty',
    stage3Name: '+15% Surcharge',
    stage3Desc: 'Compound fee',
    calculationSteps: 'Step-by-Step Calculation Breakdown',
    copyNotice: 'Copy Due Notice',
    copied: 'Copied!',
    close: 'Close',
    collectPayment: 'Collect Payment',

    // Member Cards View
    upToDate: 'Clean',
    overdue: 'Overdue',
    fullLedger: 'Full Ledger',
    postPayment: 'Record Payment',
    calculationBreakdown: 'Calculation Breakdown',
    installmentTimeline: 'Installment Timeline',

    // Overdue Reminders View
    overdueConsoleTitle: 'Outstanding Due & Late Fee Recovery Console',
    totalDues: 'Total Dues',
    missedMonths: 'Missed Months',
    principal: 'Principal',
    totalOutstanding: 'Total Outstanding',
    whatsAppNotice: 'WhatsApp Notice',
    copy: 'Copy',
    clearDue: 'Clear Due',
    waiveLateFee: 'Waive Late Fee',
  },
  bn: {
    // Navbar
    societyName: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
    fundPortal: 'অর্থবছর ২৬-২৭',
    portalSubtitle: 'সদস্য তহবিল ও কিস্তি ব্যবস্থাপনা সিস্টেম',
    syncSheet: 'শিট সিঙ্ক',
    sheetSynced: 'শিট সংযুক্ত',
    recordPayment: 'পেমেন্ট এন্ট্রি',
    addShare: 'নতুন শেয়ার',
    export: 'এক্সপোর্ট',
    print: 'প্রিন্ট',
    reset: 'রিসেট',
    admin: 'অ্যাডমিন',
    adminLogin: 'অ্যাডমিন লগইন',
    logout: 'লগআউট',

    // Summary Cards
    totalActiveShares: 'মোট সক্রিয় শেয়ার',
    sharesEnrolled: 'শেয়ার অন্তর্ভুক্ত',
    members: 'সদস্য',
    totalAllottedIds: 'মোট বরাদ্দকৃত আইডি',
    totalFundDeposited: 'মোট জমাকৃত তহবিল',
    verified: 'যাচাইকৃত',
    admissionFee: 'ভর্তি ফি',
    monthlyInstallments: 'মাসিক কিস্তি',
    lateFeeRealized: 'আদায়কৃত জরিমানা',
    totalOutstandingDues: 'মোট বকেয়া পাওনা',
    monthsOverdue: 'মাসের বকেয়া',
    principalDue: 'মূল কিস্তি',
    lateFeeFine: 'বিলম্ব জরিমানা',
    policyStage: 'পলিসি স্টেজ',

    // Tabs & Filters
    tabMasterLedger: 'মাস্টার লেজার',
    tabMemberCards: 'সদস্য কার্ডস',
    tabMonthBreakdown: 'মাসিক হিসাব',
    tabOverdue: 'বকেয়া তালিকা',
    tabMembersDirectory: 'সদস্য ডিরেক্টরি',
    tabLandDeeds: 'ট্রাস্ট দলিল ও বিধিমালা',
    filterAll: 'সকল',
    filterDue: 'বকেয়া',
    filterPaid: 'পরিশোধিত',
    filterClosed: 'বন্ধ',
    searchPlaceholder: 'নাম বা PAS আইডি খুঁজুন...',
    records: 'রেকর্ড',

    // Master Ledger
    ledgerTitle: 'শেয়ার ও কিস্তির পূর্ণাঙ্গ লেজার',
    currentMonth: 'চলতি মাস',
    monthSettings: 'মাসিক সেটিংস',
    colSl: 'ক্রম',
    colMemberName: 'সদস্যের নাম',
    colShareId: 'শেয়ার আইডি',
    colAdmissionFee: 'ভর্তি ফি',
    colTotalDeposit: 'মোট জমা',
    colDueMths: 'বকেয়া মাস',
    colDueAmount: 'বকেয়া কিস্তি',
    colLateFeeFine: 'বিলম্ব জরিমানা',
    colTotalDue: 'মোট প্রদেয়',
    colLateFeePaid: 'পরিশোধিত জরিমানা',
    colActions: 'অ্যাকশন',
    colDate: 'তারিখ',
    colAmount: 'পরিমাণ',
    statusPaid: 'পরিশোধিত',
    statusDue: 'বকেয়া',
    grandTotal: 'সর্বমোট',
    payBtn: 'পেমেন্ট',

    // Record Payment Modal
    recordPaymentTitle: 'পেমেন্ট গ্রহণ',
    recordPaymentSubtitle: 'লেজারে সদস্য কিস্তি জমার তথ্য পোস্ট করুন',
    memberAndShare: 'মেম্বার ও শেয়ার',
    deposited: 'মোট জমা',
    outstandingDue: 'বকেয়া পাওনা',
    selectMonths: 'মাস নির্বাচন করুন',
    allDues: 'সকল বকেয়া',
    current: 'চলতি মাস',
    advance: '+ অগ্রিম',
    clear: 'মুছুন',
    alreadyPaid: 'ইতোমধ্যে পরিশোধিত',
    revert: 'বাতিল',
    includeLateFee: 'বকেয়া জরিমানা যোগ করুন',
    uncheckToWaive: 'মওকুফ করতে টিক তুলুন',
    amountToPay: 'প্রদেয় টাকার পরিমাণ (৳)',
    resetCalculated: 'রিসেট',
    paymentDate: 'পেমেন্টের তারিখ',
    paymentMethod: 'পেমেন্ট মাধ্যম',
    depositSlipRef: 'জমা রসিদ / রেফারেন্স নং',
    confirmPayment: 'পেমেন্ট নিশ্চিত করুন',
    cancel: 'বাতিল',

    // Calculation Breakdown Modal
    breakdownTitle: 'বকেয়া ও জরিমানার বিস্তারিত হিসাব',
    member: 'সদস্য',
    totalPayable: 'মোট বকেয়া প্রদেয়',
    fine: 'জরিমানা',
    evaluatingDay: 'মূল্যায়ন দিবস',
    policyTimeline: 'মাসিক জরিমানা নীতি টাইমলাইন',
    resetToToday: 'আজকের দিনে ফিরুন',
    stage1Name: 'নিয়মিত কিস্তি',
    stage1Desc: 'কোনো জরিমানা নেই',
    stage2Name: '+১৫০ জরিমানা',
    stage2Desc: 'নির্দিষ্ট জরিমানা',
    stage3Name: '+১৫% সারচার্জ',
    stage3Desc: 'যৌগিক সারচার্জ',
    calculationSteps: 'ধাপভিত্তিক গণনার বিস্তারিত হিসাব',
    copyNotice: 'নোটিশ কপি করুন',
    copied: 'কপি হয়েছে!',
    close: 'বন্ধ',
    collectPayment: 'পেমেন্ট নিন',

    // Member Cards View
    upToDate: 'পরিশোধিত',
    overdue: 'বকেয়া',
    fullLedger: 'পূর্ণাঙ্গ লেজার',
    postPayment: 'পেমেন্ট এন্ট্রি',
    calculationBreakdown: 'হিসাবের ব্রেকডাউন',
    installmentTimeline: 'কিস্তির টাইমলাইন',

    // Overdue Reminders View
    overdueConsoleTitle: 'বকেয়া ও জরিমানা আদায় কনসোল',
    totalDues: 'মোট বকেয়া',
    missedMonths: 'অপরিশোধিত মাস',
    principal: 'মূল কিস্তি',
    totalOutstanding: 'সর্বমোট বকেয়া',
    whatsAppNotice: 'হোয়াটসঅ্যাপ নোটিশ',
    copy: 'কপি',
    clearDue: 'বকেয়া আদায়',
    waiveLateFee: 'জরিমানা মওকুফ',
  },
};

export type TranslationKey = keyof typeof translations['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'pas_dashboard_language_v1';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'bn' || saved === 'en') return saved;
    } catch (e) {}
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const t = useMemo(() => {
    return (key: TranslationKey): string => {
      return translations[language][key] || translations['en'][key] || key;
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

