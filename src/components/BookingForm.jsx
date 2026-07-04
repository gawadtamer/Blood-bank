import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiUpload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { bloodTypes, bookingServices, timeSlots } from '../data/bloodTypes.js'
import { hospitals } from '../data/hospitals.js'

const initialForm = {
  fullName: '',
  nationalId: '',
  phone: '',
  email: '',
  bloodType: '',
  serviceType: '',
  hospital: '',
  date: '',
  time: '',
  notes: ''
}

// نموذج الحجز المشترك: يُستخدم داخل صفحة الحجز
function BookingForm() {
  const [form, setForm] = useState(initialForm)
  const [idImage, setIdImage] = useState(null)
  const [idImageName, setIdImageName] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIdImageName(file.name)
    const reader = new FileReader()
    reader.onload = () => setIdImage(reader.result)
    reader.readAsDataURL(file)
    if (errors.idImage) setErrors((prev) => ({ ...prev, idImage: '' }))
  }

  // التحقق من صحة بيانات النموذج قبل الإرسال
  const validate = () => {
    const newErrors = {}
    if (!form.fullName.trim()) newErrors.fullName = 'الاسم بالكامل مطلوب'
    if (!/^\d{14}$/.test(form.nationalId)) newErrors.nationalId = 'الرقم القومي يجب أن يتكون من 14 رقمًا'
    if (!/^01\d{9}$/.test(form.phone)) newErrors.phone = 'رقم هاتف مصري غير صحيح (يبدأ بـ 01)'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'البريد الإلكتروني غير صحيح'
    if (!form.bloodType) newErrors.bloodType = 'يرجى اختيار فصيلة الدم'
    if (!form.serviceType) newErrors.serviceType = 'يرجى اختيار نوع الخدمة'
    if (!form.hospital) newErrors.hospital = 'يرجى اختيار المستشفى'
    if (!form.date) newErrors.date = 'يرجى اختيار التاريخ'
    if (!form.time) newErrors.time = 'يرجى اختيار الوقت'
    if (!idImage) newErrors.idImage = 'يرجى رفع صورة البطاقة الشخصية'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // حفظ الطلب داخل LocalStorage
    const newBooking = {
      id: Date.now(),
      ...form,
      idImage,
      idImageName,
      createdAt: new Date().toISOString()
    }
    const existing = JSON.parse(localStorage.getItem('bloodBankBookings') || '[]')
    localStorage.setItem('bloodBankBookings', JSON.stringify([...existing, newBooking]))

    setSubmitted(true)
    setForm(initialForm)
    setIdImage(null)
    setIdImageName('')
    setErrors({})
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl2 shadow-soft p-10 text-center max-w-xl mx-auto"
      >
        <div className="mx-auto mb-5 h-16 w-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-3xl">
          <FiCheckCircle />
        </div>
        <h3 className="font-display font-extrabold text-2xl text-ink mb-3">تم إرسال طلبك بنجاح</h3>
        <p className="text-ink/60 leading-7 mb-8">
          شكرًا لك، تم تسجيل طلبك بنجاح وسيتم التواصل معك خلال 24 ساعة لتأكيد الموعد.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-7 py-3 rounded-full transition-colors"
        >
          إرسال طلب آخر
        </button>
      </motion.div>
    )
  }

  const inputClass = (field) =>
    `w-full rounded-xl border px-4 py-3 text-sm bg-stone-50 focus:bg-white transition-colors outline-none ${
      errors[field] ? 'border-crimson-400' : 'border-stone-200 focus:border-crimson-400'
    }`

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl2 shadow-soft p-6 md:p-10 max-w-3xl mx-auto"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-5">
        <Field label="الاسم بالكامل" error={errors.fullName}>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className={inputClass('fullName')}
            placeholder="مثال: أحمد محمد علي"
          />
        </Field>

        <Field label="الرقم القومي" error={errors.nationalId}>
          <input
            name="nationalId"
            value={form.nationalId}
            onChange={handleChange}
            className={inputClass('nationalId')}
            placeholder="14 رقمًا"
            inputMode="numeric"
            maxLength={14}
          />
        </Field>

        <Field label="رقم الهاتف" error={errors.phone}>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputClass('phone')}
            placeholder="01xxxxxxxxx"
            inputMode="numeric"
            maxLength={11}
          />
        </Field>

        <Field label="البريد الإلكتروني (اختياري)" error={errors.email}>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass('email')}
            placeholder="example@email.com"
            type="email"
          />
        </Field>

        <Field label="فصيلة الدم المطلوبة" error={errors.bloodType}>
          <select name="bloodType" value={form.bloodType} onChange={handleChange} className={inputClass('bloodType')}>
            <option value="">اختر الفصيلة</option>
            {bloodTypes.map((b) => (
              <option key={b.id} value={b.type}>{b.type} - {b.name}</option>
            ))}
          </select>
        </Field>

        <Field label="نوع الخدمة" error={errors.serviceType}>
          <select name="serviceType" value={form.serviceType} onChange={handleChange} className={inputClass('serviceType')}>
            <option value="">اختر الخدمة</option>
            {bookingServices.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </Field>

        <Field label="المستشفى" error={errors.hospital}>
          <select name="hospital" value={form.hospital} onChange={handleChange} className={inputClass('hospital')}>
            <option value="">اختر المستشفى</option>
            {hospitals.map((h) => (
              <option key={h.id} value={h.name}>{h.name}</option>
            ))}
          </select>
        </Field>

        <Field label="التاريخ" error={errors.date}>
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            className={inputClass('date')}
            type="date"
            min={new Date().toISOString().split('T')[0]}
          />
        </Field>

        <Field label="الوقت" error={errors.time}>
          <select name="time" value={form.time} onChange={handleChange} className={inputClass('time')}>
            <option value="">اختر الوقت</option>
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field label="صورة البطاقة الشخصية" error={errors.idImage}>
          <label
            className={`flex items-center justify-between gap-3 rounded-xl border-2 border-dashed px-4 py-3 text-sm cursor-pointer transition-colors ${
              errors.idImage ? 'border-crimson-400 bg-crimson-50/30' : 'border-stone-300 hover:border-crimson-300 bg-stone-50'
            }`}
          >
            <span className="text-ink/60 truncate">{idImageName || 'اضغط لرفع صورة البطاقة'}</span>
            <FiUpload className="text-crimson-500 shrink-0" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </Field>

        <div className="md:col-span-2">
          <Field label="ملاحظات إضافية (اختياري)">
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className={inputClass('notes')}
              rows={4}
              placeholder="أي معلومات إضافية تود إخبارنا بها..."
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-8 bg-crimson-600 hover:bg-crimson-700 text-white font-bold py-4 rounded-full transition-all hover:shadow-soft"
      >
        إرسال الطلب
      </button>
    </motion.form>
  )
}

// حقل نموذج مع تسمية ورسالة خطأ
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-ink/75 mb-2">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 text-xs text-crimson-600 mt-1.5"
          >
            <FiAlertCircle /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BookingForm
