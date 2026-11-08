import { DeedRecord } from '../types';

// Helper to generate crisp, authentic Government of Bangladesh deed scan SVG preview
export function generateDeedScanSvg(params: {
  deedNo: string;
  deedTypeTitle: string;
  date: string;
  mouza: string;
  dagNo: string;
  khatianNo: string;
  area: string;
  seller: string;
  buyer: string;
  office: string;
  pageNumber: number;
  totalPages: number;
}): string {
  const {
    deedNo,
    deedTypeTitle,
    date,
    mouza,
    dagNo,
    khatianNo,
    area,
    seller,
    buyer,
    office,
    pageNumber,
    totalPages,
  } = params;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1130" width="100%" height="100%">
    <defs>
      <linearGradient id="stampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#14532d" />
        <stop offset="100%" stop-color="#166534" />
      </linearGradient>
      <pattern id="paperTexture" width="100" height="100" patternUnits="userSpaceOnUse">
        <rect width="100" height="100" fill="#fdfbf7" />
        <path d="M0 20 L100 20 M0 40 L100 40 M0 60 L100 60 M0 80 L100 80" stroke="#f1ede4" stroke-width="0.5" />
      </pattern>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.15" />
      </filter>
    </defs>

    <!-- Parchment Paper Background -->
    <rect width="800" height="1130" fill="url(#paperTexture)" />
    <rect x="25" y="25" width="750" height="1080" fill="none" stroke="#d5c8ad" stroke-width="2" />
    <rect x="32" y="32" width="736" height="1066" fill="none" stroke="#e6dbc7" stroke-width="1" />

    <!-- Official Non-Judicial Bangladesh Stamp Header -->
    <g transform="translate(50, 45)">
      <!-- Stamp Box -->
      <rect x="0" y="0" width="700" height="130" rx="8" fill="url(#stampGrad)" filter="url(#shadow)" />
      
      <!-- Stamp Ornamental Border -->
      <rect x="6" y="6" width="688" height="118" rx="6" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="8,4" />
      
      <!-- Emblem & Title -->
      <circle cx="70" cy="65" r="38" fill="#15803d" stroke="#fef08a" stroke-width="2" />
      <text x="70" y="60" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#fef08a" text-anchor="middle">গণপ্রজাতন্ত্রী</text>
      <text x="70" y="76" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ffffff" text-anchor="middle">বাংলাদেশ</text>
      
      <!-- Stamp Value -->
      <text x="630" y="55" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#fef08a" text-anchor="middle">বাংলাদেশ স্ট্যাম্প</text>
      <text x="630" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="900" fill="#ffffff" text-anchor="middle">১০০ ৳</text>
      <text x="630" y="105" font-family="Arial, sans-serif" font-size="10" fill="#86efac" text-anchor="middle">NON-JUDICIAL STAMP</text>

      <!-- Center Text in Stamp -->
      <text x="350" y="45" font-family="'SolaimanLipi', Arial, sans-serif" font-size="20" font-weight="bold" fill="#fef08a" text-anchor="middle">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</text>
      <text x="350" y="72" font-family="Arial, sans-serif" font-size="15" font-weight="bold" fill="#ffffff" text-anchor="middle">${deedTypeTitle}</text>
      <text x="350" y="98" font-family="Arial, sans-serif" font-size="11" fill="#bbf7d0" text-anchor="middle">নিবন্ধন ও রেকর্ড সংরক্ষণ কার্যালয় &bull; সাব-রেজিস্ট্রার কার্যালয়</text>
    </g>

    <!-- Sub-Registry Red Seal / Rubber Stamp (Rotated for realism) -->
    <g transform="translate(620, 220) rotate(-12)">
      <circle cx="0" cy="0" r="50" fill="none" stroke="#dc2626" stroke-width="3" stroke-opacity="0.85" />
      <circle cx="0" cy="0" r="42" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,2" stroke-opacity="0.85" />
      <text x="0" y="-20" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#dc2626" text-anchor="middle" letter-spacing="1">REGISTERED &amp; VERIFIED</text>
      <text x="0" y="-3" font-family="Arial, sans-serif" font-size="13" font-weight="900" fill="#dc2626" text-anchor="middle">${deedNo}</text>
      <text x="0" y="16" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#dc2626" text-anchor="middle">${date}</text>
      <text x="0" y="30" font-family="Arial, sans-serif" font-size="8" fill="#dc2626" text-anchor="middle">SUB-REGISTRAR</text>
    </g>

    <!-- Document Info Box -->
    <g transform="translate(60, 200)">
      <rect x="0" y="0" width="460" height="90" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
      
      <text x="15" y="25" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">দলিল নং (Deed No):</text>
      <text x="160" y="25" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a">${deedNo}</text>

      <text x="15" y="48" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">রেজিস্ট্রির তারিখ:</text>
      <text x="160" y="48" font-family="Arial, sans-serif" font-size="12" font-weight="semibold" fill="#0f172a">${date}</text>

      <text x="15" y="71" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569">সাব-রেজিস্ট্রি অফিস:</text>
      <text x="160" y="71" font-family="Arial, sans-serif" font-size="12" font-weight="semibold" fill="#0f172a">${office}</text>
    </g>

    <!-- Main Deed Body Legal Text -->
    <g transform="translate(60, 315)">
      <!-- Heading -->
      <line x1="0" y1="0" x2="680" y2="0" stroke="#cbd5e1" stroke-width="1.5" />
      <text x="340" y="25" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#0f172a" text-anchor="middle">।। চিরস্থায়ী শর্তহীন জমি হস্তান্তর দলিল ।।</text>
      <line x1="180" y1="32" x2="500" y2="32" stroke="#059669" stroke-width="2" />

      <!-- Paragraph 1: Parties -->
      <text x="0" y="65" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">১ম পক্ষ (দাতা / বিক্রেতা):</text>
      <rect x="0" y="75" width="680" height="42" rx="6" fill="#f1f5f9" stroke="#e2e8f0" />
      <text x="15" y="100" font-family="Arial, sans-serif" font-size="12" font-weight="semibold" fill="#0f172a">${seller}</text>

      <text x="0" y="140" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">২য় পক্ষ (গ্রহীতা / ক্রেতা):</text>
      <rect x="0" y="150" width="680" height="42" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
      <text x="15" y="175" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#065f46">${buyer}</text>

      <!-- Paragraph 2: Land Schedule (তফসিল) -->
      <text x="0" y="220" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">।। হস্তান্তরিত ভূমির তফসিল পরিচয় ।।</text>
      
      <!-- Table Grid for Schedule -->
      <g transform="translate(0, 235)">
        <rect x="0" y="0" width="680" height="150" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        
        <!-- Table Header -->
        <rect x="0" y="0" width="680" height="35" rx="8" fill="#f8fafc" />
        <line x1="0" y1="35" x2="680" y2="35" stroke="#cbd5e1" />
        
        <!-- Vertical Dividers -->
        <line x1="170" y1="0" x2="170" y2="150" stroke="#e2e8f0" />
        <line x1="340" y1="0" x2="340" y2="150" stroke="#e2e8f0" />
        <line x1="510" y1="0" x2="510" y2="150" stroke="#e2e8f0" />

        <text x="85" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">মৌজা ও জে.এল</text>
        <text x="255" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">খতিয়ান নং</text>
        <text x="425" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">দাগ নং (Plot)</text>
        <text x="595" y="22" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">জমির পরিমাণ</text>

        <!-- Values -->
        <text x="85" y="65" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${mouza}</text>
        <text x="85" y="85" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">জেলা: ঢাকা</text>

        <text x="255" y="65" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#0f172a" text-anchor="middle">${khatianNo}</text>
        <text x="255" y="85" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">সিএস/এসএ/আরএস/বিএস</text>

        <text x="425" y="65" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">${dagNo}</text>
        <text x="425" y="85" font-family="Arial, sans-serif" font-size="11" fill="#64748b" text-anchor="middle">সাব্যস্ত দাগ</text>

        <text x="595" y="65" font-family="Arial, sans-serif" font-size="14" font-weight="900" fill="#0f172a" text-anchor="middle">${area}</text>
        <text x="595" y="85" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">পরিমাপ নির্ভুল</text>
      </g>

      <!-- Paragraph 3: Boundary & Declaration -->
      <g transform="translate(0, 410)">
        <text x="0" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">চৌহদ্দি বিবরণ (Boundaries):</text>
        <text x="0" y="42" font-family="Arial, sans-serif" font-size="11" fill="#334155">উত্তরে: ২০ ফুট চওড়া কাঁচা/পাকা রাস্তা &bull; দক্ষিণে: দাতার নিজ অবশিষ্ট ভূমি &bull; পূর্বে: দাগ নং ৮৪১ এর সীমানা &bull; পশ্চিমে: সরকারি খাল ও বাঁধ।</text>
        
        <text x="0" y="75" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#1e293b">ঘোষণা ও দায়মুক্তির অঙ্গীকার:</text>
        <text x="0" y="95" font-family="Arial, sans-serif" font-size="11" fill="#334155" width="680">অদ্য তারিখে সমুদয় পণ মূল্য এককালীন বুঝে পাইয়া উপরোক্ত তপশীল বর্ণিত জমি নিঃস্বত্ব ও নিষ্কলঙ্ক অবস্থায় ২য় পক্ষের অনুকূলে চিরস্থায়ীভাবে হস্তান্তর ও দখল বুঝাইয়া দেওয়া হইল। অত্র জমি কোনো প্রকার ঋণ, দায়, বায়না বা বিজ্ঞপ্তির আওতাভুক্ত নহে।</text>
      </g>
    </g>

    <!-- Signatures Section at Bottom -->
    <g transform="translate(60, 930)">
      <line x1="0" y1="0" x2="680" y2="0" stroke="#cbd5e1" stroke-width="1" />
      
      <!-- Seller Signature -->
      <g transform="translate(40, 20)">
        <path d="M10 35 Q 30 15, 60 25 T 120 20 T 150 35" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="45" x2="160" y2="45" stroke="#94a3b8" stroke-dasharray="2,2" />
        <text x="80" y="62" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">১ম পক্ষ (দাতার স্বাক্ষর ও টিপ)</text>
      </g>

      <!-- Witnesses / Secretary Signature -->
      <g transform="translate(260, 20)">
        <path d="M10 25 Q 40 40, 80 15 T 140 30" fill="none" stroke="#065f46" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="45" x2="160" y2="45" stroke="#94a3b8" stroke-dasharray="2,2" />
        <text x="80" y="62" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">সাধারণ সম্পাদক (সোসাইটি)</text>
      </g>

      <!-- Sub-Registrar Seal -->
      <g transform="translate(480, 20)">
        <path d="M20 30 Q 50 10, 90 25 T 140 20" fill="none" stroke="#991b1b" stroke-width="2" stroke-linecap="round" />
        <line x1="0" y1="45" x2="160" y2="45" stroke="#94a3b8" stroke-dasharray="2,2" />
        <text x="80" y="62" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#991b1b" text-anchor="middle">সাব-রেজিস্ট্রারের স্বাক্ষর ও সিল</text>
      </g>

      <!-- Page Number & Footer -->
      <text x="340" y="110" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#64748b" text-anchor="middle">পৃষ্ঠা নং: ${pageNumber} / ${totalPages} &bull; প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি &bull; সংরক্ষিত মূল নথি</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_DEEDS: DeedRecord[] = [
  {
    id: 'DEED-01',
    deedNo: '3842/2023',
    deedDate: '18.11.2023',
    registryOffice: 'Savar Sub-Registry Office, Dhaka',
    deedType: 'saf_kobala',
    mouza: 'Kaundia (কাউন্ডিয়া)',
    jlNo: 'JL #48',
    khatianNo: {
      cs: '124',
      sa: '189',
      rs: '412',
      bs: '608',
    },
    dagNo: '842, 843/1',
    landArea: '18.50 Decimals (11.2 Katha)',
    landAreaDecimal: 18.50,
    buyerName: 'Progressive Association Society (Rep. by President & Secretary)',
    sellerName: 'Al-Haj Md. Nurul Islam & Successors',
    totalValueTaka: 4250000,
    status: 'mutation_completed',
    khajnaUpdatedYear: '1430-1431 (2024)',
    mutationCaseNo: 'Mut. Case #2418/2024 (Namjari Complete)',
    pagesCount: 3,
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Government Stamp, Registry Seal & Parties Info',
        url: generateDeedScanSvg({
          deedNo: '3842/2023',
          deedTypeTitle: 'সাফ-কবলা হস্তান্তর দলিলপত্র',
          date: '18.11.2023',
          mouza: 'কাউন্ডিয়া (জে.এল ৪৮)',
          dagNo: '৮৪২, ৮৪৩/১',
          khatianNo: 'সিএস ১২৪ | বিএস ৬০৮',
          area: '১৮.৫০ শতক (১১.২ কাঠা)',
          seller: 'আলহাজ্ব মো: নুরুল ইসলাম ও ওয়ারিশগণ, পিতা: মৃত হাজী ওয়াহেদ আলী',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি (পক্ষে: সভাপতি ও সাধারণ সম্পাদক)',
          office: 'সাভার সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 1,
          totalPages: 3,
        }),
      },
      {
        pageNumber: 2,
        title: 'Page 2: Land Schedule, Boundaries & Demarcation Map',
        url: generateDeedScanSvg({
          deedNo: '3842/2023',
          deedTypeTitle: 'তফসিল ও চৌহদ্দি সীমানা বিবরণ',
          date: '18.11.2023',
          mouza: 'কাউন্ডিয়া (জে.এল ৪৮)',
          dagNo: '৮৪২, ৮৪৩/১',
          khatianNo: 'আরএস ৪১২ | বিএস ৬০৮',
          area: '১৮.৫০ শতক',
          seller: 'আলহাজ্ব মো: নুরুল ইসলাম (১ম পক্ষ)',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি (২য় পক্ষ)',
          office: 'সাভার সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 2,
          totalPages: 3,
        }),
      },
      {
        pageNumber: 3,
        title: 'Page 3: Signatures, Biometric Fingerprints & Registry Endorsement',
        url: generateDeedScanSvg({
          deedNo: '3842/2023',
          deedTypeTitle: 'স্বাক্ষর, টিপ ও নিবন্ধন অনুমোদন',
          date: '18.11.2023',
          mouza: 'কাউন্ডিয়া',
          dagNo: '৮৪২',
          khatianNo: 'বিএস ৬০৮',
          area: '১৮.৫০ শতক',
          seller: 'আলহাজ্ব মো: নুরুল ইসলাম',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
          office: 'সাভার সাব-রেজিস্ট্রি অফিস',
          pageNumber: 3,
          totalPages: 3,
        }),
      },
    ],
    notes: 'Primary society land plot. Original deed securely stored in society bank locker. Mutation and DCR fully updated.',
  },
  {
    id: 'DEED-02',
    deedNo: '5129/2024',
    deedDate: '04.05.2024',
    registryOffice: 'Rupnagar Sub-Registry Office, Dhaka',
    deedType: 'saf_kobala',
    mouza: 'Baunia (বাউনিয়া)',
    jlNo: 'JL #14',
    khatianNo: {
      cs: '87',
      sa: '142',
      rs: '319',
      bs: '551',
    },
    dagNo: '1205, 1206',
    landArea: '14.00 Decimals (8.5 Katha)',
    landAreaDecimal: 14.00,
    buyerName: 'Progressive Association Society',
    sellerName: 'Mrs. Jahanara Begum, Husband: Late Engr. M. A. Rashid',
    totalValueTaka: 3600000,
    status: 'mutation_completed',
    khajnaUpdatedYear: '1431 (2024-2025)',
    mutationCaseNo: 'Mut. Case #892/2024',
    pagesCount: 2,
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Deed Header, Value & Parties Info',
        url: generateDeedScanSvg({
          deedNo: '5129/2024',
          deedTypeTitle: 'সাফ-কবলা জমি খরিদ দলিল',
          date: '04.05.2024',
          mouza: 'বাউনিয়া (জে.এল ১৪)',
          dagNo: '১২০৫, ১২০৬',
          khatianNo: 'সিএস ৮৭ | বিএস ৫৫১',
          area: '১৪.০০ শতক (৮.৫ কাঠা)',
          seller: 'বেগম জাহানারা রশিদ, স্বামী: মৃত ইঞ্জি: এম এ রশিদ',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি (পক্ষে কার্যনির্বাহী পরিষদ)',
          office: 'রূপনগর সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 1,
          totalPages: 2,
        }),
      },
      {
        pageNumber: 2,
        title: 'Page 2: Schedule, Boundaries & Endorsement',
        url: generateDeedScanSvg({
          deedNo: '5129/2024',
          deedTypeTitle: 'তফসিল ও হস্তান্তর দলিল অনুমোদন',
          date: '04.05.2024',
          mouza: 'বাউনিয়া (জে.এল ১৪)',
          dagNo: '১২০৫, ১২০৬',
          khatianNo: 'বিএস ৫৫১',
          area: '১৪.০০ শতক',
          seller: 'বেগম জাহানারা রশিদ',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
          office: 'রূপনগর সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 2,
          totalPages: 2,
        }),
      },
    ],
    notes: 'Direct frontage connected to 20ft road. Concrete boundary pillars installed on all four corners.',
  },
  {
    id: 'DEED-03',
    deedNo: '1924/2025',
    deedDate: '12.01.2025',
    registryOffice: 'Savar Sub-Registry Office, Dhaka',
    deedType: 'bayna',
    mouza: 'Kaundia (কাউন্ডিয়া)',
    jlNo: 'JL #48',
    khatianNo: {
      cs: '124',
      sa: '190',
      rs: '415',
      bs: '612',
    },
    dagNo: '846',
    landArea: '8.25 Decimals (5.0 Katha)',
    landAreaDecimal: 8.25,
    buyerName: 'Progressive Association Society',
    sellerName: 'Md. Shahjahan Mia',
    totalValueTaka: 2100000,
    status: 'under_process',
    khajnaUpdatedYear: '1430',
    mutationCaseNo: 'Pending Final Registration (Under Bayna Contract)',
    pagesCount: 2,
    pages: [
      {
        pageNumber: 1,
        title: 'Page 1: Registered Baynanama Agreement Document',
        url: generateDeedScanSvg({
          deedNo: '1924/2025',
          deedTypeTitle: 'রেজিস্ট্রিকৃত বায়না চুক্তিপত্র দলিল',
          date: '12.01.2025',
          mouza: 'কাউন্ডিয়া (জে.এল ৪৮)',
          dagNo: '৮৪৬',
          khatianNo: 'আরএস ৪১৫ | বিএস ৬১২',
          area: '৮.২৫ শতক (৫.০ কাঠা)',
          seller: 'মো: শাহজাহান মিয়া, পিতা: মৃত জহির উদ্দিন',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
          office: 'সাভার সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 1,
          totalPages: 2,
        }),
      },
      {
        pageNumber: 2,
        title: 'Page 2: Terms of Payment & Timeline Schedule',
        url: generateDeedScanSvg({
          deedNo: '1924/2025',
          deedTypeTitle: 'চুক্তির শর্তাবলি ও পণ পরিশোধের সময়সূচি',
          date: '12.01.2025',
          mouza: 'কাউন্ডিয়া',
          dagNo: '৮৪৬',
          khatianNo: 'বিএস ৬১২',
          area: '৮.২৫ শতক',
          seller: 'মো: শাহজাহান মিয়া',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
          office: 'সাভার সাব-রেজিস্ট্রি কার্যালয়, ঢাকা',
          pageNumber: 2,
          totalPages: 2,
        }),
      },
    ],
    notes: 'Advance Tk. 8,00,000 paid via Bank cheque. Remaining Tk. 13,00,000 to be paid upon final Saf-Kobala registration.',
  },
  {
    id: 'DEED-04',
    deedNo: 'MUT-781/2024',
    deedDate: '25.07.2024',
    registryOffice: 'AC Land Office (Assistant Commissioner Land), Savar',
    deedType: 'mutation',
    mouza: 'Kaundia (কাউন্ডিয়া)',
    jlNo: 'JL #48',
    khatianNo: {
      bs: 'BS Khatian #608/1 (New Created for Society)',
    },
    dagNo: '842, 843/1',
    landArea: '18.50 Decimals',
    landAreaDecimal: 18.50,
    buyerName: 'Progressive Association Society',
    sellerName: 'Government Land Revenue Office (AC Land)',
    totalValueTaka: 0,
    status: 'mutation_completed',
    khajnaUpdatedYear: '1431 (2024-2025)',
    mutationCaseNo: 'DCR #554192 | E-Namjari QR Verified',
    pagesCount: 1,
    pages: [
      {
        pageNumber: 1,
        title: 'Official Mutation Khatian Porcha & DCR Receipt',
        url: generateDeedScanSvg({
          deedNo: 'MUT-781/2024',
          deedTypeTitle: 'ই-নামজারি খতিয়ান পর্চা ও ডিসিআর',
          date: '25.07.2024',
          mouza: 'কাউন্ডিয়া (জে.এল ৪৮)',
          dagNo: '৮৪২, ৮৪৩/১',
          khatianNo: 'নতুন নামজারি খতিয়ান: ৬০৮/১',
          area: '১৮.৫০ শতক',
          seller: 'ভূমি রাজস্ব রেকর্ড ও এসি ল্যান্ড কার্যালয়',
          buyer: 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
          office: 'সহকারী কমিশনার (ভূমি) কার্যালয়, সাভার',
          pageNumber: 1,
          totalPages: 1,
        }),
      },
    ],
    notes: 'Mutation successfully created in the name of Progressive Association Society. E-Khatian portal downloadable with QR code.',
  },
];

