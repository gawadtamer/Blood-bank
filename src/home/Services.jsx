import { motion } from 'framer-motion'
import { FiDroplet, FiClipboard, FiMapPin, FiClock } from 'react-icons/fi'

const services = [
  {
    icon: FiDroplet,
    title: "حجز أكياس الدم",
    desc: "احجز كيس الدم المطلوب من الفصيلة المناسبة بخطوات بسيطة وسريعة."
  },
  {
    icon: FiClipboard,
    title: "معرفة فصيلة الدم",
    desc: "احجز موعدًا لإجراء تحليل وتحديد فصيلة دمك بدقة في أقرب مستشفى."
  },
  {
    icon: FiMapPin,
    title: "دليل المستشفيات",
    desc: "تصفح قائمة كاملة بمستشفيات وبنوك الدم بالدقهلية مع مواقعها على الخريطة."
  },
  {
    icon: FiClock,
    title: "متابعة سريعة",
    desc: "استجابة لطلبك خلال أقل من 24 ساعة من فريق بنك الدم المختص."
  }
]

// قسم الخدمات المقدمة عبر المنصة
function Services() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-crimson-600 font-bold text-sm">خدماتنا</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3">
            كل ما تحتاجه في مكان واحد
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="bg-white rounded-xl2 p-7 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-crimson-600 text-white flex items-center justify-center text-xl mb-5">
                <s.icon />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink/60 leading-7">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
