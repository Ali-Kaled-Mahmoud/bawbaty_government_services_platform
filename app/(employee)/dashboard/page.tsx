// src/app/officer/dashboard/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// نموذج للطلبات الواردة للموظف (Digital Front-End / Physical Verification)
interface PhysicalRequest {
  id: string;
  trackingNumber: string;
  citizenName: string;
  nationalId: string;
  serviceTitle: string;
  submittedAt: string;
  appointmentTime: string;
  status: 'PENDING_VERIFICATION' | 'APPROVED' | 'REJECTED' | 'PAYMENT_COMPLETED';
  documents: { name: string; verified: boolean }[];
  feeAmount: number;
}

const INITIAL_REQUESTS: PhysicalRequest[] = [
  {
    id: '1',
    trackingNumber: 'REQ-2026-9081',
    citizenName: 'أحمد عبدالله علي',
    nationalId: '1092837465',
    serviceTitle: 'تجديد بطاقة الهوية الوطنية',
    submittedAt: '2026-08-14 09:30',
    appointmentTime: 'اليوم - 10:30 صباحاً',
    status: 'PENDING_VERIFICATION',
    documents: [
      { name: 'صورة الهوية القديمة', verified: true },
      { name: 'الصورة الشخصية الرسمية', verified: false },
      { name: 'إثبات العنوان السكني', verified: false },
    ],
    feeAmount: 50,
  },
  {
    id: '2',
    trackingNumber: 'REQ-2026-9082',
    citizenName: 'سارة محمد العتيبي',
    nationalId: '1029384756',
    serviceTitle: 'إصدار بدل فاقد رخصة قيادة',
    submittedAt: '2026-08-14 10:15',
    appointmentTime: 'اليوم - 11:00 صباحاً',
    status: 'PENDING_VERIFICATION',
    documents: [
      { name: 'محضر إثبات القيد/الفقدان', verified: true },
      { name: 'نتيجة الفحص الطبي الميداني', verified: true },
    ],
    feeAmount: 100,
  },
  {
    id: '3',
    trackingNumber: 'REQ-2026-8950',
    citizenName: 'خالد إبراهيم المنصور',
    nationalId: '1082736451',
    serviceTitle: 'توثيق العقد العقاري المباشر',
    submittedAt: '2026-08-13 14:00',
    appointmentTime: 'أمس',
    status: 'APPROVED',
    documents: [
      { name: 'صك الملكية الأصلي', verified: true },
      { name: 'عقد المبيعات اليدوي', verified: true },
    ],
    feeAmount: 250,
  },
];

