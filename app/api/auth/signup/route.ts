// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';

const DJANGO_API_URL = process.env.DJANGO_API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://bawbaty.onrender.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, national_id, phone_number, email, password } = body;

    // 1. تحقق أولي من وجود البيانات الأساسية على الخادم الوسيط
    if (!full_name || !national_id || !phone_number || !password) {
      return NextResponse.json(
        { message: 'جميع الحقول الأساسية (الاسم، الرقم الوطني، رقم الهاتف، كلمة المرور) مطلوبة' },
        { status: 400 }
      );
    }

    // 2. إرسال طلب إنشاء الحساب إلى خادم Django على Render
    const djangoResponse = await fetch(`${DJANGO_API_URL}/api/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        full_name,
        national_id,
        phone_number,
        email: email || '',
        password,
      }),
    });

    const data = await djangoResponse.json();

    // 3. معالجة وتنسيق الأخطاء القادمة من Django
    if (!djangoResponse.ok) {
      let errorMessage = 'فشل إنشاء الحساب، يرجى التأكد من البيانات المدخلة';

      if (data.detail) {
        errorMessage = data.detail;
      } else if (data.national_id) {
        errorMessage = 'الرقم الوطني مُسجل مسبقاً في النظام';
      } else if (data.phone_number) {
        errorMessage = 'رقم الهاتف المحمول مُسجل مسبقاً في النظام';
      } else if (data.password) {
        errorMessage = Array.isArray(data.password) ? data.password[0] : 'كلمة المرور غير مستوفية للشروط';
      } else if (typeof data === 'object') {
        const firstErrorKey = Object.keys(data)[0];
        if (firstErrorKey && Array.isArray(data[firstErrorKey])) {
          errorMessage = `${data[firstErrorKey][0]}`;
        }
      }

      return NextResponse.json(
        { message: errorMessage, errors: data },
        { status: djangoResponse.status }
      );
    }

    // 4. إرجاع استجابة النجاح للواجهة الأمامية
    return NextResponse.json(
      {
        success: true,
        message: 'تم إنشاء الحساب بنجاح',
        user: data.user || data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Route Handler Error:', error);
    return NextResponse.json(
      { message: 'تعذر الاتصال بخادم الخدمة الحكومية، يرجى المحاولة لاحقاً' },
      { status: 500 }
    );
  }
}