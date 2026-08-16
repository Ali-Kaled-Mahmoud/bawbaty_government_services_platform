import { NextResponse } from 'next/server';

const DJANGO_API_URL = process.env.DJANGO_API_URL || 'http://127.0.0.1:8000/api/v1';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. إرسال بيانات الاعتماد إلى خادم Django (SimpleJWT)
    const djangoResponse = await fetch(`${DJANGO_API_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await djangoResponse.json();

    // في حال وجود خطأ من خادم Django
    if (!djangoResponse.ok) {
      return NextResponse.json(
        { message: data.detail || data.message || 'بيانات الدخول غير صحيحة' },
        { status: djangoResponse.status }
      );
    }

    // 2. استخراج الرموز وحالة المستخدم
    const { access, refresh, user } = data;

    // 3. إنشاء الاستجابة لإرسالها للواجهة الأمامية
    const response = NextResponse.json(
      { success: true, user },
      { status: 200 }
    );

    // 4. تعيين Access Token في HttpOnly Cookie
    response.cookies.set('access_token', access, {
      httpOnly: true, // يمنع وصول JavaScript للرمز للحماية من ثغرات XSS
      secure: process.env.NODE_ENV === 'production', // تفعيل HTTPS في بيئة الإنتاج فقط
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // صلاحية لمدة 1 ساعة
    });

    // 5. تعيين Refresh Token في HttpOnly Cookie (إذا توفر)
    if (refresh) {
      response.cookies.set('refresh_token', refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // صلاحية لمدة 7 أيام
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { message: 'فشل الاتصال بخادم الخدمة الحكومية' },
      { status: 500 }
    );
  }
}