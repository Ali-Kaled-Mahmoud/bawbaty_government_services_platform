"use client";

import { useState } from "react";
import HeaderEmployee from "@/components/employee/headerEmployee";
import StatisticsBar from "@/components/employee/statisticsBar";
import RequestsList from "@/components/employee/requestsList";
import Request from "@/components/employee/request";

// نموذج للطلبات الواردة للموظف (Digital Front-End / Physical Verification)
interface PhysicalRequest {
  id: string;
  trackingNumber: string;
  citizenName: string;
  nationalId: string;
  serviceTitle: string;
  submittedAt: string;
  appointmentTime: string;
  status:
    | "PENDING_VERIFICATION"
    | "APPROVED"
    | "REJECTED"
    | "PAYMENT_COMPLETED";
  documents: { name: string; verified: boolean }[];
  feeAmount: number;
}

const INITIAL_REQUESTS: PhysicalRequest[] = [
  {
    id: "1",
    trackingNumber: "REQ-2026-9081",
    citizenName: "أحمد عبدالله علي",
    nationalId: "1092837465",
    serviceTitle: "تجديد بطاقة الهوية الوطنية",
    submittedAt: "2026-08-14 09:30",
    appointmentTime: "اليوم - 10:30 صباحاً",
    status: "PENDING_VERIFICATION",
    documents: [
      { name: "صورة الهوية القديمة", verified: true },
      { name: "الصورة الشخصية الرسمية", verified: false },
      { name: "إثبات العنوان السكني", verified: false },
    ],
    feeAmount: 50,
  },
  {
    id: "2",
    trackingNumber: "REQ-2026-9082",
    citizenName: "سارة محمد العتيبي",
    nationalId: "1029384756",
    serviceTitle: "إصدار بدل فاقد رخصة قيادة",
    submittedAt: "2026-08-14 10:15",
    appointmentTime: "اليوم - 11:00 صباحاً",
    status: "PENDING_VERIFICATION",
    documents: [
      { name: "محضر إثبات القيد/الفقدان", verified: true },
      { name: "نتيجة الفحص الطبي الميداني", verified: true },
    ],
    feeAmount: 100,
  },
  {
    id: "3",
    trackingNumber: "REQ-2026-8950",
    citizenName: "خالد إبراهيم المنصور",
    nationalId: "1082736451",
    serviceTitle: "توثيق العقد العقاري المباشر",
    submittedAt: "2026-08-13 14:00",
    appointmentTime: "أمس",
    status: "APPROVED",
    documents: [
      { name: "صك الملكية الأصلي", verified: true },
      { name: "عقد المبيعات اليدوي", verified: true },
    ],
    feeAmount: 250,
  },
];

export default function OfficerDashboard() {
  const [requests, setRequests] = useState<PhysicalRequest[]>(INITIAL_REQUESTS);
  const [selectedRequest, setSelectedRequest] =
    useState<PhysicalRequest | null>(INITIAL_REQUESTS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cashCollected, setCashCollected] = useState(false);

  // تصفية الطلبات بواسطة البحث
  const filteredRequests = requests.filter(
    (req) =>
      req.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.citizenName.includes(searchTerm) ||
      req.nationalId.includes(searchTerm),
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
      status: "APPROVED",
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
      status: "REJECTED",
    };

    setSelectedRequest(updatedReq);
    setRequests(requests.map((r) => (r.id === updatedReq.id ? updatedReq : r)));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dir-rtl flex flex-col">
      <HeaderEmployee />
      <StatisticsBar requests={requests} />
      {/* 3. جسم لوحة التحكم الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid lg:grid-cols-12 gap-6">
        <RequestsList
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSelectedRequest={setSelectedRequest}
          filteredRequests={filteredRequests}
          selectedRequest={selectedRequest}
        />
        <Request
          selectedRequest={selectedRequest}
          toggleDocVerification={toggleDocVerification}
          cashCollected={cashCollected}
          handleReject={handleReject}
          handleApproveAndCollect={handleApproveAndCollect}
        />
      </div>
    </div>
  );
}
