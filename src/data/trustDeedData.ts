export interface TrustDeedClause {
  id: string;
  number: string;
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  subClauses?: {
    number: string;
    titleBn: string;
    titleEn: string;
    contentBn: string;
    contentEn: string;
    members?: string[];
  }[];
  keyPoints?: {
    labelBn: string;
    labelEn: string;
    valueBn: string;
    valueEn: string;
  }[];
}

export interface AnnexureForm {
  id: string;
  code: string;
  titleBn: string;
  titleEn: string;
  subjectBn: string;
  subjectEn: string;
  declarationBn: string;
  declarationEn: string;
  fields: {
    labelBn: string;
    labelEn: string;
    type: 'text' | 'date' | 'textarea';
    required?: boolean;
  }[];
}

export interface TrustDeedData {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  effectiveDateBn: string;
  effectiveDateEn: string;
  officeBn: string;
  officeEn: string;
  preambleBn: string;
  preambleEn: string;
  whereasBn: string;
  whereasEn: string;
  clauses: TrustDeedClause[];
  signatoriesNoticeBn: string;
  signatoriesNoticeEn: string;
  annexures: AnnexureForm[];
}

export const OFFICIAL_TRUST_DEED: TrustDeedData = {
  titleBn: 'প্রগ্রেসিভ এসোসিয়েশন সোসাইটি',
  titleEn: 'PROGRESSIVE ASSOCIATION SOCIETY',
  subtitleBn: 'ট্রাস্ট দলিল, বিধিমালা ও প্রবিধান',
  subtitleEn: 'TRUST DEED, RULES AND REGULATIONS',
  effectiveDateBn: '১লা আগস্ট, ২০২৬ (01.08.2026)',
  effectiveDateEn: '1st day of August, 2026 (01.08.2026)',
  officeBn: 'বাড়ি নং: XXX, গোলাপবাগ, ঢাকা-১২১২, বাংলাদেশ',
  officeEn: 'House No: XXX, Golapbagh, Dhaka-1212, Bangladesh',
  preambleBn:
    'এই ট্রাস্ট দলিল, বিধিমালা ও প্রবিধান খ্রিস্টাব্দ দুই হাজার ছাব্বিশ (২০২৬) সালের ১লা আগস্ট তারিখে সম্পাদিত ও কার্যকর করা হইল। পক্ষসমূহ: প্রগ্রেসিভ কোঅপারেটিভ সোসাইটি / প্রগ্রেসিভ এসোসিয়েশন সোসাইটি, একটি অরাজনৈতিক সীমিত দায়যুক্ত প্রতিষ্ঠান, যাহার প্রধান/নিবন্ধিত কার্যালয় বাংলাদেশের ঢাকা-১২১২, গোলাপবাগ, বাড়ি নং: XXX-তে অবস্থিত (অতঃপর "সমিতি" বা "PCS" নামে উল্লেখিত), যাহা পিসিএস-এর সকল বর্তমান ও ভবিষ্যৎ সাধারণ সদস্যদের প্রতিনিধিত্ব করে।',
  preambleEn:
    'THIS TRUST DEED AND RULES AND REGULATIONS is made and executed on this 1st day of August, Two Thousand Twenty-Six (2026) of the Christian Era. BY AND BETWEEN: Progressive Cooperative Society / Progressive Association Society, a non-political institution with limited liability, having its principal/registered office situated at House No: XXX, Golapbagh, Dhaka-1212, Bangladesh (hereinafter referred to as the "Association" or "PCS"), representing all existing and future general members of the PCS.',
  whereasBn:
    'পিসিএস-এর প্রতিষ্ঠাতা সদস্যগণ পারস্পরিক সম্মতিক্রমে সিদ্ধান্ত গ্রহণ করিয়াছেন যে, দুই হাজার ছাব্বিশ (২০২৬) সালের ১লা আগস্ট তারিখ হইতে বাংলাদেশের প্রচলিত কো-অপারেটিভ সোসাইটিজ আইনের অধীনে প্রগ্রেসিভ কোঅপারেটিভ সোসাইটি নামে একটি সমিতি নিবন্ধন করা হইবে, যাহার উদ্দেশ্য হইবে উহার সদস্যদের পারস্পরিক আর্থ-সামাজিক সুবিধা, কল্যাণ ও উন্নয়ন সাধন করা।',
  whereasEn:
    'The founder members of PCS have mutually decided and agreed to establish, as on and from the 1st day of August, Two Thousand and Twenty-Six (2026), an association to be registered under the relevant Cooperative Societies Act of Bangladesh, to be known as Progressive Cooperative Society, for the mutual socio-economic benefit, welfare, and advancement of its members.',
  clauses: [
    {
      id: 'clause-1',
      number: 'ধারা ১',
      titleBn: 'লক্ষ্য, উদ্দেশ্য ও দৃষ্টিভঙ্গি',
      titleEn: 'Goals, Mission, and Vision',
      contentBn:
        'সমিতির দীর্ঘমেয়াদী লক্ষ্য ও আকাঙ্ক্ষাসমূহ নিম্নরূপ:\n• একটি সমৃদ্ধ, সাশ্রয়ী এবং টেকসই আবাসন সম্প্রদায় গড়িয়া তোলা, যেখানে প্রতিটি সদস্য একটি নিরাপদ, আধুনিক ও উচ্চমানের বাসস্থান লাভের নিশ্চয়তা পাইবেন।\n• নৈতিক, স্বচ্ছ ও পরিবেশবান্ধব নগর নির্মাণ এবং রিয়েল এস্টেট উন্নয়নে একটি শীর্ষস্থানীয় সমবায় আদর্শ হিসেবে নিজেদের প্রতিষ্ঠিত করা।',
      contentEn:
        'The vision outlines the ultimate long-term objectives and aspirations of the Association:\n• To establish a thriving, affordable, and sustainable housing community where every member is guaranteed access to a safe, modern, and high-quality residence.\n• To emerge as the premier cooperative model for ethical, transparent, and eco-friendly urban construction and real estate development.',
      keyPoints: [
        {
          labelBn: 'প্রধান লক্ষ্য',
          labelEn: 'Core Vision',
          valueBn: 'সাশ্রয়ী ও টেকসই নিরাপদ আবাসন সম্প্রদায়',
          valueEn: 'Affordable, sustainable & modern housing',
        },
        {
          labelBn: 'উন্নয়ন নীতি',
          labelEn: 'Development Policy',
          valueBn: 'নৈতিক, স্বচ্ছ ও পরিবেশবান্ধব রিয়েল এস্টেট মডেল',
          valueEn: 'Ethical, transparent & eco-friendly model',
        },
      ],
    },
    {
      id: 'clause-2',
      number: 'ধারা ২',
      titleBn: 'সদস্যদের স্বার্থ ও শেয়ার কাঠামো',
      titleEn: "Members' Interest and Shareholding Structure",
      contentBn:
        'তহবিলে সদস্যদের মোট প্রাথমিক স্বার্থ ও মূলধন ত্রিশ (৩০)টি সমান শেয়ারে বিভক্ত হইবে। একজন সদস্য এককভাবে বা যৌথভাবে একাধিক শেয়ার ধারণ করিতে পারিবেন। তবে বাংলাদেশের সমবায় আইন অনুযায়ী, কোনো একক সদস্য মোট শেয়ারের এক-পঞ্চমাংশ (২০%)-এর বেশি শেয়ার ধারণ করিতে পারিবেন না। শেয়ার কাঠামো বার্ষিক সাধারণ সভার (AGM) চূড়ান্ত অনুমোদন সাপেক্ষে নির্বাহী কমিটি কর্তৃক সময়ে সময়ে পর্যালোচনা, সংশোধন বা হালনাগাদ করা হইবে।',
      contentEn:
        'The total preliminary interest and capital of the members in the fund shall be divided into Thirty (30) equal shares. A member may hold more than one share, either individually or jointly. However, in accordance with the cooperative laws of Bangladesh, no single member shall hold more than one-fifth (20%) of the total shares. The shareholding structure shall be reviewed, amended, or updated from time to time by the Executive Committee, subject to the final approval of the General Body in the Annual General Meeting (AGM).',
      keyPoints: [
        {
          labelBn: 'মোট প্রাথমিক শেয়ার',
          labelEn: 'Total Shares',
          valueBn: '৩০টি সমান শেয়ার',
          valueEn: '30 Equal Shares',
        },
        {
          labelBn: 'একক শেয়ারের সর্বোচ্চ সীমা',
          labelEn: 'Max Single Holding',
          valueBn: 'সর্বোচ্চ ২০% (মোট শেয়ারের ১/৫ অংশ)',
          valueEn: 'Max 20% of total shares (Cooperative Law limit)',
        },
        {
          labelBn: 'অনুমোদনকারী সংস্থা',
          labelEn: 'Approval Authority',
          valueBn: 'বার্ষিক সাধারণ সভা (AGM) ও কার্যনির্বাহী পরিষদ',
          valueEn: 'Annual General Meeting (AGM) & EC',
        },
      ],
    },
    {
      id: 'clause-3',
      number: 'ধারা ৩',
      titleBn: 'পরিচালনা মন্ডলী ও প্রাতিষ্ঠানিক কাঠামো',
      titleEn: 'Governing Bodies and Organizational Structure',
      contentBn:
        'সমিতির সাংগঠনিক কার্যক্রম ও দৈনন্দিন প্রশাসন পরিচালনার জন্য প্রতিষ্ঠাতা পরিষদ, উপদেষ্টা পরিষদ, নির্বাহী কমিটি এবং অর্থ ও হিসাব বিভাগ দায়িত্ব পালন করিবে।',
      contentEn:
        'The operational, governance, and financial affairs of the Association shall be administered by the Founder Members, Advisory Panel, Executive Committee, and Accounts Division.',
      subClauses: [
        {
          number: '৩.১',
          titleBn: 'প্রতিষ্ঠাতা সদস্যবৃন্দ (Founding Members)',
          titleEn: 'Founding Members',
          contentBn:
            'সমিতির প্রতিষ্ঠাতা সদস্যবৃন্দ নিম্নরূপ, যাহাদের প্রত্যক্ষ উদ্যোগে ও বিনিয়োগে এই সংস্থা প্রতিষ্ঠিত হইয়াছে:',
          contentEn:
            'The founding members whose direct initiative and investments laid the foundation of the Association:',
          members: [
            'মোঃ ফেরদাউস আহামেদ (Md Farthous Ahamed)',
            'মোঃ রফিকুল ইসলাম (Md Rofiqul Islam)',
            'মোঃ পারভেজ (Md Parvez)',
            'মোঃ আসাদুজ্জামান নাহিদ (Md Asaduzzaman Nahid)',
          ],
        },
        {
          number: '৩.২',
          titleBn: 'উপদেষ্টা পরিষদ (Advisory Panel)',
          titleEn: 'Advisory Panel',
          contentBn:
            'প্রাথমিক উপদেষ্টা পরিষদ নিম্নোক্ত সদস্যদের সমন্বয়ে গঠিত হইবে:\nউপদেষ্টা পরিষদ সদস্যদের জন্য উপযুক্ত জমি/সম্পত্তি চিহ্নিতকরণ ও অধিগ্রহণ সংক্রান্ত কৌশলগত সিদ্ধান্তগুলি নিয়ে কাজ করিবে এবং নির্বাহী কমিটির কৌশলগত কার্যকারিতা, কার্যক্ষমতা ও সিদ্ধান্তসমূহ স্বাধীনভাবে পর্যালোচনা করিবে।',
          contentEn:
            'The preliminary Advisory Panel shall consist of: Mr. Nadim, Mr. Nahid. The Advisory Panel shall deal with strategic decisions regarding the identification and acquisition of suitable lands/properties for the members and shall independently review the strategic execution, performance, and decisions of the Executive Committee.',
          members: ['জনাব নাদিম (Mr. Nadim)', 'জনাব নাহিদ (Mr. Nahid)'],
        },
        {
          number: '৩.৩',
          titleBn: 'নির্বাহী কমিটি / ব্যবস্থাপনা কমিটি (Executive Committee - EC)',
          titleEn: 'Executive Committee (Management Committee)',
          contentBn:
            'প্রাথমিক নির্বাহী কমিটি (আইনের অধীনে প্রথম ব্যবস্থাপনা কমিটি হিসেবে কার্যকর) নিম্নোক্ত সদস্যদের সমন্বয়ে গঠিত হইবে:\n১. মোঃ রাব্বি (Mr. Rabbi)\n২. মোঃ ফেরদাউস আহামেদ (Mr. Ferdaus)\n৩. মোঃ পারভেজ (Mr. Parvez)\n৪. মোঃ আরিফুল ইসলাম (Mr. Ariful Islam)\n৫. মোঃ আসাদুজ্জামান নাহিদ (Mr. Nahid)\n\nনির্বাহী কমিটি (EC) সমিতির প্রাথমিক নিয়ন্ত্রণকারী সংস্থা হিসেবে কাজ করিবে এবং দৈনন্দিন পরিচালনা, নীতিমালা প্রয়োগ ও বিধিবদ্ধ সম্মতি নিশ্চিত করার জন্য দায়িত্বশীল থাকিবে। সদস্যদের স্বার্থ রক্ষা, আর্থিক অখণ্ডতা বজায় রাখা এবং সাংগঠনিক লক্ষ্যমাত্রা অর্জন করা ইহার প্রধান উদ্দেশ্য। উপরোক্ত নির্বাহী কমিটির মেয়াদকাল ৬ (ছয়) মাস এবং পরবর্তি সদস্য মিটিঙে নতুন নির্বাহী কমিটি গঠন করা হইবে।\n\nনির্বাহী কমিটির মূল দায়িত্ব ও কর্তব্যসমূহ:\n• যথাযথ যাচাই-বাছাই সম্পন্ন করিবার পর নতুন সদস্যদের ভর্তির অনুমোদন প্রদান করা।\n• খেলাপি বা বিধি লঙ্ঘনের ক্ষেত্রে সদস্যপদ বাতিল বা স্থগিতের অনুমোদন প্রদান করা।\n• যুক্তিসংগত কারণের ভিত্তিতে জরিমানা ও বিলম্ব ফি আরোপ, হ্রাস বা শিথিল করা।\n• সমিতির জন্য অভ্যন্তরীণ পরিচালনা নীতিমালা, নির্দেশিকা ও প্রশাসনিক কার্যপ্রণালী প্রণয়ন করা।\n• অভ্যন্তরীণ নিরীক্ষাসহ হিসাব ও অর্থ বিভাগের কার্যক্রম তত্ত্বাবধান, পরিচালনা ও পর্যবেক্ষণ করা।',
          contentEn:
            'The preliminary Executive Committee (acting as the first Management Committee under law) shall consist of: Mr. Parvez, Mr. Rabbi, Mr. Nahid, Mr. Rafi, Mr. Ferdaus.\nThe Executive Committee (EC) shall serve as the primary governing body of the Association, responsible for managing daily operational affairs, policy enforcement, and regulatory compliance. Tenor of this committee is 6 months.\nResponsibilities include approving membership admissions, terminations, imposing/waiving penalty fees, drafting bylaws, and overseeing financial management.',
          members: [
            'মোঃ রাব্বি (Mr. Rabbi)',
            'মোঃ ফেরদাউস আহামেদ (Mr. Ferdaus)',
            'মোঃ পারভেজ (Mr. Parvez)',
            'মোঃ আরিফুল ইসলাম (Mr. Ariful Islam)',
            'মোঃ আসাদুজ্জামান নাহিদ (Mr. Nahid)',
          ],
        },
        {
          number: '৩.৪',
          titleBn: 'অর্থ ও হিসাব বিভাগ (Finance & Accounts Division)',
          titleEn: 'Finance and Accounts Division',
          contentBn:
            'অর্থ ও হিসাব বিভাগের প্রাথমিক দায়িত্বপ্রাপ্ত সদস্যগণ:\n• মোঃ আসাদুজ্জামান নাহিদ (Mr. Nahid)\n• জনাব রাজী / মোঃ রাব্বি (Mr. Rabbi)\n• মোঃ পারভেজ (Mr. Parvez)\n\nঅর্থ ও হিসাব (F&A) বিভাগ সদস্যদের নিকট হইতে কিস্তি, ফি ও অন্যান্য তহবিল সংগ্রহ, নথিভুক্তকরণ এবং নির্ধারিত ব্যাংক হিসাবে জমা প্রদানের জন্য যৌথভাবে দায়িত্বশীল থাকিবে। নগদ প্রবাহ সুশৃঙ্খলভাবে ব্যবস্থাপনা, সমিতির আর্থিক সম্পদ সুরক্ষা এবং কৌশলগত ব্যবসায়িক সিদ্ধান্ত গ্রহণের জন্য প্রয়োজনীয় সঠিক আর্থিক তথ্য সরবরাহ করা ইহার প্রধান উদ্দেশ্য।',
          contentEn:
            'The preliminary members responsible for Finance and Accounts Division are: Mr. Parvez, Mr. Rabbi, Mr. Nahid. They are collectively responsible for collecting, recording, and depositing subscriptions, fees, and managing cash flows.',
          members: [
            'মোঃ আসাদুজ্জামান নাহিদ (Md Asaduzzaman Nahid)',
            'মোঃ রাব্বি / রাজী (Md Rabbi / Raji)',
            'মোঃ পারভেজ (Md Parvez)',
          ],
        },
      ],
    },
    {
      id: 'clause-4',
      number: 'ধারা ৪',
      titleBn: 'প্রধান আর্থিক শর্তাবলি ও বিধিসমূহ',
      titleEn: 'Major Terms and Financial Conditions',
      contentBn:
        'সমিতির সকল সদস্য নিম্নবর্ণিত আর্থিক বিধিমালা ও সময়সূচি যথাযথভাবে মানিয়া চলিতে আইনগতভাবে বাধ্য থাকিবেন:',
      contentEn:
        'All members are legally bound to comply with the following financial regulations, schedules, and fee structures:',
      subClauses: [
        {
          number: '৪.১',
          titleBn: 'ভর্তি ফি (Admission Fee)',
          titleEn: 'Admission Fee',
          contentBn:
            'সমিতিতে অন্তর্ভুক্তির জন্য ভর্তি ফি ৫,০০০/- (পাঁচ হাজার) টাকা মাত্র নির্ধারিত হইয়াছে, যাহা কোনো অবস্থাতেই বা সদস্যপদ সমাপ্তির পরেও অফেরতযোগ্য (Non-Refundable)।',
          contentEn:
            'The Admission Fee for enrolling in the Association is fixed at BDT 5,000 (Bangladeshi Taka Five Thousand only), which is non-refundable under any circumstances or upon cessation of membership.',
        },
        {
          number: '৪.২',
          titleBn: 'মাসিক কিস্তি ও পরিশোধ তফসিল (Monthly Subscription)',
          titleEn: 'Monthly Subscription and Payment Schedule',
          contentBn:
            'প্রতিটি নিবন্ধিত সদস্য প্রতি মাসের ১২ তারিখের মধ্যে নির্ধারিত মাসিক কিস্তির পরিমাণ ২,৮০০/- (দুই হাজার আটশো) টাকা মাত্র ব্যাংক হিসাবে বা সরাসরি অর্থ ও হিসাব বিভাগে জমা প্রদান করিবেন।',
          contentEn:
            'Every registered member shall deposit the prescribed monthly subscription amount of BDT 2,800 (Bangladeshi Taka Two Thousand Eight Hundred only) into the bank account or directly to the Finance and Accounts Division within the 12th day of each calendar month.',
        },
        {
          number: '৪.৩',
          titleBn: 'এককালীন বিশেষ পরিশোধ (Lumpsum Special Payments)',
          titleEn: 'Lumpsum Special Payments',
          contentBn:
            'প্রতিটি সদস্য নিবন্ধন/নথিভুক্তির তারিখ হইতে ৬ মাস পরে কিন্তু ৯ মাসের মধ্যে ১০,০০০/- (দশ হাজার) টাকা মাত্র এককালীন জমা প্রদান করিবেন। এই এককালীন সংগ্রহ প্রক্রিয়া সমিতির কার্যক্রমের প্রতি ছয় (৬) মাস অন্তর পুনরাবৃত্তি হইতে থাকিবে। উপরন্তু, কোনো জমি বা প্রকল্প বাস্তবায়নের সময় নির্বাহী কমিটি কর্তৃক নির্ধারিত যেকোনো অতিরিক্ত পরিমাণ সদস্যগণ তাহাদের শেয়ার অনুপাতে পরিশোধ করিতে আইনগতভাবে বাধ্য থাকিবেন।',
          contentEn:
            'Every member shall deposit a lumpsum amount of BDT 10,000 (Bangladeshi Taka Ten Thousand only) after 6 months but not later than 9 months from the date of incorporation/registration. This lumpsum collection process shall continue and repeat every six (6) months. Furthermore, all members are legally bound to pay any additional amount determined by the EC at the time of acquiring any piece of land or project execution, proportionate to their shareholding.',
        },
        {
          number: '৪.৪',
          titleBn: 'বিলম্বে পরিশোধের জরিমানা ও খেলাপি নীতি (Late Fee & Penalty Policy)',
          titleEn: 'Penalty for Late Payment and Default Policy',
          contentBn:
            'মাসিক পরিশোধের নির্ধারিত সময়সীমা প্রতি মাসের ১৫ তারিখ।\n• ১–১৫ তারিখ: নিয়মিত কিস্তির সময় (কোনো বিলম্ব ফি প্রযোজ্য নহে — ২,৮০০/- টাকা)।\n• ১৬–২০ তারিখ: কোনো সদস্য ১৫ তারিখের মধ্যে কিস্তি জমা দিতে ব্যর্থ হইলে, সংশ্লিষ্ট মাসের ২০ তারিখের মধ্যে মূল কিস্তির সাথে ১৫০/- (একশত পঞ্চাশ) টাকা নির্ধারিত বিলম্ব জরিমানাসহ মোট ২,৯৫০/- টাকা পরিশোধ করিতে হইবে।\n• ২১–মাস শেষ: ২০ তারিখের মধ্যে পরিশোধে ব্যর্থ হইলে বকেয়া পরিমাণের উপর অতিরিক্ত ১৫% সারচার্জ জরিমানা এবং মূল জরিমানা ১৫০/- টাকা আরোপিত হইবে (মোট ৩,৩৯২.৫০ টাকা)।\n• ধারাবাহিক ৩ মাস খেলাপি: কোনো সদস্য টানা তিন (৩)টি মাসিক কিস্তি পরিশোধে ব্যর্থ হইলে তাহার সদস্যপদ স্বয়ংক্রিয়ভাবে বাতিলযোগ্য হইবে এবং সদস্যপদ বাতিল নীতিমালা প্রযোজ্য হইবে।',
          contentEn:
            'The regular payment deadline for monthly installments is the 15th of each month.\n• 1st to 15th: Regular due with no fine (BDT 2,800).\n• 16th to 20th: Fixed late penalty of BDT 150 (Total BDT 2,950).\n• 21st to Month End: Additional 15% compound surcharge penalty plus BDT 150 fine (Total BDT 3,392.50).\n• 3 Consecutive Defaults: If a member fails to clear 3 consecutive installments, membership is liable to automatic termination under the Cancellation Policy.',
        },
        {
          number: '৪.৫',
          titleBn: 'সদস্যপদ বাতিল ও নিষ্পত্তি নীতিমালা (Cancellation & Settlement)',
          titleEn: 'Membership Cancellation and Settlement Policy',
          contentBn:
            'কোনো সদস্য স্বেচ্ছায় সদস্যপদ বাতিল বা প্রত্যাহারের আবেদন করিলে:\n১. প্রাথমিক ভর্তি ফি (৫,০০০/- টাকা) সম্পূর্ণ বাজেয়াপ্ত হইবে।\n২. সমিতি প্রশাসনিক ও পরিচালনা ব্যয় বাবদ মোট জমাকৃত কিস্তির অর্থের ৩০% (ত্রিশ ভাগ) অতিরিক্ত কর্তন/বাজেয়াপ্ত করিবে।\n৩. অবশিষ্ট ৭০% (সত্তর ভাগ) অর্থ ও হিসাব বিভাগ কর্তৃক সকল আইনগত, নিরীক্ষা ও কাঠামোগত আনুষ্ঠানিকতা সম্পন্ন হইবার পর পরবর্তী ত্রৈমাসিকে বিদায়ী সদস্যের নিকট ফেরত/বিতরণ করা হইবে।',
          contentEn:
            'If any member voluntarily applies for cancellation or withdrawal:\n1. The initial Admission Fee (BDT 5,000) shall be forfeited.\n2. 30% of total accumulated deposits shall be forfeited towards administrative expenses.\n3. The remaining 70% shall be refunded in the subsequent quarter after all legal and audit formalities are completed.',
        },
      ],
      keyPoints: [
        {
          labelBn: 'ভর্তি ফি',
          labelEn: 'Admission Fee',
          valueBn: '৫,০০০/- টাকা (অফেরতযোগ্য)',
          valueEn: 'BDT 5,000 (Non-refundable)',
        },
        {
          labelBn: 'মাসিক কিস্তি',
          labelEn: 'Monthly Installment',
          valueBn: '২,৮০০/- টাকা (প্রতি মাসের ১৫ তারিখ)',
          valueEn: 'BDT 2,800 (Due by 15th of month)',
        },
        {
          labelBn: 'বিলম্ব জরিমানা',
          labelEn: 'Late Fine Stages',
          valueBn: '১৬-২০ তারিখ: +১৫০/- | ২১-শেষ: +১৫০/- + ১৫% সারচার্জ',
          valueEn: '16-20th: +BDT 150 | Post 20th: +BDT 150 + 15%',
        },
        {
          labelBn: 'রিফান্ড ও কর্তন নীতি',
          labelEn: 'Refund / Forfeiture',
          valueBn: 'ভর্তি ফি ০% ফেরত | সঞ্চয়ের ৩০% কর্তন, ৭০% রিফান্ড',
          valueEn: 'Admission 0% | 30% Forfeited, 70% Refunded',
        },
      ],
    },
    {
      id: 'clause-5',
      number: 'ধারা ৫',
      titleBn: 'ব্যাংকিং ও আর্থিক কার্যক্রম',
      titleEn: 'Bankers and Financial Operation',
      contentBn:
        'নির্বাহী কমিটি তহবিলের সরকারি ব্যাংকার হিসেবে বাংলাদেশের একটি তফসিলি বাণিজ্যিক ব্যাংক (যেমন: ইসলামী ব্যাংক বাংলাদেশ লিমিটেড) নির্বাচন করিবে। সকল কিস্তি ও প্রাতিষ্ঠানিক তহবিল ব্যাংক হিসাবে রক্ষিত হইবে। সরকারি পরিশোধ ও নিষ্পত্তির জন্য অনুমোদিত পাঁচ (৫) জন নির্বাহী কমিটি সদস্যের মধ্যে যেকোনো দুই (২) বা তিন (৩) জনের যৌথ স্বাক্ষরে যেকোনো সময় ব্যাংক হিসাব হইতে অর্থ উত্তোলন করা যাইবে।',
      contentEn:
        'The Trustees/Executive Committee shall select a scheduled commercial bank in Bangladesh to act as official Bankers. All subscription amounts and institutional funds must be kept in the bank account. Sums may be withdrawn at any time under joint signatures of authorized Executive Committee members for official payments.',
      keyPoints: [
        {
          labelBn: 'ব্যাংক হিসাব পরিচালনা',
          labelEn: 'Bank Account Mode',
          valueBn: 'তফসিলি বাণিজ্যিক ব্যাংক',
          valueEn: 'Scheduled Commercial Bank',
        },
        {
          labelBn: 'উত্তোলনের যৌথ স্বাক্ষর',
          labelEn: 'Joint Signatories',
          valueBn: 'অনুমোদিত কর্মকর্তাদের যৌথ স্বাক্ষরে প্রদেয়',
          valueEn: 'Joint signatures of authorized EC members',
        },
      ],
    },
    {
      id: 'clause-6',
      number: 'ধারা ৬',
      titleBn: 'হিসাব, স্বচ্ছতা ও নিরীক্ষা',
      titleEn: 'Accounts, Transparency, and Audit',
      contentBn:
        'প্রতিটি পরিশোধের সাথে সাথে অর্থ ও হিসাব বিভাগ সরকারি হোয়াটসঅ্যাপ গ্রুপ বা নিবন্ধিত ইমেইলের মাধ্যমে প্রতিটি সদস্যকে ডিজিটাল স্বীকৃতি বা রসিদ (Money Receipt) প্রদান করিবে। অর্থ ও হিসাব বিভাগ প্রতি অর্থবছর শেষে সমিতির ব্যাপক বার্ষিক হিসাব, আর্থিক বিবরণী ও নিরীক্ষা প্রতিবেদন প্রস্তুত করিবে এবং বার্ষিক সাধারণ সভায় (AGM) সকল সাধারণ সদস্যের নিকট উপস্থাপন করিবে।',
      contentEn:
        'Each member shall be provided with an official digital acknowledgment or receipt immediately upon payment through WhatsApp or email. The Accounts Division shall prepare comprehensive annual accounts, financial statements, and audit reports presented annually at the AGM.',
      keyPoints: [
        {
          labelBn: 'পেমেন্ট স্বীকৃতি',
          labelEn: 'Payment Confirmation',
          valueBn: 'তাত্ক্ষণিক ডিজিটাল মানি রসিদ ও মেসেজ',
          valueEn: 'Instant digital money receipt & SMS/group alert',
        },
        {
          labelBn: 'নিরীক্ষা ও স্বচ্ছতা',
          labelEn: 'Audit & Reporting',
          valueBn: 'বার্ষিক অডিট রিপোর্ট ও সাধারণ সভায় অনুমোদন',
          valueEn: 'Annual Audit Report presented at AGM',
        },
      ],
    },
    {
      id: 'clause-7',
      number: 'ধারা ৭',
      titleBn: 'তহবিল অবসায়ন ও বিলুপ্তি',
      titleEn: 'Liquidation and Dissolution of Fund',
      contentBn:
        'কো-অপারেটিভ সোসাইটিজ আইনের বিধান সাপেক্ষে, এই উদ্দেশ্যে বিশেষভাবে আহূত সভায় নির্বাহী কমিটির সর্বসম্মত সিদ্ধান্ত এবং উপদেষ্টা পরিষদের লিখিত অনুমোদনক্রমেই কেবল সমিতি বিলুপ্ত বা অবসায়িত হইতে পারিবে। এইরূপ ক্ষেত্রে, সকল বৈধ দাবি, দায়, ঋণ সম্পূর্ণরূপে নিষ্পত্তির পর সমিতির অবশিষ্ট সম্পদ ও সম্পত্তি, যদি থাকে, বিদ্যমান বৈধ সদস্যদের মধ্যে তাহাদের শেয়ার অনুপাতে বিতরণ করা হইবে।',
      contentEn:
        'Subject to provisions of the Cooperative Societies Act, the Association may be dissolved or liquidated only by unanimous decision of the Executive Committee and written approval of the Advisory Panel. Residual assets shall be distributed among existing valid members proportionate to shareholding.',
    },
  ],
  signatoriesNoticeBn:
    'আমরা উপরে উল্লিখিত সকল আইনগত শর্ত, ধারা ও বিধিমালা সম্পূর্ণরূপে পাঠ করিয়াছি, বুঝিয়াছি এবং স্বেচ্ছায় প্রগ্রেসিভ এসোসিয়েশন সোসাইটিতে যোগদানের পূর্ণ সম্মতি প্রদান করিতেছি। (সদস্য ক্রম ০১ হইতে ৩০ পর্যন্ত রেজিস্ট্রি বহিতে সংরক্ষিত)।',
  signatoriesNoticeEn:
    'WE have thoroughly read, understood, and agreed to all the legal terms, clauses, and conditions outlined above, and we hereby voluntarily join the Progressive Association Society. (Enrolled in official registry from Member 01 up to Member 30).',
  annexures: [
    {
      id: 'annexure-a',
      code: 'সংযোজনী-ক (ANNEXURE A)',
      titleBn: 'সদস্যপদ আবেদন ফরম',
      titleEn: 'MEMBERSHIP APPLICATION FORM',
      subjectBn: 'সমিতির সদস্যপদ গ্রহণের আবেদন।',
      subjectEn: 'Application for Admission as a Member of the Association.',
      declarationBn:
        'আমি প্রগ্রেসিভ কোঅপারেটিভ সোসাইটি / প্রগ্রেসিভ এসোসিয়েশন সোসাইটির একজন সাধারণ সদস্য হিসেবে অন্তর্ভুক্তির আবেদন করিতেছি। আমি এতদ্বারা গাম্ভীর্যের সহিত ঘোষণা ও নিশ্চিত করিতেছি যে, আমি সমিতির ট্রাস্ট দলিল, বিধিমালা ও উপ-আইনসমূহ মনোযোগ দিয়া পাঠ করিয়াছি এবং বুঝিয়াছি। আমি স্বতঃস্ফূর্তভাবে উহা সম্পূর্ণরূপে মানিয়া চলিতে সম্মত হইতেছি এবং নিশ্চিত করিতেছি যে, প্রচলিত আইনে সদস্য হিসেবে অন্তর্ভুক্ত হইতে আমার কোনো আইনগত অযোগ্যতা নাই। সদস্যপদ সংক্রান্ত যেকোনো বিষয়ে নির্বাহী কমিটির সিদ্ধান্তকে আমি চূড়ান্ত ও আইনগতভাবে বাধ্যকর হিসেবে মানিয়া লইতে সম্মত।',
      declarationEn:
        'I hereby apply to become a general member of Progressive Cooperative Society / Progressive Association Society. I solemnly declare and confirm that I have carefully read and understood the Trust Deed, Rules, Regulations, and By-laws. I explicitly agree to abide by them in letter and spirit, holding no legal disqualification under prevailing laws.',
      fields: [
        { labelBn: 'আবেদনকারীর পূর্ণ নাম', labelEn: 'Full Name', type: 'text', required: true },
        { labelBn: 'পিতার নাম', labelEn: "Father's Name", type: 'text', required: true },
        { labelBn: 'মাতার নাম', labelEn: "Mother's Name", type: 'text', required: true },
        { labelBn: 'জন্ম তারিখ', labelEn: 'Date of Birth', type: 'date', required: true },
        { labelBn: 'জাতীয় পরিচয়পত্র নং (NID)', labelEn: 'National ID (NID) No', type: 'text', required: true },
        { labelBn: 'স্থায়ী ঠিকানা', labelEn: 'Permanent Address', type: 'textarea', required: true },
        { labelBn: 'মোবাইল নম্বর', labelEn: 'Mobile / WhatsApp Number', type: 'text', required: true },
        { labelBn: 'শেয়ার সংখ্যা', labelEn: 'Number of Shares Applied', type: 'text', required: true },
      ],
    },
    {
      id: 'annexure-b',
      code: 'সংযোজনী-খ (ANNEXURE B)',
      titleBn: 'সদস্যপদ পরিত্যাগ ও নিষ্পত্তি ফরম',
      titleEn: 'MEMBERSHIP RESIGNATION & SETTLEMENT FORM',
      subjectBn: 'সদস্যপদ পরিত্যাগ ও প্রত্যাহারের নোটিশ।',
      subjectEn: 'Notice for Resignation & Settlement of Membership.',
      declarationBn:
        'আমি আনুষ্ঠানিকভাবে আপনাদের অবহিত করিতেছি যে, আমার ব্যক্তিগত ও অপরিহার্য কারণে আমি প্রগ্রেসিভ কোঅপারেটিভ সোসাইটির সদস্যপদ পরিত্যাগ করিতে ইচ্ছুক। আমি অনুরোধ করিতেছি যে, আমার পরিত্যাগের আবেদন গৃহীত হইলে সমিতির বিধিমালার ধারা ৪.৫ অনুযায়ী বাধ্যতামূলক প্রশাসনিক ও বাজেয়াপ্তযোগ্য অংশ (ভর্তি ফি বাজেয়াপ্ত এবং জমাকৃত কিস্তির ৩০% কর্তন) কর্তনের পর অবশিষ্ট সঞ্চিত অর্থ (৭০%) আমার ব্যাংক হিসাবে স্থানান্তর করা হোক।',
      declarationEn:
        'I hereby formally notify that due to personal/unavoidable reasons I wish to withdraw my membership. I request that after forfeiting admission fee and 30% administrative deduction per Clause 4.5, the remaining 70% accumulated deposits be disbursed to my bank account.',
      fields: [
        { labelBn: 'সদস্যের পূর্ণ নাম', labelEn: 'Member Full Name', type: 'text', required: true },
        { labelBn: 'শেয়ার আইডি', labelEn: 'Share ID (e.g. PAS-01)', type: 'text', required: true },
        { labelBn: 'জাতীয় পরিচয়পত্র নং (NID)', labelEn: 'NID Number', type: 'text', required: true },
        { labelBn: 'পরিত্যাগের বিস্তারিত কারণ', labelEn: 'Reason for Resignation', type: 'textarea', required: true },
        { labelBn: 'ফেরত গ্রহণের ব্যাংকের নাম ও শাখা', labelEn: 'Bank Name & Branch', type: 'text', required: true },
        { labelBn: 'হিসাবের নাম ও নম্বর', labelEn: 'Account Name & Number', type: 'text', required: true },
        { labelBn: 'রাউটিং নম্বর', labelEn: 'Bank Routing Number', type: 'text', required: true },
      ],
    },
    {
      id: 'annexure-c',
      code: 'সংযোজনী-গ (ANNEXURE C)',
      titleBn: 'সুবিধাভোগী নমিনি মনোনয়ন ফরম',
      titleEn: 'BENEFICIARY NOMINEE NOMINATION FORM',
      subjectBn: 'সুবিধাভোগী নমিনি মনোনয়ন।',
      subjectEn: 'Nomination of Beneficiary Nominee.',
      declarationBn:
        'আমি, প্রগ্রেসিভ কোঅপারেটিভ সোসাইটির একজন বৈধ সদস্য হিসেবে, নিম্নবর্ণিত ব্যক্তিকে আমার আইনসম্মত নমিনি হিসেবে মনোনীত ও নিয়োগ করিতেছি। আমার মৃত্যু বা স্থায়ী অক্ষমতার ক্ষেত্রে, উক্ত মনোনীত নমিনি সমবায় বিধিমালা অনুযায়ী আমার সকল সঞ্চিত তহবিল, শেয়ার ও স্বার্থ দাবি করিতে, গ্রহণ করিতে এবং নিষ্পত্তি করিতে ক্ষমতাপ্রাপ্ত হইবেন। আমি এতদ্বারা ঘোষণা করিতেছি যে, আমি স্বাধীন ইচ্ছা ও পছন্দ অনুযায়ী উপরোক্ত ব্যক্তিকে মনোনীত করিয়াছি।',
      declarationEn:
        'I, as a valid member of Progressive Cooperative Society, hereby nominate and appoint the following person as my legal nominee. In event of death or permanent disability, said nominee is authorized to claim, receive, and settle all my accumulated funds, shares, and interests.',
      fields: [
        { labelBn: 'নমিনির পূর্ণ নাম', labelEn: "Nominee's Full Name", type: 'text', required: true },
        { labelBn: 'নমিনির পিতার নাম', labelEn: "Nominee's Father's Name", type: 'text', required: true },
        { labelBn: 'নমিনির মাতার নাম', labelEn: "Nominee's Mother's Name", type: 'text', required: true },
        { labelBn: 'নমিনির জন্ম তারিখ', labelEn: "Nominee's Date of Birth", type: 'date', required: true },
        { labelBn: 'নমিনির জাতীয় পরিচয়পত্র নং (NID)', labelEn: 'Nominee NID Card No', type: 'text', required: true },
        { labelBn: 'সদস্যের সহিত সম্পর্ক', labelEn: 'Relationship with Member', type: 'text', required: true },
        { labelBn: 'নমিনির মোবাইল নম্বর ও ঠিকানা', labelEn: 'Nominee Mobile & Address', type: 'textarea', required: true },
      ],
    },
  ],
};

