"use client";

import { useState, useEffect, useCallback } from "react";
import HeaderEmployee from "@/components/employee/headerEmployee";
import StatisticsBar from "@/components/employee/statisticsBar";
import RequestsList from "@/components/employee/requestsList";
import Request from "@/components/employee/request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://bawbaty.onrender.com";

export interface DBRequest {
  tracking_id: string;
  citizen_name: string;
  citizen_national_id: string;
  service_name: string;
  service_fees: string;
  status: "submitted" | "auditing" | "matching" | "closed" | "rejected";
  status_display: string;
  payment_status: boolean;
  receipt_reference: string | null;
  created_at: string;
}

export default function OfficerDashboard() {
  const [requests, setRequests] = useState<DBRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DBRequest | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [cashCollected, setCashCollected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // جلب الطلبات من قاعدة البيانات عبر Render
  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/requests/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("فشل في جلب الطلبات من قاعدة البيانات");

      const data: DBRequest[] = await res.json();
      setRequests(data);
      if (data.length > 0 && !selectedRequest) {
        setSelectedRequest(data[0]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedRequest]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRequests();
  }, [fetchRequests]);

  // تصفية الطلبات بواسطة البحث
  const filteredRequests = requests.filter(
    (req) =>
      req.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.citizen_name && req.citizen_name.includes(searchTerm)) ||
      (req.citizen_national_id && req.citizen_national_id.includes(searchTerm)),
  );

  // تحديث حالة الطلب عبر Render
  const handleStatusChange = async (newStatus: DBRequest["status"]) => {
    if (!selectedRequest) return;
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${API_BASE_URL}/requests/${selectedRequest.tracking_id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      if (!res.ok) throw new Error("تعذر تحديث حالة المعاملة");

      const updatedData: DBRequest = await res.json();
      setSelectedRequest(updatedData);
      setRequests((prev) =>
        prev.map((r) =>
          r.tracking_id === updatedData.tracking_id ? updatedData : r,
        ),
      );
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // اعتماد وتحصيل الطلب في قاعدة البيانات على Render
  const handleApproveAndCollect = async () => {
    if (!selectedRequest) return;
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${API_BASE_URL}/requests/${selectedRequest.tracking_id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "closed",
            payment_status: true,
          }),
        },
      );

      if (!res.ok) throw new Error("تعذر إغلاق المعاملة وتحديث حالة الدفع");

      const updatedData: DBRequest = await res.json();
      setSelectedRequest(updatedData);
      setRequests((prev) =>
        prev.map((r) =>
          r.tracking_id === updatedData.tracking_id ? updatedData : r,
        ),
      );

      setCashCollected(true);
      setTimeout(() => setCashCollected(false), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dir-rtl flex flex-col">
      <HeaderEmployee />
      <StatisticsBar requests={requests} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full grid lg:grid-cols-12 gap-6">
        {isLoading ? (
          <div className="lg:col-span-12 text-center py-20 text-slate-500">
            جاري تحميل الطلبات من قاعدة البيانات...
          </div>
        ) : error ? (
          <div className="lg:col-span-12 text-center py-20 text-red-600">
            {error}
          </div>
        ) : (
          <>
            <RequestsList
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelectedRequest={setSelectedRequest}
              filteredRequests={filteredRequests}
              selectedRequest={selectedRequest}
            />
            <Request
              selectedRequest={selectedRequest}
              cashCollected={cashCollected}
              isUpdating={isUpdating}
              handleStatusChange={handleStatusChange}
              handleApproveAndCollect={handleApproveAndCollect}
            />
          </>
        )}
      </div>
    </div>
  );
}