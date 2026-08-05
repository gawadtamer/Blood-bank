// خدمة إدارة طلبات الدم وتوفر الدم والمتبرعين والإشعارات
// مصممة لسهولة ربطها لاحقًا بـ API أو قاعدة بيانات حقيقية (Backend-ready Architecture)

const STORAGE_KEYS = {
  REQUESTS: 'blood_bank_patient_requests',
  NOTIFICATIONS: 'blood_bank_patient_notifications',
  DONORS: 'blood_bank_donors_data',
  AVAILABILITY: 'blood_bank_availability_data'
}

// البيانات الأولية الافتراضية
const initialAvailability = [
  { type: 'A+', name: 'A موجب', units: 28, status: 'Available', statusAr: 'متوفر', color: 'green', canDonateTo: ['A+', 'AB+'], canReceiveFrom: ['A+', 'A-', 'O+', 'O-'] },
  { type: 'A-', name: 'A سالب', units: 6, status: 'Low Stock', statusAr: 'رصيد منخفض', color: 'amber', canDonateTo: ['A+', 'A-', 'AB+', 'AB-'], canReceiveFrom: ['A-', 'O-'] },
  { type: 'B+', name: 'B موجب', units: 19, status: 'Available', statusAr: 'متوفر', color: 'green', canDonateTo: ['B+', 'AB+'], canReceiveFrom: ['B+', 'B-', 'O+', 'O-'] },
  { type: 'B-', name: 'B سالب', units: 5, status: 'Low Stock', statusAr: 'رصيد منخفض', color: 'amber', canDonateTo: ['B+', 'B-', 'AB+', 'AB-'], canReceiveFrom: ['B-', 'O-'] },
  { type: 'AB+', name: 'AB موجب', units: 14, status: 'Available', statusAr: 'متوفر', color: 'green', canDonateTo: ['AB+'], canReceiveFrom: ['الكل'] },
  { type: 'AB-', name: 'AB سالب', units: 2, status: 'Critical', statusAr: 'حرج جداً', color: 'red', canDonateTo: ['AB+', 'AB-'], canReceiveFrom: ['A-', 'B-', 'AB-', 'O-'] },
  { type: 'O+', name: 'O موجب', units: 35, status: 'Available', statusAr: 'متوفر', color: 'green', canDonateTo: ['O+', 'A+', 'B+', 'AB+'], canReceiveFrom: ['O+', 'O-'] },
  { type: 'O-', name: 'O سالب', units: 3, status: 'Critical', statusAr: 'حرج جداً', color: 'red', canDonateTo: ['الكل'], canReceiveFrom: ['O-'] }
]

