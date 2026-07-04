import { motion } from 'framer-motion'
import { FiShield, FiZap, FiUsers, FiHeart } from 'react-icons/fi'

const reasons = [
  { icon: FiZap, title: "سرعة الاستجابة", desc: "نوفر لك حجزًا فوريًا ومتابعة سريعة لكل طلب." },
  { icon: FiShield, title: "بيانات آمنة", desc: "بياناتك ووثائقك محفوظة بسرية تامة وأمان كامل." },
  { icon: FiUsers, title: "فريق طبي متخصص", desc: "يشرف على الخدمة فريق طبي مؤهل داخل المستشفيات." },
  { icon: FiHeart, title: "خدمة إنسانية", desc: "هدفنا الأول إنقاذ الأرواح وتيسير التبرع بالدم." }
]

// قسم "لماذا تختار بنك الدم؟"
function WhyChooseUs() {
  return (
    <section className="bg-crimson-700 py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-crimson-200 font-bold text-sm">لماذا نحن</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mt-3">
            لماذا تختار بنك الدم بالدقهلية؟
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white/10 backdrop-blur rounded-xl2 p-7 border border-white/10 hover:bg-white/15 transition-colors"
            >
              <div className="h-12 w-12 rounded-xl bg-white text-crimson-600 flex items-center justify-center text-xl mb-5">
                <r.icon />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">{r.title}</h3>
              <p className="text-sm text-crimson-100/80 leading-7">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 400 60" className="absolute bottom-0 right-0 w-full h-14 opacity-20">
        <path className="pulse-line" stroke="#fff" d="M0,30 L100,30 L120,30 L135,5 L155,55 L175,15 L195,30 L400,30" />
      </svg>
    </section>
  )
}

export default WhyChooseUs
