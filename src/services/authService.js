// خدمة إدارة حسابات المستخدمين والتوثيق (Auth Service)
// يدعم التبديل التلقائي بين البيانات المؤقتة (Mock) والـ API الحقيقي

import API from './api'

// مفتاح التبديل للبيانات التخيلية
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

/**
 * 1. تسجيل دخول المستخدم (Login)
 * Endpoint المتوقع: POST /api/auth/login
 */
export const loginUser = async (credentials) => {
  if (USE_MOCK_DATA) {
    // محاكاة استجابة الباك إند
    await new Promise((res) => setTimeout(res, 500))
    if (credentials.phone === '01012345678' && credentials.password === '123456') {
      const mockResponse = {
        token: 'mock_jwt_token_123456',
        user: { id: 1, name: 'محمود أحمد', phone: '01012345678', bloodType: 'O-' }
      }
      localStorage.setItem('user_token', mockResponse.token)
      localStorage.setItem('user_info', JSON.stringify(mockResponse.user))
      return mockResponse
    }
    throw new Error('رقم الهاتف أو كلمة السر غير صحيحة')
  }

  // الربط الحقيقي بالباك إند
  const response = await API.post('/auth/login', credentials)
  if (response.data.token) {
    localStorage.setItem('user_token', response.data.token)
    localStorage.setItem('user_info', JSON.stringify(response.data.user))
  }
  return response.data
}

/**
 * 2. إنشـاء حساب جديد (Register)
 * Endpoint المتوقع: POST /api/auth/register
 */
export const registerUser = async (userData) => {
  if (USE_MOCK_DATA) {
    await new Promise((res) => setTimeout(res, 500))
    const mockResponse = {
      token: `mock_jwt_token_${Date.now()}`,
      user: { id: Date.now(), ...userData }
    }
    localStorage.setItem('user_token', mockResponse.token)
    localStorage.setItem('user_info', JSON.stringify(mockResponse.user))
    return mockResponse
  }

  const response = await API.post('/auth/register', userData)
  if (response.data.token) {
    localStorage.setItem('user_token', response.data.token)
    localStorage.setItem('user_info', JSON.stringify(response.data.user))
  }
  return response.data
}

/**
 * 3. تسجيل الخروج (Logout)
 */
export const logoutUser = async () => {
  if (!USE_MOCK_DATA) {
    try {
      await API.post('/auth/logout')
    } catch (e) {
      console.warn('Logout API error:', e)
    }
  }
  localStorage.removeItem('user_token')
  localStorage.removeItem('user_info')
}

/**
 * 4. جلب بيانات المستخدم الحالي (Get Profile)
 * Endpoint المتوقع: GET /api/auth/me
 */
export const getCurrentUserProfile = async () => {
  if (USE_MOCK_DATA) {
    const user = localStorage.getItem('user_info')
    return user ? JSON.parse(user) : null
  }

  const response = await API.get('/auth/me')
  return response.data
}
