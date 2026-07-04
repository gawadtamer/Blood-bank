import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiDroplet } from 'react-icons/fi'
import { bloodTypes } from '../data/bloodTypes.js'

const availabilityStyle = {
  "متوفر": "bg-green-50 text-green-700",
  "محدود": "bg-amber-50 text-amber-700",
  "نادر": "bg-crimson-50 text-crimson-700"
}

// قسم يعرض جميع فصائل الدم الثمانية في بطاقات احترافية
function BloodTypes() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-crimson-600 font-bold text-sm">فصائل الدم</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3 mb-4">
          اختر فصيلتك وتعرف على حالة توافرها
        </h2>
        <p className="text-ink/60 leading-7">
          نعرض هنا جميع فصائل الدم الثمانية مع بيان من يمكنه التبرع لهذه الفصيلة
          ومن يمكنه استقبالها، لمساعدتك على فهم أهمية كل فصيلة.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {bloodTypes.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
            whileHover={{ y: -6 }}
            className="group bg-white border border-stone-100 rounded-xl2 p-6 shadow-card hover:shadow-soft transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="h-11 w-11 rounded-full bg-crimson-50 flex items-center justify-center text-crimson-600 group-hover:bg-crimson-600 group-hover:text-white transition-colors">
                <FiDroplet />
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${availabilityStyle[b.availability]}`}>
                {b.availability}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-ink type-tick mb-1">{b.type}</h3>
            <p className="text-sm text-ink/50 mb-4">{b.name}</p>

            <div className="text-xs text-ink/55 space-y-1.5 mb-5 border-t border-stone-100 pt-4">
              <p>يتبرع إلى: <span className="font-semibold text-ink/75">{b.canDonateTo.join('، ')}</span></p>
              <p>يستقبل من: <span className="font-semibold text-ink/75">{b.canReceiveFrom.join('، ')}</span></p>
            </div>

            <Link
              to="/booking"
              className="block text-center text-sm font-bold text-crimson-600 border-2 border-crimson-100 group-hover:border-crimson-600 group-hover:bg-crimson-600 group-hover:text-white rounded-full py-2.5 transition-colors"
            >
              حجز هذه الفصيلة
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default BloodTypes
