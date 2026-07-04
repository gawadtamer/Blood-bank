// بيانات فصائل الدم الثمانية مع معلومات التبرع والاستقبال
export const bloodTypes = [
  {
    id: 1,
    type: "A+",
    name: "A موجب",
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"],
    availability: "متوفر"
  },
  {
    id: 2,
    type: "A-",
    name: "A سالب",
    canDonateTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"],
    availability: "محدود"
  },
  {
    id: 3,
    type: "B+",
    name: "B موجب",
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"],
    availability: "متوفر"
  },
  {
    id: 4,
    type: "B-",
    name: "B سالب",
    canDonateTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"],
    availability: "محدود"
  },
  {
    id: 5,
    type: "AB+",
    name: "AB موجب",
    canDonateTo: ["AB+"],
    canReceiveFrom: ["الكل"],
    availability: "متوفر"
  },
  {
    id: 6,
    type: "AB-",
    name: "AB سالب",
    canDonateTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"],
    availability: "نادر"
  },
  {
    id: 7,
    type: "O+",
    name: "O موجب",
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O+", "O-"],
    availability: "متوفر"
  },
  {
    id: 8,
    type: "O-",
    name: "O سالب",
    canDonateTo: ["الكل"],
    canReceiveFrom: ["O-"],
    availability: "نادر"
  }
]

// أسماء المستشفيات لاستخدامها في نموذج الحجز
export const bookingServices = [
  { id: "reserve", label: "حجز كيس دم" },
  { id: "typing", label: "معرفة فصيلة الدم" }
]

export const timeSlots = [
  "09:00 ص", "10:00 ص", "11:00 ص", "12:00 م",
  "01:00 م", "02:00 م", "03:00 م", "04:00 م", "05:00 م"
]
