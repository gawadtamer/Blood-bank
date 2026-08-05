import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUser,
  FiPhone,
  FiDroplet,
  FiMapPin,
  FiCalendar,
  FiAlertTriangle,
  FiFileText,
  FiCheckCircle,
  FiShield,
  FiClock,
  FiInfo
} from 'react-icons/fi'
import { hospitals } from '../data/hospitals.js'
import { useBloodRequest } from '../context/BloodRequestContext.jsx'

const governorates = ['الدقهلية', 'الغربية', 'الشرقية', 'دمياط', 'كفر الشيخ', 'القاهرة', 'الجيزة']
const bloodTypesList = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function RequestBloodForm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { createBloodRequest } = useBloodRequest()

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    bloodType: 'O+',
    units: 1,
    governorate: 'الدقهلية',
    city: 'المنصورة',
    hospital: 'مستشفى المنصورة الجامعي',
    customHospital: '',
    requiredDate: new Date().toISOString().split('T')[0],
    urgency: 'Normal',
    notes: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedSuccess, setSubmittedSuccess] = useState(null)

  useEffect(() => {
    const urgencyParam = searchParams.get('urgency')
    if (urgencyParam === 'emergency') {
      setFormData((prev) => ({ ...prev, urgency: 'Emergency' }))
    }
  }, [searchParams])

  const validateForm = () => {
    const errs = {}
    if (!formData.patientName.trim()) {
      errs.patientName = 'يرجى إدخال اسم المريض الكامل'
    } else if (formData.patientName.trim().length < 3) {
      errs.patientName = 'الاسم قصير جداً (يجب أن يكون ٣ حروف على الأقل)'
    }

    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!formData.phone.trim()) {
      errs.phone = 'يرجى إدخال رقم الهاتف'
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errs.phone = 'رقم هاتف غير صحيح (مثال: 01012345678)'
    }

    if (!formData.units || formData.units < 1 || formData.units > 20) {
      errs.units = 'يرجى تحديد عدد أكياس الدم (بين ١ و ٢٠ كيس)'
    }

    if (!formData.city.trim()) {
      errs.city = 'يرجى تحديد المدينة أو المنطقة'
    }

    if (formData.hospital === 'أخرى' && !formData.customHospital.trim()) {
      errs.customHospital = 'يرجى كتابة اسم المستشفى'
    }

    if (!formData.requiredDate) {
      errs.requiredDate = 'يرجى تحديد التاريخ المطلوب'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const finalHospital = formData.hospital === 'أخرى' ? formData.customHospital : formData.hospital

    setTimeout(() => {
      const created = createBloodRequest({
        ...formData,
        hospital: finalHospital
      })
      setIsSubmitting(false)
      setSubmittedSuccess(created)
    }, 800)
  }

  const isEmergency = formData.urgency === 'Emergency'

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {submittedSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-soft border border-stone-200 p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="text-4xl" />
            </div>

            <span className="inline-block bg-crimson-50 text-crimson-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              رقم الطلب: {submittedSuccess.id}
            </span>

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-ink mb-3">
              تم تقديم طلب الدم بنجاح!
            </h2>
            <p className="text-ink/70 max-w-lg mx-auto leading-relaxed mb-8">
              تم توثيق طلب كيس الدم بالمنظومة وجاري معالجته ومطابقته فوراً مع المتبرعين وبنوك الدم القريبة من مستشفى{' '}
              <strong className="text-ink">{submittedSuccess.hospital}</strong>.
            </p>

            <div className="bg-stone-50 rounded-xl p-6 mb-8 text-right grid md:grid-cols-2 gap-4 max-w-xl mx-auto border border-stone-200">
              <div>
                <p className="text-xs text-ink/50">اسم المريض</p>
                <p className="font-bold text-ink">{submittedSuccess.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">فصيلة الدم والكمية</p>
                <p className="font-bold text-crimson-600">
                  {submittedSuccess.bloodType} ({submittedSuccess.units} كيس)
                </p>
              </div>
              <div>
                <p className="text-xs text-ink/50">مستوى الأهمية</p>
                <p className="font-bold text-ink">{submittedSuccess.urgencyAr}</p>
              </div>
              <div>
                <p className="text-xs text-ink/50">رقم التواصل</p>
                <p className="font-bold text-ink">{submittedSuccess.phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate(`/track-request?id=${submittedSuccess.id}`)}
                aria-label="تتبع حالة الطلب الآن"
                className="bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-soft"
              >
                تتبع حالة الطلب الآن
              </button>
              <button
                onClick={() => {
                  setSubmittedSuccess(null)
                  setFormData({
                    patientName: '',
                    phone: '',
                    bloodType: 'O+',
                    units: 1,
                    governorate: 'الدقهلية',
                    city: 'المنصورة',
                    hospital: 'مستشفى المنصورة الجامعي',
                    customHospital: '',
                    requiredDate: new Date().toISOString().split('T')[0],
                    urgency: 'Normal',
                    notes: ''
                  })
                }}
                aria-label="تقديم طلب جديد"
                className="bg-white border border-stone-300 text-ink font-bold px-6 py-3.5 rounded-full hover:bg-stone-50 transition-all"
              >
                تقديم طلب جديد
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className={`bg-white rounded-2xl shadow-soft border transition-all duration-300 overflow-hidden ${
              isEmergency ? 'border-crimson-500 ring-2 ring-crimson-500/20' : 'border-stone-200'
            }`}
          >
            {/* شريط رأس النموذج */}
            <div
              className={`p-6 md:p-8 border-b transition-colors ${
                isEmergency ? 'bg-gradient-to-r from-crimson-900 to-crimson-800 text-white' : 'bg-stone-50 border-stone-200 text-ink'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FiDroplet className={isEmergency ? 'text-amber-300 text-xl' : 'text-crimson-600 text-xl'} />
                    <span className="font-display font-bold text-xl md:text-2xl">
                      نموذج طلب كيس دم <span className="text-sm font-normal opacity-80">(Request Blood)</span>
                    </span>
                  </div>
                  <p className={isEmergency ? 'text-cream/80 text-sm' : 'text-ink/65 text-sm'}>
                    قم بتعبئة تفاصيل المريض وحالة الاحتياج ليتم المطابقة مع أقرب بنك دم ومتبرعين.
                  </p>
                </div>

                {isEmergency && (
                  <span className="inline-flex items-center gap-1.5 bg-crimson-600 text-amber-200 text-xs font-extrabold px-3 py-1.5 rounded-full animate-pulse border border-amber-300/30">
                    <FiShield /> تنبيه: طلب طوارئ عاجل
                  </span>
                )}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* قسم الأهمية Urgency Level */}
              <div>
                <label className="block font-display font-bold text-ink mb-3 text-sm flex items-center gap-2">
                  <FiClock className="text-crimson-600" /> مستوى الأهمية والسرعة (Urgency Level)
                </label>
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { id: 'Normal', label: 'عادي (Normal)', desc: 'احتياج مجدول', color: 'border-stone-200 hover:border-stone-300' },
                    { id: 'Urgent', label: 'عاجل (Urgent)', desc: 'خلال ٢٤ ساعة', color: 'border-amber-400 bg-amber-50/40 text-amber-900' },
                    { id: 'Emergency', label: '🚨 طوارئ (Emergency)', desc: 'استجابة فورية', color: 'border-crimson-500 bg-crimson-50 text-crimson-900 font-bold' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, urgency: item.id })}
                      className={`p-3.5 md:p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                        formData.urgency === item.id
                          ? item.id === 'Emergency'
                            ? 'bg-crimson-600 text-white border-crimson-700 shadow-md ring-2 ring-crimson-500/50'
                            : 'bg-crimson-50 border-crimson-500 text-crimson-900 font-bold'
                          : 'bg-white border-stone-200 hover:border-stone-300 text-ink/80'
                      }`}
                    >
                      <span className="text-xs md:text-sm font-bold block">{item.label}</span>
                      <span className={`text-[11px] mt-1 block ${formData.urgency === item.id && item.id === 'Emergency' ? 'text-cream/90' : 'text-ink/50'}`}>
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* بيانات المريض الأساسية */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="patientName" className="block font-display font-bold text-ink mb-2 text-sm">
                    اسم المريض الكامل (Patient Full Name) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute right-3.5 top-3.5 text-ink/40" />
                    <input
                      id="patientName"
                      type="text"
                      placeholder="أدخل اسم المريض الرباعي"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-cream/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.patientName ? 'border-red-500 focus:ring-red-200' : 'border-stone-200 focus:ring-crimson-200 focus:border-crimson-500'
                      }`}
                    />
                  </div>
                  {errors.patientName && <p className="text-xs text-red-600 mt-1.5">{errors.patientName}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block font-display font-bold text-ink mb-2 text-sm">
                    رقم الهاتف والتواصل (Phone Number) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute right-3.5 top-3.5 text-ink/40" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="01012345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-cream/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-stone-200 focus:ring-crimson-200 focus:border-crimson-500'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1.5">{errors.phone}</p>}
                </div>
              </div>

              {/* فصيلة الدم وعدد الأكياس */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="bloodType" className="block font-display font-bold text-ink mb-2 text-sm">
                    فصيلة الدم المطلوبة (Blood Type) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {bloodTypesList.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, bloodType: type })}
                        className={`py-2.5 rounded-lg border font-display font-bold text-sm transition-all ${
                          formData.bloodType === type
                            ? 'bg-crimson-600 text-white border-crimson-700 shadow-sm'
                            : 'bg-stone-50 border-stone-200 text-ink hover:bg-stone-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="units" className="block font-display font-bold text-ink mb-2 text-sm">
                    عدد أكياس الدم المطلوبة (Number of Blood Bags) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, units: Math.max(1, formData.units - 1) })}
                      className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-ink font-bold text-lg flex items-center justify-center border border-stone-200"
                    >
                      -
                    </button>
                    <input
                      id="units"
                      type="number"
                      min="1"
                      max="20"
                      value={formData.units}
                      onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) || 1 })}
                      className="w-full text-center py-2.5 rounded-xl border border-stone-200 font-bold text-lg bg-cream/40 focus:outline-none focus:ring-2 focus:ring-crimson-200"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, units: Math.min(20, formData.units + 1) })}
                      className="w-11 h-11 rounded-xl bg-stone-100 hover:bg-stone-200 text-ink font-bold text-lg flex items-center justify-center border border-stone-200"
                    >
                      +
                    </button>
                  </div>
                  {errors.units && <p className="text-xs text-red-600 mt-1.5">{errors.units}</p>}
                </div>
              </div>

              {/* الموقع والمستشفى */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="governorate" className="block font-display font-bold text-ink mb-2 text-sm">
                    المحافظة (Governorate) <span className="text-crimson-600">*</span>
                  </label>
                  <select
                    id="governorate"
                    value={formData.governorate}
                    onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream/40 focus:outline-none focus:ring-2 focus:ring-crimson-200"
                  >
                    {governorates.map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="city" className="block font-display font-bold text-ink mb-2 text-sm">
                    المدينة / المنطقة (Area / City) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute right-3.5 top-3.5 text-ink/40" />
                    <input
                      id="city"
                      type="text"
                      placeholder="المنصورة، طلخا، ميت غمر..."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-cream/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.city ? 'border-red-500 focus:ring-red-200' : 'border-stone-200 focus:ring-crimson-200 focus:border-crimson-500'
                      }`}
                    />
                  </div>
                  {errors.city && <p className="text-xs text-red-600 mt-1.5">{errors.city}</p>}
                </div>

                <div>
                  <label htmlFor="requiredDate" className="block font-display font-bold text-ink mb-2 text-sm">
                    التاريخ المطلوب (Required Date) <span className="text-crimson-600">*</span>
                  </label>
                  <div className="relative">
                    <FiCalendar className="absolute right-3.5 top-3.5 text-ink/40" />
                    <input
                      id="requiredDate"
                      type="date"
                      value={formData.requiredDate}
                      onChange={(e) => setFormData({ ...formData, requiredDate: e.target.value })}
                      className={`w-full pr-10 pl-4 py-3 rounded-xl border bg-cream/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.requiredDate ? 'border-red-500 focus:ring-red-200' : 'border-stone-200 focus:ring-crimson-200 focus:border-crimson-500'
                      }`}
                    />
                  </div>
                  {errors.requiredDate && <p className="text-xs text-red-600 mt-1.5">{errors.requiredDate}</p>}
                </div>
              </div>

              {/* اسم المستشفى */}
              <div>
                <label htmlFor="hospital" className="block font-display font-bold text-ink mb-2 text-sm">
                  المستشفى المعالج (Hospital Name) <span className="text-crimson-600">*</span>
                </label>
                <select
                  id="hospital"
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-cream/40 focus:outline-none focus:ring-2 focus:ring-crimson-200 mb-3"
                >
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name} ({h.address})
                    </option>
                  ))}
                  <option value="أخرى">مستشفى أخرى غير مدرجة القائمة...</option>
                </select>

                {formData.hospital === 'أخرى' && (
                  <div>
                    <input
                      type="text"
                      placeholder="أدخل اسم المستشفى والعنوان بدقة"
                      value={formData.customHospital}
                      onChange={(e) => setFormData({ ...formData, customHospital: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border bg-cream/40 focus:outline-none focus:ring-2 transition-all ${
                        errors.customHospital ? 'border-red-500 focus:ring-red-200' : 'border-stone-200 focus:ring-crimson-200'
                      }`}
                    />
                    {errors.customHospital && <p className="text-xs text-red-600 mt-1.5">{errors.customHospital}</p>}
                  </div>
                )}
              </div>

              {/* ملاحظات إضافية */}
              <div>
                <label htmlFor="notes" className="block font-display font-bold text-ink mb-2 text-sm">
                  ملاحظات إضافية أو تفاصيل الحالة (Additional Notes)
                </label>
                <div className="relative">
                  <FiFileText className="absolute right-3.5 top-3.5 text-ink/40" />
                  <textarea
                    id="notes"
                    rows="3"
                    placeholder="رقم الغرفة، اسم القسم، أو أي تفاصيل طبية تساعد في تسريع التسليم..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 rounded-xl border border-stone-200 bg-cream/40 focus:outline-none focus:ring-2 focus:ring-crimson-200 resize-none"
                  />
                </div>
              </div>

              {/* إشعار طبي وأمان */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs md:text-sm text-amber-900">
                <FiInfo className="text-amber-600 text-lg flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>ملاحظة هامة:</strong> معلومات توفر الدم والمطابقة مع المتبرعين تخضع للتحقق والاعتماد من قبل بنوك الدم والمراكز الطبية المعتمدة بمحافظة الدقهلية قبل إتمام التسليم النهائي.
                </p>
              </div>

              {/* CTA Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-full font-display font-extrabold text-base md:text-lg text-white transition-all duration-300 shadow-soft flex items-center justify-center gap-2 ${
                    isEmergency
                      ? 'bg-crimson-700 hover:bg-crimson-800 ring-4 ring-crimson-500/30'
                      : 'bg-crimson-600 hover:bg-crimson-700 hover:-translate-y-0.5'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      جاري ارسال الطلب...
                    </span>
                  ) : (
                    <>
                      <FiDroplet className="text-xl" />
                      {isEmergency ? 'تقديم طلب الدم العاجل (Request Emergency Blood)' : 'طلب كيس دم (Request Blood)'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default RequestBloodForm
