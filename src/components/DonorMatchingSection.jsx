import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUsers,
  FiMapPin,
  FiPhoneCall,
  FiShield,
  FiCheckCircle,
  FiCalendar,
  FiMessageSquare,
  FiX
} from 'react-icons/fi'
import { findMatchingDonors } from '../services/bloodRequestService.js'

function DonorMatchingSection({ bloodType = 'O-', city = 'المنصورة' }) {
  const [donors, setDonors] = useState([])
  const [contactedDonor, setContactedDonor] = useState(null)

  useEffect(() => {
    const matches = findMatchingDonors(bloodType, city)
    setDonors(matches.length > 0 ? matches : findMatchingDonors('الكل', ''))
  }, [bloodType, city])

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FiUsers className="text-crimson-600 text-xl" />
            <h3 className="font-display font-extrabold text-xl text-ink">
              المتبرعون المطابقون للحالة <span className="text-xs font-normal text-ink/60">(Donor Matching)</span>
            </h3>
          </div>
          <p className="text-xs md:text-sm text-ink/60">
            تمت مطابقة الفصيلة <strong className="text-crimson-600 font-bold">{bloodType}</strong> مع المتبرعين المسجلين في نطاق {city}.
          </p>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
          <FiShield /> بيانات هويات المتبرعين محمية ومجردة للخصوصية
        </span>
      </div>

      {/* قائمة بطاقات المتبرعين */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {donors.map((donor) => (
          <motion.div
            key={donor.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-stone-50/70 hover:bg-white rounded-xl border border-stone-200 p-4 transition-all duration-300 hover:shadow-soft"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-crimson-600 text-white font-extrabold text-sm flex items-center justify-center">
                  {donor.bloodType}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-ink">{donor.name}</h4>
                  <span className="text-[11px] text-green-700 font-medium flex items-center gap-1">
                    <FiCheckCircle className="text-xs" /> {donor.availability}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-ink/70 mb-4 border-t border-stone-100 pt-2.5">
              <p className="flex items-center gap-1.5">
                <FiMapPin className="text-crimson-600" /> {donor.city}، {donor.area} ({donor.distance})
              </p>
              <p className="flex items-center gap-1.5">
                <FiCalendar className="text-ink/40" /> آخر تبرع: {donor.lastDonation}
              </p>
            </div>

            <button
              onClick={() => setContactedDonor(donor)}
              aria-label={`طلب تواصل مع المتبرع ${donor.name}`}
              className="w-full bg-crimson-600 hover:bg-crimson-700 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <FiPhoneCall /> طلب تواصل مع المتبرع
            </button>
          </motion.div>
        ))}
      </div>

      {/* تنبيه حماية الخصوصية */}
      <div className="text-xs text-ink/50 bg-stone-100 rounded-xl p-3 border border-stone-200">
        🔒 <strong>حماية البيانات الطبية:</strong> لا يتم كشف أرقام الهواتف أو الهويات الكاملة للمتبرعين إلا بعد الموافقة المتبادلة وتنسيق بنك الدم المعتمد.
      </div>

      {/* Modal طلب التواصل */}
      <AnimatePresence>
        {contactedDonor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setContactedDonor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setContactedDonor(null)}
                className="absolute top-4 left-4 text-stone-400 hover:text-ink text-xl p-1"
                aria-label="إغلاق النافذة"
              >
                <FiX />
              </button>

              <div className="w-12 h-12 bg-crimson-50 text-crimson-600 rounded-full flex items-center justify-center mb-4">
                <FiMessageSquare className="text-2xl" />
              </div>

              <h3 className="font-display font-bold text-lg text-ink mb-2">
                تأكيد طلب التنسيق مع المتبرع ({contactedDonor.name})
              </h3>
              <p className="text-xs text-ink/70 leading-relaxed mb-6">
                سيقوم منسق الطوارئ ببنك الدم بإرسال رسالة تنبيه عاجلة للمتبرع برقم الطلب والتفاصيل للموافقة على التوجه للمستشفى.
              </p>

              <div className="bg-stone-50 rounded-xl p-3 text-xs text-ink/80 space-y-1 mb-6 border border-stone-200">
                <p><strong>فصيلة الدم:</strong> {contactedDonor.bloodType}</p>
                <p><strong>المنطقة:</strong> {contactedDonor.city} - {contactedDonor.area}</p>
                <p><strong>الحالة:</strong> {contactedDonor.availability}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setContactedDonor(null)}
                  className="w-1/2 bg-stone-100 hover:bg-stone-200 text-ink font-bold py-2.5 rounded-xl text-xs"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    alert(`تم إرسال إشعار التنسيق للمتبرع ${contactedDonor.name} بنجاح!`)
                    setContactedDonor(null)
                  }}
                  className="w-1/2 bg-crimson-600 hover:bg-crimson-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-soft"
                >
                  إرسال تنبيه للمتبرع
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DonorMatchingSection
