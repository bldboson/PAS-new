import React, { useState } from 'react';
import { DeedRecord, DeedType } from '../types';
import { generateDeedScanSvg } from '../data/initialDeeds';
import { useLanguage } from '../context/LanguageContext';
import { X, FileText, Check, Plus, Upload, Trash2 } from 'lucide-react';

interface AddDeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDeed: (deed: DeedRecord) => void;
}

export const AddDeedModal: React.FC<AddDeedModalProps> = ({
  isOpen,
  onClose,
  onAddDeed,
}) => {
  const { t, language } = useLanguage();

  const [deedNo, setDeedNo] = useState<string>('');
  const [deedDate, setDeedDate] = useState<string>('');
  const [registryOffice, setRegistryOffice] = useState<string>('সাভার সাব-রেজিস্ট্রি কার্যালয়, ঢাকা');
  const [deedType, setDeedType] = useState<DeedType>('saf_kobala');
  const [mouza, setMouza] = useState<string>('কাউন্ডিয়া');
  const [dagNo, setDagNo] = useState<string>('');
  const [khatianNo, setKhatianNo] = useState<string>('');
  const [landArea, setLandArea] = useState<string>('');
  const [sellerName, setSellerName] = useState<string>('');
  const [buyerName, setBuyerName] = useState<string>('প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি');
  const [totalValueTaka, setTotalValueTaka] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deedNo.trim()) return;

    // Parse decimal area if possible
    const decimalMatch = landArea.match(/(\d+(\.\d+)?)/);
    const parsedDecimal = decimalMatch ? parseFloat(decimalMatch[0]) : 10;

    const finalDeedUrl =
      uploadedImageUrl ||
      generateDeedScanSvg({
        deedNo,
        deedTypeTitle:
          deedType === 'saf_kobala'
            ? 'সাফ-কবলা হস্তান্তর দলিলপত্র'
            : deedType === 'mutation'
            ? 'ই-নামজারি খতিয়ান ও পর্চা'
            : 'বায়নামা চুক্তিপত্র দলিল',
        date: deedDate || '10.05.2024',
        mouza: mouza || 'কাউন্ডিয়া',
        dagNo: dagNo || '১২৩৪',
        khatianNo: khatianNo || 'বিএস ৬০০',
        area: landArea || '১০.০০ শতক',
        seller: sellerName || 'দাতা / বিক্রেতা',
        buyer: buyerName || 'প্রগ্রেসিভ অ্যাসোসিয়েশন সোসাইটি',
        office: registryOffice || 'সাব-রেজিস্ট্রি কার্যালয়',
        pageNumber: 1,
        totalPages: 1,
      });

    const newDeed: DeedRecord = {
      id: `DEED-${Date.now().toString().slice(-4)}`,
      deedNo: deedNo.trim(),
      deedDate: deedDate.trim() || '15.10.2024',
      registryOffice: registryOffice.trim(),
      deedType,
      mouza: mouza.trim(),
      khatianNo: {
        bs: khatianNo.trim(),
      },
      dagNo: dagNo.trim(),
      landArea: landArea.trim() || '10.00 Decimals',
      landAreaDecimal: parsedDecimal,
      buyerName: buyerName.trim(),
      sellerName: sellerName.trim(),
      totalValueTaka: Number(totalValueTaka) || 0,
      status: deedType === 'mutation' ? 'mutation_completed' : 'registered',
      khajnaUpdatedYear: '1431 (2024)',
      pagesCount: 1,
      pages: [
        {
          pageNumber: 1,
          title: `Page 1: Deed Scan #${deedNo}`,
          url: finalDeedUrl,
        },
      ],
      notes: notes.trim(),
    };

    onAddDeed(newDeed);
    onClose();
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
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {language === 'bn' ? 'নতুন দলিল / রেকর্ডপত্র যুক্ত করুন' : 'Add Land Deed / Record'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {language === 'bn' ? 'জমির দলিলের তথ্য ও স্ক্যান কপি আপলোড' : 'Save deed details and scanned copy'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs sm:text-sm overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'দলিল নম্বর *' : 'Deed Number *'}
              </label>
              <input
                type="text"
                required
                value={deedNo}
                onChange={(e) => setDeedNo(e.target.value)}
                placeholder="e.g. 4821/2024"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'দলিলের ধরন' : 'Deed Type'}
              </label>
              <select
                value={deedType}
                onChange={(e) => setDeedType(e.target.value as DeedType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white font-medium text-xs focus:ring-2 focus:ring-emerald-500"
              >
                <option value="saf_kobala">Saf-Kobala (সাফ-কবলা হস্তান্তর)</option>
                <option value="mutation">Mutation Porcha (নামজারি পর্চা / ডিসিআর)</option>
                <option value="bayna">Baynanama (বায়না চুক্তিপত্র)</option>
                <option value="power_of_attorney">Power of Attorney (আমমোক্তারনামা)</option>
                <option value="khajna_dakhila">Khajna Dakhila (খাজনা দাখিলা)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'রেজিস্ট্রি তারিখ (DD.MM.YY)' : 'Registration Date'}
              </label>
              <input
                type="text"
                value={deedDate}
                onChange={(e) => setDeedDate(e.target.value)}
                placeholder="e.g. 15.05.2024"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'সাব-রেজিস্ট্রি কার্যালয়' : 'Sub-Registry Office'}
              </label>
              <input
                type="text"
                value={registryOffice}
                onChange={(e) => setRegistryOffice(e.target.value)}
                placeholder="e.g. সাভার সাব-রেজিস্ট্রি অফিস"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Land Schedule Details */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="font-semibold text-slate-700 text-xs block">
              {language === 'bn' ? 'জমির তফসিল পরিচয়' : 'Land Schedule Details'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">
                  {language === 'bn' ? 'মৌজা' : 'Mouza'}
                </label>
                <input
                  type="text"
                  value={mouza}
                  onChange={(e) => setMouza(e.target.value)}
                  placeholder="e.g. কাউন্ডিয়া"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">
                  {language === 'bn' ? 'দাগ নং' : 'Dag / Plot #'}
                </label>
                <input
                  type="text"
                  value={dagNo}
                  onChange={(e) => setDagNo(e.target.value)}
                  placeholder="e.g. ৮৪২, ৮৪৩"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">
                  {language === 'bn' ? 'খতিয়ান নং' : 'Khatian #'}
                </label>
                <input
                  type="text"
                  value={khatianNo}
                  onChange={(e) => setKhatianNo(e.target.value)}
                  placeholder="e.g. বিএস ৬০৮"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">
                  {language === 'bn' ? 'জমির পরিমাণ' : 'Land Area'}
                </label>
                <input
                  type="text"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  placeholder="e.g. 15.00 শতক"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg font-mono font-bold text-xs"
                />
              </div>
            </div>
          </div>

          {/* Parties & Financials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'দাতা / বিক্রেতার নাম' : 'Seller Name'}
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                placeholder="e.g. জনাব মো: আব্দুল মতিন"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                {language === 'bn' ? 'দলিলের রেজিস্ট্রি মূল্য (টাকা)' : 'Deed Valuation (Tk)'}
              </label>
              <input
                type="number"
                value={totalValueTaka || ''}
                onChange={(e) => setTotalValueTaka(Number(e.target.value))}
                placeholder="e.g. 3500000"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 font-mono font-bold text-xs"
              />
            </div>
          </div>

          {/* Upload Scanned Copy */}
          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              {language === 'bn' ? 'দলিলের স্ক্যান কপি আপলোড (ঐচ্ছিক)' : 'Upload Scanned Deed Copy (Optional)'}
            </label>
            <div className="flex items-center gap-3">
              <label className="px-3.5 py-2 border border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors shrink-0">
                <Upload className="w-4 h-4 text-emerald-600" />
                <span>{language === 'bn' ? 'ফাইল সিলেক্ট করুন' : 'Choose File'}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              {uploadedImageUrl ? (
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium truncate">
                  <Check className="w-4 h-4" />
                  <span className="truncate">{language === 'bn' ? 'ছবি যুক্ত হয়েছে' : 'Image loaded'}</span>
                  <button
                    type="button"
                    onClick={() => setUploadedImageUrl('')}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  {language === 'bn'
                    ? 'ফাইল আপলোড না করলে অটোমেটিক অফিসিয়াল ডিজিটাল কপি তৈরি হবে।'
                    : 'If no image is uploaded, an official digital certificate will be auto-generated.'}
                </span>
              )}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block font-semibold text-slate-700 text-xs mb-1">
              {language === 'bn' ? 'মন্তব্য ও রেকর্ড লোকেশন' : 'Remarks / Locker Details'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. মূল দলিল ব্যাংকের লকার নং ১২ এ সংরক্ষিত"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'bn' ? 'দলিল সেভ করুন' : 'Save Deed'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

