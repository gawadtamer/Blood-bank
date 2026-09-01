import axios from 'axios'

// 1. إنشاء نسخة موحدة من Axios بجميع الإعدادات الأساسية
const API = axios.create({
  // قراءة رابط الباك إند من ملف البيئة .env (أو استخدام الرابط الافتراضي)
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // زمن الانتظار الأقصى (10 ثواني)
})

// 2. Request Interceptor (مُعالج الطلبات قبل خروجها للباك إند)
// وظيفته: إضافة توكين التوثيق (JWT Token) تلقائيًا في Header مع كل طلب
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 3. Response Interceptor (مُعالج الاستجابة فور وصولها من الباك إند)
// وظيفته: التعامل مع الأخطاء العامة (مثل انقضاء الجلسة 401 أو خطأ السيرفر 500)
API.interceptors.response.use(
  (response) => {
    // إرجاع الاستجابة كما هي إذا كانت ناجحة (Status Code 200-299)
    return response
  },
  (error) => {
    if (error.response) {
      // التعامل مع انتهاء التوكين أو عدم التصريح (401 Unauthorized)
      if (error.response.status === 401) {
        console.warn('⚠️ انقضت جلسة التسجيل، يرجى إعادة تسجيل الدخول.')
        localStorage.removeItem('user_token')
        // يمكن توجيه المستخدم لصفحة الدخول إذا لزم الأمر
      }
      
      // خطأ في السيرفر (500 Internal Server Error)
      if (error.response.status >= 500) {
        console.error('💥 خطأ داخلي في السيرفر:', error.response.data)
      }
    } else if (error.request) {
      console.error('📡 لم يتم استلام أي استجابة من السيرفر. تحقق من الاتصال بالشبكة.')
    }
    
    return Promise.reject(error)
  }
)

export default API
