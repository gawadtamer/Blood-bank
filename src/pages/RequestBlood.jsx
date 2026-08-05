import { motion } from 'framer-motion'
import { FiActivity, FiShield, FiHeart, FiClock } from 'react-icons/fi'
import RequestBloodForm from '../components/RequestBloodForm.jsx'

function RequestBlood() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-cream py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full mb-4"
        >
          <FiActivity /> خدمة المرضى والطوارئ بمحافظة الدقهلية
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display font-extrabold text-3xl md:text-5xl text-ink leading-tight mb-4"
        >
          طلب كيس دم للمريض <span className="text-crimson-600">(Request Blood)</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed"
        >
          يمكنك تقديم طلب حجز وحدات الدم للمستشفيات وبنوك الدم المعتمده في دقائق معدودة، ومتابعة حالة الطلب لحظة بلحظة.
        </motion.p>

        {/* مميزات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          {[
            { icon: FiClock, title: 'معالجة سرية وسريعة', desc: 'ربط مباشر بجميع مستشفيات وبنوك الدم بالمنصورة' },
            { icon: FiShield, title: 'اعتماد طبي رسمي', desc: 'مراجعة طلبك بواسطة فرق المختبرات المؤهلة' },
            { icon: FiHeart, title: 'شبكة متبرعين نشطة', desc: 'تنبيه المتبرعين المطابقين فور تقديم الطلب' }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur rounded-xl p-4 border border-stone-200 shadow-card text-right flex items-start gap-3">
              <feature.icon className="text-crimson-600 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h2 className="font-display font-bold text-sm text-ink">{feature.title}</h2>
                <p className="text-xs text-ink/60 mt-0.5">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <RequestBloodForm />
      </div>
    </div>
  )
}

export default RequestBlood