export default function OfficerDashboard() {
  const [requests, setRequests] = useState<PhysicalRequest[]>(INITIAL_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<PhysicalRequest | null>(
    INITIAL_REQUESTS[0]
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [cashCollected, setCashCollected] = useState(false);

  // تصفية الطلبات بواسطة البحث
  const filteredRequests = requests.filter(
    (req) =>
      req.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.citizenName.includes(searchTerm) ||
      req.nationalId.includes(searchTerm)
  );

  // تحديث حالة تدقيق وثيقة معينة
  const toggleDocVerification = (docIndex: number) => {
    if (!selectedRequest) return;

    const updatedDocs = [...selectedRequest.documents];
    updatedDocs[docIndex].verified = !updatedDocs[docIndex].verified;

    const updatedReq = { ...selectedRequest, documents: updatedDocs };
    setSelectedRequest(updatedReq);

    setRequests(requests.map((r) => (r.id === updatedReq.id ? updatedReq : r)));
  };

  // اعتماد وتمرير المعاملة (معالجة النقدية والتحقق الميداني)
  const handleApproveAndCollect = () => {
    if (!selectedRequest) return;

    const updatedReq: PhysicalRequest = {
      ...selectedRequest,
      status: 'APPROVED',
    };

    setSelectedRequest(updatedReq);
    setRequests(requests.map((r) => (r.id === updatedReq.id ? updatedReq : r)));
    setCashCollected(true);
    setTimeout(() => setCashCollected(false), 3000);
  };

  // رفض المعاملة
  const handleReject = () => {
    if (!selectedRequest) return;

    const updatedReq: PhysicalRequest = {
      ...selectedRequest,
      status: 'REJECTED',
    };

    setSelectedRequest(updatedReq);
    setRequests(requests.map((r) => (r.id === updatedReq.id ? updatedReq : r)));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dir-rtl flex flex-col">
      {/* 1. الترويسة الخاصة بالموظف */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
              م
            </div>
            <div>
              <h1 className="text-sm font-bold">منصة بوابتي | نافذة الموظف الميداني</h1>
              <p className="text-[11px] text-teal-400">مركز التدقيق المستندي واستلام الرسوم النقدي</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              الفرع: <strong className="text-white">المركز الحكومي الموحد - صالة 1</strong>
            </span>
            <Link
              href="/logout"
              className="text-slate-400 hover:text-white transition-colors"
            >
              خروج
            </Link>
          </div>
        </div>
      </header>

      {/* 2. شريط الإحصائيات السريعة */}
      <div className="bg-white border-b border-slate-200 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              {requests.filter((r) => r.status === 'PENDING_VERIFICATION').length}
            </div>
            <div>
              <p className="text-slate-500">طلبات بقائمة الانتظار</p>
              <p className="font-bold text-slate-800">تتطلب تدقيق</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              {requests.filter((r) => r.status === 'APPROVED').length}
            </div>
            <div>
              <p className="text-slate-500">معاملات مكتملة اليوم</p>
              <p className="font-bold text-slate-800">تم التوثيق والاستلام</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-100 pl-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              400 ر.س
            </div>
            <div>
              <p className="text-slate-500">المحصل النقدي الصندوق</p>
              <p className="font-bold text-slate-800">مطابق للتقارير</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
              2G/3G
            </div>
            <div>
              <p className="text-slate-500">حالة الاتصال بالخادم</p>
              <p className="font-bold text-emerald-600">متصل (وضع خفيف)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. جسم لوحة التحكم الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid lg:grid-cols-12 gap-6">
        
        {/* العمود الأيمن: قائمة الطلبات والبحث (4 أعمدة) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-162.5">
          
          {/* شريط البحث في الطلبات */}
          <div className="p-4 border-b border-slate-100">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث برقم الطلب، رقم الهوية، أو الاسم..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600"
            />
          </div>

          {/* قائمة الطلبات */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {filteredRequests.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-teal-50/60 border-r-4 border-teal-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {req.trackingNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        req.status === 'PENDING_VERIFICATION'
                          ? 'bg-amber-100 text-amber-800'
                          : req.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {req.status === 'PENDING_VERIFICATION'
                        ? 'في الانتظار'
                        : req.status === 'APPROVED'
                        ? 'معتمدة'
                        : 'مرفوضة'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800">{req.citizenName}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{req.serviceTitle}</p>

                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>الهوية: {req.nationalId}</span>
                    <span>{req.appointmentTime}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* العمود الأيسر: تفاصيل الطلب، التدقيق المستندي، والتحصيل (7 أعمدة) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col justify-between min-h-162.5">
          {selectedRequest ? (
            <div>
              {/* ترويسة تفاصيل المعاملة */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
                <div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                    معد للتحقق الميداني
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-2">
                    {selectedRequest.serviceTitle}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    رقم التتبع: <span className="font-mono font-bold">{selectedRequest.trackingNumber}</span>
                  </p>
                </div>

                <div className="text-left dir-ltr">
                  <div className="text-xs font-bold text-slate-400">تاريخ التقديم</div>
                  <div className="text-xs font-semibold text-slate-700">{selectedRequest.submittedAt}</div>
                </div>
              </div>

              {/* بيانات المراجع */}
              <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">اسم المراجع:</span>
                  <strong className="text-slate-800">{selectedRequest.citizenName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">الرقم الوطني / الهوية:</span>
                  <strong className="text-slate-800 font-mono">{selectedRequest.nationalId}</strong>
                </div>
              </div>

              {/* قائمة المستندات المطلوبة للتدقيق يدويًا */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  مطابقة الأوراق والوثائق الأصلية:
                </h3>

                <div className="space-y-2">
                  {selectedRequest.documents.map((doc, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        doc.verified
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={doc.verified}
                          onChange={() => toggleDocVerification(idx)}
                          className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-bold">
                        {doc.verified ? 'مُطابق ورسمي' : 'بانتظار الفحص الورقي'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* قسم الاستلام النقدي (Cash Collection) */}
              <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200/80 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">الرسوم المطلوبة للتحصيل النقدي</h4>
                    <p className="text-[11px] text-amber-700 mt-0.5">يتم استلام المبلغ نقداً في الصندوق وتفريغه بالنظام</p>
                  </div>
                  <div className="text-xl font-extrabold text-amber-900 dir-ltr">
                    {selectedRequest.feeAmount} <span className="text-xs">ر.س</span>
                  </div>
                </div>
              </div>

              {cashCollected && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl mb-4 font-bold text-center animate-pulse">
                  ✓ تم تحصيل المبلغ النقدي وتحديث سجل المعاملة بنجاح!
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              اختر معاملة من القائمة للبدء بالتدقيق والاستلام
            </div>
          )}

          {/* أزرار اتخاذ القرار وإغلاق المعاملة */}
          {selectedRequest && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3 justify-end">
              <button
                onClick={handleReject}
                disabled={selectedRequest.status === 'REJECTED'}
                className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs transition-all disabled:opacity-50"
              >
                رفض المعاملة / نواقص
              </button>

              <button
                onClick={handleApproveAndCollect}
                disabled={selectedRequest.status === 'APPROVED'}
                className="px-6 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                اعتماد وتحصيل نقدي
              </button>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}