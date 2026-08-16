import { cookies } from 'next/headers';

// جلب رمز Access Token
export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('access_token')?.value;
}

// جلب رمز Refresh Token
export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get('refresh_token')?.value;
}

// التحقق من حالة تسجيل الدخول
export async function isAuthenticated() {
  const token = await getAccessToken();
  return !!token;
}

export interface LoginPayload {
  national_id?: string;
  password?: string;
  phone_number?: string;
  otp_code?: string;
}

export async function loginApi(credentials: LoginPayload) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'حدث خطأ أثناء تسجيل الدخول');
  }

  return data;
}

export async function logoutApi() {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('فشل تسجيل الخروج');
  }

  return response.json();
}