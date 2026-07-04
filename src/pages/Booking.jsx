import { motion } from 'framer-motion'
import BookingForm from '../components/BookingForm.jsx'

// صفحة الحجز: تحتوي على نموذج حجز كيس دم أو معرفة فصيلة الدم
function Booking() {
  return (
    <section className="bg-stone-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-crimson-600 font-bold text-sm">حجز موعد</span>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-ink mt-3 mb-4">
            احجز كيس دم أو موعد معرفة فصيلتك
          </h1>
          <p className="text-ink/60 leading-7">
            يرجى تعبئة البيانات التالية بدقة، وسيتم التواصل معك لتأكيد الموعد خلال 24 ساعة.
          </p>
        </motion.div>

        <BookingForm />
      </div>
    </section>
  )
}

export default Booking
