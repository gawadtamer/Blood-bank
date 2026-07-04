import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiDroplet, FiActivity, FiArrowLeft } from 'react-icons/fi'

// قسم الواجهة الرئيسية (Hero) - يحمل الفكرة الأساسية للموقع
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 bg-crimson-50 text-crimson-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <FiActivity /> خدمة إلكترونية لأهالي الدقهلية
          </span>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.25] text-ink mb-6">
            بنك الدم بمحافظة <span className="text-crimson-600">الدقهلية</span>
          </h1>

          <p className="text-base md:text-lg text-ink/65 leading-8 mb-9 max-w-xl">
            تبرعك بكيس دم واحد قد ينقذ حياة ثلاثة أشخاص. من خلال منصتنا يمكنك حجز
            كيس دم، أو حجز موعد لمعرفة فصيلتك، والوصول لأقرب مستشفى أو بنك دم
            بمدينة المنصورة وباقي مراكز المحافظة في دقائق معدودة.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-crimson-600 hover:bg-crimson-700 text-white font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-soft hover:-translate-y-0.5"
            >
              <FiDroplet /> حجز كيس دم
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-white border-2 border-stone-200 hover:border-crimson-300 text-ink font-bold px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
            >
              معرفة فصيلة الدم <FiArrowLeft />
            </Link>
          </div>

          <div className="flex gap-8 mt-12">
            {[
              { n: "+120", l: "متبرع شهريًا" },
              { n: "18", l: "مستشفى وبنك دم" },
              { n: "8", l: "فصائل دم متاحة" }
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display font-extrabold text-2xl text-crimson-600 type-tick">{s.n}</p>
                <p className="text-xs text-ink/50 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="relative bg-white rounded-xl2 shadow-soft p-8 md:p-10 border border-stone-100">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-ink">نبضة الحياة</span>
              <FiActivity className="text-crimson-500 text-xl" />
            </div>

            <svg viewBox="0 0 400 120" className="w-full h-24 md:h-28">
              <path
                className="pulse-line pulse-draw"
                d="M0,60 L60,60 L80,60 L95,20 L115,100 L135,40 L150,60 L400,60"
              />
            </svg>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs text-ink/50 mb-1">الفصيلة الأكثر طلبًا</p>
                <p className="font-display font-bold text-crimson-600 text-lg">O+</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs text-ink/50 mb-1">وقت الاستجابة</p>
                <p className="font-display font-bold text-ink text-lg">أقل من ٢٤ ساعة</p>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-8 -left-8 h-full w-full rounded-xl2 bg-crimson-100/50 hidden md:block" />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
