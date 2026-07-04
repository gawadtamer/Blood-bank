import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  {
    q: "كم يستغرق حجز كيس الدم؟",
    a: "يتم تأكيد طلبك خلال أقل من 24 ساعة، وسيتم التواصل معك لتحديد موعد الاستلام من المستشفى المختار."
  },
  {
    q: "هل يمكنني معرفة فصيلة دمي دون تحليل سابق؟",
    a: "نعم، يمكنك حجز موعد من صفحة الحجز واختيار خدمة (معرفة فصيلة الدم) وسيتم إجراء التحليل في المستشفى."
  },
  {
    q: "ما المستندات المطلوبة عند الحجز؟",
    a: "يُطلب منك رفع صورة واضحة من البطاقة الشخصية عند تعبئة نموذج الحجز لتأكيد الهوية."
  },
  {
    q: "هل الخدمة متاحة في جميع مراكز الدقهلية؟",
    a: "الخدمة متاحة حاليًا في أبرز مستشفيات وبنوك الدم بمدينة المنصورة ومراكز الدقهلية المجاورة، ويمكنك مشاهدة القائمة كاملة في صفحة المستشفيات."
  },
  {
    q: "هل التبرع بالدم آمن؟",
    a: "نعم، تتم جميع عمليات سحب الدم تحت إشراف طبي كامل باستخدام أدوات معقمة وآمنة تمامًا."
  }
]

// قسم الأسئلة الشائعة بنظام أكورديون
function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="max-w-4xl mx-auto px-5 md:px-8 py-20">
      <div className="text-center mb-14">
        <span className="text-crimson-600 font-bold text-sm">الأسئلة الشائعة</span>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3">
          كل ما يجب أن تعرفه
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={item.q}
              className="bg-white border border-stone-100 rounded-xl2 overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-right"
              >
                <span className="font-display font-bold text-ink">{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-crimson-600 shrink-0 mr-4"
                >
                  <FiChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm text-ink/60 leading-7">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
