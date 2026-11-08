export type MonthKey = 'Aug-26' | 'Sep-26' | 'Oct-26' | 'Nov-26' | 'Dec-26' | string;

export const ALL_MONTHS: MonthKey[] = ['Aug-26', 'Sep-26', 'Oct-26', 'Nov-26', 'Dec-26'];

export type PaymentStatus = 'paid' | 'due' | 'upcoming';

export interface MonthPayment {
  status: PaymentStatus;
  date?: string; // DD.MM.YY format, e.g. "15.08.26"
  amount: number;
  paymentMethod?: string; // 'Bank Deposit' | 'bKash' | 'Nagad' | 'Cash'
  receiptNo?: string;
  notes?: string;
}

export interface ShareRecord {
  id: string; // e.g., "PAS-01", "PAS-12,13"
  sl?: number | string;
  memberName: string;
  phone?: string;
  address?: string;
  nid?: string;
  admissionFee: number;
  months: Record<string, MonthPayment>;
  totalDeposit: number;
  dueMonths: number;
  dueAmount: number;
  lateFee: number;
  totalDue: number;
  lateFeePaid: number;
  isClosed?: boolean;
}

export interface MemberDirectoryItem {
  name: string;
  phone: string;
  address: string;
  nid: string;
  shareIds: string[];
  sharesCount: number;
  totalFunded: number;
  totalAdmission: number;
  totalDue: number;
  dueMonths: number;
  status: 'clean' | 'due' | 'closed';
}

export interface SocietySummary {
  totalActiveShares: number;
  totalMembers: number;
  totalShareIds: number;
  totalAdmissionCollected: number;
  totalMonthlyCollected: number;
  totalLateFeeCollected: number;
  totalBankDeposit: number;
  totalDueMonths: number;
  totalDuePrincipal: number;
  totalLateFeeDue: number;
  totalOutstandingDue: number;
  collectionEfficiency: number;
  monthStats: Record<string, {
    paidShares: number;
    paidAmount: number;
    dueShares: number;
    dueAmount: number;
    upcomingShares: number;
  }>;
}

export interface PaymentTransaction {
  id: string;
  shareId: string;
  memberName: string;
  month: MonthKey;
  amount: number;
  lateFee: number;
  totalPaid: number;
  date: string;
  paymentMethod: string;
  slipOrRefNo?: string;
  collectedBy?: string;
  timestamp: number;
}

export type DeedType = 'saf_kobala' | 'mutation' | 'bayna' | 'power_of_attorney' | 'khajna_dakhila' | 'other';

export interface DeedImagePage {
  pageNumber: number;
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export interface DeedRecord {
  id: string; // e.g. "DEED-01"
  deedNo: string; // e.g. "4521/2024" or "৪৫২১/২০২৪"
  deedDate: string; // e.g. "12.04.2024"
  registryOffice: string; // Sub-registry office
  deedType: DeedType;
  mouza: string; // Mouza name
  jlNo?: string; // JL No
  khatianNo: {
    cs?: string;
    sa?: string;
    rs?: string;
    bs?: string;
  };
  dagNo: string; // Dag / Plot No
  landArea: string; // Text description e.g. "12.50 Decimals (7.5 Katha)"
  landAreaDecimal: number; // Numeric decimals for aggregations
  buyerName: string; // Buyer / Organization name
  sellerName: string; // Seller / Donor name
  totalValueTaka: number; // Deed valuation in Taka
  status: 'registered' | 'mutation_completed' | 'under_process';
  khajnaUpdatedYear?: string; // Latest land tax year
  mutationCaseNo?: string; // Mutation case reference
  pagesCount: number;
  pages: DeedImagePage[];
  notes?: string;
}