const initialRequests = [
  {
    id: 'REQ-9482',
    patientName: 'محمود أحمد علي',
    phone: '01012345678',
    bloodType: 'O-',
    units: 2,
    governorate: 'الدقهلية',
    city: 'المنصورة',
    hospital: 'مستشفى المنصورة الجامعي',
    requiredDate: '2026-08-06',
    urgency: 'Emergency',
    urgencyAr: 'طوارئ',
    notes: 'حالة عاجلة بغرفة العناية المركزة قسم الجراحة',
    status: 'Searching for Donors',
    statusAr: 'جاري البحث عن متبرعين',
    statusCode: 2,
    createdAt: '2026-08-05T09:30:00.000Z',
    timeline: [
      { code: 1, name: 'Request Submitted', nameAr: 'تم تقديم الطلب', desc: 'تم استلام طلب الدم بنجاح وتوثيقه بالمنظومة', time: '05 أغسطس 2026 - 09:30 ص', completed: true },
      { code: 2, name: 'Searching for Donors', nameAr: 'جاري البحث عن متبرعين', desc: 'جاري مطابقة الفصيلة مع بنوك الدم والمتبرعين المسجلين بالقرب من المستشفى', time: '05 أغسطس 2026 - 09:32 ص', completed: true },
      { code: 3, name: 'Donor / Blood Center Found', nameAr: 'تم العثور على متبرع / مركز دم', desc: 'تم إيجاد وحدات متطابقة وتنبيه المتبرعين المقبولين', time: 'في الانتظار...', completed: false },
      { code: 4, name: 'Blood Reserved', nameAr: 'تم حجز كيس الدم', desc: 'تأكيد حجز أكياس الدم باسم المريض وجاهزيتها للنقل', time: 'في الانتظار...', completed: false },
      { code: 5, name: 'Request Completed', nameAr: 'اكتمل الطلب', desc: 'تم تسليم كيس الدم بنجاح للمستشفى المعتمد', time: 'في الانتظار...', completed: false }
    ]
  },
  {
    id: 'REQ-8310',
    patientName: 'سارة محمد حسن',
    phone: '01187654321',
    bloodType: 'A+',
    units: 1,
    governorate: 'الدقهلية',
    city: 'طلخا',
    hospital: 'بنك الدم المركزي بالمنصورة',
    requiredDate: '2026-08-07',
    urgency: 'Normal',
    urgencyAr: 'عادي',
    notes: 'عملية مجدولة مسبقاً',
    status: 'Blood Reserved',
    statusAr: 'تم حجز كيس الدم',
    statusCode: 4,
    createdAt: '2026-08-04T14:15:00.000Z',
    timeline: [
      { code: 1, name: 'Request Submitted', nameAr: 'تم تقديم الطلب', desc: 'تم استلام طلب الدم بنجاح وتوثيقه بالمنظومة', time: '04 أغسطس 2026 - 02:15 م', completed: true },
      { code: 2, name: 'Searching for Donors', nameAr: 'جاري البحث عن متبرعين', desc: 'جاري مطابقة الفصيلة مع بنوك الدم والمتبرعين', time: '04 أغسطس 2026 - 02:20 م', completed: true },
      { code: 3, name: 'Donor / Blood Center Found', nameAr: 'تم العثور على متبرع / مركز دم', desc: 'تم العثور على رصيد متاح ببنك الدم المركزي', time: '04 أغسطس 2026 - 03:00 م', completed: true },
      { code: 4, name: 'Blood Reserved', nameAr: 'تم حجز كيس الدم', desc: 'تم تخصيص الكيس برقم الطلب REQ-8310', time: '04 أغسطس 2026 - 03:45 م', completed: true },
      { code: 5, name: 'Request Completed', nameAr: 'اكتمل الطلب', desc: 'في انتظار الاستلام الميداني', time: 'في الانتظار...', completed: false }
    ]
  }
]

const initialDonors = [
  { id: 'DON-101', name: 'أحمد م.', bloodType: 'O-', city: 'المنصورة', area: 'حي الجامعة', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 5 أشهر', distance: '1.8 كم' },
  { id: 'DON-102', name: 'إبراهيم ع.', bloodType: 'O-', city: 'طلخا', area: 'شارع المحطة', availability: 'متاح عند الطلب', lastDonation: 'قبل 4 أشهر', distance: '3.5 كم' },
  { id: 'DON-103', name: 'مصطفى ك.', bloodType: 'A+', city: 'المنصورة', area: 'شارع الجمهورية', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 6 أشهر', distance: '2.1 كم' },
  { id: 'DON-104', name: 'عمر ش.', bloodType: 'B+', city: 'ميت غمر', area: 'وسط البلد', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 3 أشهر', distance: '12 كم' },
  { id: 'DON-105', name: 'خالد س.', bloodType: 'AB-', city: 'المنصورة', area: 'حي توريل', availability: 'متاح للتبرع الآن', lastDonation: 'قبل 7 أشهر', distance: '2.9 كم' },
  { id: 'DON-106', name: 'طارق ف.', bloodType: 'O+', city: 'دكرنس', area: 'شارع المستشفى', availability: 'متاح عند الطلب', lastDonation: 'قبل 4 أشهر', distance: '18 كم' }
]

const initialNotifications = [
  { id: 'NOTIF-1', title: 'تم تقديم طلب الدم بنجاح', body: 'طلبك رقم REQ-9482 قيد المعالجة والبحث عن متبرعين.', time: 'منذ ١٠ دقائق', read: false, type: 'success', link: '/track-request?id=REQ-9482' },
  { id: 'NOTIF-2', title: 'تم حجز كيس الدم المطلوب', body: 'تم حجز كيس الدم لطلبك REQ-8310 ببنك الدم المركزي بالمنصورة.', time: 'منذ ساعتين', read: false, type: 'info', link: '/track-request?id=REQ-8310' },
  { id: 'NOTIF-3', title: 'تم العثور على متبرع متطابق', body: 'تم العثور على متبرعين حاملي فصيلة O- بالقرب من المنصورة.', time: 'أمس', read: true, type: 'warning', link: '/dashboard' }
]

// دالة مساعدة لجلب البيانات من التخزين
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : fallback
  } catch (e) {
    console.error('LocalStorage read error:', e)
    return fallback
  }
}

// دالة مساعدة لحفظ البيانات بالتخزين
const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('LocalStorage write error:', e)
  }
}

