import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiDroplet } from 'react-icons/fi'

// قسم دعوة لاتخاذ إجراء (Call To Action) قبل الفوتر
function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative bg-ink rounded-xl2 px-8 md:px-16 py-16 text-center overflow-hidden"
      >
        <div className="relative z-10">
          <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-crimson-600 flex items-center justify-center text-white text-2xl">
            <FiDroplet />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
            قطرة دمك قد تصنع فرقًا اليوم
          </h2>
          <p className="text-cream/60 max-w-xl mx-auto mb-9 leading-8">
            انضم إلى شبكة المتبرعين بمحافظة الدقهلية، واحجز موعدك الآن في أقل من دقيقتين.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-8 py-4 rounded-full transition-all hover:shadow-soft"
          >
            <FiDroplet /> احجز موعدك الآن
          </Link>
        </div>

        <svg viewBox="0 0 400 60" className="absolute bottom-0 right-0 w-full h-16 opacity-10">
          <path className="pulse-line" stroke="#fff" d="M0,30 L100,30 L120,30 L135,5 L155,55 L175,15 L195,30 L400,30" />
        </svg>
      </motion.div>
    </section>
  )
}

export default CTA
