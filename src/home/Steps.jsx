import { motion } from 'framer-motion'

const steps = [
  { num: "01", title: "اختر الخدمة", desc: "حدد ما إذا كنت تريد حجز كيس دم أو معرفة فصيلة دمك." },
  { num: "02", title: "املأ البيانات", desc: "أدخل بياناتك الشخصية واختر المستشفى والموعد المناسب." },
  { num: "03", title: "أرفق البطاقة", desc: "قم برفع صورة واضحة من بطاقتك الشخصية لتأكيد الحجز." },
  { num: "04", title: "تأكيد الطلب", desc: "استلم رسالة تأكيد فورية وتوجه للمستشفى في الموعد المحدد." }
]

// قسم خطوات الحجز: عرض تسلسلي حقيقي لمراحل إتمام الحجز
function Steps() {
  return (
    <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-crimson-600 font-bold text-sm">خطوات بسيطة</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3">
          كيف تتم عملية الحجز؟
        </h2>
      </div>

      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block absolute top-8 right-[12%] left-[12%] h-[2px] bg-stone-200" />

        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="relative text-center"
          >
            <div className="relative z-10 mx-auto mb-5 h-16 w-16 rounded-full bg-white border-2 border-crimson-600 text-crimson-600 font-display font-extrabold text-xl flex items-center justify-center type-tick">
              {s.num}
            </div>
            <h3 className="font-display font-bold text-ink mb-2">{s.title}</h3>
            <p className="text-sm text-ink/60 leading-7 px-2">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Steps