// تهيئة البيانات الافتراضية
export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    setStorageItem(STORAGE_KEYS.REQUESTS, initialRequests)
  }
  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    setStorageItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  }
  if (!localStorage.getItem(STORAGE_KEYS.DONORS)) {
    setStorageItem(STORAGE_KEYS.DONORS, initialDonors)
  }
  if (!localStorage.getItem(STORAGE_KEYS.AVAILABILITY)) {
    setStorageItem(STORAGE_KEYS.AVAILABILITY, initialAvailability)
  }
}

// 1. إنشاء طلب دم جديد
export const createBloodRequest = (data) => {
  initializeData()
  const requests = getStorageItem(STORAGE_KEYS.REQUESTS, initialRequests)
  const reqId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`
  
  const isEmergency = data.urgency === 'Emergency' || data.urgency === 'طوارئ'
  const urgencyLabel = isEmergency ? 'طوارئ' : data.urgency === 'Urgent' ? 'عاجل' : 'عادي'
  
  const newReq = {
    id: reqId,
    patientName: data.patientName,
    phone: data.phone,
    bloodType: data.bloodType,
    units: parseInt(data.units) || 1,
    governorate: data.governorate || 'الدقهلية',
    city: data.city,
    hospital: data.hospital,
    requiredDate: data.requiredDate || new Date().toISOString().split('T')[0],
    urgency: isEmergency ? 'Emergency' : data.urgency || 'Normal',
    urgencyAr: urgencyLabel,
    notes: data.notes || '',
    status: isEmergency ? 'Searching for Donors' : 'Request Submitted',
    statusAr: isEmergency ? 'جاري البحث عن متبرعين (عاجل)' : 'تم تقديم الطلب',
    statusCode: isEmergency ? 2 : 1,
    createdAt: new Date().toISOString(),
    timeline: [
      { code: 1, name: 'Request Submitted', nameAr: 'تم تقديم الطلب', desc: 'تم استلام طلب الدم بنجاح وتوثيقه بالمنظومة', time: 'الآن', completed: true },
      { code: 2, name: 'Searching for Donors', nameAr: 'جاري البحث عن متبرعين', desc: isEmergency ? 'جاري الاتصال الفوري بالمتبرعين القريبين لصفة الطوارئ' : 'جاري البحث عن متبرعين متطابقين في المنطقة', time: isEmergency ? 'الآن' : 'في الانتظار...', completed: isEmergency },
      { code: 3, name: 'Donor / Blood Center Found', nameAr: 'تم العثور على متبرع / مركز دم', desc: 'مراجعة ومطابقة المتبرعين والمستشفيات', time: 'في الانتظار...', completed: false },
      { code: 4, name: 'Blood Reserved', nameAr: 'تم حجز كيس الدم', desc: 'حجز وتخصيص وحدات الدم المطلوبة', time: 'في الانتظار...', completed: false },
      { code: 5, name: 'Request Completed', nameAr: 'اكتمل الطلب', desc: 'تسليم وحدات الدم واستكمال الخدمة بنجاح', time: 'في الانتظار...', completed: false }
    ]
  }

  const updatedRequests = [newReq, ...requests]
  setStorageItem(STORAGE_KEYS.REQUESTS, updatedRequests)

  // إضافة إشعار
  addNotification({
    title: isEmergency ? '🚨 تم تقديم طلب دم عاجل (طوارئ)' : 'تم تقديم طلب الدم بنجاح',
    body: `تم تسجيل طلبك برقم ${reqId} لفصيلة ${data.bloodType} بـ ${data.hospital}.`,
    type: isEmergency ? 'emergency' : 'success',
    link: `/track-request?id=${reqId}`
  })

  return newReq
}

// 2. البحث عن توفر الدم
export const searchBloodAvailability = (filters = {}) => {
  initializeData()
  const centers = [
    { id: 1, hospital: 'مستشفى المنصورة الجامعي', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'O+', units: 14, status: 'Available', statusAr: 'متوفر', distance: '1.2 كم', phone: '050-2202222', address: 'شارع الجامعة، المنصورة' },
    { id: 2, hospital: 'بنك الدم المركزي بالمنصورة', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'O+', units: 18, status: 'Available', statusAr: 'متوفر', distance: '2.0 كم', phone: '050-2331234', address: 'شارع الجمهورية، المنصورة' },
    { id: 3, hospital: 'مستشفى المنصورة العام', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'A+', units: 9, status: 'Available', statusAr: 'متوفر', distance: '3.1 كم', phone: '050-2223344', address: 'شارع البحر، المنصورة' },
    { id: 4, hospital: 'مستشفى دار الشفاء التخصصي', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'O-', units: 2, status: 'Critical', statusAr: 'حرج', distance: '4.5 كم', phone: '050-2255678', address: 'طريق المنصورة - طلخا' },
    { id: 5, hospital: 'مستشفى ميت غمر العام', city: 'ميت غمر', governorate: 'الدقهلية', bloodType: 'B+', units: 11, status: 'Available', statusAr: 'متوفر', distance: '14 كم', phone: '050-3722222', address: 'شارع سعد زغلول، ميت غمر' },
    { id: 6, hospital: 'مستشفى طلخا المركزي', city: 'طلخا', governorate: 'الدقهلية', bloodType: 'A-', units: 3, status: 'Low Stock', statusAr: 'رصيد منخفض', distance: '3.8 كم', phone: '050-2611234', address: 'شارع المحطة، طلخا' },
    { id: 7, hospital: 'بنك الدم المركزي بالمنصورة', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'AB-', units: 1, status: 'Critical', statusAr: 'حرج جداً', distance: '2.0 كم', phone: '050-2331234', address: 'شارع الجمهورية، المنصورة' },
    { id: 8, hospital: 'مستشفى المنصورة الجامعي', city: 'المنصورة', governorate: 'الدقهلية', bloodType: 'B-', units: 4, status: 'Low Stock', statusAr: 'رصيد منخفض', distance: '1.2 كم', phone: '050-2202222', address: 'شارع الجامعة، المنصورة' }
  ]

  return centers.filter((item) => {
    if (filters.bloodType && filters.bloodType !== 'الكل' && item.bloodType !== filters.bloodType) return false
    if (filters.city && filters.city !== 'الكل' && !item.city.includes(filters.city)) return false
    if (filters.governorate && filters.governorate !== 'الكل' && item.governorate !== filters.governorate) return false
    if (filters.hospital && filters.hospital !== 'الكل' && !item.hospital.includes(filters.hospital)) return false
    if (filters.availability && filters.availability !== 'الكل' && item.status !== filters.availability) return false
    return true
  })
}

// 3. البحث عن المتبرعين المطابقين
export const findMatchingDonors = (bloodType, location = '') => {
  initializeData()
  const donors = getStorageItem(STORAGE_KEYS.DONORS, initialDonors)
  return donors.filter((d) => {
    const matchType = !bloodType || bloodType === 'الكل' || d.bloodType === bloodType
    const matchLoc = !location || d.city.includes(location) || d.area.includes(location)
    return matchType && matchLoc
  })
}

// 4. الحصول على حالة الطلب حسب الرقم
export const getRequestStatus = (reqId) => {
  initializeData()
  const requests = getStorageItem(STORAGE_KEYS.REQUESTS, initialRequests)
  return requests.find((r) => r.id.toLowerCase() === reqId.trim().toLowerCase()) || null
}

// 5. جلب كافة الطلبات
export const getAllRequests = () => {
  initializeData()
  return getStorageItem(STORAGE_KEYS.REQUESTS, initialRequests)
}

// 6. جلب بيانات توفر الدم العامة
export const getBloodAvailabilityDashboardData = () => {
  initializeData()
  return getStorageItem(STORAGE_KEYS.AVAILABILITY, initialAvailability)
}

// 7. إدارة الإشعارات
export const getNotifications = () => {
  initializeData()
  return getStorageItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
}

export const addNotification = (notif) => {
  initializeData()
  const list = getStorageItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  const newNotif = {
    id: `NOTIF-${Date.now()}`,
    title: notif.title,
    body: notif.body,
    time: 'الآن',
    read: false,
    type: notif.type || 'info',
    link: notif.link || '/notifications'
  }
  const updated = [newNotif, ...list]
  setStorageItem(STORAGE_KEYS.NOTIFICATIONS, updated)
  return updated
}

export const markNotificationAsRead = (id) => {
  initializeData()
  const list = getStorageItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  const updated = list.map((n) => (n.id === id ? { ...n, read: true } : n))
  setStorageItem(STORAGE_KEYS.NOTIFICATIONS, updated)
  return updated
}

export const markAllNotificationsAsRead = () => {
  initializeData()
  const list = getStorageItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications)
  const updated = list.map((n) => ({ ...n, read: true }))
  setStorageItem(STORAGE_KEYS.NOTIFICATIONS, updated)
  return updated
}
