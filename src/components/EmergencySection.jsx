import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiAlertTriangle, FiPhoneCall, FiArrowLeft, FiClock, FiShield } from 'react-icons/fi'

function EmergencySection() {
  return (
    <section className="relative my-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-crimson-900 via-crimson-800 to-crimson-900 text-white p-8 md:p-12 shadow-soft border-2 border-crimson-500/30 overflow-hidden">
          {/* خلفية زخرفية ناعمة */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-crimson-600/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="inline-flex items-center gap-2 bg-crimson-500/30 border border-crimson-400/40 text-red-200 text-xs md:text-sm font-bold px-3.5 py-1.5 rounded-full animate-pulse">
                  <FiAlertTriangle className="text-amber-400 text-base" /> حالة طوارئ حرجة
                </span>
                <span className="text-xs text-cream/70 flex items-center gap-1">
                  <FiClock /> استجابة فورية 24/7
                </span>
              </motion.div>

              <h2 className="font-display font-extrabold text-2xl md:text-4xl text-white leading-tight mb-4">
                هل تحتاج إلى دم بشكل عاجل؟ <span className="block text-red-300 text-xl md:text-2xl font-normal mt-1">Need Blood Urgently?</span>
              </h2>

              <p className="text-cream/90 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                احصل على المساعدة من متبرعي الدم والمراكز القريبة في أسرع وقت ممكن. نوصل طلبك العاجل فوراً لبنوك الدم والمستشفيات المعتمدة.
                <span className="block text-xs text-cream/60 mt-1">
                  Get help from nearby blood donors and blood centers as quickly as possible.
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request-blood?urgency=emergency"
                  className="inline-flex items-center gap-2.5 bg-white text-crimson-800 hover:bg-crimson-50 font-extrabold text-base md:text-lg px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-105"
                >
                  <FiShield className="text-crimson-600 text-xl" />
                  اطلب دم الآن
                  <span className="text-xs opacity-75 font-normal ml-1">(Request Blood Now)</span>
                  <FiArrowLeft className="text-xl" />
                </Link>

                <a
                  href="tel:0502202222"
                  className="inline-flex items-center gap-2 bg-crimson-700/80 hover:bg-crimson-600 border border-crimson-400/30 text-white font-bold text-sm md:text-base px-6 py-3.5 rounded-full transition-all"
                >
                  <FiPhoneCall className="text-amber-300" />
                  خط طوارئ الدقهلية: 050-2202222
                </a>
              </div>
            </div>

            {/* بطاقة جانبية للمؤشرات السريعة */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-6 text-cream/90">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <span className="font-bold text-sm text-white">إحصائيات الاستجابة العاجلة</span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-ping" />
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-cream/70">متوسط وقت المطابقة:</span>
                    <span className="font-bold text-amber-300">أقل من ١٥ دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cream/70">تغطية المراكز بالدقهلية:</span>
                    <span className="font-bold text-white">١٨ مركز ومستشفى</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-cream/70">شبكة المتبرعين النشطين:</span>
                    <span className="font-bold text-green-300">+٥٠٠ متبرع جاهز</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmergencySection
