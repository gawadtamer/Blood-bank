// خدمة إدارة المتبرعين بالدم (Donor Service)
import API from './api'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

const initialDonors = [
  { id: 'DON-101', name: 'أحمد م.', bloodType: 'O-', city: 'المنصورة', area: 'حي الجامعة', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 5 أشهر', distance: '1.8 كم' },
  { id: 'DON-102', name: 'إبراهيم ع.', bloodType: 'O-', city: 'طلخا', area: 'شارع المحطة', availability: 'متاح عند الطلب', lastDonation: 'قبل 4 أشهر', distance: '3.5 كم' },
  { id: 'DON-103', name: 'مصطفى ك.', bloodType: 'A+', city: 'المنصورة', area: 'شارع الجمهورية', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 6 أشهر', distance: '2.1 كم' },
  { id: 'DON-104', name: 'عمر ش.', bloodType: 'B+', city: 'ميت غمر', area: 'وسط البلد', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 3 أشهر', distance: '12 كم' },
  { id: 'DON-105', name: 'خالد س.', bloodType: 'AB-', city: 'المنصورة', area: 'حي توريل', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 7 أشهر', distance: '2.9 كم' },
  { id: 'DON-106', name: 'طارق ف.', bloodType: 'O+', city: 'دكرنس', area: 'شارع المستشفى', availability: 'متاح عند الطلب', lastDonation: 'قبل 18 كم' }
]

/**
 * 1. البحث عن المتبرعين المطابقين
 * Endpoint المتوقع: GET /api/donors/search?bloodType=O-&location=المنصورة
 */
export const fetchMatchingDonors = async (bloodType, location = '') => {
  if (USE_MOCK_DATA) {
    return initialDonors.filter((d) => {
      const matchType = !bloodType || bloodType === 'الكل' || d.bloodType === bloodType
      const matchLoc = !location || d.city.includes(location) || d.area.includes(location)
      return matchType && matchLoc
    })
  }

  const response = await API.get('/donors/search', {
    params: { bloodType, location }
  })
  return response.data
}

/**
 * 2. التسجيل كمتبرع جديد
 * Endpoint المتوقع: POST /api/donors/register
 */
export const registerAsDonor = async (donorData) => {
  if (USE_MOCK_DATA) {
    const newDonor = {
      id: `DON-${Math.floor(100 + Math.random() * 900)}`,
      ...donorData,
      availability: 'متاح للتبرع الآن',
      distance: 'قريب منك'
    }
    initialDonors.unshift(newDonor)
    return newDonor
  }

  const response = await API.post('/donors/register', donorData)
  return response.data
}
