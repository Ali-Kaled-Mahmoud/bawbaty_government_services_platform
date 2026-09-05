import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'تم تسجيل الخروج بنجاح' },
    { status: 200 }
  );

  // حذف ملفات التعريف بضبط تاريخ انتهاء الصلاحية
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  response.cookies.delete('token');
  response.cookies.delete('user_info');
  response.cookies.delete('user_role');

  return response;
}